package middleware

import (
	"context"
	"github.com/zeromicro/go-zero/core/logx"
	"io/ioutil"
	"net/http"
	"strings"
)

type contextKey string

const (
	URL      contextKey = "url"
	METHOD   contextKey = "method"
	HEADERS  contextKey = "headers"
	ApiH0Key contextKey = "Api-H0"
	Body     contextKey = "body"
)

type ProxyMiddleware struct {
}

func NewProxyMiddleware() *ProxyMiddleware {
	return &ProxyMiddleware{}
}

// Handle Handler 是中间件的核心处理函数
func (m *ProxyMiddleware) Handle(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		url := r.Header.Get("Api-U")    //请求路径
		apio0 := r.Header.Get("Api-O0") //请求方式 相关信息
		apiH0 := r.Header.Get("Api-H0") //请求头
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			logx.WithContext(r.Context()).Errorf("Failed to read request body: %v", err)
			http.Error(w, "Failed to read request body", http.StatusInternalServerError)
			return
		}
		apio0map := m.getRequestHeaders(apio0)

		method := apio0map[string(METHOD)] //请求头

		headers := m.getRequestHeaders(apiH0)
		httpHeaders := http.Header{}
		for k, v := range headers {
			httpHeaders.Set(k, v)
		}
		// 创建新的 context，存入请求头数据
		ctx := context.WithValue(r.Context(), URL, url) //存请求路径
		ctx = context.WithValue(ctx, METHOD, method)    //存请求方式
		ctx = context.WithValue(ctx, HEADERS, httpHeaders)
		ctx = context.WithValue(ctx, Body, string(body))
		w.Header().Set("Api-H0", "application/json;charset=UTF-8")
		w.Header().Set("Api-O0", "")
		// 调用下一个中间件或 handler，并传递新的 context
		next(w, r.WithContext(ctx))
	}
}

func (m *ProxyMiddleware) getRequestHeaders(apio0 string) map[string]string {
	// 创建一个空的 map 来存储结果
	result := make(map[string]string)

	// 按逗号分割字符串
	pairs := strings.Split(apio0, ",")

	// 遍历每个键值对
	for _, pair := range pairs {
		// 去除前后空格
		pair = strings.TrimSpace(pair)

		// 按等号分割键和值
		kv := strings.Split(pair, "=")
		if len(kv) == 2 {
			// 去除键和值的空格，并将它们加入 map
			result[strings.TrimSpace(kv[0])] = strings.TrimSpace(kv[1])
		}
	}

	return result
}
