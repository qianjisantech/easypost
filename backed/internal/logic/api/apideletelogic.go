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
	db := l.svcCtx.DB.Debug()
	if req.Id == "" {
		return nil, errorx.NewCodeError("id不能为空")
	}

	id, err := strconv.ParseInt(req.Id, 10, 64)
	if err != nil {
		return nil, errorx.NewDefaultError(err.Error()) // 返回错误信息
	}
	err = db.Model(&model.AmAPI{}).Where("id = ?", id).Update("is_deleted", 1).Error
	if err != nil {
		return nil, errorx.NewDefaultError(err.Error()) // 如果没有找到记录，返回错误
	}

	// 返回更新后的响应

	return &types.ApiDeleteResp{
		Success: true,
		Message: "删除成功",
	}, nil
}
