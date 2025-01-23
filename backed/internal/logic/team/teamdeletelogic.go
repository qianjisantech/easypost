package team

import (
	"context"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type TeamDeleteLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTeamDeleteLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TeamDeleteLogic {
	return &TeamDeleteLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TeamDeleteLogic) TeamDelete(req *types.TeamDeleteRequest) (resp *types.TeamDeleteResp, err error) {
	// todo: add your logic here and delete this line

	return
}
