package team

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"backed/internal/middleware"
	"backed/internal/utils/ep"
	"context"
	"math"
	"strconv"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type TeamUserSearchLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTeamUserSearchLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TeamUserSearchLogic {
	return &TeamUserSearchLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TeamUserSearchLogic) TeamUserSearch(req *types.TeamUserSearchRequest) (resp *types.TeamUserSearchResp, err error) {
	db := l.svcCtx.DB.Debug()
	contentInfo := l.ctx.Value("contentInfo").(*middleware.ContentInfo)
	teamId := contentInfo.TeamId
	// 校验分页参数
	if req.PageSize <= 0 || req.Current <= 0 {
		return nil, errorx.NewDefaultError("invalid pagination parameters")
	}

	var users []model.SysUser
	var total int64
	likeKeyword := "%" + req.Keyword + "%"

	// 查询总数
	countSQL := `
		SELECT COUNT(a.id)
		 FROM  sys_user a
         WHERE (a.username LIKE ? OR a.email LIKE ?) AND   NOT EXISTS (
         SELECT 1 FROM sys_team_member b WHERE b.user_id = a.id and b.team_id = ?)
	`
	if err := db.Raw(countSQL, likeKeyword, likeKeyword, teamId).Scan(&total).Error; err != nil {
		return nil, errorx.NewDefaultError(err.Error())
	}

	// 查询用户列表
	sql := `
         SELECT a.id, a.username, a.name, a.email FROM  sys_user a
         WHERE (a.username LIKE ? OR a.email LIKE ?) AND   NOT EXISTS (
         SELECT 1 FROM sys_team_member b WHERE b.user_id = a.id and b.team_id = ?
);
	`
	if err := db.Raw(sql, likeKeyword, likeKeyword, teamId).Scan(&users).Error; err != nil {
		return nil, errorx.NewDefaultError(err.Error())
	}

	// 数据转换
	records := make([]*types.TeamUserSearchDataRecord, len(users))
	for i, user := range users {
		records[i] = &types.TeamUserSearchDataRecord{
			Id:       strconv.FormatInt(user.ID, 10),
			Username: ep.StringIfNotNil(user.Username, ""),
			Name:     ep.StringIfNotNil(user.Name, ""),
			Email:    ep.StringIfNotNil(user.Email, ""),
		}
	}

	// 构建返回数据
	return &types.TeamUserSearchResp{
		Success: true,
		Message: "success",
		Data: types.TeamUserSearchData{
			Current:    int64(req.Current),
			PageSize:   int64(req.PageSize),
			TotalPages: int64(math.Ceil(float64(total) / float64(req.PageSize))),
			Total:      total,
			Records:    records,
		},
	}, nil
}
