package middleware

import (
	"context"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"gorm.io/gorm"
)

type AuditMiddleware struct {
	db      *gorm.DB
	secret  string
	expires time.Duration
}

func NewAuditMiddleware(db *gorm.DB) *AuditMiddleware {
	return &AuditMiddleware{
		db: db,
	}
}

// Handle 实现认证和数据库操作拦截
func (a *AuditMiddleware) Handle(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// 1. JWT 认证
		authHeader := r.Header.Get("Authorization")
		userId, err := a.ExtractBearerToken(authHeader)
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			fmt.Fprintf(w, `{"error": "%v"}`, err)
			return
		}

		// 2. 设置上下文
		ctx := context.WithValue(r.Context(), "userId", userId)
		r = r.WithContext(ctx)
		userIDInt, err := strconv.ParseInt(userId, 10, 64)
		// 3. 设置GORM回调
		a.setGormCallbacks(userIDInt)

		next(w, r)
	}
}

// 辅助函数：从 Authorization 头提取 Bearer token
func (a *AuditMiddleware) ExtractBearerToken(authHeader string) (string, error) {
	parts := strings.SplitN(authHeader, " ", 2)
	if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
		return "", fmt.Errorf("invalid Authorization header format")
	}
	return parts[1], nil
}

// 辅助函数：解析并验证 JWT
func (a *AuditMiddleware) ParseAndValidateJWT(tokenString string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secretKey), nil
	})
	if err != nil {
		return nil, fmt.Errorf("invalid token: %v", err)
	}
	if !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, fmt.Errorf("invalid token claims")
	}
	return claims, nil
}

// 辅助函数：从 claims 提取 user_id
func (a *AuditMiddleware) ExtractUserIDFromClaims(claims jwt.MapClaims) (int64, error) {
	userIDFloat, ok := claims["user_id"].(float64)
	if !ok {
		return 0, fmt.Errorf("user_id not found in token")
	}
	return int64(userIDFloat), nil
}

func (a *AuditMiddleware) setGormCallbacks(userID int64) {
	// 创建记录时自动设置create_by
	_ = a.db.Callback().Create().Before("gorm:create").Register("set_create_by", func(d *gorm.DB) {
		if d.Statement.Schema != nil {
			if field := d.Statement.Schema.LookUpField("create_by"); field != nil {
				d.Statement.SetColumn("create_by", userID)
			}
		}
	})

	// 更新记录时自动设置update_by
	_ = a.db.Callback().Update().Before("gorm:update").Register("set_update_by", func(d *gorm.DB) {
		if d.Statement.Schema != nil {
			if field := d.Statement.Schema.LookUpField("update_by"); field != nil {
				d.Statement.SetColumn("update_by", userID)
			}
		}
	})
}
