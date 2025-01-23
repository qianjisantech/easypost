package project

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"context"
	"log"
	"strconv"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ProjectDeleteLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewProjectDeleteLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ProjectDeleteLogic {
	return &ProjectDeleteLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ProjectDeleteLogic) ProjectDelete(req *types.ProjectDeleteRequest) (resp *types.ProjectDeleteResp, err error) {
	db := l.svcCtx.DB.Begin().Debug()
	// 转换 ID 为整型
	id, err := strconv.Atoi(req.Id)
	if err != nil {
		return nil, errorx.NewDefaultError(err.Error())
	}

	// 删除项目逻辑
	// 这里假设你使用 GORM 作为 ORM 库
	var project model.TeamProjectDetail
	if err := db.Delete(&project, id).Error; err != nil {
		return nil, errorx.NewDefaultError(err.Error())
	}
	if err := db.Commit().Error; err != nil {
		db.Rollback()
		log.Printf("Error committing transaction: %v", err)
		return nil, errorx.NewDefaultError("Error committing transaction")
	}
	return &types.ProjectDeleteResp{
		Code:    "200",
		Message: "删除成功",
	}, nil
}
