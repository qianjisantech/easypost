package am

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"context"
	"strconv"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ApiDeleteLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiDeleteLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiDeleteLogic {
	return &ApiDeleteLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiDeleteLogic) ApiDelete(req *types.ApiDeleteRequest) (resp *types.ApiDeleteResp, err error) {
	db := l.svcCtx.DB.Begin().Debug()
	id, err := strconv.ParseInt(req.Id, 10, 64)
	if err != nil {
		return nil, errorx.NewDefaultError(err.Error()) // 返回错误信息
	}

	// 查询数据库中的记录 (假设你有一个名为 `db` 的数据库实例)
	var amA model.AmAPI // 假设 ApiRecord 是一个模型结构体
	err = db.Where("id = ?", id).Delete(&amA).Error
	if err != nil {
		return nil, errorx.NewDefaultError(err.Error()) // 如果没有找到记录，返回错误
	}

	// 返回更新后的响应

	return &types.ApiDeleteResp{
		Success: true,
		Message: "删除成功",
	}, nil
}
