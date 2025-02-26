package user

import (
	"context"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UserActionsLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUserActionsLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UserActionsLogic {
	return &UserActionsLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UserActionsLogic) UserActions(req *types.UserActionsRequest) (resp *types.UserActionsResp, err error) {
	// todo: add your logic here and delete this line

	return
}
