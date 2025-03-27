package team

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"backed/internal/svc"
	"backed/internal/types"
	"context"
	"log"
	"strconv"

	"github.com/zeromicro/go-zero/core/logx"
)

type TeamMemberInviteLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTeamMemberInviteLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TeamMemberInviteLogic {
	return &TeamMemberInviteLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TeamMemberInviteLogic) TeamMemberInvite(req *types.TeamMemberInviteRequest) (*types.TeamMemberInviteResp, error) {
	teamId, err := strconv.ParseInt(req.TeamId, 10, 64)
	if err != nil {
		return nil, errorx.NewDefaultError("无效的团队ID")
	}

	var userIds []int64
	for _, u := range req.UserIds {
		ui, err := strconv.ParseInt(u, 10, 64)
		if err != nil {
			return nil, errorx.NewDefaultError("无效的用户ID")
		}
		userIds = append(userIds, ui)
	}

	var sysUsers []*model.SysUser
	tx := l.svcCtx.DB.Debug().Begin() // ✅ 正确开启事务
	if tx.Error != nil {
		return nil, errorx.NewDefaultError(tx.Error.Error())
	}

	// 使用事务查询
	if err := tx.Where("id IN ?", userIds).Find(&sysUsers).Error; err != nil {
		tx.Rollback()
		return nil, errorx.NewDefaultError("查询用户失败")
	}

	var teamMembers []model.SysTeamMember
	state := int32(2)
	permission := int32(2)
	for _, sysUser := range sysUsers {
		teamMembers = append(teamMembers, model.SysTeamMember{
			Username:   sysUser.Username,
			Name:       sysUser.Name,
			UserID:     &sysUser.ID,
			Email:      sysUser.Email,
			TeamID:     &teamId,
			State:      &state,
			Permission: &permission,
		})
	}

	if len(teamMembers) > 0 {
		for _, member := range teamMembers {
			if err := tx.Create(&member).Error; err != nil {
				tx.Rollback()
				return nil, errorx.NewDefaultError("添加团队成员失败：" + err.Error())
			}
		}

	}

	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		log.Printf("Error committing transaction: %v", err)
		return nil, errorx.NewDefaultError("提交事务失败")
	}

	return &types.TeamMemberInviteResp{
		Success: true,
		Message: "成员邀请成功",
	}, nil
}
