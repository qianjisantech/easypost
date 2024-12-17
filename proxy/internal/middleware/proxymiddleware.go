package middleware

import (
	"github.com/go-resty/resty/v2"
	"log"
	"net/http"
	"strings"
)

type ProxyMiddleware struct {
}

func NewProxyMiddleware() *ProxyMiddleware {
	return &ProxyMiddleware{}
}

// Handle Handler 是中间件的核心处理函数
func (m *ProxyMiddleware) Handle(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		response, header := m.ProxyRequest(r)
		// 将捕获的值设置到响应头
		w.Header().Set("Accept", header)
		_, err := w.Write(response)
		if err != nil {
			return
		}
		// 也可以打印请求头，用于调试
		log.Printf("Request Headers: %v", r.Header)

		// 调用下一个中间件或最终处理函数
		next.ServeHTTP(w, r)
	}
}

func (m *ProxyMiddleware) ProxyRequest(r *http.Request) ([]byte, string) {

	apiu := r.Header.Get("Api-u")
	apio0 := r.Header.Get("Api-o0")
	headers := m.getRequestHeaders(apio0)
	resp, header := m.handleRequestHeaders(headers, apiu)
	accept := header.Get("Content-Type")
	return resp, accept
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

func (m *ProxyMiddleware) handleRequestHeaders(headers map[string]string, url string) ([]byte, http.Header) {
	proxyClient := resty.New()
	method := headers["method"]
	switch method {
	case "GET":
		response, _ := proxyClient.R().Get(url)
		return response.Body(), response.Header()
	case "POST":
		response, _ := proxyClient.R().Post(url)
		return response.Body(), response.Header()
	default:
		return nil, nil
	}

}
