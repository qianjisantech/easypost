package middleware

import (
	"github.com/go-resty/resty/v2"
	"github.com/zeromicro/go-zero/core/logx"
	"io/ioutil"
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
		apiu := r.Header.Get("Api-u")
		apio0 := r.Header.Get("Api-o0")
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			logx.WithContext(r.Context()).Errorf("Failed to read request body: %v", err)
		}
		requestHeaders := m.getRequestHeaders(apio0)                            //分解请求头
		resp, respHeaders := m.handleRequestHeaders(requestHeaders, apiu, body) //发送请求

		for k, v := range respHeaders {
			if len(v) > 1 {
				w.Header().Set(k, strings.Join(v, ","))
			} else {
				w.Header().Set(k, v[0])
			}
		}
		_, err = w.Write(resp)
		if err != nil {
			return
		}
		// 也可以打印请求头，用于调试
		log.Printf("respHeaders: %v", respHeaders)

		// 调用下一个中间件或最终处理函数
		return
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

func (m *ProxyMiddleware) handleRequestHeaders(headers map[string]string, url string, body interface{}) ([]byte, http.Header) {
	proxyClient := resty.New().R()
	method := headers["method"]
	switch method {
	case "GET":
		response, _ := proxyClient.Get(url)
		return response.Body(), response.Header()
	case "POST":
		response, _ := proxyClient.SetBody(body).Post(url)
		return response.Body(), response.Header()
	case "PUT":
		response, _ := proxyClient.Put(url)
		return response.Body(), response.Header()
	case "DELETE":
		response, _ := proxyClient.Delete(url)
		return response.Body(), response.Header()
	case "PATCH":
		response, _ := proxyClient.Patch(url)
		return response.Body(), response.Header()
	case "HEAD":
		response, _ := proxyClient.Head(url)
		return response.Body(), response.Header()
	case "OPTIONS":
		response, _ := proxyClient.Options(url)
		return response.Body(), response.Header()
	default:
		return nil, nil
	}

}
