package middleware

import (
	"context"
	"fmt"
	"github.com/golang-jwt/jwt/v4"
	"github.com/zeromicro/go-zero/core/logx"
	"gorm.io/gorm"
	"net/http"
	"strconv"
	"strings"
)

var secretKey = "easypost"

type AuthMiddleware struct {
	whitelist map[string]bool
	db        *gorm.DB
}
type ContentInfo struct {
	UserId    int64
	Username  string
	Email     string
	TeamId    int64
	ProjectId int64
}

func NewAuthMiddleware(db *gorm.DB) *AuthMiddleware {
	mw := &AuthMiddleware{
		whitelist: map[string]bool{
			"/app/auth/email/login":    true,
			"/app/auth/email/sendCode": true,
			"/app/auth/email/register": true,
		},
		db: db,
	}
	return mw
}

func (a *AuthMiddleware) Handle(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if a.whitelist[r.URL.Path] {
			next(w, r)
			return
		}

		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
			return
		}

		tokenString, err := a.ExtractBearerToken(authHeader)
		if err != nil {
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}

		claims, err := a.ParseAndValidateJWT(tokenString)
		if err != nil {
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}

		userId, username, email, err := a.ExtractUserIDFromClaims(claims)
		if err != nil {
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}

		// 设置上下文
		ctx := r.Context()
		contentInfo := &ContentInfo{
			UserId:   userId,
			Username: username,
			Email:    email,
		}

		if teamId := r.Header.Get("X-Team-Id"); teamId != "" {
			contentInfo.TeamId, err = strconv.ParseInt(teamId, 10, 64)
			logx.Debug("获取到的 teamId 为：%s", teamId)
		}

		if projectId := r.Header.Get("X-Project-Id"); projectId != "" {
			contentInfo.ProjectId, err = strconv.ParseInt(projectId, 10, 64)
			logx.Debug("获取到的 projectId 为：%s", projectId)
		}

		ctx = context.WithValue(ctx, "contentInfo", contentInfo)
		r = r.WithContext(ctx)

		// 不要覆盖全局 `a.db`，而是每次操作都传递 `context`
		dbWithCtx := a.db.WithContext(ctx)
		a.RegisterCallbacks(dbWithCtx)

		next(w, r)
	}
}

func (a *AuthMiddleware) RegisterCallbacks(db *gorm.DB) {
	db.Callback().Create().Before("gorm:create").Register("set_create_fields", func(db *gorm.DB) {
		ctx := db.Statement.Context
		if ctx == nil {
			logx.Debug("DEBUG: Context is nil in GORM callback")
			return
		}

		//contentInfo, ok := ctx.Value("contentInfo").(*ContentInfo)
		//if !ok {
		//	logx.Debug("DEBUG: contentInfo not found in context")
		//	return
		//}

		if field := db.Statement.Schema.LookUpField("create_by"); field != nil {
			db.Statement.SetColumn("create_by", 1)
		}
		if field := db.Statement.Schema.LookUpField("create_by_name"); field != nil {
			db.Statement.SetColumn("create_by_name", "admin")
		}
	})

	db.Callback().Update().Before("gorm:update").Register("set_update_fields", func(db *gorm.DB) {
		ctx := db.Statement.Context
		if ctx == nil {
			logx.Debug("DEBUG: Context is nil in GORM callback")
			return
		}

		//contentInfo, ok := ctx.Value("contentInfo").(*ContentInfo)
		//if !ok {
		//	logx.Debug("DEBUG: contentInfo not found in context")
		//	return
		//}

		if field := db.Statement.Schema.LookUpField("update_by"); field != nil {
			db.Statement.SetColumn("update_by", 1)
		}
		if field := db.Statement.Schema.LookUpField("update_by_name"); field != nil {
			db.Statement.SetColumn("update_by_name", "admin")
		}
	})
}

// 辅助函数：从 Authorization 头提取 Bearer token
func (a *AuthMiddleware) ExtractBearerToken(authHeader string) (string, error) {
	parts := strings.SplitN(authHeader, " ", 2)
	if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
		return "", fmt.Errorf("invalid Authorization header format")
	}
	return parts[1], nil
}

// 辅助函数：解析并验证 JWT
func (a *AuthMiddleware) ParseAndValidateJWT(tokenString string) (jwt.MapClaims, error) {
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
func (a *AuthMiddleware) ExtractUserIDFromClaims(claims jwt.MapClaims) (int64, string, string, error) {
	userId, ok := claims["user_id"].(float64)
	username, ok := claims["username"].(string)
	email, ok := claims["email"].(string)
	if !ok {
		return 0, "", "", fmt.Errorf("user_id not found in token")
	}
	return int64(userId), username, email, nil
}
