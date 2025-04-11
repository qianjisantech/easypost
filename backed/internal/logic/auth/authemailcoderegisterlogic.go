package auth

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"backed/internal/svc"
	"backed/internal/types"
	"context"
	"github.com/emicklei/go-restful/v3/log"
	"strings"
	"time"

	"github.com/zeromicro/go-zero/core/logx"
)

var user = []string{"code"}

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
	if req.Email == "" {
		return nil, errorx.NewCodeError("邮箱不能为空")
	}
	if req.Code == "" {
		return nil, errorx.NewCodeError("验证码不能为空")
	}

	values, err := l.svcCtx.Redis.Hmget(req.Email, user...)
	// values 是 []string 类型
	if err != nil {
		return nil, errorx.NewCodeError("验证码格式无效")
	}
	log.Printf("redis 验证码%v", values[0])
	if values[0] != req.Code {
		return nil, errorx.NewCodeError("验证码不正确")
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
		err = l.svcCtx.Redis.Hmset(req.Email, map[string]string{
			"token": token,
		})
		err = l.svcCtx.Redis.Expire(req.Email, int(24*time.Hour))
		if err != nil {
			return nil, errorx.NewCodeError(err.Error())
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
