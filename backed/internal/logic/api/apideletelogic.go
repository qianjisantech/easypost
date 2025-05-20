package api

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"backed/internal/svc"
	"backed/internal/types"
	"context"
	"strconv"

	"github.com/zeromicro/go-zero/core/logx"
)

type ApiDeleteLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiDeleteLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiDeleteLogic {
	return &ApiDeleteLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiDeleteLogic) ApiDelete(req *types.ApiDeleteRequest) (resp *types.ApiDeleteResp, err error) {
	// 1. 参数校验
	if req.Id == "" {
		return nil, errorx.NewCodeError("API ID不能为空")
	}

	// 2. 转换ID类型
	id, err := strconv.ParseInt(req.Id, 10, 64)
	if err != nil {
		return nil, errorx.NewCodeError("API ID格式错误")
	}

	// 3. 获取数据库连接
	db := l.svcCtx.DB.Debug().Begin()

	defer func() {
		if r := recover(); r != nil {
			db.Rollback()
		}
	}()

	// 5. 执行逻辑删除
	tx := db.Model(&model.AmsAPI{}).
		Where("id = ? AND is_deleted = 0", id). // 只删除未删除的记录
		Updates(map[string]interface{}{
			"is_deleted": 1,
		})

	// 6. 错误处理
	if tx.Error != nil {
		tx.Rollback()
		return nil, errorx.NewCodeError(tx.Error.Error())
	}

	// 8. 提交事务
	if err := tx.Commit().Error; err != nil {
		return nil, errorx.NewCodeError(err.Error())
	}

	// 10. 返回成功响应
	return &types.ApiDeleteResp{
		Success: true,
		Message: "删除成功",
	}, nil
}
