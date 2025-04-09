package middleware

import (
	"net/http"
)

type ProxyMiddleware struct {
}

func NewProxyMiddleware() *ProxyMiddleware {
	return &ProxyMiddleware{}
}

// Handle Handler 是中间件的核心处理函数
func (m *ProxyMiddleware) Handle(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

	}
}
