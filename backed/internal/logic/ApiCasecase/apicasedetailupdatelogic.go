package ApiCasecase

import (
	"context"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ApiCaseDetailUpdateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiCaseDetailUpdateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiCaseDetailUpdateLogic {
	return &ApiCaseDetailUpdateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiCaseDetailUpdateLogic) ApiCaseDetailUpdate(req *types.ApiCaseDetailCreateOrUpdateRequest) (resp *types.ApiCaseDetailCreateOrUpdateResp, err error) {
	// todo: add your logic here and delete this line

	return
}
