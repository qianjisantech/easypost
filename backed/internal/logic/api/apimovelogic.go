package api

import (
	"context"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ApiMoveLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiMoveLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiMoveLogic {
	return &ApiMoveLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiMoveLogic) ApiMove(req *types.ApiMoveRequest) (resp *types.ApiMoveResp, err error) {
	// todo: add your logic here and delete this line

	return
}
