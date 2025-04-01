package folder

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"backed/internal/middleware"
	"context"
	"log"
	"strconv"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type FolderDetailSaveLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewFolderDetailSaveLogic(ctx context.Context, svcCtx *svc.ServiceContext) *FolderDetailSaveLogic {
	return &FolderDetailSaveLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *FolderDetailSaveLogic) FolderDetailSave(req *types.FolderDetailSaveRequest) (resp *types.FolderDetailSaveResp, err error) {
	db := l.svcCtx.DB.Begin().Debug()
	contentInfo := l.ctx.Value("contentInfo").(*middleware.ContentInfo)
	projectId := contentInfo.ProjectId
	folderId, _ := strconv.ParseInt(req.Id, 10, 64)
	amFolder := &model.AmFolder{
		Name:     &req.Name,
		ParentID: &folderId,
	}
	if req.Id != "" {
		id, err := strconv.Atoi(req.Id)
		if err != nil {
			return nil, errorx.NewDefaultError("invalid ID format ")
		}
		amFolder.ID = int64(id)
	}
	if req.Description != "" {
		amFolder.Remark = &req.Description
	}

	amFolder.ProjectID = &projectId
	// 执行数据库操作
	tx := db.Save(amFolder)
	if tx.Error != nil {
		db.Rollback()
		return nil, errorx.NewDefaultError("创建目录失败 ")
	}
	// 提交事务
	if err := db.Commit().Error; err != nil {
		db.Rollback()
		log.Printf("Error committing transaction: %v", err)
		return nil, errorx.NewDefaultError("Error committing transaction")
	}
	// 返回成功响应
	return &types.FolderDetailSaveResp{
		Success: true,
		Message: "保存成功",
	}, nil
}
