package apicase

import (
	"context"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ApiCaseDetailLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiCaseDetailLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiCaseDetailLogic {
	return &ApiCaseDetailLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiCaseDetailLogic) ApiCaseDetail(req *types.ApiCaseDetailRequest) (resp *types.ApiCaseDetailResp, err error) {
	// todo: add your logic here and delete this line

	return
}
