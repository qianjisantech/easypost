package api

import (
	"backed/gen/model"
	"context"
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

func (l *ApiDirectoryDataQueryLogic) ApiDirectoryDataQuery(req *types.ApiDirectoryDataQueryRequest) (resp *types.ApiDirectoryDataQueryResp, err error) {
	res := l.queryApiDirectoryData()
	var datas []types.ApiDirectoryDataQueryData

	for _, r := range res {

		if *r.Type == "apiDetail" {
			apiDetail := &types.ApiDirectoryDataQueryData{
				Id:   strconv.FormatInt(int64(r.ID), 10),
				Name: *r.Name,
				ParentId: func() string {
					if r.ParentID != nil {
						return strconv.FormatInt(*r.ParentID, 10)
					}
					return "" // 如果 r.Manager 为 nil，则返回空字符串
				}(),
				Type: *r.Type,
				Data: types.ApiDirectoryDataQueryDataData{
					Id:     strconv.FormatInt(int64(r.ID), 10),
					Path:   *r.Path,
					Name:   *r.Name,
					Status: *r.Status,
					ResponsibleId: func() string {
						if r.Manager != nil {
							return *r.Manager
						}
						return "" // 如果 r.Manager 为 nil，则返回空字符串
					}(),
					Tags: func() []string {
						if r.Tag != nil {
							return []string{*r.Tag} // 如果 Tag 不为空，返回包含该 Tag 的数组
						} else {
							return nil // 如果 Tag 为空，返回一个空数组
						}

					}(),
					Method: *r.Method,
					ServerId: func() string {
						if r.ServerID != nil {
							return *r.ServerID
						}
						return ""
					}(),
				},
			}

			datas = append(datas, *apiDetail)
		}

		if *r.Type == "apiDetailFolder" {
			apiDetailFolder := &types.ApiDirectoryDataQueryData{
				Id:   strconv.FormatInt(int64(r.ID), 10),
				Name: *r.Name,
				Type: *r.Type,
			}
			datas = append(datas, *apiDetailFolder)
		}
		if *r.Type == "doc" {
			apiDetailFolder := &types.ApiDirectoryDataQueryData{
				Id:   strconv.FormatInt(int64(r.ID), 10),
				Name: *r.Name,
				Type: *r.Type,
				Data: types.ApiDirectoryDataQueryDataData{
					Id:      strconv.FormatInt(int64(r.ID), 10),
					Name:    *r.Name,
					Content: *r.Content,
				},
			}
			datas = append(datas, *apiDetailFolder)
		}

	}
	return &types.ApiDirectoryDataQueryResp{
		Code:    "200",
		Message: "查询成功",
		Data:    datas,
	}, nil

}
func (l *ApiDirectoryDataQueryLogic) queryApiDirectoryData() []*model.APIApiInfo {
	var result []*model.APIApiInfo

	sql := `
				select aai.*
				from api_api_info aai
				`
	db := l.svcCtx.DB
	db.WithContext(l.ctx).Raw(sql).Scan(&result)
	return result
}
