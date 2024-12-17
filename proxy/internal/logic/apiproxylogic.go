package logic

import (
	"context"
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

	return
}
