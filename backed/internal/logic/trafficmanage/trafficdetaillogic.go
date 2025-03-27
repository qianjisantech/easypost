package trafficmanage

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"backed/internal/svc"
	"backed/internal/types"
	"backed/internal/utils/ep"
	"context"
	"strconv"
	"time"

	"github.com/zeromicro/go-zero/core/logx"
)

type TrafficDetailLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTrafficDetailLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TrafficDetailLogic {
	return &TrafficDetailLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TrafficDetailLogic) TrafficDetail(req *types.TrafficDetailRequest) (resp *types.TrafficDetailResp, err error) {
	// 将请求 ID 转换为 int64
	id, err := strconv.ParseInt(strconv.Itoa(req.Id), 10, 64)
	if err != nil {
		return nil, errorx.NewDefaultError("无效的 ID")
	}

	// 查询主表数据
	db := l.svcCtx.DB.Debug()
	var ftm *model.GsTrafficManager
	tx := db.First(&ftm, id)
	if tx.Error != nil {
		return nil, errorx.NewDefaultError(tx.Error.Error())
	}

	// 查询 headers
	headers, err := l.QueryHeadersById(id)
	if err != nil {
		return nil, errorx.NewDefaultError("获取请求头失败: " + err.Error())
	}

	// 查询 requestBody
	requestBody, err := l.QueryRequestBodyById(id)
	if err != nil {
		// 如果 requestBody 为空，返回默认值
		requestBody = &model.GsTrafficManagerRequestBody{Value: nil}
	}

	// 查询 response
	response, err := l.QueryResponseById(id)
	if err != nil {
		// 如果 response 为空，返回默认值
		response = &model.GsTrafficManagerResponse{Value: nil}
	}

	// 构建响应数据
	return &types.TrafficDetailResp{
		Success: true,
		Message: "success",
		Data: types.TrafficDetailData{
			Id:          strconv.FormatInt(ftm.ID, 10),
			TaskId:      strconv.FormatInt(*ftm.TaskID, 10),
			Url:         *ftm.IP + *ftm.URL,
			Method:      *ftm.Method,
			RequestBody: ep.StringIfNotNil(requestBody.Value, "-"), // 处理空值
			Response:    ep.StringIfNotNil(response.Value, "-"),    // 处理空值
			Headers:     headers,                                   // 已经处理为空切片
			Status:      int(ftm.Status),
			RecordTime:  ftm.RecordTime.Format(time.DateTime),
		},
	}, nil
}
func (l *TrafficDetailLogic) QueryHeadersById(id int64) ([]*types.TrafficDetailDataHeader, error) {
	db := l.svcCtx.DB.Debug()
	var gtmhs []*model.GsTrafficManagerHeader
	tx := db.Find(&gtmhs, id)
	if tx.Error != nil {
		return nil, tx.Error
	}

	if len(gtmhs) == 0 {
		return []*types.TrafficDetailDataHeader{}, nil
	}
	// 将 []*model.GsTrafficManagerHeader 转换为 []*types.TrafficDetailDataHeader
	var tddhs []*types.TrafficDetailDataHeader
	for _, gtmh := range gtmhs {
		tddhs = append(tddhs, &types.TrafficDetailDataHeader{
			Key:   *gtmh.Key,
			Value: *gtmh.Value,
		})
	}

	return tddhs, nil
}
func (l *TrafficDetailLogic) QueryRequestBodyById(id int64) (*model.GsTrafficManagerRequestBody, error) {
	db := l.svcCtx.DB.Debug()
	var gtmrb *model.GsTrafficManagerRequestBody
	tx := db.First(&gtmrb, id)
	if tx.Error != nil {
		return nil, tx.Error
	}
	return gtmrb, nil
}
func (l *TrafficDetailLogic) QueryResponseById(id int64) (*model.GsTrafficManagerResponse, error) {
	db := l.svcCtx.DB.Debug()
	var gtmr *model.GsTrafficManagerResponse
	tx := db.First(&gtmr, id)
	if tx.Error != nil {
		return nil, tx.Error
	}
	return gtmr, nil
}
