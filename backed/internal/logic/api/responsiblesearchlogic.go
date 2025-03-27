package api

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"context"
	"strconv"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ResponsibleSearchLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewResponsibleSearchLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ResponsibleSearchLogic {
	return &ResponsibleSearchLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ResponsibleSearchLogic) ResponsibleSearch(req *types.ResponsibleSearchRequest) (resp *types.ResponsibleSearchResp, err error) {
	db := l.svcCtx.DB.Debug()

	// 1. 构建基础查询
	query := db.Model(&model.SysTeamMember{}).Select("DISTINCT(user_id), name, username")

	// 2. 添加模糊查询条件
	if req.Content != "" {
		query = query.Where("name LIKE ? OR username LIKE ?",
			"%"+req.Content+"%",
			"%"+req.Content+"%")
	}

	// 3. 执行查询
	var sysTeamMembers []*model.SysTeamMember
	if err := query.Find(&sysTeamMembers).Error; err != nil {
		return nil, errorx.NewDefaultError("查询团队成员失败: " + err.Error())
	}

	// 4. 去重处理（双重保障）
	uniqueMembers := make(map[int64]*model.SysTeamMember)
	for _, member := range sysTeamMembers {
		if member.UserID != nil {
			uniqueMembers[*member.UserID] = member
		}
	}

	// 5. 构建返回数据
	result := make([]types.ResponsibleSearchRespData, 0, len(uniqueMembers))
	for _, member := range uniqueMembers {
		result = append(result, types.ResponsibleSearchRespData{
			Id:       strconv.FormatInt(*member.UserID, 10),
			Name:     *member.Name,
			Username: *member.Username,
		})
	}

	// 6. 返回结果
	return &types.ResponsibleSearchResp{
		Success: true,
		Message: "success",
		Data:    result,
	}, nil
}
