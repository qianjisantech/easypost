package folder

import (
	"backed/gen/model"
	"context"
	"strconv"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type FolderDetailLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewFolderDetailLogic(ctx context.Context, svcCtx *svc.ServiceContext) *FolderDetailLogic {
	return &FolderDetailLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *FolderDetailLogic) FolderDetail(req *types.FolderDetailRequest) (resp *types.FolderDetailResp, err error) {
	db := l.svcCtx.DB.Debug()

	id, err := strconv.ParseInt(req.Id, 10, 64)
	var amFolder *model.AmFolder
	tx := db.First(&amFolder, id)
	if tx.Error != nil {
		logx.Errorf("Error query team: %v", tx.Error)
		return nil, tx.Error
	}
	folderType := "apiFolder"
	return &types.FolderDetailResp{
		Success: true,
		Message: "success",
		Data: types.FolderDetailRespData{
			Id:          strconv.FormatInt(amFolder.ID, 10),
			Name:        *amFolder.Name,
			Type:        folderType,
			Description: *amFolder.Remark,
		},
	}, nil
}
