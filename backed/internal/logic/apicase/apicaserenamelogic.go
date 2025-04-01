package apicase

import (
	"context"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ApiCaseRenameLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiCaseRenameLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiCaseRenameLogic {
	return &ApiCaseRenameLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiCaseRenameLogic) ApiCaseRename(req *types.ApiCaseRenameRequest) (resp *types.ApiCaseRenameResp, err error) {
	// todo: add your logic here and delete this line

	return
}
