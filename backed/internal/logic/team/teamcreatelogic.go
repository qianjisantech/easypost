package team

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"backed/internal/middleware"
	"backed/internal/svc"
	"backed/internal/types"
	"context"
	"strconv"

	"github.com/zeromicro/go-zero/core/logx"
)

type TeamCreateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTeamCreateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TeamCreateLogic {
	return &TeamCreateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TeamCreateLogic) TeamCreate(req *types.TeamCreateRequest) (resp *types.TeamCreateResp, err error) {
	contentInfo := l.ctx.Value("contentInfo").(*middleware.ContentInfo)
	userId := contentInfo.UserId
	// 从数据库开始事务
	db := l.svcCtx.DB.Begin().Debug()

	st := &model.SysTeam{
		Name:      &req.TeamName,
		ManagerID: &userId,
	}

	// 执行数据库操作
	tx := db.Create(st)

	var sysUser *model.SysUser
	state := int32(2)
	permission := int32(0)
	tx = db.Where("id=?", userId).First(&sysUser)
	if sysUser != nil {
		sysTeamMember := &model.SysTeamMember{
			UserID:     &sysUser.ID,
			Username:   sysUser.Username,
			Name:       sysUser.Name,
			Email:      sysUser.Email,
			TeamID:     &st.ID,
			State:      &state,
			Permission: &permission, //1为团队所有者
		}
		tx = db.Create(sysTeamMember)
	}
	if tx.Error != nil {
		db.Rollback()
		return nil, errorx.NewDefaultError(tx.Error.Error())
	}
	if err := db.Commit().Error; err != nil {
		db.Rollback()
		logx.Debug("Error committing transaction: %v", err)
		return nil, errorx.NewDefaultError("Error committing transaction")
	}
	// 返回成功响应
	return &types.TeamCreateResp{
		Success: true,
		Message: "创建成功",
		Data: types.TeamCreateData{
			Id:       strconv.FormatInt(st.ID, 10),
			TeamName: *st.Name,
		},
	}, nil

}
