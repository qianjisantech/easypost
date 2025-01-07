package project

import (
	"backed/gen/model"
	"context"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ProjectQueryPageLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewProjectQueryPageLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ProjectQueryPageLogic {
	return &ProjectQueryPageLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ProjectQueryPageLogic) ProjectQueryPage(req *types.ProjectQueryPageRequest) (resp *types.ProjectQueryPageResp, err error) {
	// todo: add your logic here and delete this line
	db := l.svcCtx.DB.Begin().Debug()

	var teamProjectDetail []*model.TeamProjectDetail

	tx := db.WithContext(l.ctx).Find(&teamProjectDetail)
	if tx.Error != nil {
		return nil, tx.Error
	}
	return
}
