package user

import (
	"backed/gen/model"
	"backed/internal/utils/md5"
	"context"
	"errors"
	"gorm.io/gorm"
	"log"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UserSetPasswordLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUserSetPasswordLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UserSetPasswordLogic {
	return &UserSetPasswordLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UserSetPasswordLogic) UserSetPassword(req *types.UserSetPasswordRequest) (*types.UserSetPasswordResp, error) {
	userId, ok := l.ctx.Value("userId").(int64)
	if !ok {
		return nil, errors.New("无法获取用户 ID")
	}

	// 开启事务
	db := l.svcCtx.DB.Begin()
	if db.Error != nil {
		return nil, errors.New("数据库事务开启失败")
	}

	// 查询用户
	var user model.SysUser
	if err := db.Where("id = ?", userId).First(&user).Error; err != nil {
		db.Rollback()
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("用户不存在")
		}
		return nil, err
	}

	// MD5 加密密码
	hashedPassword := md5.Md5Hash(req.Password)

	// 更新密码
	if err := db.Model(&user).Update("password", hashedPassword).Error; err != nil {
		db.Rollback()
		return nil, err
	}

	// 提交事务
	if err := db.Commit().Error; err != nil {
		db.Rollback()
		log.Printf("Error committing transaction: %v", err)
		return nil, err
	}

	return &types.UserSetPasswordResp{
		Success: true,
		Message: "密码设置成功",
	}, nil
}
