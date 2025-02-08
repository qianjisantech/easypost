package auth

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"context"
	"errors"
	"github.com/golang-jwt/jwt/v4"
	"gorm.io/gorm"
	"strconv"
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

func (l *AuthEmailLoginLogic) AuthEmailLogin(req *types.AuthEmailLoginReq) (resp *types.AuthEmailLoginResponse, err error) {
	// 从数据库查找用户

	user, err := l.QueryUserByEmailAndPassword(req.Email, req.Password)
	if err != nil {
		logx.Infof("【QueryUserByEmailAndPassword】%s", err)
		return nil, errorx.NewDefaultError("用户名或者密码错误")
	}
	if user == nil {
		return nil, errorx.NewDefaultError("用户不存在")
	}
	// 生成 JWT token
	token, err := generateJWT(user.ID, *user.Email)
	if err != nil {
		return nil, errorx.NewDefaultError(err.Error())
	}

	return &types.AuthEmailLoginResponse{
		Success: true,
		Message: "登录成功",
		Data: types.AuthEmailLoginData{
			AccessToken: token,
			UserId:      strconv.FormatInt(user.ID, 10),
			Username:    *user.Username,
			Name:        *user.Name,
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
func generateJWT(userID int64, email string) (string, error) {
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
