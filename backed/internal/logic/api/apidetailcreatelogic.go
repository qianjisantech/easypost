package api

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"context"
	"strconv"
	"strings"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ApiDetailCreateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiDetailCreateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiDetailCreateLogic {
	return &ApiDetailCreateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiDetailCreateLogic) ApiDetailCreate(req *types.ApiDetailCreateOrUpdateRequest) (resp *types.ApiDetailCreateOrUpdateResp, err error) {

	db := l.svcCtx.DB.Begin().Debug()
	parentId := int64(0)
	tags := ""
	if req.ParentId != "" {
		parentId, _ = strconv.ParseInt(req.ParentId, 10, 64)
	} else {
		parentId = 0
	}
	if len(req.Tags) > 0 {
		tags = strings.Join(req.Tags, ",")
	}
	requestBody := ""
	if req.RequestBody != "" {
		requestBody = req.RequestBody
	} else {
		requestBody = "{\"type\":\"text/plain\",\"parameters\":[],\"jsonSchema\":\"\"}"
	}
	amApi := &model.AmAPI{
		Path:             &req.Path,
		Status:           &req.Status,
		Remark:           &req.Description,
		Responsible:      &req.Responsible,
		ParentID:         &parentId,
		Tag:              &tags,
		Parameters:       &req.Parameters,
		RequestBody:      &requestBody,
		ResponseExamples: &req.ResponseExamples,
		Responses:        &req.Responses,
	}
	projectIdstring := l.ctx.Value("projectId").(string)
	projectId, err := strconv.ParseInt(projectIdstring, 10, 64)
	if projectId == 0 {
		// 处理空值或类型不匹配的情况
		return nil, errorx.NewDefaultError("projectId 无效或未提供")
	}
	amApi.ProjectID = &projectId
	defaultName := "未命名接口"
	if req.Name == "" {
		amApi.Name = &defaultName
	} else {
		amApi.Name = &req.Name
	}
	defaultMethod := "GET"
	if req.Method == "" {
		amApi.Method = &defaultMethod
	} else {
		amApi.Method = &req.Method
	}
	if err := db.Create(amApi).Error; err != nil {
		db.Rollback()
		return nil, errorx.NewDefaultError("保存接口主信息失败")
	}

	//// 提交事务
	if err := db.Commit().Error; err != nil {
		db.Rollback()
		return nil, errorx.NewDefaultError("提交事务失败")
	}

	return &types.ApiDetailCreateOrUpdateResp{
		Success: true,
		Message: "保存成功",
		Data: types.ApiDetailCreateOrUpdateRespData{
			Id: strconv.FormatInt(amApi.ID, 10),
		},
	}, nil
}
