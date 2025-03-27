package api

import (
	"backed/gen/model"
	"backed/internal/svc"
	"backed/internal/types"
	"backed/internal/utils/ep"
	"context"
	"encoding/json"
	"strconv"

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
	amAPI, err := l.QueryApiDetailById(id) //根据id查询api详情

	var parameters Parameters
	var responses []Response
	var responseExamples []ResponseExample
	var requestBody RequestBody
	//var responsible Responsible
	if amAPI.Parameters != nil {
		err = json.Unmarshal([]byte(*amAPI.Parameters), &parameters)
	} else {
		parameters = Parameters{}
	}
	if amAPI.Responses != nil {
		err = json.Unmarshal([]byte(*amAPI.Responses), &responses)
	} else {
		responses = []Response{}
	}

	if amAPI.ResponseExamples != nil {
		err = json.Unmarshal([]byte(*amAPI.ResponseExamples), &responseExamples)
	} else {
		responseExamples = []ResponseExample{}
	}
	if amAPI.RequestBody != nil && *amAPI.RequestBody != "{}" {
		err = json.Unmarshal([]byte(*amAPI.RequestBody), &requestBody)
	} else {
		requestBody = RequestBody{}
	}
	//if amAPI.Responsible != nil {
	//	err = json.Unmarshal([]byte(*amAPI.Responsible), &responsible)
	//} else {
	//	requestBody = RequestBody{}
	//}

	defaultType := "apiDetail"
	return &types.ApiDetailResp{
		Success: true,
		Message: "加载成功",
		Data: types.ApiDetailData{
			Id:       strconv.FormatInt(amAPI.ID, 10),
			Type:     defaultType,
			ParentId: strconv.FormatInt(*amAPI.ParentID, 10),
			Name:     ep.StringIfNotNil(amAPI.Name, ""),
			Data: types.ApiDetailDataData{
				Id:               strconv.FormatInt(amAPI.ID, 10),
				Name:             ep.StringIfNotNil(amAPI.Name, ""),
				Path:             ep.StringIfNotNil(amAPI.Path, ""),
				Method:           ep.StringIfNotNil(amAPI.Method, ""),
				Status:           ep.StringIfNotNil(amAPI.Status, ""),
				ServerId:         ep.StringIfNotNil(amAPI.ServerID, ""),
				Description:      ep.StringIfNotNil(amAPI.Remark, ""),
				Responsible:      ep.StringIfNotNil(amAPI.Responsible, "{}"),
				Parameters:       parameters,
				Responses:        responses,
				ResponseExamples: responseExamples,
				RequestBody:      requestBody,
			},
		},
	}, nil
}

// QueryApiDetailById 根据id查询api详情
func (l *ApiDetailLogic) QueryApiDetailById(id int64) (*model.AmAPI, error) {
	db := l.svcCtx.DB.Debug()
	var amApi *model.AmAPI
	tx := db.First(&amApi, id)
	if tx.Error != nil {
		logx.Errorf("Error QueryApiDetailById: %v", tx.Error)
		return nil, tx.Error
	}
	return amApi, nil
}

type ResponseExample struct {
	Id   string `json:"id"`
	Name string `json:"name"`
	Data string `json:"data"`
}
type Response struct {
	Id          string             `json:"id"`
	Name        string             `json:"name"`
	Data        string             `json:"data"`
	Code        int                `json:"code"`
	ContentType string             `json:"contentType"`
	JsonSchema  ResponseJsonSchema `json:"jsonSchema"`
}
type ResponseJsonSchema struct {
	Type       string                       `json:"type"`
	Properties []ResponseJsonSchemaProperty `json:"properties"`
}
type ResponseJsonSchemaProperty struct {
	Id          string `json:"id"`
	Type        string `json:"type"`
	Name        string `json:"name"`
	Description string `json:"description"`
	DisplayName string `json:"displayName"`
}

type Parameters struct {
	Query  []Parameter `json:"query"`
	Path   []Parameter `json:"path"`
	Cookie []Parameter `json:"cookie"`
	Header []Parameter `json:"header"`
}

type Parameter struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Type        string `json:"type"`
	Example     string `json:"example"`
}

type RequestBody struct {
	Type       string                 `json:"type"`
	Parameters []RequestBodyParameter `json:"parameters"`
	JsonSchema string                 `json:"jsonSchema"`
}
type RequestBodyParameter struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Type        string `json:"type"`
	Example     string `json:"example"`
}
type Responsible struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	Username string `json:"username"`
}
