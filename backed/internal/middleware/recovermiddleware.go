package middleware

import (
	"fmt"
	"github.com/zeromicro/go-zero/rest/httpx"
	"net/http"
)

type RecoverMiddleware struct{}

func NewRecoverMiddleware() *RecoverMiddleware {
	return &RecoverMiddleware{}
}

func (r RecoverMiddleware) Handle(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if r := recover(); r != nil {
				logx.Debug("Recovered from panic: %v", r)
				httpx.WriteJson(w, http.StatusInternalServerError, map[string]interface{}{
					"success": false,
					"message": fmt.Sprintf("%v", r),
				})
			}
		}()
		next.ServeHTTP(w, r)
	}
}
