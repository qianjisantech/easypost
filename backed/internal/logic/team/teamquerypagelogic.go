package team

import (
	"backed/gen/model"
	"context"
	"strconv"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type TeamQueryPageLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTeamQueryPageLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TeamQueryPageLogic {
	return &TeamQueryPageLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TeamQueryPageLogic) TeamQueryPage(req *types.TeamQueryPageRequest) (resp *types.TeamQueryPageResp, err error) {
	db := l.svcCtx.DB.Begin().Debug()
	var sysTeams []*model.SysTeam

	tx := db.WithContext(l.ctx).Find(&sysTeams)
	if tx.Error != nil {
		return nil, tx.Error
	}
	data := make([]*types.TeamQueryPageData, len(sysTeams))
	for i, sysTeam := range sysTeams {
		data[i] = &types.TeamQueryPageData{
			Id:       strconv.FormatInt(sysTeam.ID, 10),
			TeamName: *sysTeam.Name,
		}
	}
	return &types.TeamQueryPageResp{
		Code:    "200",
		Message: "success",
		Data:    data,
	}, nil
}
