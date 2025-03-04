package am

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"backed/internal/svc"
	"backed/internal/types"
	"context"
	"github.com/zeromicro/go-zero/core/logx"
	"log"
	"strconv"
)

type DocSaveLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewDocSaveLogic(ctx context.Context, svcCtx *svc.ServiceContext) *DocSaveLogic {
	return &DocSaveLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *DocSaveLogic) DocSave(req *types.DocSaveRequest) (resp *types.DocSaveResp, err error) {
	// 开启事务
	db := l.svcCtx.DB.Begin().Debug()
	defer func() {
		if r := recover(); r != nil {
			db.Rollback()
			log.Printf("Panic recovered: %v", r)
			err = errorx.NewDefaultError("内部错误")
		}
	}()

	// 定义文档模型
	docType := "doc" // 创建一个 doc 字符串变量
	defaultParentId := int64(0)
	ad := &model.AmDoc{
		Name:      &req.Name,
		IsDeleted: new(bool),
		Type:      &docType, // 将 docType 的地址传递给 *string 类型的字段
		Content:   &req.Content,
		ParentID:  &defaultParentId,
	}
	*ad.IsDeleted = false

	// 判断是创建还是更新
	if req.Id != "" {
		// 更新文档
		id, err := strconv.ParseInt(req.Id, 10, 64)
		if err != nil {
			db.Rollback()
			return nil, errorx.NewCodeError("ID 解析失败: " + err.Error())
		}
		ad.ID = id
		if err := db.Save(ad).Error; err != nil {
			db.Rollback()
			return nil, errorx.NewDefaultError("文档更新失败: " + err.Error())
		}

	} else {
		// 新建文档
		if err := db.Create(ad).Error; err != nil {
			db.Rollback()
			return nil, errorx.NewDefaultError("文档创建失败: " + err.Error())
		}
	}

	// 提交事务
	if err := db.Commit().Error; err != nil {
		db.Rollback()
		log.Printf("事务提交失败: %v", err)
		return nil, errorx.NewDefaultError("事务提交失败: " + err.Error())
	}

	// 返回成功响应
	return &types.DocSaveResp{
		Success: true,
		Message: "保存成功",
		Data: types.DocSaveData{
			Id: strconv.FormatInt(ad.ID, 10),
		},
	}, nil
}
