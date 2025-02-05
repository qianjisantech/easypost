package team

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"backed/internal/svc"
	"backed/internal/types"
	"context"
	"log"

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
	// 从数据库开始事务
	db := l.svcCtx.DB.Begin().Debug()
	var str = "1"
	// 创建项目数据模型
	m := &model.SysTeam{
		Name:      &req.TeamName,
		IsDeleted: new(bool),
		ManagerID: &str,
	}
	*m.IsDeleted = false
	// 执行数据库操作
	tx := db.Create(m)
	if tx.Error != nil {
		db.Rollback()
		return nil, errorx.NewDefaultError(tx.Error.Error())
	}
	if err := db.Commit().Error; err != nil {
		db.Rollback()
		log.Printf("Error committing transaction: %v", err)
		return nil, errorx.NewDefaultError("Error committing transaction")
	}
	// 返回成功响应
	return &types.TeamCreateResp{
		Success: true,
		Message: "创建成功",
	}, nil

}
