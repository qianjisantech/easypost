// Code generated by goctl. DO NOT EDIT.
package types

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

type ApiInfoCreateData struct {
	Method        string                       `json:"method"`
	Path          string                       `json:"path,optional"`
	Name          string                       `json:"name"`
	Status        string                       `json:"status"`
	ResponsibleId string                       `json:"responsibleId,optional"`
	Tags          []string                     `json:"tags,optional"`
	ServerId      string                       `json:"serverId,optional"`
	Description   string                       `json:"description,optional"`
	Parameters    ApiInfoCreateDataParameters  `json:"parameters,optional"`
	Responses     []ApiInfoCreateDataResponse  `json:"responses,optional"`
	RequestBody   ApiInfoCreateDataRequestBody `json:"requestBody,optional"`
}

type ApiInfoCreateDataJsonSchema struct {
	Type       string                                `json:"type"`
	Properties []ApiInfoCreateDataJsonSchemaProperty `json:"properties,optional"`
}

type ApiInfoCreateDataJsonSchemaProperty struct {
	Id          string `json:"id,optional"`
	Type        string `json:"type"`
	Name        string `json:"name"`
	DisplayName string `json:"displayName,optional"`
	Description string `json:"description,optional"`
}

type ApiInfoCreateDataParameters struct {
	Path   []string                            `json:"path,optional,optional"`
	Query  []ApiInfoCreateDataParametersQuery  `json:"query,optional"`
	Header []ApiInfoCreateDataParametersHeader `json:"header,optional"`
}

type ApiInfoCreateDataParametersHeader struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	Type    string `json:"type"`
	Example string `json:"example,optional"`
}

type ApiInfoCreateDataParametersQuery struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	Type    string `json:"type"`
	Example string `json:"example,optional"`
}

type ApiInfoCreateDataRequestBody struct {
	Type       string                                  `json:"type"`
	Parameters []ApiInfoCreateDataRequestBodyParameter `json:"parameters,optional"`
	JsonSchema string                                  `json:"jsonSchema"`
}

type ApiInfoCreateDataRequestBodyParameter struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	Type    string `json:"type"`
	Example string `json:"example"`
}

type ApiInfoCreateDataResponse struct {
	Id          string                      `json:"id"`
	Code        int                         `json:"code"`
	Name        string                      `json:"name"`
	ContentType string                      `json:"contentType"`
	JsonSchema  ApiInfoCreateDataJsonSchema `json:"jsonSchema"`
}

type ApiInfoCreateRequest struct {
	Id   string            `json:"id"`
	Name string            `json:"name"`
	Type string            `json:"type,optional"`
	Data ApiInfoCreateData `json:"data"`
}

type ApiInfoCreateResp struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

type ApiRecycleGroupQueryRequest struct {
}

type ApiRecycleGroupQueryResp struct {
	Code    string                      `json:"code"`
	Message string                      `json:"message"`
	Data    []ApiDirectoryDataQueryData `json:"data"`
}
