package ApiCasecase

import (
	"context"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ApiCaseCopyLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiCaseCopyLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiCaseCopyLogic {
	return &ApiCaseCopyLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiCaseCopyLogic) ApiCaseCopy(req *types.ApiCaseCopyRequest) (resp *types.ApiCaseCopyResp, err error) {
	// todo: add your logic here and delete this line

	return
}
