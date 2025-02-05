package api

import (
	"context"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ApiRecycleGroupQueryLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiRecycleGroupQueryLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiRecycleGroupQueryLogic {
	return &ApiRecycleGroupQueryLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiRecycleGroupQueryLogic) ApiRecycleGroupQuery(req *types.ApiRecycleGroupQueryRequest) (resp *types.ApiRecycleGroupQueryResp, err error) {
	// todo: add your logic here and delete this line

	return &types.ApiRecycleGroupQueryResp{
		Success: true,
		Message: "查询成功",
	}, nil
}
