package api

import (
	"backed/gen/model"
	"backed/internal/common/enum"
	"backed/internal/common/errorx"
	"backed/internal/middleware"
	"backed/internal/utils/ep"
	"context"
	"strconv"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ApiTreeQueryPageLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiTreeQueryPageLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiTreeQueryPageLogic {
	return &ApiTreeQueryPageLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiTreeQueryPageLogic) ApiTreeQueryPage(req *types.ApiTreeQueryPageRequest) (resp *types.ApiTreeQueryPageResp, err error) {
	contentInfo := l.ctx.Value("contentInfo").(*middleware.ContentInfo)
	projectId := contentInfo.ProjectId
	// 获取 API 详情
	queryAmFoldersResp, err := l.QueryAmFolders(projectId)
	queryAmAPIsResp, err := l.QueryAmAPI(projectId)
	queryAmDocsResp, err := l.QueryAmDocs(projectId)

	if err != nil {
		return nil, errorx.NewCodeError(err.Error())
	}

	// 预先分配内存，避免频繁扩展
	datas := make([]types.ApiTreeQueryPageData, 0, len(queryAmFoldersResp)+len(queryAmAPIsResp)+len(queryAmDocsResp))

	// 组装文件夹
	for _, qafr := range queryAmFoldersResp {
		if qafr.Name == nil || qafr.ParentID == nil {
			return nil, errorx.NewDefaultError("报错")
		}
		folderType := enum.ApiDetailFolder
		parentId := ""
		if *qafr.ParentID == 0 || qafr.ParentID == nil {
			parentId = "_"
		} else {
			parentId = strconv.FormatInt(*qafr.ParentID, 10)
		}
		datas = append(datas, types.ApiTreeQueryPageData{
			Id:       strconv.FormatInt(qafr.ID, 10),
			Name:     *qafr.Name,
			Type:     folderType,
			ParentId: parentId,
		})
	}
	var apiIds []int64
	// 组装接口
	for _, qaar := range queryAmAPIsResp {
		if qaar.Name == nil || qaar.ParentID == nil {
			return nil, errorx.NewDefaultError(" 组装接口报错")
		}
		apiType := enum.ApiDetail
		parentId := ""
		if *qaar.ParentID == 0 || qaar.ParentID == nil {
			parentId = "_"
		} else {
			parentId = strconv.FormatInt(*qaar.ParentID, 10)
		}

		apiIds = append(apiIds, qaar.ID)

		datas = append(datas, types.ApiTreeQueryPageData{
			Id:       strconv.FormatInt(qaar.ID, 10),
			Name:     *qaar.Name,
			Type:     apiType,
			Method:   ep.StringIfNotNil(qaar.Method, ""),
			ParentId: parentId,
		})
	}
	queryAmApiCasesResp, err := l.QueryAmApiCase(apiIds)
	if len(queryAmApiCasesResp) > 0 {
		// 组装接口用例
		for _, qaacr := range queryAmApiCasesResp {
			if qaacr.Name == nil || qaacr.APIID == nil {
				return nil, errorx.NewDefaultError(" 组装接口用例报错")
			}
			apiType := enum.ApiCase
			parentId := ""
			if *qaacr.APIID == 0 || qaacr.APIID == nil {
				parentId = "_"
			} else {
				parentId = strconv.FormatInt(*qaacr.APIID, 10)
			}
			datas = append(datas, types.ApiTreeQueryPageData{
				Id:       strconv.FormatInt(qaacr.ID, 10),
				Name:     *qaacr.Name,
				Type:     apiType,
				ParentId: parentId,
			})
		}
	}
	// 组装文档
	for _, qadr := range queryAmDocsResp {
		if qadr.Name == nil || qadr.ParentID == nil {
			return nil, errorx.NewDefaultError("组装文档报错")
		}
		docType := enum.Doc
		parentId := ""
		if *qadr.ParentID == 0 || qadr.ParentID == nil {
			parentId = "_"
		} else {
			parentId = strconv.FormatInt(*qadr.ParentID, 10)
		}
		datas = append(datas, types.ApiTreeQueryPageData{
			Id:       strconv.FormatInt(qadr.ID, 10),
			Name:     *qadr.Name,
			Type:     docType,
			ParentId: parentId,
		})
	}

	// 返回成功响应
	return &types.ApiTreeQueryPageResp{
		Success: true,
		Message: "查询成功",
		Data:    datas,
	}, nil
}

// QueryAmAPI 获取 API 详情
func (l *ApiTreeQueryPageLogic) QueryAmAPI(projectId int64) ([]*model.AmAPI, error) {
	db := l.svcCtx.DB.Debug()
	var amAPIs []*model.AmAPI
	err := db.WithContext(l.ctx).
		Select("id", "name", "parent_id", "method").
		Where("project_id = ?", projectId).
		Where("is_deleted = 0").
		Find(&amAPIs).Error
	if err != nil {
		logx.Debug("Error QueryAmAPIs: %v", err)
		return []*model.AmAPI{}, err // 返回空切片，而不是 nil
	}
	return amAPIs, nil
}

// QueryAmFolders 获取文件夹详情
func (l *ApiTreeQueryPageLogic) QueryAmFolders(projectId int64) ([]*model.AmFolder, error) {
	db := l.svcCtx.DB.Debug()
	var amFolders []*model.AmFolder
	err := db.WithContext(l.ctx).
		Select("id", "name", "parent_id").
		Where("project_id = ?", projectId).
		Where("is_deleted = 0").
		Find(&amFolders).Error
	if err != nil {
		logx.Debug("Error QueryAmFolders: %v", err)
		return []*model.AmFolder{}, err // 返回空切片，而不是 nil

	}
	return amFolders, nil
}

// QueryAmDocs 获取文档详情
func (l *ApiTreeQueryPageLogic) QueryAmDocs(projectId int64) ([]*model.AmDoc, error) {
	db := l.svcCtx.DB.Debug()
	var amDocs []*model.AmDoc
	err := db.WithContext(l.ctx).
		Select("id", "name", "parent_id").
		Where("project_id = ?", projectId).
		Where("is_deleted = 0").
		Find(&amDocs).Error
	if err != nil {
		logx.Debug("Error QueryAmDocs: %v", err)
		return []*model.AmDoc{}, err // 返回空切片，而不是 nil
	}
	return amDocs, nil
}
func (l *ApiTreeQueryPageLogic) QueryAmApiCase(apiIds []int64) ([]*model.AmAPICase, error) {
	db := l.svcCtx.DB.Debug()
	var amAPICases []*model.AmAPICase
	err := db.WithContext(l.ctx).
		Select("id", "name", "api_id").
		Where("api_id in ?", apiIds).
		Where("is_deleted = 0").
		Find(&amAPICases).Error
	if err != nil {
		logx.Debug("Error QueryAmApiCases: %v", err)
		return []*model.AmAPICase{}, err // 返回空切片，而不是 nil
	}
	return amAPICases, nil
}
