package user

import (
	"backed/gen/model"
	"backed/internal/svc"
	"backed/internal/types"
	"context"
	"strconv"

	"github.com/zeromicro/go-zero/core/logx"
)

type UserProfileLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUserProfileLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UserProfileLogic {
	return &UserProfileLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UserProfileLogic) UserProfile(req *types.UserProfileRequest) (resp *types.UserProfileResp, err error) {
	userId := l.ctx.Value("userId").(int64)

	db := l.svcCtx.DB.Begin().Debug()
	var user model.SysUser
	tx := db.Where("id = ?", userId).First(&user)
	var sysTeams []*model.SysTeam
	sql := "select a.id,a.name,a.manager_id from sys_team a  left join sys_user_team b on a.id= b.team_id where a.is_deleted=0 and b.user_id=?"
	tx = db.WithContext(l.ctx).Raw(sql, userId).Scan(&sysTeams)
	if tx.Error != nil {
		return nil, tx.Error
	}
	data := make([]*types.Team, len(sysTeams))
	for i, sysTeam := range sysTeams {
		data[i] = &types.Team{
			Id:       strconv.FormatInt(sysTeam.ID, 10),
			TeamName: *sysTeam.Name,
		}
	}

	return &types.UserProfileResp{
		Success: true,
		Message: "success",
		Data: types.UserProfileData{
			UserId:   strconv.FormatInt(userId, 10),
			Username: *user.Username,
			Name:     *user.Name,
			TeamList: data,
		},
	}, nil
}
