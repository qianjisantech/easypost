package api

import (
	"backed/gen/model"
	"backed/internal/svc"
	"backed/internal/types"
	"context"
	"fmt"
	"log"
	"strconv"
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
	// 执行数据库插入
	db := l.svcCtx.DB.Begin().Debug()
	defer func() {
		if r := recover(); r != nil {
			db.Rollback()
		}
	}()

	// 初始化 createAPIApiInfo
	tags := strings.Join(req.Data.Tags, ",")
	createAPIApiInfo := &model.APIApiDetail{
		Name:     &req.Name,
		CreateBy: StringPointer("admin"),
		Method:   &req.Data.Method,
		Path:     &req.Data.Path,
		Status:   &req.Data.Status,
		Tag:      &tags,
		Remark:   &req.Data.Description,
		Type:     &req.Type,
	}

	// 如果 req.Id 不为空，则转换并设置 ID
	if req.Id != "" {
		id, err := strconv.Atoi(req.Id)
		if err != nil {
			return nil, fmt.Errorf("invalid ID format: %w", err)
		}
		createAPIApiInfo.ID = int32(id)
	}

	// 执行数据库操作
	tx := db.WithContext(l.ctx).Save(createAPIApiInfo)
	if tx.Error != nil {
		db.Rollback()
		return nil, fmt.Errorf("failed to create API info: %w", tx.Error)
	}

	log.Printf("id%s", createAPIApiInfo.ID)

	apiId := int64(createAPIApiInfo.ID)
	//存response
	for _, response := range req.Data.Responses {
		code := int32(response.Code)
		apiResponseInfo := &model.APIResponseInfo{
			ResponseCode:   &code,
			ResponseName:   &response.Name,
			CreateBy:       StringPointer("admin"),
			ContentType:    &response.ContentType,
			APIID:          &apiId, // 传递 *int64 类型
			JSONSchemaType: &response.JsonSchema.Type,
		}
		// 如果 response.Id 不为空，则转换并设置 ID
		if response.Id != "" {
			id, err := strconv.Atoi(req.Id)
			if err != nil {
				return nil, fmt.Errorf("invalid ID format: %w", err)
			}
			apiResponseInfo.ID = int64(id)
		}
		responseInfo := db.Save(apiResponseInfo)
		if responseInfo.Error != nil {
			db.Rollback()
			return nil, fmt.Errorf("failed to create APIResponseInfo: %w", responseInfo.Error)
		}
		for _, property := range response.JsonSchema.Properties {
			apiResponseProperty := &model.APIResponseProperty{
				CreateBy:    StringPointer("admin"),
				Name:        &property.Name,
				Type:        &property.Type,
				Description: &property.Description,
				DisplayName: &property.DisplayName,
				ResponseID:  &apiResponseInfo.ID,
			}
			if property.Id != "" {
				id, err := strconv.Atoi(property.Id)
				if err != nil {
					return nil, fmt.Errorf("invalid ID format: %w", err)
				}
				apiResponseProperty.ID = int64(id)
			}
			apiResponse := db.Save(apiResponseProperty)
			if apiResponse.Error != nil {
				db.Rollback()
				return nil, fmt.Errorf("failed to create APIResponseInfo: %w", apiResponse.Error)
			}
		}

	}

	//存requestBody
	requestBody := &model.APIRequestBody{
		APIID:      &apiId,
		Type:       &req.Data.RequestBody.Type,
		JSONSchema: &req.Data.RequestBody.JsonSchema,
		CreateBy:   StringPointer("admin"),
	}

	createAPIRequestBody := db.Create(requestBody)
	if createAPIRequestBody.Error != nil {
		db.Rollback()
		return nil, fmt.Errorf("failed to create APIRequestBody: %w", createAPIRequestBody.Error)
	}
	// 提交事务
	if err := db.Commit().Error; err != nil {
		db.Rollback()
		log.Printf("Error committing transaction: %v", err)
		return nil, fmt.Errorf("failed to commit transaction: %w", err)
	}
	// 返回成功响应
	return &types.ApiInfoCreateResp{
		Code:    "200",
		Message: "保存成功",
	}, nil
}
