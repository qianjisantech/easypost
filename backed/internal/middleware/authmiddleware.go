package middleware

import (
	"context"
	"fmt"
	"github.com/golang-jwt/jwt/v4"
	"gorm.io/gorm"
	"log"
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
	TeamId    int64
	ProjectId int64
}

func NewAuthMiddleware(db *gorm.DB) *AuthMiddleware {
	mw := &AuthMiddleware{
		whitelist: map[string]bool{
			"/api/auth/email/login":    true,
			"/api/auth/email/sendCode": true,
			"/api/auth/email/register": true,
		},
		db: db,
	}

	// 初始化时注册回调，只注册一次
	mw.registerCallbacks()

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

		userId, username, err := a.ExtractUserIDFromClaims(claims)
		if err != nil {
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}

		// 设置上下文
		ctx := r.Context()
		contentInfo := &ContentInfo{
			UserId:   userId,
			Username: username,
		}
		// 安全获取并设置 teamId 和 projectId
		if teamId := r.Header.Get("X-Team-Id"); teamId != "" {
			contentInfo.TeamId, err = strconv.ParseInt(teamId, 10, 64)
			log.Printf("获取到的 teamId 为：%s", teamId)
		}

		if projectId := r.Header.Get("X-Project-Id"); projectId != "" {
			contentInfo.ProjectId, err = strconv.ParseInt(projectId, 10, 64)
			log.Printf("获取到的 projectId 为：%s", projectId)
		}
		ctx = context.WithValue(ctx, "contentInfo", contentInfo)
		r = r.WithContext(ctx)
		next(w, r)
	}
}

// 初始化时注册回调
func (a *AuthMiddleware) registerCallbacks() {
	// 创建记录回调
	a.db.Callback().Create().Before("gorm:create").Register("set_create_fields", func(db *gorm.DB) {
		if db.Statement.Context == nil {
			return
		}
		log.Printf("创建插入数据自动填充数据")
		// 从上下文中获取用户信息
		// 处理 userId
		contentInfo, ok := db.Statement.Context.Value("contentInfo").(ContentInfo)
		if ok {
			fmt.Printf("DEBUG: Found userId in context: %d\n", contentInfo.UserId) // 调试日志

			field := db.Statement.Schema.LookUpField("create_by")
			if field != nil {
				fmt.Printf("DEBUG: Found 'update_by' field in schema\n") // 调试日志
				db.Statement.SetColumn("create_by", contentInfo.UserId)
				fmt.Printf("DEBUG: Set 'update_by' column to: %d\n", contentInfo.UserId) // 调试日志
			} else {
				fmt.Printf("DEBUG: 'update_by' field not found in schema\n") // 调试日志
			}
		} else {
			fmt.Printf("DEBUG: userId not found in context or not int64 type\n") // 调试日志
		}

		if ok {
			fmt.Printf("DEBUG: Found username in context: %s\n", contentInfo.Username) // 调试日志

			field := db.Statement.Schema.LookUpField("create_by_name")
			if field != nil {
				fmt.Printf("DEBUG: Found 'update_by_name' field in schema\n") // 调试日志
				db.Statement.SetColumn("create_by_name", contentInfo.Username)
				fmt.Printf("DEBUG: Set 'update_by_name' column to: %s\n", contentInfo.Username) // 调试日志
			} else {
				fmt.Printf("DEBUG: 'update_by_name' field not found in schema\n") // 调试日志
			}
		} else {
			fmt.Printf("DEBUG: username not found in context or not string type\n") // 调试日志
		}
	})

	// 更新记录回调
	a.db.Callback().Update().Before("gorm:update").Register("set_update_fields", func(db *gorm.DB) {
		if db.Statement.Context == nil {
			return
		}
		log.Printf("更新插入数据自动填充数据")
		// 处理 userId
		contentInfo, ok := db.Statement.Context.Value("contentInfo").(ContentInfo)
		if ok {
			fmt.Printf("DEBUG: Found userId in context: %d\n", contentInfo.UserId) // 调试日志

			field := db.Statement.Schema.LookUpField("update_by")
			if field != nil {
				fmt.Printf("DEBUG: Found 'update_by' field in schema\n") // 调试日志
				db.Statement.SetColumn("update_by", contentInfo.UserId)
				fmt.Printf("DEBUG: Set 'update_by' column to: %d\n", contentInfo.UserId) // 调试日志
			} else {
				fmt.Printf("DEBUG: 'update_by' field not found in schema\n") // 调试日志
			}
		} else {
			fmt.Printf("DEBUG: userId not found in context or not int64 type\n") // 调试日志
		}

		if ok {
			fmt.Printf("DEBUG: Found username in context: %s\n", contentInfo.Username) // 调试日志

			field := db.Statement.Schema.LookUpField("update_by_name")
			if field != nil {
				fmt.Printf("DEBUG: Found 'update_by_name' field in schema\n") // 调试日志
				db.Statement.SetColumn("update_by_name", contentInfo.Username)
				fmt.Printf("DEBUG: Set 'update_by_name' column to: %s\n", contentInfo.Username) // 调试日志
			} else {
				fmt.Printf("DEBUG: 'update_by_name' field not found in schema\n") // 调试日志
			}
		} else {
			fmt.Printf("DEBUG: username not found in context or not string type\n") // 调试日志
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
func (a *AuthMiddleware) ExtractUserIDFromClaims(claims jwt.MapClaims) (int64, string, error) {
	userId, ok := claims["user_id"].(float64)
	username, ok := claims["username"].(string)
	if !ok {
		return 0, "admin", fmt.Errorf("user_id not found in token")
	}
	return int64(userId), username, nil
}
