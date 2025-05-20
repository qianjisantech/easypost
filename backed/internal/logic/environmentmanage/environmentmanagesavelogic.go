package environmentmanage

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

type EnvironmentManageSaveLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewEnvironmentManageSaveLogic(ctx context.Context, svcCtx *svc.ServiceContext) *EnvironmentManageSaveLogic {
	return &EnvironmentManageSaveLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *EnvironmentManageSaveLogic) EnvironmentManageSave(req *types.EnvironmentManageSaveRequest) (resp *types.EnvironmentManageSaveResp, err error) {
	// 开启事务
	db := l.svcCtx.DB.Begin().Debug()
	contentInfo := l.ctx.Value("contentInfo").(*middleware.ContentInfo)
	projectId := contentInfo.ProjectId
	amEnvironmentManage := &model.AmsEnvironmentManage{
		GlobalVariable:      &req.GlobalVariable,
		GlobalParameter:     &req.GlobalParameter,
		KeyStores:           &req.KeyStores,
		EnvironmentSettings: &req.EnvironmentSettings,
		LocalMock:           &req.LocalMock,
		CloudMock:           &req.CloudMock,
		SelfHostMock:        &req.SelfHostMock,
		ProjectID:           &projectId,
	}

	// 判断是创建还是更新
	if req.Id != "" {
		// 更新文档
		id, err := strconv.ParseInt(req.Id, 10, 64)
		if err != nil {
			db.Rollback()
			return nil, errorx.NewCodeError("ID 解析失败: " + err.Error())
		}
		amEnvironmentManage.ID = id
	}
	if err := db.Save(amEnvironmentManage).Error; err != nil {
		db.Rollback()
		return nil, errorx.NewDefaultError("环境保存失败: " + err.Error())
	}

	// 提交事务
	if err := db.Commit().Error; err != nil {
		db.Rollback()
		logx.Debug("事务提交失败: %v", err)
		return nil, errorx.NewDefaultError("事务提交失败: " + err.Error())
	}

	// 返回成功响应
	return &types.EnvironmentManageSaveResp{
		Success: true,
		Message: "保存成功",
	}, nil
}
