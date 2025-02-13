package team

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"context"
	"strconv"

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
	db := l.svcCtx.DB.Begin().Debug()

	teamId, err := strconv.ParseInt(req.Id, 10, 64)
	if err != nil {
		// Handle invalid ID format
		logx.Errorf("Invalid project ID: %v", err)
		db.Rollback() // Rollback the transaction on error
		return nil, errorx.NewDefaultError("Invalid project ID format")
	}
	// Prepare project data model

	tx := db.Delete(&model.SysTeam{}, teamId)
	sql := "delete from sys_user_team where team_id=?"
	tx = db.Raw(sql, teamId)
	if tx.Error != nil {
		logx.Errorf("Error query team: %v", tx.Error)
		db.Rollback()
		return nil, errorx.NewDefaultError(tx.Error.Error())
	}

	// Commit the transaction after successful update
	if err := db.Commit().Error; err != nil {
		// Rollback in case of commit failure
		logx.Errorf("Error committing transaction: %v", err)
		db.Rollback()
		return nil, errorx.NewDefaultError("Error committing transaction")
	}

	// Return success response
	return &types.TeamDeleteResp{
		Success: true,
		Message: "成功解散团队",
	}, nil
}
