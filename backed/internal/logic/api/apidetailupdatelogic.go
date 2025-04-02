package api

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"context"
	"encoding/json"
	"strconv"
	"strings"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ApiDetailUpdateLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiDetailUpdateLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiDetailUpdateLogic {
	return &ApiDetailUpdateLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiDetailUpdateLogic) ApiDetailUpdate(req *types.ApiDetailCreateOrUpdateRequest) (resp *types.ApiDetailCreateOrUpdateResp, err error) {
	db := l.svcCtx.DB.Begin().Debug()
	projectId := int64(22)
	parentId := int64(0)
	tags := ""
	if req.ParentId != "" {
		parentId, _ = strconv.ParseInt(req.ParentId, 10, 64)
	}
	if len(req.Tags) > 0 {
		tags = strings.Join(req.Tags, ",")
	}
	amApi := &model.AmAPI{
		Path:             &req.Path,
		Status:           &req.Status,
		Remark:           &req.Description,
		ProjectID:        &projectId,
		Responsible:      &req.Responsible,
		ParentID:         &parentId,
		Tag:              &tags,
		Parameters:       &req.Parameters,
		RequestBody:      &req.RequestBody,
		ResponseExamples: &req.ResponseExamples,
		Responses:        &req.Responses,
	}
	if req.Id != "" {
		amApi.ID, _ = strconv.ParseInt(req.Id, 10, 64)
	} else {
		return nil, errorx.NewCodeError("更新接口id不能为空")
	}
	defaultName := "未命名接口"
	if req.Name == "" {
		amApi.Name = &defaultName
	} else {
		amApi.Name = &req.Name
	}
	defaultMethod := "GET"
	if req.Method == "" {
		amApi.Method = &defaultMethod
	} else {
		amApi.Method = &req.Method
	}
	if err := db.Save(amApi).Error; err != nil {
		db.Rollback()
		return nil, errorx.NewDefaultError("保存接口主信息失败")
	}

	//// 提交事务
	if err := db.Commit().Error; err != nil {
		db.Rollback()
		return nil, errorx.NewDefaultError("提交事务失败")
	}
	logx.Debug("入参%s", req)

	var responseExamples []ResponseExample
	err = json.Unmarshal([]byte(*amApi.ResponseExamples), &responseExamples)

	var responses []Response
	err = json.Unmarshal([]byte(*amApi.Responses), &responses)

	var parameters Parameters
	err = json.Unmarshal([]byte(*amApi.Parameters), &parameters)

	return &types.ApiDetailCreateOrUpdateResp{
		Success: true,
		Message: "保存成功",
		Data: types.ApiDetailCreateOrUpdateRespData{
			Id: strconv.FormatInt(amApi.ID, 10),
		},
	}, nil
}
