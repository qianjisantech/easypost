package logic

import (
	"context"
	"log"

	"github.com/zeromicro/go-zero/core/logx"
	"proxy/internal/svc"
)

type ApiProxyLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiProxyLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiProxyLogic {
	return &ApiProxyLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiProxyLogic) ApiProxy() (resp any, err error) {
	client := l.svcCtx.ProxyClient
	response, err := client.R().Post("https://www.baidu.com/")
	if err != nil {
		return nil, err
	}

	log.Printf("response HTML content (bytes): %s", response.Body())

	// 直接返回字节数组
	return response.Body(), nil
}
