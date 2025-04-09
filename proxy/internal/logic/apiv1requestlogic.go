package logic

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/zeromicro/go-zero/core/logx"
	"proxy/internal/svc"
)

const (
	URL            = "url"
	METHOD         = "method"
	HEADERS        = "headers"
	ApiH0Key       = "Api-H0"
	Body           = "body"
	ResponseWriter = "responseWriter"
)

type ApiV1RequestLogic struct {
	logx.Logger
	ctx      context.Context
	svcCtx   *svc.ServiceContext
	request  *http.Request
	response http.ResponseWriter
}

func NewApiV1RequestLogic(r *http.Request, w http.ResponseWriter, svcCtx *svc.ServiceContext) *ApiV1RequestLogic {
	return &ApiV1RequestLogic{
		Logger:   logx.WithContext(r.Context()),
		ctx:      r.Context(),
		svcCtx:   svcCtx,
		request:  r,
		response: w,
	}
}

func (l *ApiV1RequestLogic) ApiV1Request() (resp any, err error) {
	header := l.request.Header
	url := header.Get("Api-U")    //请求路径
	apio0 := header.Get("Api-O0") //请求方式 相关信息
	apiH0 := header.Get("Api-H0") //请求头
	apio0map := l.getRequestHeaders(apio0)
	body, _ := ioutil.ReadAll(l.request.Body)
	method := apio0map[METHOD] //请求头
	headers := l.getRequestHeaders(apiH0)
	httpHeaders := http.Header{}
	for k, v := range headers {
		httpHeaders.Set(k, v)
	}
	log.Printf("请求目标: 方法=%s, URL=%s", method, url)
	// 创建 HTTP 客户端（带超时）
	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	// 构造 HTTP 请求
	req, err := http.NewRequest(method, url, strings.NewReader(string(body)))
	if err != nil {
		return nil, fmt.Errorf("创建请求失败: %v", err)
	}

	// 设置请求头
	for key, values := range httpHeaders {
		for _, value := range values {
			req.Header.Add(key, value)
		}
	}

	// 执行请求
	startTime := time.Now()
	response, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("请求失败: %v", err)
	}
	defer response.Body.Close()
	// 记录响应时间
	latency := time.Since(startTime)
	log.Printf("响应状态: %d, 延迟: %v", response.StatusCode, latency)
	// 将 apiHo 数据塞到响应头里
	// 更新 apiHo 数据，使用实际响应状态码
	apiHo := map[string]string{
		"httpVersion": "HTTP/1.1",
		"statusCode":  strconv.Itoa(response.StatusCode), // 使用实际状态码
		"statusText":  response.Status,                   // 使用实际状态文本
		"timings":     latency.String(),
	}

	apiHoString := l.mapToKeyValueString(apiHo)
	if err != nil {
		return nil, fmt.Errorf("序列化 apiHo 失败: %v", err)
	}
	log.Printf("apiOo%v", apiHoString)
	// 直接设置到 ResponseWriter
	h := l.response.Header()
	h.Set("Api-O0", apiHoString)
	h.Set("Api-H0", l.mapHeaderValueString(response.Header))

	// 复制原始响应头
	for key, values := range response.Header {
		for _, value := range values {
			l.response.Header().Add(key, value)
		}
	}

	// 读取响应体
	responseBody, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, fmt.Errorf("读取响应体失败: %v", err)
	}

	// 尝试解析 JSON
	var jsonData interface{}
	if err := json.Unmarshal(responseBody, &jsonData); err == nil {
		log.Printf("JSON 响应: %+v", jsonData)
		return jsonData, nil
	}

	// 如果不是 JSON，返回原始响应体
	log.Printf("非 JSON 响应: %s", string(responseBody))

	return string(responseBody), nil
}
func (l *ApiV1RequestLogic) getRequestHeaders(apio0 string) map[string]string {
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
func (l *ApiV1RequestLogic) mapToKeyValueString(m map[string]string) string {
	var pairs []string
	for k, v := range m {
		pairs = append(pairs, fmt.Sprintf("%s=%s", k, v))
	}
	return strings.Join(pairs, ",")
}
func (l *ApiV1RequestLogic) mapHeaderValueString(headers http.Header) string {
	var pairs []string
	for k, v := range headers {
		pairs = append(pairs, fmt.Sprintf("%s=%s", k, v))
	}
	return strings.Join(pairs, ",")
}
