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
		var tags []string
		tags = append(tags, *r.Tag)
		apiDirectoryDataQueryData := &types.ApiDirectoryDataQueryData{
			Id:       strconv.FormatInt(r.ID, 10),
			Name:     *r.Name,
			ParentId: strconv.FormatInt(*r.ParentID, 10),
			Type:     *r.Type,
			Data: types.ApiDirectoryDataQueryDataData{
				Id:            strconv.FormatInt(r.ID, 10),
				Path:          *r.Path,
				Name:          *r.Name,
				Status:        *r.Status,
				ResponsibleId: strconv.FormatInt(r.ID, 10),
				Tags:          tags,
				Method:        *r.Method,
				ServerId:      strconv.FormatInt(r.ID, 10),
			},
		}
		datas = append(datas, *apiDirectoryDataQueryData)
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
