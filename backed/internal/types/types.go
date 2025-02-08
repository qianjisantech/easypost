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
	Success bool   `json:"success"`
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
	Success bool                        `json:"success"`
	Message string                      `json:"message"`
	Data    []ApiDirectoryDataQueryData `json:"data"`
}

type ApiRecycleGroupQueryRequest struct {
}

type ApiRecycleGroupQueryResp struct {
	Success bool                        `json:"success"`
	Message string                      `json:"message"`
	Data    []ApiDirectoryDataQueryData `json:"data"`
}

type AuthEmailLoginData struct {
	AccessToken string `json:"accessToken"`
	UserId      string `json:"userId"`
	Username    string `json:"username"`
	Name        string `json:"name"`
}

type AuthEmailLoginReq struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AuthEmailLoginResponse struct {
	Success bool               `json:"success"`
	Message string             `json:"message"`
	Data    AuthEmailLoginData `json:"data"`
}

type GetQRCodeData struct {
	Url string `json:"url"`
}

type GetQRCodeResp struct {
	Success bool          `json:"success"`
	Message string        `json:"message"`
	Data    GetQRCodeData `json:"data"`
}

type ProjectCopyRequest struct {
	Id     string `json:"id"`
	TeamId string `json:"teamId"`
}

type ProjectCopyResp struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type ProjectCreateRequest struct {
	ProjectName string `json:"projectName"`
	IsPublic    bool   `json:"isPublic"`
	TeamId      string `json:"teamId"`
}

type ProjectCreateResp struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type ProjectDeleteRequest struct {
	Id string `path:"id"`
}

type ProjectDeleteResp struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type ProjectQueryPageData struct {
	Id          string `json:"id"`
	ProjectName string `json:"projectName"`
	ProjectIcon string `json:"projectIcon"`
	IsPublic    bool   `json:"isPublic"`
}

type ProjectQueryPageRequest struct {
	TeamId string `json:"teamId"`
}

type ProjectQueryPageResp struct {
	Success bool                    `json:"success"`
	Message string                  `json:"message"`
	Data    []*ProjectQueryPageData `json:"data"`
}

type ProjectUpdateRequest struct {
	Id          string `json:"id"`
	ProjectName string `json:"projectName"`
	IsPublic    bool   `json:"isPublic"`
}

type ProjectUpdateResp struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type TeamCreateRequest struct {
	TeamName string `json:"teamName"`
}

type TeamCreateResp struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type TeamDeleteRequest struct {
	Id string `path:"id"`
}

type TeamDeleteResp struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type TeamDetailData struct {
	TeamId    string `json:"teamId"`
	TeamName  string `json:"teamName"`
	IsManager bool   `json:"isManager"`
}

type TeamDetailRequest struct {
	Id string `path:"id"`
}

type TeamDetailResp struct {
	Success bool           `json:"success"`
	Message string         `json:"message"`
	Data    TeamDetailData `json:"data"`
}

type TeamQueryPageData struct {
	Id       string `json:"id"`
	TeamName string `json:"teamName"`
}

type TeamQueryPageRequest struct {
}

type TeamQueryPageResp struct {
	Success bool                 `json:"success"`
	Message string               `json:"message"`
	Data    []*TeamQueryPageData `json:"data"`
}

type TeamUpdateRequest struct {
	Id       string `json:"id"`
	TeamName string `json:"teamName"`
}

type TeamUpdateResp struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type UserQueryPageData struct {
	Total      int64                      `json:"total"`
	TotalPages int64                      `json:"totalPages"`
	Current    int64                      `json:"current"`
	PageSize   int64                      `json:"pageSize"`
	Records    []*UserQueryPageDataRecord `json:"records"`
}

type UserQueryPageDataRecord struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

type UserQueryPageRequest struct {
	Current  int `json:"current"`
	PageSize int `json:"pageSize"`
}

type UserQueryPageResp struct {
	Success bool              `json:"success"`
	Message string            `json:"message"`
	Data    UserQueryPageData `json:"data"`
}
