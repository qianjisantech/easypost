// Code generated by goctl. DO NOT EDIT.
package types

type ApiDetailSaveData struct {
	Method        string                       `json:"method"`
	Path          string                       `json:"path,optional"`
	Name          string                       `json:"name"`
	Status        string                       `json:"status"`
	ResponsibleId string                       `json:"responsibleId,optional"`
	Tags          []string                     `json:"tags,optional"`
	ServerId      string                       `json:"serverId,optional"`
	Description   string                       `json:"description,optional"`
	Parameters    ApiDetailSaveDataParameters  `json:"parameters,optional"`
	Responses     []ApiDetailSaveDataResponse  `json:"responses,optional"`
	RequestBody   ApiDetailSaveDataRequestBody `json:"requestBody,optional"`
}

type ApiDetailSaveDataJsonSchema struct {
	Type       string                                `json:"type"`
	Properties []ApiDetailSaveDataJsonSchemaProperty `json:"properties,optional"`
}

type ApiDetailSaveDataJsonSchemaProperty struct {
	Id          string `json:"id,optional"`
	Type        string `json:"type"`
	Name        string `json:"name"`
	DisplayName string `json:"displayName,optional"`
	Description string `json:"description,optional"`
}

type ApiDetailSaveDataParameters struct {
	Path   []string                            `json:"path,optional,optional"`
	Query  []ApiDetailSaveDataParametersQuery  `json:"query,optional"`
	Header []ApiDetailSaveDataParametersHeader `json:"header,optional"`
}

type ApiDetailSaveDataParametersHeader struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	Type    string `json:"type"`
	Example string `json:"example,optional"`
}

type ApiDetailSaveDataParametersQuery struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	Type    string `json:"type"`
	Example string `json:"example,optional"`
}

type ApiDetailSaveDataRequestBody struct {
	Type       string                                  `json:"type"`
	Parameters []ApiDetailSaveDataRequestBodyParameter `json:"parameters,optional"`
	JsonSchema string                                  `json:"jsonSchema"`
}

type ApiDetailSaveDataRequestBodyParameter struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	Type    string `json:"type"`
	Example string `json:"example"`
}

type ApiDetailSaveDataResponse struct {
	Id          string                      `json:"id"`
	Code        int                         `json:"code"`
	Name        string                      `json:"name"`
	ContentType string                      `json:"contentType"`
	JsonSchema  ApiDetailSaveDataJsonSchema `json:"jsonSchema"`
}

type ApiDetailSaveRequest struct {
	Id       string            `json:"id"`
	Name     string            `json:"name"`
	Type     string            `json:"type,optional"`
	ParentId string            `json:"parentId,optional"`
	Data     ApiDetailSaveData `json:"data,optional"`
}

type ApiDetailSaveResp struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

type ApiDirectoryDataQueryData struct {
	Id       string                        `json:"id"`
	ParentId string                        `json:"parentId"`
	Name     string                        `json:"name"`
	Type     string                        `json:"type"`
	Data     ApiDirectoryDataQueryDataData `json:"data"`
}

type ApiDirectoryDataQueryDataData struct {
	Id            string                                  `json:"id"`
	Path          string                                  `json:"path"`
	Name          string                                  `json:"name"`
	Method        string                                  `json:"method"`
	Status        string                                  `json:"status"`
	ResponsibleId string                                  `json:"responsibleId"`
	Tags          []string                                `json:"tags"`
	ServerId      string                                  `json:"serverId"`
	Description   string                                  `json:"description"`
	Parameters    ApiDirectoryDataQueryDataDataParameters `json:"parameters"`
	Responses     []ApiDirectoryDataQueryDataDataResponse `json:"responses"`
}

type ApiDirectoryDataQueryDataDataParameters struct {
	Path   []string                                        `json:"path"`
	Query  []ApiDirectoryDataQueryDataDataParametersQuery  `json:"query"`
	Header []ApiDirectoryDataQueryDataDataParametersHeader `json:"header"`
}

type ApiDirectoryDataQueryDataDataParametersHeader struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	Type    string `json:"type"`
	Example string `json:"example"`
}

type ApiDirectoryDataQueryDataDataParametersQuery struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	Type    string `json:"type"`
	Example string `json:"example"`
}

type ApiDirectoryDataQueryDataDataResponse struct {
	Id          string                                          `json:"id"`
	Code        int                                             `json:"code"`
	Name        string                                          `json:"name"`
	ContentType string                                          `json:"contentType"`
	JsonSchema  ApiDirectoryDataQueryDataDataResponseJsonSchema `json:"jsonSchema"`
}

type ApiDirectoryDataQueryDataDataResponseJsonSchema struct {
	Type       string                                                    `json:"type"`
	Properties []ApiDirectoryDataQueryDataDataResponseJsonSchemaProperty `json:"properties"`
}

type ApiDirectoryDataQueryDataDataResponseJsonSchemaProperty struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Type        string `json:"type"`
	Description string `json:"description"`
	DisPlayName string `json:"displayName"`
}

type ApiDirectoryDataQueryRequest struct {
}

type ApiDirectoryDataQueryResp struct {
	Code    string                      `json:"code"`
	Message string                      `json:"message"`
	Data    []ApiDirectoryDataQueryData `json:"data"`
}

type ApiRecycleGroupQueryRequest struct {
}

type ApiRecycleGroupQueryResp struct {
	Code    string                      `json:"code"`
	Message string                      `json:"message"`
	Data    []ApiDirectoryDataQueryData `json:"data"`
}

type AuthEmailLoginData struct {
	AccessToken string `json:"accessToken"`
}

type AuthEmailLoginReq struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AuthEmailLoginResponse struct {
	Code    string             `json:"code"`
	Message string             `json:"message"`
	Data    AuthEmailLoginData `json:"data"`
}

type GetQRCodeData struct {
	Url string `json:"url"`
}

type GetQRCodeResp struct {
	Code    string        `json:"code"`
	Message string        `json:"message"`
	Data    GetQRCodeData `json:"data"`
}

type ProjectQueryPageData struct {
	Id          string `json:"id"`
	ProjectName string `json:"projectName"`
	ProjectIcon string `json:"projectIcon"`
}

type ProjectQueryPageRequest struct {
}

type ProjectQueryPageResp struct {
	Code    string               `json:"code"`
	Message string               `json:"message"`
	Data    ProjectQueryPageData `json:"data"`
}
