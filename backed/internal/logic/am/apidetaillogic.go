package am

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"backed/internal/utils/ep"
	"context"
	"strconv"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ApiDetailLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiDetailLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiDetailLogic {
	return &ApiDetailLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiDetailLogic) ApiDetail(req *types.ApiDetailRequest) (resp *types.ApiDetailResp, err error) {
	id, err := strconv.ParseInt(strconv.Itoa(req.Id), 10, 64)
	amAPI, err := l.QueryApiDetailById(id)                //根据id查询api详情
	amAPQs, err := l.QueryApiParametersQueryById(id)      //根据id查询Param入参
	amARs, err := l.QueryApiResponseQueryById(id)         //根据id查询返回参数
	amAREs, err := l.QueryApiResponseExampleQueryById(id) //根据id查询返回参数
	amARBJ, err := l.QueryResponseBodyJsonById(id)
	if err != nil {
		logx.Errorf("查询失败%s", err.Error())
	}

	// 拼接params请求参数
	var parametersQuerys []types.ApiDetailDataParametersQuery
	var parametersPaths []types.ApiDetailDataParametersPath
	var parametersHeaders []types.ApiDetailDataParametersHeader
	var parametersCookies []types.ApiDetailDataParametersCookie

	if len(amAPQs) > 0 {
		for _, amAPQ := range amAPQs {
			if amAPQ.ParameterType == nil {
				return nil, errorx.NewCodeError("amAPQ.ParameterType为空")
			}
			switch *amAPQ.ParameterType {
			case "query":
				parametersQuerys = append(parametersQuerys, types.ApiDetailDataParametersQuery{
					Id:          strconv.FormatInt(amAPQ.ID, 10),
					Name:        *amAPQ.Name,
					Type:        *amAPQ.Type,
					Enabled:     true,
					Required:    true,
					Description: ep.StringIfNotNil(amAPQ.Description, ""),
					Example:     ep.StringIfNotNil(amAPQ.Example, ""),
				})
			case "path":
				parametersPaths = append(parametersPaths, types.ApiDetailDataParametersPath{
					Id:          strconv.FormatInt(amAPQ.ID, 10),
					Name:        *amAPQ.Name,
					Type:        *amAPQ.Type,
					Enabled:     true,
					Required:    true,
					Description: ep.StringIfNotNil(amAPQ.Description, ""),
					Example:     ep.StringIfNotNil(amAPQ.Example, ""),
				})
			case "header":
				parametersHeaders = append(parametersHeaders, types.ApiDetailDataParametersHeader{
					Id:          strconv.FormatInt(amAPQ.ID, 10),
					Name:        *amAPQ.Name,
					Type:        *amAPQ.Type,
					Example:     ep.StringIfNotNil(amAPQ.Example, ""),
					Description: ep.StringIfNotNil(amAPQ.Description, ""),
				})
			case "cookie":
				parametersCookies = append(parametersCookies, types.ApiDetailDataParametersCookie{
					Id:          strconv.FormatInt(amAPQ.ID, 10),
					Name:        *amAPQ.Name,
					Type:        *amAPQ.Type,
					Example:     ep.StringIfNotNil(amAPQ.Example, ""),
					Description: ep.StringIfNotNil(amAPQ.Description, ""),
				})
			default:
				// 未匹配的类型，这里直接 continue 即可
				continue
			}
		}
	}

	// 循环结束后确保非 nil
	if parametersQuerys == nil {
		parametersQuerys = []types.ApiDetailDataParametersQuery{}
	}
	if parametersPaths == nil {
		parametersPaths = []types.ApiDetailDataParametersPath{}
	}
	if parametersHeaders == nil {
		parametersHeaders = []types.ApiDetailDataParametersHeader{}
	}
	if parametersCookies == nil {
		parametersCookies = []types.ApiDetailDataParametersCookie{}
	}

	//拼接请求体
	var responseJsonSchema types.ApiDetailDataRequestBody
	if amARBJ != nil {
		responseJsonSchema.Type = *amARBJ.Type
		responseJsonSchema.JsonSchema = *amARBJ.JSONSchema
		responseJsonSchema.Id = strconv.FormatInt(amARBJ.ID, 10)
	} else {
		responseJsonSchema = types.ApiDetailDataRequestBody{}
	}

	// 拼接response
	var apiResponses []types.ApiDetailDataResponse
	if len(amARs) > 0 {
		for _, amAR := range amARs {
			aPRQs, err := l.QueryApiPropertyQueryByResponseId(amAR.ID)
			if err != nil {
				return nil, errorx.NewDefaultError(err.Error())
			}
			var addrjsps []types.ApiDetailDataResponseJsonSchemaProperty
			if len(aPRQs) > 0 {
				for _, aPRQ := range aPRQs {
					addrjsps = append(addrjsps, types.ApiDetailDataResponseJsonSchemaProperty{
						Id:          strconv.FormatInt(aPRQ.ID, 10),
						Name:        ep.StringIfNotNil(aPRQ.Name, ""),
						Type:        ep.StringIfNotNil(aPRQ.Type, ""),
						Description: ep.StringIfNotNil(aPRQ.Description, ""),
						DisPlayName: ep.StringIfNotNil(aPRQ.DisplayName, ""),
					})
				}
			} else {
				addrjsps = []types.ApiDetailDataResponseJsonSchemaProperty{}
			}

			apiResponses = append(apiResponses, types.ApiDetailDataResponse{
				Id:          strconv.FormatInt(amAR.ID, 10),
				Code:        int(*amAR.Code),
				Name:        ep.StringIfNotNil(amAR.Name, ""),
				ContentType: ep.StringIfNotNil(amAR.ContentType, ""),
				JsonSchema: types.ApiDetailDataResponseJsonSchema{
					Type:       *amAR.JSONSchemaType,
					Properties: addrjsps,
				},
			})
		}
	} else {
		apiResponses = []types.ApiDetailDataResponse{}
	}

	/**
	拼接返回示例
	*/
	var apiResponseExamples []types.ApiDetailDataResponseExample
	if len(amAREs) > 0 {
		for _, amARE := range amAREs {
			apiResponseExamples = append(apiResponseExamples, types.ApiDetailDataResponseExample{
				Id:         strconv.FormatInt(amARE.ID, 10),
				ResponseId: strconv.FormatInt(*amARE.RespnseID, 10),
				Name:       *amARE.Name,
				Data:       *amARE.Data,
			})
		}
	} else {
		apiResponseExamples = []types.ApiDetailDataResponseExample{}
	}

	return &types.ApiDetailResp{
		Success: true,
		Message: "success",
		Data: types.ApiDetailData{
			Id:          strconv.FormatInt(amAPI.ID, 10),
			Path:        *amAPI.Path,
			Name:        *amAPI.Name,
			Method:      *amAPI.Method,
			Status:      *amAPI.Status,
			ServerId:    ep.StringIfNotNil(amAPI.ServerID, ""),
			Description: ep.StringIfNotNil(amAPI.Remark, ""),
			Parameters: types.ApiDetailDataParameters{
				Query:  parametersQuerys,
				Path:   parametersPaths,
				Header: parametersHeaders,
				Cookie: parametersCookies,
			},
			Responses:        apiResponses,
			ResponseExamples: apiResponseExamples,
			RequestBody:      responseJsonSchema,
		},
	}, nil
}

// QueryApiDetailById 根据id查询api详情
func (l *ApiDetailLogic) QueryApiDetailById(id int64) (*model.AmAPI, error) {
	db := l.svcCtx.DB.Debug()
	var amApi *model.AmAPI
	tx := db.First(&amApi, id)
	if tx.Error != nil {
		logx.Errorf("Error query team: %v", tx.Error)
		return nil, tx.Error
	}
	return amApi, nil
}

// QueryApiParametersQueryById 根据api id 查询相关联的
func (l *ApiDetailLogic) QueryApiParametersQueryById(id int64) ([]*model.AmAPIParameter, error) {
	db := l.svcCtx.DB.Debug()
	var amApqs []*model.AmAPIParameter
	tx := db.Where("api_id = ?", id).Find(&amApqs)
	if tx.Error != nil {
		logx.Errorf("Error query AmAPIParametersQuery: %v", tx.Error)
		return nil, tx.Error
	}
	return amApqs, nil
}

// QueryApiResponseQueryById 根据api id 查询相关联的
func (l *ApiDetailLogic) QueryApiResponseQueryById(id int64) ([]*model.AmAPIResponse, error) {
	db := l.svcCtx.DB.Debug()
	var amARs []*model.AmAPIResponse
	tx := db.Where("api_id = ?", id).Find(&amARs)
	if tx.Error != nil {
		logx.Errorf("Error query AmAPIParametersQuery: %v", tx.Error)
		return nil, tx.Error
	}
	return amARs, nil
}

// QueryApiResponseExampleQueryById 根据api id 查询相关联的
func (l *ApiDetailLogic) QueryApiResponseExampleQueryById(id int64) ([]*model.AmAPIResponseExample, error) {
	db := l.svcCtx.DB.Debug()
	var amAREs []*model.AmAPIResponseExample
	tx := db.Where("api_id = ?", id).Find(&amAREs)
	if tx.Error != nil {
		logx.Errorf("Error query AmAPIParametersQuery: %v", tx.Error)
		return nil, tx.Error
	}
	return amAREs, nil
}

// QueryApiPropertyQueryByResponseId 根据response id 查询相关联的Property
func (l *ApiDetailLogic) QueryApiPropertyQueryByResponseId(responseId int64) ([]*model.AmAPIResponseProperty, error) {
	db := l.svcCtx.DB.Debug()
	var amARPs []*model.AmAPIResponseProperty
	tx := db.Where("response_id = ?", responseId).Find(&amARPs)
	if tx.Error != nil {
		logx.Errorf("Error query AmAPIParametersQuery: %v", tx.Error)
		return nil, tx.Error
	}
	return amARPs, nil
}

// QueryResponseBodyJsonById 根据response id 查询相关联的Property
func (l *ApiDetailLogic) QueryResponseBodyJsonById(id int64) (*model.AmAPIRequestBodyJSON, error) {
	db := l.svcCtx.DB.Debug()
	var amARBJ *model.AmAPIRequestBodyJSON
	tx := db.Where("api_id = ?", id).First(&amARBJ)
	if tx.Error != nil {
		logx.Errorf("Error query QueryResponseBodyJsonById: %v", tx.Error)
		return nil, tx.Error
	}
	return amARBJ, nil
}
