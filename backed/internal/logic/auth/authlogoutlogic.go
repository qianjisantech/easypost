package auth

import (
	"backed/internal/common/errorx"
	"backed/internal/middleware"
	"context"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type AuthLogoutLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewAuthLogoutLogic(ctx context.Context, svcCtx *svc.ServiceContext) *AuthLogoutLogic {
	return &AuthLogoutLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *AuthLogoutLogic) AuthLogout() (resp *types.AuthLogoutResp, err error) {
	contentInfo := l.ctx.Value("contentInfo").(*middleware.ContentInfo)
	email := contentInfo.Email
	_, err = l.svcCtx.Redis.Del(email)
	if err != nil {
		return nil, errorx.NewDefaultError(err.Error())
	}

	return &types.AuthLogoutResp{
		Success: true,
		Message: "退出登录成功",
	}, nil

}
