package auth

import (
	"backed/internal/svc"
	"backed/internal/types"
	"context"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetQRCodeLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewGetQRCodeLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetQRCodeLogic {
	return &GetQRCodeLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetQRCodeLogic) GetQRCode() (resp *types.GetQRCodeResp, err error) {
	// todo: add your logic here and delete this line
	//var client = lark.NewClient("appID", "appSecret", // 默认配置为自建应用
	//	// lark.WithMarketplaceApp(), // 可设置为商店应用
	//	lark.WithLogLevel(larkcore.LogLevelDebug),
	//	lark.WithReqTimeout(3*time.Second),
	//	lark.WithEnableTokenCache(true),
	//	lark.WithHelpdeskCredential("id", "token"),
	//	lark.WithHttpClient(http.DefaultClient))
	return
}
