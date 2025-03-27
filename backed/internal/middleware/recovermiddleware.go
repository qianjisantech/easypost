package middleware

import (
	"github.com/zeromicro/go-zero/rest/httpx"
	"log"
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
				log.Printf("Recovered from panic: %v", r)
				httpx.WriteJson(w, http.StatusInternalServerError, map[string]interface{}{
					"success": false,
					"message": "Internal Server Error",
				})
			}
		}()
		next.ServeHTTP(w, r)
	}
}
