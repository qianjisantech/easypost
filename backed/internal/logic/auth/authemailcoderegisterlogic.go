package auth

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"context"
	"errors"
	"gorm.io/gorm"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type AuthEmailCodeRegisterLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewAuthEmailCodeRegisterLogic(ctx context.Context, svcCtx *svc.ServiceContext) *AuthEmailCodeRegisterLogic {
	return &AuthEmailCodeRegisterLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *AuthEmailCodeRegisterLogic) AuthEmailCodeRegister(req *types.AuthEmailCodeRegisterReq) (resp *types.AuthEmailCodeRegisterResp, err error) {
	db := l.svcCtx.DB.Debug()
	var sysUser *model.SysUser
	tx := db.Where("email = ?", req.Email).Where("code=?", req.Code).First(&sysUser)
	if tx.Error != nil {
		if errors.Is(tx.Error, gorm.ErrRecordNotFound) {
			return nil, errorx.NewDefaultError("邮箱尚未注册或者验证码错误")
		}
		return nil, errorx.NewDefaultError(tx.Error.Error())
	}
	if sysUser != nil {
		token, err := GenerateJWT(sysUser.ID, *sysUser.Username, *sysUser.Email)
		if err != nil {
			return nil, errorx.NewDefaultError(err.Error())
		}
		needSetPassword := new(bool)
		if sysUser.Password == nil || *sysUser.Password == "" {
			*needSetPassword = true // 如果没有设置密码
		} else {
			*needSetPassword = false // 如果已经设置密码
		}

		return &types.AuthEmailCodeRegisterResp{
			Success: true,
			Message: "登录成功",
			Data: types.AuthEmailCodeRegisterData{
				AccessToken:     token,
				NeedSetPassword: *needSetPassword,
			},
		}, nil
	} else {
		return nil, errorx.NewDefaultError("邮箱尚未注册或者验证码错误")
	}
}
