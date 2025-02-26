package team

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"backed/internal/utils/ep"
	"context"
	"math"
	"strconv"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type TeamMemberQueryPageLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTeamMemberQueryPageLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TeamMemberQueryPageLogic {
	return &TeamMemberQueryPageLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TeamMemberQueryPageLogic) TeamMemberQueryPage(req *types.TeamMemberQueryPageRequest) (resp *types.TeamMemberQueryPageResp, err error) {
	db := l.svcCtx.DB.Debug()

	// 校验请求参数（如果有）
	if req.PageSize <= 0 || req.Current <= 0 {
		return nil, errorx.NewDefaultError("invalid pagination parameters")
	}
	// 设置分页查询参数
	offset := (req.Current - 1) * req.PageSize
	teamId, err := strconv.ParseInt(req.TeamId, 10, 64)
	var sysTeamMembers []model.SysTeamMember
	var total int64
	// 执行分页查询
	if err := db.Model(&model.SysTeamMember{}).
		Limit(req.PageSize).
		Offset(offset).
		Where("team_id IN (?)", teamId).
		Find(&sysTeamMembers).Error; err != nil {
		return nil, errorx.NewDefaultError(err.Error())
	}

	records := make([]*types.TeamMemberQueryPageRecord, len(sysTeamMembers))
	for i, user := range sysTeamMembers {
		records[i] = &types.TeamMemberQueryPageRecord{
			Id:         strconv.FormatInt(user.ID, 10),
			Username:   ep.StringIfNotNil(user.Username, ""),
			Name:       ep.StringIfNotNil(user.Name, ""),
			Email:      ep.StringIfNotNil(user.Email, ""), // 处理 Email 可能为 nil 的情况
			Permission: int(*user.Permission),
		}
	}

	// 构建返回的响应

	return &types.TeamMemberQueryPageResp{
		Success: true,
		Message: "success",
		Data: types.TeamMemberQueryPageData{
			Current:    int64(req.Current),
			PageSize:   int64(req.PageSize),
			TotalPages: int64(math.Ceil(float64(total) / float64(req.PageSize))),
			Total:      total,
			Records:    records, // 直接填充转换后的记录
		},
	}, nil
}
