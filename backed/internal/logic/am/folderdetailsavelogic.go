package am

import (
	"context"

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
	// todo: add your logic here and delete this line

	return
}
