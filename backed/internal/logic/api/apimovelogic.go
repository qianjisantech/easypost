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

type ApiMoveLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiMoveLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiMoveLogic {
	return &ApiMoveLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiMoveLogic) ApiMove(req *types.ApiMoveRequest) (resp *types.ApiMoveResp, err error) {
	db := l.svcCtx.DB.Begin().Debug()
	if req.ParentId == "" {
		return nil, errorx.NewDefaultError("ParentId不能为空")
	}
	if req.Id == "" {
		return nil, errorx.NewDefaultError("Id不能为空")
	}

	id, _ := strconv.ParseInt(req.Id, 10, 64)
	var parentId int64
	if req.ParentId == "_" {
		parentId = 0
	} else {
		parentId, _ = strconv.ParseInt(req.ParentId, 10, 64)
	}

	amApi := &model.AmsAPI{
		ID:       id,
		ParentID: &parentId,
	}
	if req.ParentId == "_" {

	}
	if err := db.Model(&amApi).Select("parent_id").Updates(amApi).Error; err != nil {
		db.Rollback()
		return nil, errorx.NewDefaultError("移动接口位置失败")
	}

	//// 提交事务
	if err := db.Commit().Error; err != nil {
		db.Rollback()
		return nil, errorx.NewDefaultError("提交事务失败")
	}
	return &types.ApiMoveResp{
		Success: true,
		Message: "移动成功",
	}, nil
}
