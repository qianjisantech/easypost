package am

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"context"
	"gorm.io/gorm"
	"log"
	"strconv"
	"strings"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ApiDetailSaveLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiDetailSaveLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiDetailSaveLogic {
	return &ApiDetailSaveLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

type DataFactory interface {
	Save(req *types.ApiDetailSaveRequest) (resp *types.ApiDetailSaveResp, err error)
}
type ApiDetailFactory struct {
	DB *gorm.DB
}

func (adf ApiDetailFactory) Save(req *types.ApiDetailSaveRequest) (resp *types.ApiDetailSaveResp, err error) {
	db := adf.DB.Begin().Debug()
	projectId := int64(22)
	responsibleId, _ := strconv.ParseInt(req.Data.ResponsibleId, 10, 64)
	/**
	存api主数据
	*/
	// 初始化 createAPIApiInfo
	tags := strings.Join(req.Data.Tags, ",")
	createAPIApiInfo := &model.AmAPI{
		Name:          &req.Name,
		CreateBy:      StringPointer("admin"),
		Method:        &req.Data.Method,
		Path:          &req.Data.Path,
		Status:        &req.Data.Status,
		Tag:           &tags,
		Remark:        &req.Data.Description,
		Type:          &req.Type,
		ProjectID:     &projectId,
		ResponsibleID: &responsibleId,
	}

	// 如果 req.Id 不为空，则转换并设置 ID
	if req.Id != "" {
		id, err := strconv.Atoi(req.Id)
		if err != nil {
			createAPIApiInfo.ID = 0
			// 执行数据库操作
			tx := db.Create(createAPIApiInfo)
			if tx.Error != nil {
				db.Rollback()
				return nil, errorx.NewDefaultError("创建接口失败")
			}
		} else {
			createAPIApiInfo.ID = int64(id)

			tx := db.Model(&model.AmAPI{}).Where("id=?", id).Updates(model.AmAPI{
				Name:          &req.Name,
				CreateBy:      StringPointer("admin"),
				Method:        &req.Data.Method,
				Path:          &req.Data.Path,
				Status:        &req.Data.Status,
				Tag:           &tags,
				Remark:        &req.Data.Description,
				Type:          &req.Type,
				ResponsibleID: &responsibleId,
				ProjectID:     &projectId,
			})
			if tx.Error != nil {
				db.Rollback()
				return nil, errorx.NewDefaultError("更新建接口失败")
			}
		}

	} else {
		// 执行数据库操作
		tx := db.Create(createAPIApiInfo)
		if tx.Error != nil {
			db.Rollback()
			return nil, errorx.NewDefaultError("创建接口失败")
		}
	}

	/**
	存parameters Query
	*/
	if len(req.Data.Parameters.Query) > 0 {
		for _, q := range req.Data.Parameters.Query {
			apq := &model.AmAPIParameter{
				Name:          &q.Name,
				Type:          &q.Type,
				Example:       &q.Example,
				APIID:         &createAPIApiInfo.ID,
				Description:   &q.Description,
				ParameterType: StringPointer("query"),
			}
			if q.Id != "" {
				id, err := strconv.Atoi(q.Id)
				if err != nil {
					apq.ID = 0
					log.Printf("id格式化失败")
				} else {
					apq.ID = int64(id)
				}
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

			aph := &model.AmAPIParameter{
				Name:          &h.Name,
				Type:          &h.Type,
				APIID:         &createAPIApiInfo.ID,
				Example:       &h.Example,
				ParameterType: StringPointer("header"),
				Description:   &h.Description,
			}
			if h.Id != "" {
				id, err := strconv.Atoi(h.Id)
				if err != nil {
					aph.ID = 0
					log.Printf("id格式化失败")
				} else {
					aph.ID = int64(id)
				}

			}
			headerSave := db.Save(aph)
			if headerSave.Error != nil {
				db.Rollback()
				return nil, errorx.NewDefaultError("创建请求参数失败")
			}
		}

	}
	/**
	存parameters Path
	*/
	if len(req.Data.Parameters.Path) > 0 {

		for _, h := range req.Data.Parameters.Header {

			aph := &model.AmAPIParameter{
				Name:          &h.Name,
				Type:          &h.Type,
				APIID:         &createAPIApiInfo.ID,
				Example:       &h.Example,
				ParameterType: StringPointer("path"),
			}
			if h.Id != "" {
				id, err := strconv.Atoi(h.Id)
				if err != nil {
					aph.ID = 0
					log.Printf("id格式化失败")
				} else {
					aph.ID = int64(id)
				}

			}
			headerSave := db.Save(aph)
			if headerSave.Error != nil {
				db.Rollback()
				return nil, errorx.NewDefaultError("创建请求参数失败")
			}
		}

	}
	//存cookie
	if len(req.Data.Parameters.Cookie) > 0 {

		for _, h := range req.Data.Parameters.Header {

			aph := &model.AmAPIParameter{
				Name:          &h.Name,
				Type:          &h.Type,
				APIID:         &createAPIApiInfo.ID,
				Example:       &h.Example,
				ParameterType: StringPointer("cookie"),
				Description:   &h.Description,
			}
			if h.Id != "" {
				id, err := strconv.Atoi(h.Id)
				if err != nil {
					aph.ID = 0
					log.Printf("id格式化失败")
				} else {
					aph.ID = int64(id)
				}

			}
			headerSave := db.Save(aph)
			if headerSave.Error != nil {
				db.Rollback()
				return nil, errorx.NewDefaultError("创建请求参数失败")
			}
		}

	}

	//存requestBody
	requestBody := &model.AmAPIRequestBodyJSON{
		APIID:      &createAPIApiInfo.ID,
		Type:       &req.Data.RequestBody.Type,
		JSONSchema: &req.Data.RequestBody.JsonSchema,
	}
	if req.Data.RequestBody.Id != "" {
		id, err := strconv.Atoi(req.Data.RequestBody.Id)
		if err != nil {
			requestBody.ID = 0
			tx := db.Create(requestBody)
			if tx.Error != nil {
				db.Rollback()
				return nil, errorx.NewCodeError(tx.Error.Error())
			}
			log.Printf("id格式化失败")
		} else {
			requestBody.ID = int64(id)
			tx := db.Model(&model.AmAPIRequestBodyJSON{}).Where("id=?", id).Updates(model.AmAPIRequestBodyJSON{
				APIID:      &createAPIApiInfo.ID,
				Type:       &req.Data.RequestBody.Type,
				JSONSchema: &req.Data.RequestBody.JsonSchema,
			})
			if tx.Error != nil {
				db.Rollback()
				return nil, errorx.NewDefaultError(tx.Error.Error())
			}
		}

	} else {
		tx := db.Create(requestBody)
		if tx.Error != nil {
			db.Rollback()
			return nil, errorx.NewCodeError(tx.Error.Error())
		}
	}

	/**
	/存response
	*/
	for _, response := range req.Data.Responses {
		isDeleted := false
		code := int32(response.Code)
		apiResponseInfo := &model.AmAPIResponse{
			Code:           &code,
			Name:           &response.Name,
			CreateBy:       StringPointer("admin"),
			ContentType:    &response.ContentType,
			APIID:          &createAPIApiInfo.ID, // 传递 *int64 类型
			JSONSchemaType: &response.JsonSchema.Type,
			IsDeleted:      &isDeleted,
		}
		// 如果 response.Id 不为空，则转换并设置 ID
		if response.Id != "" {
			id, err := strconv.Atoi(response.Id)
			if err != nil {
				requestBody.ID = 0
				tx := db.Create(apiResponseInfo)
				if tx.Error != nil {
					db.Rollback()
					return nil, errorx.NewDefaultError(tx.Error.Error())
				}
				log.Printf("requestBodyid格式化失败")
			} else {
				tx := db.Model(&model.AmAPIResponse{}).Where("id=?", id).Updates(model.AmAPIResponse{
					Code:           &code,
					Name:           &response.Name,
					CreateBy:       StringPointer("admin"),
					ContentType:    &response.ContentType,
					APIID:          &createAPIApiInfo.ID, // 传递 *int64 类型
					JSONSchemaType: &response.JsonSchema.Type,
					IsDeleted:      &isDeleted,
				})
				if tx.Error != nil {
					db.Rollback()
					return nil, errorx.NewDefaultError(tx.Error.Error())
				}
			}
			apiResponseInfo.ID = int64(id)
		} else {
			tx := db.Create(apiResponseInfo)
			if tx.Error != nil {
				db.Rollback()
				return nil, errorx.NewDefaultError(tx.Error.Error())
			}
		}

		/**
		存响应体示例值
		*/
		for _, property := range response.JsonSchema.Properties {
			if property.Name == "" {
				db.Rollback()
				return nil, errorx.NewDefaultError("字段名必填")
			}
			apiResponseProperty := &model.AmAPIResponseProperty{
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
					apiResponseProperty.ID = 0
					tx := db.Create(apiResponseProperty)
					if tx.Error != nil {
						db.Rollback()
						return nil, errorx.NewDefaultError(tx.Error.Error())
					}
				} else {
					apiResponseProperty.ID = int64(id)
					tx := db.Model(&model.AmAPIResponseProperty{}).Where("id=?", id).Updates(model.AmAPIResponseProperty{
						CreateBy:    StringPointer("admin"),
						Name:        &property.Name,
						Type:        &property.Type,
						Description: &property.Description,
						DisplayName: &property.DisplayName,
						ResponseID:  &apiResponseInfo.ID,
					})
					if tx.Error != nil {
						db.Rollback()
						return nil, errorx.NewDefaultError(tx.Error.Error())
					}
				}

			} else {
				tx := db.Create(apiResponseProperty)
				if tx.Error != nil {
					db.Rollback()
					return nil, errorx.NewDefaultError(tx.Error.Error())
				}
			}

		}

	}
	// 提交事务
	if err := db.Commit().Error; err != nil {
		db.Rollback()
		log.Printf("Error committing transaction: %v", err)
	}
	return &types.ApiDetailSaveResp{
		Success: true,
		Message: "保存成功",
		Data: types.ApiDetailSaveRespData{
			Id: strconv.FormatInt(createAPIApiInfo.ID, 10),
		},
	}, nil
}

type ApiFolderFactory struct {
	DB *gorm.DB
}

func (aff ApiFolderFactory) Save(req *types.ApiDetailSaveRequest) (resp *types.ApiDetailSaveResp, err error) {
	db := aff.DB.Begin().Debug()
	defer func() {
		if r := recover(); r != nil {
			db.Rollback()
		}
	}()
	folderId, _ := strconv.ParseInt(req.Id, 10, 64)
	createAPIApiInfo := &model.AmAPI{
		Name:     &req.Name,
		ParentID: &folderId,
		Type:     &req.Type,
		CreateBy: StringPointer("admin"),
	}
	if req.Id != "" {
		id, err := strconv.Atoi(req.Id)
		if err != nil {
			return nil, errorx.NewDefaultError("invalid ID format ")
		}
		createAPIApiInfo.ID = int64(id)
	}

	// 执行数据库操作
	tx := db.Save(createAPIApiInfo)
	if tx.Error != nil {
		db.Rollback()
		return nil, errorx.NewDefaultError("创建目录失败 ")
	}
	// 提交事务
	if err := db.Commit().Error; err != nil {
		db.Rollback()
		log.Printf("Error committing transaction: %v", err)
		return nil, errorx.NewDefaultError("Error committing transaction")
	}
	// 返回成功响应
	return &types.ApiDetailSaveResp{
		Success: true,
		Message: "保存成功",
	}, nil
}

func (l *ApiDetailSaveLogic) ApiDetailSave(req *types.ApiDetailSaveRequest) (resp *types.ApiDetailSaveResp, err error) {
	return NewDataFactory(req.Type, l.svcCtx.DB).Save(req)

}
func NewDataFactory(dataType string, db *gorm.DB) DataFactory {
	switch dataType {
	case "apiDetail":
		return ApiDetailFactory{DB: db}
	case "apiFolder":
		return ApiFolderFactory{DB: db}
	default:
		return nil
	}
}
func StringPointer(s string) *string {
	return &s
}
