package api

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

type ApiRunSaveLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiRunSaveLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiRunSaveLogic {
	return &ApiRunSaveLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiRunSaveLogic) ApiRunSave(req *types.ApiRunSaveRequest) (resp *types.ApiRunSaveResp, err error) {
	contentInfo := l.ctx.Value("contentInfo").(*middleware.ContentInfo)
	projectId := contentInfo.ProjectId
	db := l.svcCtx.DB.Begin().Debug()
	amApi := &model.AmsAPI{
		Method:     &req.Method,
		Path:       &req.Path,
		Parameters: &req.Parameters,
		Responses:  &req.Responses,
	}
	if req.Id != "" {
		amApi.ID, _ = strconv.ParseInt(req.Id, 10, 64)
	} else {
		return nil, errorx.NewCodeError("更新接口id不能为空")
	}
	if projectId == 0 {
		// 处理空值或类型不匹配的情况
		return nil, errorx.NewDefaultError("projectId 无效或未提供")
	}
	amApi.ProjectID = &projectId
	defaultMethod := "GET"
	if req.Method == "" {
		amApi.Method = &defaultMethod
	} else {
		amApi.Method = &req.Method
	}
	if err := db.Model(&amApi).Select("path", "parameters", "method", "responses").Updates(amApi).Error; err != nil {
		db.Rollback()
		return nil, errorx.NewDefaultError("保存接口主信息失败")
	}

	//// 提交事务
	if err := db.Commit().Error; err != nil {
		db.Rollback()
		return nil, errorx.NewDefaultError("提交事务失败")
	}

	return &types.ApiRunSaveResp{
		Success: true,
		Message: "保存成功",
		Data: types.ApiDetailCreateOrUpdateRespData{
			Id: strconv.FormatInt(amApi.ID, 10),
		},
	}, nil
}
