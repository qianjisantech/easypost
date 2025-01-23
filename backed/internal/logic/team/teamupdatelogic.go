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

type TeamUpdateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTeamUpdateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TeamUpdateLogic {
	return &TeamUpdateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TeamUpdateLogic) TeamUpdate(req *types.TeamUpdateRequest) (resp *types.TeamUpdateResp, err error) {
	// Initialize DB transaction with Debug for debugging purposes
	db := l.svcCtx.DB.Begin().Debug()

	// Parse the ID from string to int64
	id, err := strconv.ParseInt(req.Id, 10, 64)
	if err != nil {
		// Handle invalid ID format
		logx.Errorf("Invalid project ID: %v", err)
		db.Rollback() // Rollback the transaction on error
		return nil, errorx.NewDefaultError("Invalid project ID format")
	}
	// Prepare project data model
	m := &model.SysTeam{
		ID:   id,
		Name: &req.TeamName,
	}

	// Update the project details in the database
	tx := db.Model(m).Updates(m) // Use Updates() to update the fields
	if tx.Error != nil {
		// Rollback if there is an error in the update query
		logx.Errorf("Error updating project: %v", tx.Error)
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
	return &types.TeamUpdateResp{
		Code:    "200",
		Message: "更新成功",
	}, nil
}
