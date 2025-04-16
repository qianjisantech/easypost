package api

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"context"
	"strconv"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ApiRenameLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiRenameLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiRenameLogic {
	return &ApiRenameLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiRenameLogic) ApiRename(req *types.ApiRenameRequest) (resp *types.ApiRenameResp, err error) {
	db := l.svcCtx.DB.Begin().Debug()
	// 将 id 从字符串转换为 int64
	id, err := strconv.ParseInt(req.Id, 10, 64)
	if err != nil {
		return nil, errorx.NewDefaultError(err.Error()) // 返回错误信息
	}

	// 查询数据库中的记录 (假设你有一个名为 `db` 的数据库实例)
	var amA model.AmsAPI // 假设 ApiRecord 是一个模型结构体
	err = db.Where("id = ?", id).First(&amA).Error
	if err != nil {
		return nil, errorx.NewDefaultError(err.Error()) // 如果没有找到记录，返回错误
	}

	// 更新 name 字段
	amA.Name = &req.Name // 假设 Name 是需要更新的字段
	err = db.Save(&amA).Error
	if err != nil {
		return nil, errorx.NewDefaultError(err.Error()) // 更新失败时返回错误
	}

	// 返回更新后的响应

	return &types.ApiRenameResp{
		Success: true,
		Message: "重命名成功",
	}, nil
}
