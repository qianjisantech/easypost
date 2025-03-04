package am

import (
	"context"

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
	// todo: add your logic here and delete this line

	return
}
