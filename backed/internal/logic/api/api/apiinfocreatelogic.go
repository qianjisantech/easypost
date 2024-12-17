package api

import (
	"backed/gen/model"
	"backed/internal/svc"
	"backed/internal/types"
	"context"
	"fmt"
	"strings"

	"github.com/zeromicro/go-zero/core/logx"
)

type ApiInfoCreateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiInfoCreateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiInfoCreateLogic {
	return &ApiInfoCreateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}
func StringPointer(s string) *string {
	return &s
}
func (l *ApiInfoCreateLogic) ApiInfoCreate(req *types.ApiInfoCreateRequest) (resp *types.ApiInfoCreateResp, err error) {
	// 初始化 createAPIApiInfo
	tags := strings.Join(req.Data.Tags, ",")
	createAPIApiInfo := &model.APIApiInfo{
		Name:     &req.Name,
		CreateBy: StringPointer("admin"),
		Method:   &req.Data.Method,
		Path:     &req.Data.Path,
		Status:   &req.Data.Status,
		Tag:      &tags,
		Remark:   &req.Data.Description,
		Type:     &req.Type,
	}

	// 执行数据库插入
	db := l.svcCtx.DB
	if err := db.WithContext(l.ctx).Create(createAPIApiInfo).Error; err != nil {
		// 如果数据库插入失败，返回错误信息
		return nil, fmt.Errorf("failed to create API info: %w", err)
	}

	// 返回成功响应
	return &types.ApiInfoCreateResp{
		Code:    "200",
		Message: "创建成功",
	}, nil
}
