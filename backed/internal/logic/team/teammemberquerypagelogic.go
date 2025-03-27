package team

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"backed/internal/utils/ep"
	"context"
	"log"
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

	// 校验请求参数
	if req.PageSize <= 0 || req.Current <= 0 {
		return nil, errorx.NewDefaultError("invalid pagination parameters")
	}

	teamId, err := strconv.ParseInt(req.TeamId, 10, 64)
	if err != nil {
		return nil, errorx.NewDefaultError("invalid team id")
	}

	var total int64
	var sysTeamMembers []model.SysTeamMember

	// 1. 先查询总数
	if err := db.Model(&model.SysTeamMember{}).
		Where("team_id = ?", teamId). // 修改为 = 而不是 IN
		Count(&total).Error; err != nil {
		return nil, errorx.NewDefaultError(err.Error())
	}

	// 2. 再查询分页数据
	offset := (req.Current - 1) * req.PageSize
	if err := db.Model(&model.SysTeamMember{}).
		Where("team_id = ?", teamId). // 修改为 = 而不是 IN
		Offset(int(offset)).
		Limit(int(req.PageSize)).
		Find(&sysTeamMembers).Error; err != nil {
		return nil, errorx.NewDefaultError(err.Error())
	}

	// 打印调试信息
	log.Printf("SQL Query: team_id=%d, offset=%d, limit=%d\n", teamId, offset, req.PageSize)
	log.Printf("Found %d records out of %d total\n", len(sysTeamMembers), total)

	// 转换记录
	records := make([]*types.TeamMemberQueryPageRecord, len(sysTeamMembers))
	for i, user := range sysTeamMembers {
		records[i] = &types.TeamMemberQueryPageRecord{
			Id:         strconv.FormatInt(user.ID, 10),
			Username:   ep.StringIfNotNil(user.Username, ""),
			Name:       ep.StringIfNotNil(user.Name, ""),
			Email:      ep.StringIfNotNil(user.Email, ""),
			Permission: int(*user.Permission),
		}
	}

	return &types.TeamMemberQueryPageResp{
		Success: true,
		Message: "success",
		Data: types.TeamMemberQueryPageData{
			Current:    int64(req.Current),
			PageSize:   int64(req.PageSize),
			TotalPages: int64(math.Ceil(float64(total) / float64(req.PageSize))),
			Total:      total,
			Records:    records,
		},
	}, nil
}
