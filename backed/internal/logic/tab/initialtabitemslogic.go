package tab

import (
	"backed/gen/model"
	"backed/internal/svc"
	"backed/internal/types"
	"context"
	"github.com/zeromicro/go-zero/core/logx"
	"strconv"
)

type InitialTabItemsLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewInitialTabItemsLogic(ctx context.Context, svcCtx *svc.ServiceContext) *InitialTabItemsLogic {
	return &InitialTabItemsLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

var newCatalogTabItem = InitialTabItem{
	// 初始化默认对象的字段
	Key:         "newCatalog",
	Label:       "新建...",
	ContentType: "blank",
}

type InitialTabItem struct {
	Key         string             `json:"key"`
	Label       string             `json:"label"`
	ContentType string             `json:"contentType"`
	Data        InitialTabItemData `json:"data"`
}
type InitialTabItemData struct {
	TabStatus int `json:"tabStatus"`
}

func (l *InitialTabItemsLogic) InitialTabItems(req *types.InitialTabItemsRequest) (resp *types.InitialTabItemsResp, err error) {
	userId := l.ctx.Value("userId").(int64)

	db := l.svcCtx.DB.Debug()
	var ats []model.AmTab
	tx := db.Where("user_id = ? AND project_id= ?", userId, req.ProjectId).Find(&ats)
	if tx.Error != nil {
		logx.Error(tx.Error)
	}

	var initialTabItems []InitialTabItem
	var activeTabKey string
	initialTabItems = append(initialTabItems, newCatalogTabItem)
	if len(ats) > 0 {
		for _, at := range ats {
			initialTabItem := InitialTabItem{
				Key:         strconv.FormatInt(at.ID, 10),
				Label:       *at.Label,
				ContentType: *at.ContentType,
				Data: InitialTabItemData{
					TabStatus: int(*at.Status),
				},
			}
			initialTabItems = append(initialTabItems, initialTabItem)
		}

	}
	activeTabKey = "newCatalog"
	return &types.InitialTabItemsResp{
		Success: true,
		Message: "success",
		Data: types.InitialTabItemsRespData{
			InitialTabItems: initialTabItems,
			ActiveTabKey:    activeTabKey,
		},
	}, nil
}
