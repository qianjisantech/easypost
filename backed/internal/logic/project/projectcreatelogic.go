package project

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"context"
	"log"
	"math/rand"
	"strconv"
	"time"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

// icons 列表，包含所有可能的图标
var icons = []string{
	"book-svgrepo-com.svg",
	"drawing-board-svgrepo-com.svg",
	"eraser-svgrepo-com.svg",
	"folding-ruler-svgrepo-com.svg",
	"ice-cream-01-svgrepo-com.svg",
}

// 项目创建逻辑
type ProjectCreateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// NewProjectCreateLogic 初始化 ProjectCreateLogic
func NewProjectCreateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ProjectCreateLogic {
	return &ProjectCreateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

// ProjectCreate 处理项目创建请求
func (l *ProjectCreateLogic) ProjectCreate(req *types.ProjectCreateRequest) (*types.ProjectCreateResp, error) {
	// 从数据库开始事务
	db := l.svcCtx.DB.Begin().Debug()
	// 获取随机图标
	icon := GetRandomString(icons)
	teamId, _ := strconv.ParseInt(req.TeamId, 10, 64)
	// 创建项目数据模型
	m := &model.TeamProjectDetail{
		TeamID:      &teamId,
		ProjectName: &req.ProjectName,
		IsPublic:    &req.IsPublic,
		ProjectIcon: &icon,
		IsDeleted:   new(bool),
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
	return &types.ProjectCreateResp{
		Code:    "200",
		Message: "创建成功",
	}, nil
}

// GetRandomString 从字符串数组中随机选择一个字符串
func GetRandomString(arr []string) string {
	// 生成一个0到len(arr)-1之间的随机索引
	randomIndex := rand.Intn(len(arr))
	// 返回对应索引位置的字符串
	return arr[randomIndex]
}

// 初始化包级别的随机种子
func init() {
	// 在程序启动时只调用一次 rand.Seed()
	rand.Seed(time.Now().UnixNano())
}
