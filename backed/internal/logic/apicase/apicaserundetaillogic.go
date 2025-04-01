package apicase

import (
	"context"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ApiCaseRunDetailLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiCaseRunDetailLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiCaseRunDetailLogic {
	return &ApiCaseRunDetailLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiCaseRunDetailLogic) ApiCaseRunDetail(req *types.ApiCaseRunDetailRequest) (resp *types.ApiCaseRunDetailResp, err error) {
	// todo: add your logic here and delete this line

	return
}
