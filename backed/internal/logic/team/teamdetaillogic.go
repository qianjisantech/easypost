package team

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"backed/internal/middleware"
	"context"
	"strconv"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type TeamDetailLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTeamDetailLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TeamDetailLogic {
	return &TeamDetailLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TeamDetailLogic) TeamDetail(req *types.TeamDetailRequest) (resp *types.TeamDetailResp, err error) {
	contentInfo := l.ctx.Value("contentInfo").(*middleware.ContentInfo)
	userId := contentInfo.UserId
	db := l.svcCtx.DB.Begin().Debug()

	id, err := strconv.ParseInt(req.Id, 10, 64)
	if err != nil {
		logx.Errorf("Invalid project ID: %v", err)
		db.Rollback() // Rollback the transaction on error
		return nil, errorx.NewDefaultError("Invalid project ID format")
	}
	var team model.SysTeam
	tx := db.First(&team, id)
	if tx.Error != nil {
		logx.Errorf("Error query team: %v", tx.Error)
		db.Rollback()
		return nil, errorx.NewDefaultError(tx.Error.Error())
	}
	var sysTeamUser model.SysTeamMember
	tx = db.Where("user_id=?", userId).First(&sysTeamUser)

	if err := db.Commit().Error; err != nil {
		logx.Errorf("Error committing transaction: %v", err)
		db.Rollback()
		return nil, errorx.NewDefaultError("Error committing transaction")
	}
	permission := 0
	if sysTeamUser.Permission != nil {
		permission = int(*sysTeamUser.Permission) // 先解引用，再转换类型
	}

	return &types.TeamDetailResp{
		Success: true,
		Message: "success",
		Data: types.TeamDetailData{
			TeamId:         strconv.FormatInt(team.ID, 10),
			TeamName:       *team.Name,
			TeamPermission: permission,
		},
	}, nil
}
