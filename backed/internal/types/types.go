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
	Id            string   `json:"id"`
	Path          string   `json:"path"`
	Name          string   `json:"name"`
	Method        string   `json:"method"`
	Status        string   `json:"status"`
	ResponsibleId string   `json:"responsibleId"`
	Tags          []string `json:"tags"`
	ServerId      string   `json:"serverId"`
}

type ApiDirectoryDataQueryRequest struct {
}

type ApiDirectoryDataQueryResp struct {
	Code    string                      `json:"code"`
	Message string                      `json:"message"`
	Data    []ApiDirectoryDataQueryData `json:"data"`
}
