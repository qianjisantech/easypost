package logic

import (
	"context"
	"encoding/json"
	vegeta "github.com/tsenart/vegeta/v12/lib"
	"log"
	"net/http"
	"proxy/internal/middleware"
	"time"

	"github.com/zeromicro/go-zero/core/logx"
	"proxy/internal/svc"
)

type ApiV1RequestLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}
type AttackResponse struct {
	TotalRequests int     `json:"total_requests"`
	SuccessRatio  float64 `json:"success_ratio"`
	MeanLatency   string  `json:"mean_latency"`
	MaxLatency    string  `json:"max_latency"`
	P99Latency    string  `json:"p99_latency"`
}

func NewApiV1RequestLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiV1RequestLogic {
	return &ApiV1RequestLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiV1RequestLogic) ApiV1Request() (resp any, err error) {
	// 从 context 获取中间件存入的值
	url, _ := l.ctx.Value(middleware.URL).(string)
	method, _ := l.ctx.Value(middleware.METHOD).(string)
	body, _ := l.ctx.Value(middleware.Body).(string)
	headers, _ := l.ctx.Value(middleware.HEADERS).(http.Header)

	// 设置每秒 1 个请求
	rate := vegeta.Rate{Freq: 1, Per: time.Second}

	// 运行 1 秒
	duration := 1 * time.Second

	// 目标请求
	targeter := vegeta.NewStaticTargeter(vegeta.Target{
		Method: method,
		URL:    url,
		Body:   []byte(body),
		Header: headers,
	})
	log.Printf("请求信息: %s", targeter)
	// 创建攻击者
	attacker := vegeta.NewAttacker()

	// 运行攻击并收集结果
	var apiresp []map[string]any

	for res := range attacker.Attack(targeter, rate, duration, "Load Test") {
		var jsonData map[string]any
		if err := json.Unmarshal(res.Body, &jsonData); err != nil {
			logx.Errorf("JSON 解析失败: %v", err)
			continue
		}
		log.Printf("返回信息: %s", res)
		apiresp = append(apiresp, jsonData)
	}

	return apiresp, nil
}
