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

type SaveTabItemLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewSaveTabItemLogic(ctx context.Context, svcCtx *svc.ServiceContext) *SaveTabItemLogic {
	return &SaveTabItemLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *SaveTabItemLogic) SaveTabItem(req *types.SaveTabItemRequest) (resp *types.SaveTabItemsResp, err error) {

	userId := l.ctx.Value("userId").(int64)
	db := l.svcCtx.DB.Debug()
	tabStatusPtr := int32(req.TabItem.Data.TabStatus) // Convert int to int32
	tabStatus := &tabStatusPtr
	keyInt64, _ := strconv.ParseInt(req.TabItem.Key, 10, 64)
	at := &model.AmTab{
		ID:          keyInt64,
		CreateBy:    StringPointer("admin"),
		UpdateBy:    StringPointer("admin"),
		ProjectID:   &req.ProjectId,
		UserID:      userId,
		Label:       &req.TabItem.Label,
		ContentType: &req.TabItem.ContentType,
		Status:      tabStatus,
	}

	tx := db.Save(at)
	if tx.Error != nil {
		return nil, errorx.NewDefaultError(tx.Error.Error())
	}
	return &types.SaveTabItemsResp{
		Success: true,
		Message: "success",
	}, nil
}
func StringPointer(s string) *string {
	return &s
}
