package ApiCasecase

import (
	"context"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ApiCaseMoveLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiCaseMoveLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiCaseMoveLogic {
	return &ApiCaseMoveLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiCaseMoveLogic) ApiCaseMove(req *types.ApiCaseMoveRequest) (resp *types.ApiCaseMoveResp, err error) {
	// todo: add your logic here and delete this line

	return
}
