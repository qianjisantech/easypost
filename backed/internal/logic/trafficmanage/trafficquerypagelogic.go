package trafficmanage

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"context"
	"math"
	"strconv"
	"time"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type TrafficQueryPageLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTrafficQueryPageLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TrafficQueryPageLogic {
	return &TrafficQueryPageLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TrafficQueryPageLogic) TrafficQueryPage(req *types.TrafficQueryPageRequest) (resp *types.TrafficQueryPageResp, err error) {
	// 初始化数据库查询
	db := l.svcCtx.DB.Debug().WithContext(l.ctx)
	query := db.Model(&model.GsTrafficManager{})

	// 校验分页参数
	if req.PageSize <= 0 || req.Current <= 0 {
		return nil, errorx.NewDefaultError("分页参数必须大于零")
	}

	// 动态添加过滤条件
	if req.TaskId != "" {
		query = query.Where("task_id = ?", req.TaskId)
	}
	if req.Ip != "" {
		query = query.Where("ip = ?", req.Ip)
	}
	if req.Url != "" {
		query = query.Where("url = ?", req.Url)
	}
	if req.RecordTime != "" {
		query = query.Where("record_time = ?", req.RecordTime)
	}

	// 计算总数
	var total int64
	if err := query.Count(&total).Error; err != nil {
		return nil, errorx.NewDefaultError("查询总数失败: " + err.Error())
	}

	// 分页查询
	offset := (req.Current - 1) * req.PageSize
	var tms []*model.GsTrafficManager
	if err := query.Offset(offset).Limit(req.PageSize).Find(&tms).Error; err != nil {
		return nil, errorx.NewDefaultError("查询记录失败: " + err.Error())
	}

	// 转换记录结构
	records := make([]*types.TrafficQueryPageRecord, 0, len(tms))
	for _, tm := range tms {
		if tm.URL == nil {
			continue // 跳过无效记录或记录日志
		}
		records = append(records, &types.TrafficQueryPageRecord{
			Id:         strconv.FormatInt(tm.ID, 10),
			Ip:         *tm.IP,
			Url:        *tm.URL,
			Method:     *tm.Method,
			Status:     int(tm.Status),
			TaskId:     strconv.FormatInt(*tm.TaskID, 10),
			RecordTime: tm.RecordTime.Format(time.DateTime), // 时间 → 字符串
		})
	}

	// 计算总页数
	totalPages := int64(math.Ceil(float64(total) / float64(req.PageSize)))

	// 构造响应
	return &types.TrafficQueryPageResp{
		Success: true,
		Message: "加载成功",
		Data: types.TrafficQueryPageData{
			Current:    int64(req.Current),
			PageSize:   int64(req.PageSize),
			TotalPages: totalPages,
			Total:      total,
			Records:    records,
		},
	}, nil
}
