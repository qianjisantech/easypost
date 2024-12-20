package api

import (
	"backed/gen/model"
	"context"
	"log"
	"strconv"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ApiDirectoryDataQueryLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiDirectoryDataQueryLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiDirectoryDataQueryLogic {
	return &ApiDirectoryDataQueryLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiDirectoryDataQueryLogic) ApiDirectoryDataQuery(req *types.ApiDirectoryDataQueryRequest) (*types.ApiDirectoryDataQueryResp, error) {
	// 获取 API 详情
	queryApiApiDetailsResp := l.queryApiApiDetails()

	// 预先分配内存，避免频繁扩展
	var datas []types.ApiDirectoryDataQueryData

	// 遍历 API 详情
	for _, r := range queryApiApiDetailsResp {
		apiResponseInfos := l.queryResponses(int64(r.ID))

		// 为响应数据创建空切片
		var apiDirectoryDataQueryDataDataResponses []types.ApiDirectoryDataQueryDataDataResponse

		// 遍历响应信息
		for _, apiResponseInfo := range apiResponseInfos {
			jsonSchemaProperties := l.queryResponseJsonSchemaProperties(apiResponseInfo.ID)
			var properties []types.ApiDirectoryDataQueryDataDataResponseJsonSchemaProperty
			if len(jsonSchemaProperties) > 0 {
				for _, jsonSchemaProperty := range jsonSchemaProperties {
					addrjsp := &types.ApiDirectoryDataQueryDataDataResponseJsonSchemaProperty{
						Id:          strconv.FormatInt(jsonSchemaProperty.ID, 10),
						Name:        *jsonSchemaProperty.Name,
						Type:        *jsonSchemaProperty.Type,
						Description: *jsonSchemaProperty.Description,
						DisPlayName: *jsonSchemaProperty.DisplayName,
					}
					properties = append(properties, *addrjsp)
				}
			} else {
				properties = []types.ApiDirectoryDataQueryDataDataResponseJsonSchemaProperty{}
			}
			code := int(*apiResponseInfo.ResponseCode)
			apiDirectoryDataQueryDataDataResponse := types.ApiDirectoryDataQueryDataDataResponse{
				Id:          strconv.FormatInt(apiResponseInfo.ID, 10),
				Code:        code,
				Name:        *apiResponseInfo.ResponseName,
				ContentType: *apiResponseInfo.ContentType,
				JsonSchema: types.ApiDirectoryDataQueryDataDataResponseJsonSchema{
					Type:       *apiResponseInfo.JSONSchemaType,
					Properties: properties,
				},
			}
			apiDirectoryDataQueryDataDataResponses = append(apiDirectoryDataQueryDataDataResponses, apiDirectoryDataQueryDataDataResponse)
		}

		// 处理 apiDetail 类型
		if *r.Type == "apiDetail" {
			apiDirectoryDataQueryData := types.ApiDirectoryDataQueryData{
				Id:   strconv.FormatInt(int64(r.ID), 10),
				Name: *r.Name,
				ParentId: func() string {
					if r.ParentID != nil {
						return strconv.FormatInt(*r.ParentID, 10)
					}
					return ""
				}(),
				Type: *r.Type,
				Data: types.ApiDirectoryDataQueryDataData{
					Id:            strconv.FormatInt(int64(r.ID), 10),
					Path:          *r.Path,
					Name:          *r.Name,
					Status:        *r.Status,
					ResponsibleId: getStringOrNil(r.Manager),
					Tags:          getTags(r.Tag),
					Method:        *r.Method,
					ServerId:      getStringOrNil(r.ServerID),
					Description:   *r.Remark,
					Responses:     apiDirectoryDataQueryDataDataResponses,
				},
			}
			datas = append(datas, apiDirectoryDataQueryData)
		}

		// 处理 apiDetailFolder 类型
		if *r.Type == "apiDetailFolder" {
			apiDetailFolder := types.ApiDirectoryDataQueryData{
				Id:   strconv.FormatInt(int64(r.ID), 10),
				Name: *r.Name,
				Type: *r.Type,
			}
			datas = append(datas, apiDetailFolder)
		}

		// 处理 doc 类型
		if *r.Type == "doc" {
			apiDetailFolder := types.ApiDirectoryDataQueryData{
				Id:   strconv.FormatInt(int64(r.ID), 10),
				Name: *r.Name,
				Type: *r.Type,
				Data: types.ApiDirectoryDataQueryDataData{
					Id:          strconv.FormatInt(int64(r.ID), 10),
					Name:        *r.Name,
					Description: *r.Content,
				},
			}
			datas = append(datas, apiDetailFolder)
		}
	}

	// 返回成功响应
	return &types.ApiDirectoryDataQueryResp{
		Code:    "200",
		Message: "查询成功",
		Data:    datas,
	}, nil
}

// queryApiApiDetails 获取 API 详情
func (l *ApiDirectoryDataQueryLogic) queryApiApiDetails() []*model.APIApiDetail {
	db := l.svcCtx.DB.Debug()
	var apiDetails []*model.APIApiDetail
	err := db.WithContext(l.ctx).Find(&apiDetails).Error
	if err != nil {
		// 错误处理
		log.Printf("Error querying API details: %v", err)
	}
	return apiDetails
}

// queryResponses 获取 API 响应信息
func (l *ApiDirectoryDataQueryLogic) queryResponses(apiId int64) []*model.APIResponseInfo {
	db := l.svcCtx.DB.Debug()
	var apiResponseInfos []*model.APIResponseInfo
	err := db.WithContext(l.ctx).Where("api_id=?", apiId).Find(&apiResponseInfos).Error
	if err != nil {
		// 错误处理
		log.Printf("Error querying API responses for apiId %d: %v", apiId, err)
	}
	return apiResponseInfos
}

// queryRequestBody 获取 API 请求体
func (l *ApiDirectoryDataQueryLogic) queryRequestBody(apiId int64) *model.APIRequestBody {
	db := l.svcCtx.DB.Debug()
	var apiAPIRequestBody *model.APIRequestBody
	err := db.WithContext(l.ctx).Where("api_id=?", apiId).First(&apiAPIRequestBody).Error
	if err != nil {
		// 错误处理
		log.Printf("Error querying API request body for apiId %d: %v", apiId, err)
	}
	return apiAPIRequestBody
}
func (l *ApiDirectoryDataQueryLogic) queryResponseJsonSchemaProperties(responseId int64) []*model.APIResponseProperty {
	db := l.svcCtx.DB.Debug()
	var apiAPIResponseProperty []*model.APIResponseProperty
	err := db.WithContext(l.ctx).Where("response_id=?", responseId).Find(&apiAPIResponseProperty).Error
	if err != nil {
		// 错误处理
		log.Printf("Error querying API request body for apiId %d: %v", responseId, err)
	}
	return apiAPIResponseProperty
}

// getStringOrNil 用于安全获取可选字段的值
func getStringOrNil(ptr *string) string {
	if ptr != nil {
		return *ptr
	}
	return ""
}

// getTags 返回 Tag 字段的切片，如果 Tag 为 nil，返回空切片
func getTags(tag *string) []string {
	if tag != nil {
		return []string{*tag}
	}
	return nil
}
