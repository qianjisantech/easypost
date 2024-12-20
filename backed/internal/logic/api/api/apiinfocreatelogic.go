package api

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"backed/internal/svc"
	"backed/internal/types"
	"context"
	"github.com/zeromicro/go-zero/core/logx"

	"log"
	"strconv"
	"strings"
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
	/**
	存api主数据
	*/
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
			return nil, errorx.NewDefaultError("invalid ID format ")
		}
		createAPIApiInfo.ID = int32(id)
	}

	// 执行数据库操作
	tx := db.Save(createAPIApiInfo)
	if tx.Error != nil {
		db.Rollback()
		return nil, errorx.NewDefaultError("failed to create ApiInfo ")
	}
	apiId := int64(createAPIApiInfo.ID)
	/**
	存parameters Query
	*/
	if len(req.Data.Parameters.Query) > 0 {
		for _, q := range req.Data.Parameters.Query {
			apq := &model.APIParametersQuery{
				Name:    &q.Name,
				Type:    &q.Type,
				Example: &q.Example,
				APIID:   &apiId,
			}
			if q.Id != "" {
				id, err := strconv.Atoi(q.Id)
				if err != nil {
					return nil, errorx.NewDefaultError("invalid ID format q.Id")
				}
				apq.ID = int64(id)
			}
			querySave := db.Save(apq)
			if querySave.Error != nil {
				db.Rollback()
				return nil, errorx.NewDefaultError("failed to create Parameters.Query")
			}
		}

	}
	/**
	存parameters Headers
	*/
	if len(req.Data.Parameters.Header) > 0 {

		for _, h := range req.Data.Parameters.Header {

			aph := &model.APIParametersHeader{
				Name:    &h.Name,
				Type:    &h.Type,
				APIID:   &apiId,
				Example: &h.Example,
			}
			//if h.Type == "string" {
			//	if str, ok := h.Example.(string); ok {
			//		// 如果类型断言成功，创建字符串的指针
			//		aph.Example = &str
			//	}
			//}
			//if h.Type == "array" {
			//	if slice, ok := h.Example.([]string); ok {
			//		str := strings.Join(slice, ",")
			//		aph.Example = &str
			//	}
			//}
			if h.Id != "" {
				id, err := strconv.Atoi(h.Id)
				if err != nil {
					return nil, errorx.NewDefaultError("invalid ID format h.Id")
				}
				aph.ID = int64(id)
			}
			headerSave := db.Save(aph)
			if headerSave.Error != nil {
				db.Rollback()
				return nil, errorx.NewDefaultError("failed to create Parameters.Header")
			}
		}

	}

	//存requestBody
	//requestBody := &model.APIRequestBody{
	//	APIID:      &apiId,
	//	Type:       &req.Data.RequestBody.Type,
	//	JSONSchema: &req.Data.RequestBody.JsonSchema,
	//	CreateBy:   StringPointer("admin"),
	//}
	//
	//createAPIRequestBody := db.Create(requestBody)
	//if createAPIRequestBody.Error != nil {
	//	db.Rollback()
	//	return nil, fmt.Errorf("failed to create APIRequestBody: %w", createAPIRequestBody.Error)
	//}
	/**
	/存response
	*/
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
			id, err := strconv.Atoi(response.Id)
			if err != nil {
				return nil, errorx.NewDefaultError("invalid ID format:response.Id ")
			}
			apiResponseInfo.ID = int64(id)
		}
		responseInfo := db.Save(apiResponseInfo)
		if responseInfo.Error != nil {
			db.Rollback()
			return nil, errorx.NewDefaultError("failed to create APIResponseInfo")
		}
		/**
		存响应体示例值
		*/
		for _, property := range response.JsonSchema.Properties {
			if property.Name == "" {
				db.Rollback()
				return nil, errorx.NewDefaultError("字段名必填")
			}
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
					return nil, errorx.NewDefaultError("invalid ID format property.Id ")
				}
				apiResponseProperty.ID = int64(id)
			}
			apiResponse := db.Save(apiResponseProperty)
			if apiResponse.Error != nil {
				db.Rollback()
				return nil, errorx.NewDefaultError("failed to create APIResponseInfo")
			}
		}

	}

	// 提交事务
	if err := db.Commit().Error; err != nil {
		db.Rollback()
		log.Printf("Error committing transaction: %v", err)
		return nil, errorx.NewDefaultError("Error committing transaction")
	}
	// 返回成功响应
	return &types.ApiInfoCreateResp{
		Code:    "200",
		Message: "保存成功",
	}, nil
}
