package doc

import (
	"backed/gen/model"
	"context"
	"strconv"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type DocDetailLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewDocDetailLogic(ctx context.Context, svcCtx *svc.ServiceContext) *DocDetailLogic {
	return &DocDetailLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *DocDetailLogic) DocDetail(req *types.DocDetailRequest) (resp *types.DocDetailResp, err error) {
	id, err := strconv.ParseInt(strconv.Itoa(req.Id), 10, 64)
	db := l.svcCtx.DB.Debug()
	var amDoc *model.AmsDoc
	tx := db.First(&amDoc, id)
	if tx.Error != nil {
		logx.Errorf("Error query team: %v", tx.Error)
		return nil, tx.Error
	}
	return &types.DocDetailResp{
		Success: true,
		Message: "success",
		Data: types.DocDetailData{
			Id:      strconv.FormatInt(amDoc.ID, 10),
			Name:    *amDoc.Name,
			Content: *amDoc.Content,
		},
	}, nil
}
