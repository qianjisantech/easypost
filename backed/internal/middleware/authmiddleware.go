package middleware

import (
	"context"
	"fmt"
	"github.com/golang-jwt/jwt/v4"
	"log"
	"net/http"
	"strings"
)

var secretKey = "easypost"

// AuthMiddleware 定义认证中间件
type AuthMiddleware struct {
	whitelist map[string]bool
}

// NewAuthMiddleware 返回一个 AuthMiddleware 实例
func NewAuthMiddleware() *AuthMiddleware {
	return &AuthMiddleware{
		whitelist: map[string]bool{
			"/api/auth/email/login":    true, // 这里添加不需要 JWT 认证的路径
			"/api/auth/email/sendCode": true,
			"/api/auth/email/register": true,
		},
	}
}

func (a *AuthMiddleware) Handle(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// 检查是否是白名单路径
		if a.whitelist[r.URL.Path] {
			next(w, r)
			return
		}

		// 从请求头获取 Authorization 字段
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
			return
		}

		// 解析 Bearer token
		tokenString, err := extractBearerToken(authHeader)
		if err != nil {
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}

		// 验证并解析 JWT
		claims, err := parseAndValidateJWT(tokenString)
		if err != nil {
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}

		// 从 claims 获取 user_id
		userID, err := extractUserIDFromClaims(claims)
		if err != nil {
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}

		// 创建新的上下文并添加值
		ctx := r.Context()
		ctx = context.WithValue(ctx, "userId", userID)

		// 安全获取并设置 teamId 和 projectId
		if teamId := r.Header.Get("X-Team-Id"); teamId != "" {
			ctx = context.WithValue(ctx, "teamId", teamId)
			log.Printf("获取到的 teamId 为：%s", teamId)
		}

		if projectId := r.Header.Get("X-Project-Id"); projectId != "" {
			ctx = context.WithValue(ctx, "projectId", projectId)
			log.Printf("获取到的 projectId 为：%s", projectId)
		}

		// 使用新上下文继续处理
		r = r.WithContext(ctx)
		next(w, r)
	}
}

// 辅助函数：从 Authorization 头提取 Bearer token
func extractBearerToken(authHeader string) (string, error) {
	parts := strings.SplitN(authHeader, " ", 2)
	if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
		return "", fmt.Errorf("invalid Authorization header format")
	}
	return parts[1], nil
}

// 辅助函数：解析并验证 JWT
func parseAndValidateJWT(tokenString string) (jwt.MapClaims, error) {
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
func extractUserIDFromClaims(claims jwt.MapClaims) (int64, error) {
	userIDFloat, ok := claims["user_id"].(float64)
	if !ok {
		return 0, fmt.Errorf("user_id not found in token")
	}
	return int64(userIDFloat), nil
}
