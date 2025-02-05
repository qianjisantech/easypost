package project

import (
	"backed/gen/model"
	"context"
	"strconv"

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
	db := l.svcCtx.DB.Begin().Debug()

	teamId := req.TeamId
	var projects []*model.SysProject

	tx := db.WithContext(l.ctx).Where("team_id=?", teamId).Find(&projects)
	if tx.Error != nil {
		return nil, tx.Error
	}
	data := make([]*types.ProjectQueryPageData, len(projects))
	for i, teamProjectDetail := range projects {
		data[i] = &types.ProjectQueryPageData{
			Id:          strconv.FormatInt(teamProjectDetail.ID, 10),
			ProjectName: *teamProjectDetail.ProjectName,
			ProjectIcon: *teamProjectDetail.ProjectIcon,
			IsPublic:    *teamProjectDetail.IsPublic,
		}
	}
	return &types.ProjectQueryPageResp{
		Success: true,
		Message: "success",
		Data:    data,
	}, nil
}
