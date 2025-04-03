package auth

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"backed/internal/svc"
	"backed/internal/types"
	"context"
	"strings"

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
	tx := db.Where("email = ?", req.Email).Where("password IS NOT NULL").First(&sysUser)
	if tx.Error != nil {
		logx.Debugf("用户尚未注册%v", tx.Error)
	}
	code, err := l.svcCtx.Redis.Get(req.Email)
	if err != nil {
		return nil, errorx.NewCodeError(err.Error())
	}
	if code == "" {
		return nil, errorx.NewCodeError("验证码已过期")
	}
	if code != req.Code {
		return nil, errorx.NewCodeError("验证码不正确!")
	}
	sysUser.Email = &req.Email
	username := strings.Split(req.Email, "@")[0]
	sysUser.Username = &username
	sysUser.Name = &username
	//通过code校验 创建用户
	tx = db.Create(sysUser)
	_, err = l.svcCtx.Redis.Del(req.Email)

	if tx.Error != nil {
		logx.Debugf("创建用户出错%v", tx.Error)
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
