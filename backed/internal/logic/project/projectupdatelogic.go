package project

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"backed/internal/svc"
	"backed/internal/types"
	"context"
	"strconv"

	"github.com/zeromicro/go-zero/core/logx"
)

type ProjectUpdateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewProjectUpdateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ProjectUpdateLogic {
	return &ProjectUpdateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ProjectUpdateLogic) ProjectUpdate(req *types.ProjectUpdateRequest) (*types.ProjectUpdateResp, error) {
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

	// Get a random icon for the project
	icon := GetRandomString(icons)

	// Prepare project data model
	m := &model.SysProject{
		ID:          id,
		ProjectName: &req.ProjectName,
		IsPublic:    &req.IsPublic,
		ProjectIcon: &icon,
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
	return &types.ProjectUpdateResp{
		Success: true,
		Message: "更新成功",
	}, nil
}
