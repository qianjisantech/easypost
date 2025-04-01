package apicase

import (
	"context"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ApiCaseDetailCreateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiCaseDetailCreateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiCaseDetailCreateLogic {
	return &ApiCaseDetailCreateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiCaseDetailCreateLogic) ApiCaseDetailCreate(req *types.ApiCaseDetailCreateOrUpdateRequest) (resp *types.ApiCaseDetailCreateOrUpdateResp, err error) {
	// todo: add your logic here and delete this line

	return
}
