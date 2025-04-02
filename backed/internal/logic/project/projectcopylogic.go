package project

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"backed/internal/svc"
	"backed/internal/types"
	"context"

	"github.com/zeromicro/go-zero/core/logx"
)

type ProjectCopyLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewProjectCopyLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ProjectCopyLogic {
	return &ProjectCopyLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ProjectCopyLogic) ProjectCopy(req *types.ProjectCopyRequest) (resp *types.ProjectCopyResp, err error) {
	// 从数据库开始事务
	db := l.svcCtx.DB.Begin().Debug()
	var project model.SysProject
	err = db.First(&project, req.Id).Error
	if err != nil {
		db.Rollback()
		return nil, errorx.NewDefaultError(err.Error())
	}
	// 获取随机图标
	icon := GetRandomString(icons)
	CopyProjectName := *project.ProjectName + "copy"
	// 创建项目数据模型
	m := &model.SysProject{
		ProjectName: &CopyProjectName,
		IsPublic:    project.IsPublic,
		ProjectIcon: &icon,
	}

	// 执行数据库操作
	tx := db.Create(m)
	if tx.Error != nil {
		db.Rollback()
		return nil, errorx.NewDefaultError(tx.Error.Error())
	}
	if err := db.Commit().Error; err != nil {
		db.Rollback()
		logx.Debug("Error committing transaction: %v", err)
		return nil, errorx.NewDefaultError("Error committing transaction")
	}
	// 返回成功响应
	return &types.ProjectCopyResp{
		Success: true,
		Message: "复制成功",
	}, nil
}
