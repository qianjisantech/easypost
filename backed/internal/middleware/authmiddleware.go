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
type AuthMiddleware struct{}

// NewAuthMiddleware 返回一个 AuthMiddleware 实例
func NewAuthMiddleware() *AuthMiddleware {
	return &AuthMiddleware{}
}

// Handle 拦截请求，从 Authorization 头中解析 JWT 并获取 user_id
func (a *AuthMiddleware) Handle(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// 从请求头获取 Authorization 字段
		authHeader := r.Header.Get("Authorization")
		log.Printf("获取到的Authorization为：%s", authHeader)
		if authHeader == "" {
			http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
			return
		}

		// 通常格式为 "Bearer <token>"
		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) != 2 || strings.ToLower(parts[0]) != "Bearer" {
			http.Error(w, "Invalid Authorization header format", http.StatusUnauthorized)
			return
		}
		tokenString := parts[1]

		// 解析 token
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			// 检查签名方法是否为 HMAC
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(secretKey), nil
		})
		if err != nil || !token.Valid {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		// 从 token 中获取声明
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			http.Error(w, "Invalid token claims", http.StatusUnauthorized)
			return
		}

		// 提取 user_id。注意 JSON 中数字默认为 float64
		userIDFloat, ok := claims["user_id"].(float64)
		if !ok {
			http.Error(w, "user_id not found in token", http.StatusUnauthorized)
			return
		}
		userID := int64(userIDFloat)

		// 将 userID 放入请求上下文中，方便后续获取
		ctx := context.WithValue(r.Context(), "user_id", userID)
		r = r.WithContext(ctx)

		// 调用下一个处理函数
		next(w, r)
	}
}
