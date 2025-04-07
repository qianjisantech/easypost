package auth

import (
	"backed/internal/common/errorx"
	"backed/internal/utils/email"
	"context"
	"fmt"
	"math/rand"
	"net/mail"
	"time"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type SendEmailCodeLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewSendEmailCodeLogic(ctx context.Context, svcCtx *svc.ServiceContext) *SendEmailCodeLogic {
	return &SendEmailCodeLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *SendEmailCodeLogic) SendEmailCode(req *types.AuthEmailSendCodeReq) (resp *types.AuthEmailSendCodeResp, err error) {
	if req.Email == "" {
		return nil, errorx.NewDefaultError("邮箱不能为空")
	}
	//if !strings.HasSuffix(req.Email, "@jtexpress.com") {
	//	return nil, errorx.NewDefaultError("请使用公司邮箱注册！")
	//}
	err = l.ValidEmail(req.Email)
	if err != nil {
		return nil, errorx.NewDefaultError(err.Error())
	}

	rand.Seed(time.Now().UnixNano())
	code := fmt.Sprintf("%06d", rand.Intn(1000000))
	e := email.Email{
		From: email.From{
			Host:     l.svcCtx.Config.Email.Host,
			Port:     l.svcCtx.Config.Email.Port,
			Username: l.svcCtx.Config.Email.Username,
			Password: l.svcCtx.Config.Email.Password,
		},
		To: email.To{
			Host: req.Email,
		},
		Content: email.Content{
			Subject: "EasyPost邮箱登录验证码",
			Body:    "您好！欢迎使用EasyPost，你的验证码为：【" + code + "】,验证码在5分钟以内有效",
		},
	}

	err = l.SetHashToRedis(req.Email, map[string]string{
		"code": code,
	}, 5*time.Minute)
	if err != nil {
		// 记录错误日志
		logx.Debug(err.Error())
		return nil, errorx.NewCodeError(err.Error())
	}

	return &types.AuthEmailSendCodeResp{
		Success: true,
		Message: e.Send(),
	}, nil
}

//校验邮箱的合法性

func (l *SendEmailCodeLogic) ValidEmail(email string) error {
	_, err := mail.ParseAddress(email)
	if err != nil {
		return errorx.NewDefaultError("邮箱不合法")
	}
	return nil
}

func (l *SendEmailCodeLogic) SetHashToRedis(key string, fields map[string]string, expiration time.Duration) error {
	err := l.svcCtx.Redis.Hmset(key, fields)
	if err != nil {
		return err
	}
	if expiration > 0 {
		err := l.svcCtx.Redis.Expire(key, int(expiration.Seconds()))
		if err != nil {
			return err
		}
	}
	return nil
}
