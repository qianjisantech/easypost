package auth

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"backed/internal/utils/md5"
	"context"
	"errors"
	"github.com/golang-jwt/jwt/v4"
	"gorm.io/gorm"
	"time"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type AuthEmailLoginLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewAuthEmailLoginLogic(ctx context.Context, svcCtx *svc.ServiceContext) *AuthEmailLoginLogic {
	return &AuthEmailLoginLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *AuthEmailLoginLogic) AuthEmailLogin(req *types.AuthEmailLoginReq) (resp *types.AuthEmailLoginResp, err error) {
	// 从数据库查找用户
	if req.Email == "" {
		return nil, errorx.NewDefaultError("邮箱不能为空")
	}
	if req.Password == "" {
		return nil, errorx.NewDefaultError("密码不能为空")
	}
	password := md5.Md5Hash(req.Password)
	user, err := l.QueryUserByEmailAndPassword(req.Email, password)
	if err != nil {
		logx.Infof("【QueryUserByEmailAndPassword】%s", err)
		return nil, errorx.NewDefaultError("用户名或者密码错误")
	}
	if user == nil {
		return nil, errorx.NewDefaultError("用户不存在")
	}
	// 生成 JWT token
	token, err := GenerateJWT(user.ID, *user.Username)
	if err != nil {
		return nil, errorx.NewDefaultError(err.Error())
	}

	return &types.AuthEmailLoginResp{
		Success: true,
		Message: "登录成功",
		Data: types.AuthEmailLoginData{
			AccessToken: token,
		},
	}, nil

}

func (l *AuthEmailLoginLogic) QueryUserByEmailAndPassword(email string, password string) (*model.SysUser, error) {
	db := l.svcCtx.DB.Debug()
	var user *model.SysUser

	// 查询数据库，获取用户信息
	err := db.Where("email=? AND password =? AND is_deleted=0", email, password).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			// 用户未找到的处理逻辑
			return nil, err
		}
		return nil, err
	}

	//// 比对密码
	//if err := bcrypt.CompareHashAndPassword([]byte(*user.Password), []byte(password)); err != nil {
	//	// 密码不匹配
	//	return nil, fmt.Errorf("invalid credentials")
	//}

	return user, nil
}

var secretKey = "easypost"

// generateJWT 生成 JWT Token
func GenerateJWT(userID int64, email string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"email":   email,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString([]byte(secretKey))
	if err != nil {
		return "", err
	}

	return signedToken, nil
}
