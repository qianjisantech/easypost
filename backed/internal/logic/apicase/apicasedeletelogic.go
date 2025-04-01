package apicase

import (
	"context"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ApiCaseDeleteLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiCaseDeleteLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiCaseDeleteLogic {
	return &ApiCaseDeleteLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiCaseDeleteLogic) ApiCaseDelete(req *types.ApiCaseDeleteRequest) (resp *types.ApiCaseDeleteResp, err error) {
	// todo: add your logic here and delete this line

	return
}
