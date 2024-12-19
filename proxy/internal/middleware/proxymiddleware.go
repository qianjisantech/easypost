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
		apiu := r.Header.Get("Api-U")   //请求路径
		apio0 := r.Header.Get("Api-O0") //请求方式
		apiH0 := r.Header.Get("Api-H0") //请求头
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			logx.WithContext(r.Context()).Errorf("Failed to read request body: %v", err)
		}
		//分解请求头
		resp, respHeaders := m.handleRequestHeaders(apiu, apio0, apiH0, body) //发送请求

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

func (m *ProxyMiddleware) handleRequestHeaders(apiU string, apio0 string, apiH0 string, body interface{}) ([]byte, http.Header) {
	apio0Handle := m.getRequestHeaders(apio0)
	apiH0Handle := m.getRequestHeaders(apiH0)
	proxyClient := resty.New().R().SetHeaders(apiH0Handle)
	method := apio0Handle["method"]
	switch method {
	case "GET":
		response, _ := proxyClient.Get(apiU)
		return response.Body(), response.Header()
	case "POST":
		response, _ := proxyClient.SetBody(body).Post(apiU)
		log.Printf("response.Body() %s", response.Body())
		return response.Body(), response.Header()
	case "PUT":
		response, _ := proxyClient.SetBody(body).Put(apiU)
		return response.Body(), response.Header()
	case "DELETE":
		response, _ := proxyClient.Delete(apiU)
		return response.Body(), response.Header()
	case "PATCH":
		response, _ := proxyClient.Patch(apiU)
		return response.Body(), response.Header()
	case "HEAD":
		response, _ := proxyClient.Head(apiU)
		return response.Body(), response.Header()
	case "OPTIONS":
		response, _ := proxyClient.Options(apiU)
		return response.Body(), response.Header()
	default:
		return nil, nil
	}

}
