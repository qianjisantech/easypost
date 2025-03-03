// Code generated by goctl. DO NOT EDIT.
package types

type ApiCopyRequest struct {
	Id string `json:"id"`
}

type ApiCopyResp struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type ApiDeleteRequest struct {
	Id string `path:"id"`
}

type ApiDeleteResp struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type ApiDetailData struct {
	Id               string                         `json:"id"`
	Path             string                         `json:"path"`
	Name             string                         `json:"name"`
	Method           string                         `json:"method"`
	Status           string                         `json:"status"`
	ResponsibleId    string                         `json:"responsibleId"`
	Tags             []string                       `json:"tags"`
	ServerId         string                         `json:"serverId"`
	Description      string                         `json:"description"`
	Parameters       ApiDetailDataParameters        `json:"parameters"`
	Responses        []ApiDetailDataResponse        `json:"responses"`
	ResponseExamples []ApiDetailDataResponseExample `json:"responseExamples"`
	RequestBody      ApiDetailDataRequestBody       `json:"requestBody"`
}

type ApiDetailDataParameters struct {
	Path   []ApiDetailDataParametersPath   `json:"path"`
	Query  []ApiDetailDataParametersQuery  `json:"query"`
	Header []ApiDetailDataParametersHeader `json:"header"`
	Cookie []ApiDetailDataParametersCookie `json:"cookie"`
}

type ApiDetailDataParametersCookie struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Type        string `json:"type"`
	Example     string `json:"example"`
	Description string `json:"description"`
}

type ApiDetailDataParametersHeader struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Type        string `json:"type"`
	Example     string `json:"example"`
	Description string `json:"description"`
}

type ApiDetailDataParametersPath struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Type        string `json:"type"`
	Required    bool   `json:"required"`
	Enabled     bool   `json:"enabled"`
	Description string `json:"description"`
	Example     string `json:"example"`
}

type ApiDetailDataParametersQuery struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Type        string `json:"type"`
	Required    bool   `json:"required"`
	Enabled     bool   `json:"enabled"`
	Description string `json:"description"`
	Example     string `json:"example"`
}

type ApiDetailDataRequestBody struct {
	Id         string `json:"id"`
	JsonSchema string `json:"jsonSchema"`
	Type       string `json:"type"`
}

type ApiDetailDataResponse struct {
	Id          string                          `json:"id"`
	Code        int                             `json:"code"`
	Name        string                          `json:"name"`
	ContentType string                          `json:"contentType"`
	JsonSchema  ApiDetailDataResponseJsonSchema `json:"jsonSchema"`
}

type ApiDetailDataResponseExample struct {
	Id         string      `json:"id"`
	ResponseId string      `json:"responseId"`
	Name       string      `json:"name"`
	Data       interface{} `json:"data"`
}

type ApiDetailDataResponseJsonSchema struct {
	Type       string                                    `json:"type"`
	Properties []ApiDetailDataResponseJsonSchemaProperty `json:"properties"`
}

type ApiDetailDataResponseJsonSchemaProperty struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Type        string `json:"type"`
	Description string `json:"description"`
	DisPlayName string `json:"displayName"`
}

type ApiDetailRequest struct {
	Id int `path:"id"`
}

type ApiDetailResp struct {
	Success bool          `json:"success"`
	Message string        `json:"message"`
	Data    ApiDetailData `json:"data"`
}

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
	Path   []ApiDetailSaveDataParametersPath   `json:"path,optional"`
	Query  []ApiDetailSaveDataParametersQuery  `json:"query,optional"`
	Header []ApiDetailSaveDataParametersHeader `json:"header,optional"`
	Cookie []ApiDetailSaveDataParametersCookie `json:"cookie,optional"`
}

type ApiDetailSaveDataParametersCookie struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Type        string `json:"type"`
	Example     string `json:"example,optional"`
	Description string `json:"description"`
}

type ApiDetailSaveDataParametersHeader struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Type        string `json:"type"`
	Example     string `json:"example,optional"`
	Description string `json:"description"`
}

type ApiDetailSaveDataParametersPath struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Type        string `json:"type"`
	Example     string `json:"example,optional"`
	Description string `json:"description"`
}

type ApiDetailSaveDataParametersQuery struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Type        string `json:"type"`
	Example     string `json:"example,optional"`
	Description string `json:"description"`
}

type ApiDetailSaveDataRequestBody struct {
	Type       string `json:"type"`
	Id         string `json:"id"`
	JsonSchema string `json:"jsonSchema"`
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
	Success bool                  `json:"success"`
	Message string                `json:"message"`
	Data    ApiDetailSaveRespData `json:"data"`
}

type ApiDetailSaveRespData struct {
	Id string `json:"id"`
}

type ApiMoveRequest struct {
	Id       string `json:"id"`
	ParentId string `json:"parentId"`
}

type ApiMoveResp struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type ApiRecycleGroupQueryRequest struct {
}

type ApiRecycleGroupQueryResp struct {
	Success bool                   `json:"success"`
	Message string                 `json:"message"`
	Data    []ApiTreeQueryPageData `json:"data"`
}

type ApiRenameRequest struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type ApiRenameResp struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type ApiTreeQueryPageData struct {
	Id       string `json:"id"`
	ParentId string `json:"parentId"`
	Name     string `json:"name"`
	Type     string `json:"type"`
	Method   string `json:"method"`
}

type ApiTreeQueryPageRequest struct {
	ProjectId string `json:"projectId"`
}

type ApiTreeQueryPageResp struct {
	Success bool                   `json:"success"`
	Message string                 `json:"message"`
	Data    []ApiTreeQueryPageData `json:"data"`
}

type AuthEmailCodeRegisterData struct {
	AccessToken     string `json:"accessToken"`
	NeedSetPassword bool   `json:"needSetPassword"`
}

type AuthEmailCodeRegisterReq struct {
	Email string `json:"email"`
	Code  string `json:"code"`
}

type AuthEmailCodeRegisterResp struct {
	Success bool                      `json:"success"`
	Message string                    `json:"message"`
	Data    AuthEmailCodeRegisterData `json:"data"`
}

type AuthEmailLoginData struct {
	AccessToken string `json:"accessToken"`
}

type AuthEmailLoginReq struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AuthEmailLoginResp struct {
	Success bool               `json:"success"`
	Message string             `json:"message"`
	Data    AuthEmailLoginData `json:"data"`
}

type AuthEmailSendCodeReq struct {
	Email string `json:"email"`
}

type AuthEmailSendCodeResp struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type DocDetailData struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	Content string `json:"content"`
}

type DocDetailRequest struct {
	Id int `path:"id"`
}

type DocDetailResp struct {
	Success bool          `json:"success"`
	Message string        `json:"message"`
	Data    DocDetailData `json:"data"`
}

type DocSaveData struct {
	Id string `json:"id"`
}

type DocSaveRequest struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	Content string `json:"content"`
}

type DocSaveResp struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Data    DocSaveData `json:"data"`
}

type FolderDetailRequest struct {
}

type FolderDetailResp struct {
}

type FolderDetailSaveRequest struct {
}

type FolderDetailSaveResp struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
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

type Team struct {
	Id       string `json:"id"`
	TeamName string `json:"teamName"`
}

type TeamCreateData struct {
	Id       string `json:"id"`
	TeamName string `json:"teamName"`
}

type TeamCreateRequest struct {
	TeamName string `json:"teamName"`
}

type TeamCreateResp struct {
	Success bool           `json:"success"`
	Message string         `json:"message"`
	Data    TeamCreateData `json:"data"`
}

type TeamDeleteRequest struct {
	Id string `path:"id"`
}

type TeamDeleteResp struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type TeamDetailData struct {
	TeamId         string `json:"teamId"`
	TeamName       string `json:"teamName"`
	TeamPermission int    `json:"teamPermission"`
}

type TeamDetailRequest struct {
	Id string `path:"id"`
}

type TeamDetailResp struct {
	Success bool           `json:"success"`
	Message string         `json:"message"`
	Data    TeamDetailData `json:"data"`
}

type TeamMemberInviteRequest struct {
	UserIds []string `json:"userIds"`
	TeamId  string   `json:"teamId"`
}

type TeamMemberInviteResp struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type TeamMemberQueryPageData struct {
	Total      int64                        `json:"total"`
	TotalPages int64                        `json:"totalPages"`
	Current    int64                        `json:"current"`
	PageSize   int64                        `json:"pageSize"`
	Records    []*TeamMemberQueryPageRecord `json:"records"`
}

type TeamMemberQueryPageRecord struct {
	Id         string `json:"id"`
	Name       string `json:"name"`
	Username   string `json:"username"`
	Email      string `json:"email"`
	Permission int    `json:"permission"`
}

type TeamMemberQueryPageRequest struct {
	Current  int    `json:"current"`
	PageSize int    `json:"pageSize"`
	TeamId   string `json:"teamId"`
}

type TeamMemberQueryPageResp struct {
	Success bool                    `json:"success"`
	Message string                  `json:"message"`
	Data    TeamMemberQueryPageData `json:"data"`
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

type TeamSettingsDetailData struct {
	TeamId      string `json:"teamId"`
	TeamName    string `json:"teamName"`
	MemberId    string `json:"memberId"`
	MemeberName string `json:"memeberName"`
	Permission  int    `json:"permission"`
}

type TeamSettingsDetailRequest struct {
	Id string `path:"id"`
}

type TeamSettingsDetailResp struct {
	Success bool                   `json:"success"`
	Message string                 `json:"message"`
	Data    TeamSettingsDetailData `json:"data"`
}

type TeamUpdateRequest struct {
	Id       string `json:"id"`
	TeamName string `json:"teamName"`
}

type TeamUpdateResp struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type TeamUserSearchData struct {
	Total      int64                       `json:"total"`
	TotalPages int64                       `json:"totalPages"`
	Current    int64                       `json:"current"`
	PageSize   int64                       `json:"pageSize"`
	Records    []*TeamUserSearchDataRecord `json:"records"`
}

type TeamUserSearchDataRecord struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

type TeamUserSearchRequest struct {
	Current  int    `json:"current"`
	PageSize int    `json:"pageSize"`
	TeamId   string `json:"teamId"`
	Keyword  string `json:"keyword"`
}

type TeamUserSearchResp struct {
	Success bool               `json:"success"`
	Message string             `json:"message"`
	Data    TeamUserSearchData `json:"data"`
}

type UserActionsRequest struct {
	Type          string `json:"type"`
	LastClickMenu string `json:"lastClickMenu,optional"`
}

type UserActionsResp struct {
}

type UserProfileData struct {
	UserId   string  `json:"userId"`
	Username string  `json:"username"`
	Name     string  `json:"name"`
	TeamList []*Team `json:"teamList"`
}

type UserProfileRequest struct {
}

type UserProfileResp struct {
	Success bool            `json:"success"`
	Message string          `json:"message"`
	Data    UserProfileData `json:"data"`
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

type UserSetPasswordRequest struct {
	Password string `json:"password"`
}

type UserSetPasswordResp struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}
