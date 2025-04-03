// Code generated by goctl. DO NOT EDIT.
package types

type ApiCaseCopyRequest struct {
	Id string `json:"id"`
}

type ApiCaseCopyResp struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type ApiCaseDeleteRequest struct {
	Id string `path:"id"`
}

type ApiCaseDeleteResp struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type ApiCaseDetailCreateOrUpdateParameter struct {
	Id          string `json:"id,optional"`
	Name        string `json:"name,optional"`
	Type        string `json:"type,optional"`
	Example     string `json:"example,optional"`
	Description string `json:"description,optional"`
}

type ApiCaseDetailCreateOrUpdateParameters struct {
	Path   []ApiCaseDetailCreateOrUpdateParameter `json:"path"`
	Header []ApiCaseDetailCreateOrUpdateParameter `json:"header"`
	Query  []ApiCaseDetailCreateOrUpdateParameter `json:"query"`
	Cookie []ApiCaseDetailCreateOrUpdateParameter `json:"cookie"`
}

type ApiCaseDetailCreateOrUpdateRequest struct {
	Id               string   `form:"id,optional"`
	Name             string   `form:"name,optional"`
	Type             string   `form:"type,optional"`
	ParentId         string   `form:"parentId,optional"`
	Method           string   `form:"method,optional"`
	Path             string   `form:"path,optional"`
	Status           string   `form:"status,optional"`
	Responsible      string   `form:"responsible,optional"`
	Tags             []string `form:"tags,optional"`
	ServerId         string   `form:"serverId,optional"`
	Description      string   `form:"description,optional"`
	Parameters       string   `form:"parameters,optional"`
	Responses        string   `form:"responses,optional"`
	RequestBody      string   `form:"requestBody,optional"`
	ResponseExamples string   `form:"responseExamples,optional"`
}

type ApiCaseDetailCreateOrUpdateResp struct {
	Success bool                                `json:"success"`
	Message string                              `json:"message"`
	Data    ApiCaseDetailCreateOrUpdateRespData `json:"data"`
}

type ApiCaseDetailCreateOrUpdateRespData struct {
	Id               string      `json:"id"`
	Path             string      `json:"path"`
	Name             string      `json:"name"`
	Method           string      `json:"method"`
	Status           string      `json:"status"`
	Responsible      string      `json:"responsible"`
	Tags             []string    `json:"tags"`
	ServerId         string      `json:"serverId"`
	Description      string      `json:"description"`
	Parameters       interface{} `json:"parameters"`
	Responses        interface{} `json:"responses"`
	ResponseExamples interface{} `json:"responseExamples"`
	RequestBody      interface{} `json:"requestBody"`
}

type ApiCaseDetailData struct {
	Id       string                `json:"id"`
	ParentId string                `json:"parentId"`
	Name     string                `json:"name"`
	Type     string                `json:"type"`
	Data     ApiCaseDetailDataData `json:"data"`
}

type ApiCaseDetailDataData struct {
	Id               string      `json:"id"`
	Name             string      `json:"name"`
	Path             string      `json:"path"`
	Method           string      `json:"method"`
	Status           string      `json:"status"`
	Responsible      interface{} `json:"responsible"`
	Tags             []string    `json:"tags"`
	ServerId         string      `json:"serverId"`
	Description      string      `json:"description"`
	Parameters       interface{} `json:"parameters"`
	Responses        interface{} `json:"responses"`
	ResponseExamples interface{} `json:"responseExamples"`
	RequestBody      interface{} `json:"requestBody"`
}

type ApiCaseDetailRequest struct {
	Id int `path:"id"`
}

type ApiCaseDetailResp struct {
	Success bool              `json:"success"`
	Message string            `json:"message"`
	Data    ApiCaseDetailData `json:"data"`
}

type ApiCaseMoveRequest struct {
	Id       string `json:"id"`
	ParentId string `json:"parentId"`
}

type ApiCaseMoveResp struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type ApiCaseRenameRequest struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type ApiCaseRenameResp struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type ApiCaseRunDetailData struct {
	Id       string                   `json:"id"`
	ParentId string                   `json:"parentId"`
	Name     string                   `json:"name"`
	Type     string                   `json:"type"`
	Data     ApiCaseRunDetailDataData `json:"data"`
}

type ApiCaseRunDetailDataData struct {
	Id               string      `json:"id"`
	Name             string      `json:"name"`
	Path             string      `json:"path"`
	Method           string      `json:"method"`
	Status           string      `json:"status"`
	Tags             []string    `json:"tags"`
	ServerId         string      `json:"serverId"`
	Description      string      `json:"description"`
	Parameters       interface{} `json:"parameters"`
	Responses        interface{} `json:"responses"`
	ResponseExamples interface{} `json:"responseExamples"`
	RequestBody      interface{} `json:"requestBody"`
}

type ApiCaseRunDetailRequest struct {
	Id int `path:"id"`
}

type ApiCaseRunDetailResp struct {
	Success bool                 `json:"success"`
	Message string               `json:"message"`
	Data    ApiCaseRunDetailData `json:"data"`
}

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

type ApiDetailCreateOrUpdateParameter struct {
	Id          string `json:"id,optional"`
	Name        string `json:"name,optional"`
	Type        string `json:"type,optional"`
	Example     string `json:"example,optional"`
	Description string `json:"description,optional"`
}

type ApiDetailCreateOrUpdateParameters struct {
	Path   []ApiDetailCreateOrUpdateParameter `json:"path"`
	Header []ApiDetailCreateOrUpdateParameter `json:"header"`
	Query  []ApiDetailCreateOrUpdateParameter `json:"query"`
	Cookie []ApiDetailCreateOrUpdateParameter `json:"cookie"`
}

type ApiDetailCreateOrUpdateRequest struct {
	Id               string   `form:"id,optional"`
	Name             string   `form:"name,optional"`
	Type             string   `form:"type,optional"`
	ParentId         string   `form:"parentId,optional"`
	Method           string   `form:"method,optional"`
	Path             string   `form:"path,optional"`
	Status           string   `form:"status,optional"`
	Responsible      string   `form:"responsible,optional"`
	Tags             []string `form:"tags,optional"`
	ServerId         string   `form:"serverId,optional"`
	Description      string   `form:"description,optional"`
	Parameters       string   `form:"parameters,optional"`
	Responses        string   `form:"responses,optional"`
	RequestBody      string   `form:"requestBody,optional"`
	ResponseExamples string   `form:"responseExamples,optional"`
}

type ApiDetailCreateOrUpdateResp struct {
	Success bool                            `json:"success"`
	Message string                          `json:"message"`
	Data    ApiDetailCreateOrUpdateRespData `json:"data"`
}

type ApiDetailCreateOrUpdateRespData struct {
	Id string `json:"id"`
}

type ApiDetailData struct {
	Id       string            `json:"id"`
	ParentId string            `json:"parentId"`
	Name     string            `json:"name"`
	Type     string            `json:"type"`
	Data     ApiDetailDataData `json:"data"`
}

type ApiDetailDataData struct {
	Id               string      `json:"id"`
	Name             string      `json:"name"`
	Path             string      `json:"path"`
	Method           string      `json:"method"`
	Status           string      `json:"status"`
	Responsible      interface{} `json:"responsible"`
	Tags             []string    `json:"tags"`
	ServerId         string      `json:"serverId"`
	Description      string      `json:"description"`
	Parameters       interface{} `json:"parameters"`
	Responses        interface{} `json:"responses"`
	ResponseExamples interface{} `json:"responseExamples"`
	RequestBody      interface{} `json:"requestBody"`
}

type ApiDetailRequest struct {
	Id int `path:"id"`
}

type ApiDetailResp struct {
	Success bool          `json:"success"`
	Message string        `json:"message"`
	Data    ApiDetailData `json:"data"`
}

type ApiDocDetailData struct {
	Id       string               `json:"id"`
	ParentId string               `json:"parentId"`
	Name     string               `json:"name"`
	Type     string               `json:"type"`
	Data     ApiDocDetailDataData `json:"data"`
}

type ApiDocDetailDataData struct {
	Id               string      `json:"id"`
	Name             string      `json:"name"`
	Path             string      `json:"path"`
	Method           string      `json:"method"`
	Status           string      `json:"status"`
	Responsible      interface{} `json:"responsible"`
	Tags             []string    `json:"tags"`
	ServerId         string      `json:"serverId"`
	Description      string      `json:"description"`
	Parameters       interface{} `json:"parameters"`
	Responses        interface{} `json:"responses"`
	ResponseExamples interface{} `json:"responseExamples"`
	RequestBody      interface{} `json:"requestBody"`
	CreatBy          string      `json:"createBy"`
	CreatByName      string      `json:"createByName"`
	CreateTime       string      `json:"createTime"`
	UpdateBy         string      `json:"updateBy"`
	UpdateByName     string      `json:"updateByName"`
	UpdateTime       string      `json:"updateTime"`
}

type ApiDocDetailRequest struct {
	Id int `path:"id"`
}

type ApiDocDetailResp struct {
	Success bool             `json:"success"`
	Message string           `json:"message"`
	Data    ApiDocDetailData `json:"data"`
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

type ApiRunDetailData struct {
	Id       string               `json:"id"`
	ParentId string               `json:"parentId"`
	Name     string               `json:"name"`
	Type     string               `json:"type"`
	Data     ApiRunDetailDataData `json:"data"`
}

type ApiRunDetailDataData struct {
	Id               string      `json:"id"`
	Name             string      `json:"name"`
	Path             string      `json:"path"`
	Method           string      `json:"method"`
	Status           string      `json:"status"`
	Tags             []string    `json:"tags"`
	ServerId         string      `json:"serverId"`
	Description      string      `json:"description"`
	Parameters       interface{} `json:"parameters"`
	Responses        interface{} `json:"responses"`
	ResponseExamples interface{} `json:"responseExamples"`
	RequestBody      interface{} `json:"requestBody"`
}

type ApiRunDetailRequest struct {
	Id int `path:"id"`
}

type ApiRunDetailResp struct {
	Success bool             `json:"success"`
	Message string           `json:"message"`
	Data    ApiRunDetailData `json:"data"`
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

type DeepSeekChatData struct {
	Conetent string `json:"conetent"`
}

type DeepSeekChatRequest struct {
	Conetent string `json:"conetent"`
}

type DeepSeekChatResp struct {
	Success bool             `json:"success"`
	Message string           `json:"message"`
	Data    DeepSeekChatData `json:"data"`
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

type EsSearchQuery struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

type EsSearchRegex struct {
	Address string   `json:"address"`
	Header  []string `json:"header"`
	Paylod  string   `json:"paylod"`
	Method  string   `json:"method"`
}

type EsSearchRequest struct {
	Query []*EsSearchQuery `form:"query"`
	Regex EsSearchRegex    `form:"regex,optional"`
}

type EsSearchResp struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

type EsSynchronizeRequest struct {
	Body string `json:"body"`
}

type EsSynchronizeResp struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type FolderDetailRequest struct {
	Id string `path:"id"`
}

type FolderDetailResp struct {
	Success bool                 `json:"success"`
	Message string               `json:"message"`
	Data    FolderDetailRespData `json:"data"`
}

type FolderDetailRespData struct {
	Id          string `json:"id"`
	ParentId    string `json:"parentId"`
	Type        string `json:"type"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type FolderDetailSaveRequest struct {
	Id          string `json:"id"`
	ParentId    string `json:"parentId"`
	Name        string `json:"name"`
	Description string `json:"description"`
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

type ResponsibleSearchRequest struct {
	TeamId  string `json:"teamId"`
	Content string `json:"content"`
}

type ResponsibleSearchResp struct {
	Success bool                        `json:"success"`
	Message string                      `json:"message"`
	Data    []ResponsibleSearchRespData `json:"data"`
}

type ResponsibleSearchRespData struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	Username string `json:"username"`
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

type TrafficDetailData struct {
	Id          string                     `json:"id"`
	TaskId      string                     `json:"taskId"`
	Url         string                     `json:"url"`
	Method      string                     `json:"method"`
	RequestBody string                     `json:"requestBody"`
	Headers     []*TrafficDetailDataHeader `json:"headers"`
	Response    string                     `json:"response"`
	Status      int                        `json:"status"`
	RecordTime  string                     `json:"recordTime"`
}

type TrafficDetailDataHeader struct {
	Id    string `json:"id"`
	Key   string `json:"key"`
	Value string `json:"value"`
}

type TrafficDetailRequest struct {
	Id int `path:"id"`
}

type TrafficDetailResp struct {
	Success bool              `json:"success"`
	Message string            `json:"message"`
	Data    TrafficDetailData `json:"data"`
}

type TrafficQueryPageData struct {
	Total      int64                     `json:"total"`
	TotalPages int64                     `json:"totalPages"`
	Current    int64                     `json:"current"`
	PageSize   int64                     `json:"pageSize"`
	Records    []*TrafficQueryPageRecord `json:"records"`
}

type TrafficQueryPageRecord struct {
	Id         string `json:"id"`
	Ip         string `json:"ip"`
	Url        string `json:"url"`
	Method     string `json:"method"`
	Status     int    `json:"status"`
	RecordTime string `json:"recordTime"`
	TaskId     string `json:"taskId"`
}

type TrafficQueryPageRequest struct {
	Current    int    `json:"current"`
	PageSize   int    `json:"pageSize"`
	RecordTime string `json:"recordTime,optional"`
	TaskId     string `json:"taskId,optional"`
	Ip         string `json:"ip,optional"`
	Url        string `json:"url,optional"`
}

type TrafficQueryPageResp struct {
	Success bool                 `json:"success"`
	Message string               `json:"message"`
	Data    TrafficQueryPageData `json:"data"`
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
