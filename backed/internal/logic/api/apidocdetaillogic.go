package api

import (
	"backed/gen/model"
	"backed/internal/common/enum"
	"backed/internal/utils/ep"
	"context"
	"encoding/json"
	"strconv"
	"time"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ApiDocDetailLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiDocDetailLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiDocDetailLogic {
	return &ApiDocDetailLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiDocDetailLogic) ApiDocDetail(req *types.ApiDocDetailRequest) (resp *types.ApiDocDetailResp, err error) {
	id, err := strconv.ParseInt(strconv.Itoa(req.Id), 10, 64)
	amAPI, err := l.QueryApiDetailById(id) //根据id查询api详情

	var parameters Parameters
	var responses []Response
	var responseExamples []ResponseExample
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

	return &types.ApiDocDetailResp{
		Success: true,
		Message: "加载成功",
		Data: types.ApiDocDetailData{
			Id:       strconv.FormatInt(amAPI.ID, 10),
			Type:     enum.ApiDetail,
			ParentId: strconv.FormatInt(*amAPI.ParentID, 10),
			Name:     ep.StringIfNotNil(amAPI.Name, ""),
			Data: types.ApiDocDetailDataData{
				Id:               strconv.FormatInt(amAPI.ID, 10),
				Name:             ep.StringIfNotNil(amAPI.Name, ""),
				Path:             ep.StringIfNotNil(amAPI.Path, ""),
				Method:           ep.StringIfNotNil(amAPI.Method, ""),
				Status:           ep.StringIfNotNil(amAPI.Status, ""),
				ServerId:         ep.StringIfNotNil(amAPI.ServerID, ""),
				Description:      ep.StringIfNotNil(amAPI.Remark, ""),
				Responsible:      ep.StringIfNotNil(amAPI.Responsible, "{}"),
				Parameters:       parameters,
				Response:         responses,
				ResponseExamples: responseExamples,
				CreatBy:          strconv.FormatInt(*amAPI.CreateBy, 10),
				CreatByName:      *amAPI.CreateByName,
				CreateTime:       amAPI.CreateTime.Format(time.DateTime),
				UpdateBy:         strconv.FormatInt(*amAPI.UpdateBy, 10),
				UpdateByName:     *amAPI.UpdateByName,
				UpdateTime:       amAPI.UpdateTime.Format(time.DateTime),
			},
		},
	}, nil
}

// QueryApiDetailById 根据id查询api详情
func (l *ApiDocDetailLogic) QueryApiDetailById(id int64) (*model.AmsAPI, error) {
	db := l.svcCtx.DB.Debug()
	var amApi *model.AmsAPI
	tx := db.First(&amApi, id)
	if tx.Error != nil {
		logx.Errorf("Error QueryApiDetailById: %v", tx.Error)
		return nil, tx.Error
	}
	return amApi, nil
}
