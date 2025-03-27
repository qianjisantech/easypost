package tab

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"context"
	"strconv"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type RemoveTabItemLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewRemoveTabItemLogic(ctx context.Context, svcCtx *svc.ServiceContext) *RemoveTabItemLogic {
	return &RemoveTabItemLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *RemoveTabItemLogic) RemoveTabItem(req *types.RemoveTabItemRequest) (resp *types.RemoveTabItemResp, err error) {
	db := l.svcCtx.DB.Begin().Debug()
	if req.Id == "newCatalog" {
		return nil, errorx.NewDefaultError("新建列表无法删除")
	}
	id, _ := strconv.ParseInt(req.Id, 10, 64)

	tx := db.Delete(&model.AmTab{}, id)
	if tx.Error != nil {
		return nil, errorx.NewCodeError(tx.Error.Error())
	}

	return &types.RemoveTabItemResp{
		Success: true,
		Message: "success",
	}, nil
}
