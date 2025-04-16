package api

import (
	"backed/gen/model"
	"backed/internal/utils/ep"
	"context"
	"encoding/json"
	"strconv"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ApiRunDetailLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiRunDetailLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiRunDetailLogic {
	return &ApiRunDetailLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiRunDetailLogic) ApiRunDetail(req *types.ApiRunDetailRequest) (resp *types.ApiRunDetailResp, err error) {
	id, err := strconv.ParseInt(strconv.Itoa(req.Id), 10, 64)
	amAPI, err := l.QueryApiDetailById(id) //根据id查询api详情

	var parameters Parameters

	if amAPI.Parameters != nil {
		err = json.Unmarshal([]byte(*amAPI.Parameters), &parameters)
	} else {
		parameters = Parameters{}
	}
	defaultType := "apiDetail"
	return &types.ApiRunDetailResp{
		Success: true,
		Message: "加载成功",
		Data: types.ApiRunDetailData{
			Id:       strconv.FormatInt(amAPI.ID, 10),
			Type:     defaultType,
			ParentId: strconv.FormatInt(*amAPI.ParentID, 10),
			Name:     ep.StringIfNotNil(amAPI.Name, ""),
			Data: types.ApiRunDetailDataData{
				Id:         strconv.FormatInt(amAPI.ID, 10),
				Name:       ep.StringIfNotNil(amAPI.Name, ""),
				Path:       ep.StringIfNotNil(amAPI.Path, ""),
				Method:     ep.StringIfNotNil(amAPI.Method, ""),
				Parameters: parameters,
			},
		},
	}, nil
}

// QueryApiDetailById 根据id查询api详情
func (l *ApiRunDetailLogic) QueryApiDetailById(id int64) (*model.AmsAPI, error) {
	db := l.svcCtx.DB.Debug()
	var amApi *model.AmsAPI
	tx := db.First(&amApi, id)
	if tx.Error != nil {
		logx.Errorf("Error QueryApiDetailById: %v", tx.Error)
		return nil, tx.Error
	}
	return amApi, nil
}
