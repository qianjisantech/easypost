package user

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"context"
	"math"
	"strconv"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UserQueryPageLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUserQueryPageLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UserQueryPageLogic {
	return &UserQueryPageLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UserQueryPageLogic) UserQueryPage(req *types.UserQueryPageRequest) (resp *types.UserQueryPageResp, err error) {
	db := l.svcCtx.DB.Debug()

	// 校验请求参数（如果有）
	if req.PageSize <= 0 || req.Current <= 0 {
		return nil, errorx.NewDefaultError("invalid pagination parameters")
	}

	// 设置分页查询参数
	offset := (req.Current - 1) * req.PageSize

	var users []model.SysUser
	var total int64

	// 查询总记录数
	if err := db.Model(&model.SysUser{}).Count(&total).Error; err != nil {
		return nil, errorx.NewDefaultError(err.Error())
	}

	// 执行分页查询
	if err := db.Model(&model.SysUser{}).
		Limit(req.PageSize).
		Offset(offset).
		Find(&users).
		Error; err != nil {
		return nil, errorx.NewDefaultError(err.Error())
	}

	// 将 SysUser 转换成 UserQueryPageDataRecord
	records := make([]*types.UserQueryPageDataRecord, len(users))
	for i, user := range users {
		records[i] = &types.UserQueryPageDataRecord{
			Id:       strconv.FormatInt(user.ID, 10),
			Username: *user.Username,
			Name:     *user.Name,
			Email:    *user.Email,
		}
	}

	// 构建返回的响应
	resp = &types.UserQueryPageResp{
		Code:    "200",
		Message: "success",
		Data: types.UserQueryPageData{
			Current:    int64(req.Current),
			PageSize:   int64(req.PageSize),
			TotalPages: int64(math.Ceil(float64(total) / float64(req.PageSize))),
			Total:      total,
			Records:    records, // 直接填充转换后的记录
		},
	}

	return resp, nil
}
