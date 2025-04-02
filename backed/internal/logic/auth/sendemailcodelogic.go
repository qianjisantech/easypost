package auth

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"backed/internal/utils/email"
	"context"
	"errors"
	"fmt"
	"gorm.io/gorm"
	"math/rand"
	"net/mail"
	"strings"
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
	checkEmail, err := l.CheckEmail(req.Email)
	if err != nil {
		return nil, errorx.NewDefaultError(err.Error())
	}
	if checkEmail {
		return nil, errorx.NewDefaultError("该邮箱已注册")
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
			Body:    "您好！欢迎使用EasyPost，你的验证码为：【" + code + "】",
		},
	}

	go func() {
		result := e.Send()
		if strings.Contains(result, "失败") {
			logx.Debug("邮件发送失败: %s", result)
			// 重试或告警逻辑
		}
	}()

	// 异步创建用户
	go func() {
		err := l.CreateOrUpdateUser(req.Email, code)
		if err != nil {
			// 记录错误日志
			logx.Debug(err.Error())
		}
	}()

	return &types.AuthEmailSendCodeResp{
		Success: true,
		Message: "验证码发送成功，请检查邮箱【" + req.Email + "】",
	}, nil
}

func (l *SendEmailCodeLogic) CreateOrUpdateUser(email string, code string) error {
	// 开启事务
	db := l.svcCtx.DB.Debug().Begin()

	// 查询用户是否存在，且 password 不为空
	var user model.SysUser
	err := db.Where("email = ?", email).Where("password IS NOT NULL").First(&user).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		// 用户不存在，创建用户
		username := strings.Split(email, "@")[0]

		sysUser := model.SysUser{
			Email:    &email,
			Code:     &code,
			Username: &username,
			Name:     &username,
		}

		fmt.Println("邮箱前缀:", username)

		if err := db.Create(&sysUser).Error; err != nil {
			db.Rollback()
			return fmt.Errorf("创建用户失败: %v", err)
		}

	} else if err == nil {
		// 用户存在，更新 code 字段
		if err := db.Model(&user).Update("code", code).Error; err != nil {
			db.Rollback()
			return fmt.Errorf("更新验证码失败: %v", err)
		}

	} else {
		// 发生其他数据库错误
		db.Rollback()
		return fmt.Errorf("查询用户失败: %v", err)
	}

	// 提交事务
	if err := db.Commit().Error; err != nil {
		db.Rollback()
		return fmt.Errorf("提交事务失败: %v", err)
	}

	return nil
}
func IsValidEmail(email string) bool {
	_, err := mail.ParseAddress(email)
	return err == nil
}
func (l *SendEmailCodeLogic) CheckEmail(email string) (bool, error) {
	isLegal := IsValidEmail(email)
	if !isLegal {
		return false, errorx.NewDefaultError("邮箱不合法")
	}
	db := l.svcCtx.DB.Debug()
	var sysUser *model.SysUser

	tx := db.Where("email = ?", email).First(&sysUser)
	if tx.Error != nil {
		if errors.Is(tx.Error, gorm.ErrRecordNotFound) {
			// 未找到记录，表示邮箱不存在
			return false, nil
		}
		// 查询出错
		return false, errorx.NewDefaultError(tx.Error.Error())
	}
	if sysUser.Password != nil && *sysUser.Password != "" {
		return true, nil
	} else {
		return false, nil
	}

}
