package environmentmanage

import (
	"backed/gen/model"
	"backed/internal/middleware"
	"context"
	"encoding/json"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

const (
	LOCALMOCK    = "local-mock"
	REMOTEMOCK   = "remote-mock"
	SELFHOSTMOCK = "self-host-local"
)

type EnvironmentManageDynamicValueLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewEnvironmentManageDynamicValueLogic(ctx context.Context, svcCtx *svc.ServiceContext) *EnvironmentManageDynamicValueLogic {
	return &EnvironmentManageDynamicValueLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *EnvironmentManageDynamicValueLogic) EnvironmentManageDynamicValue(req *types.EnvironmentManageDynamicValueRequest) (resp *types.EnvironmentManageDynamicValueResp, err error) {
	contentInfo := l.ctx.Value("contentInfo").(*middleware.ContentInfo)
	projectId := contentInfo.ProjectId
	db := l.svcCtx.DB.Debug()
	var amEnvironmentManage *model.AmsEnvironmentManage
	tx := db.First(&amEnvironmentManage, projectId)
	if tx.Error != nil {
		logx.Errorf("Error query EnvironmentManage: %v", tx.Error)
		return nil, tx.Error
	}

	var readVariables []ReadVariable
	//var globalParameter GlobalParameter //全局参数
	var globalVariable GlobalVariable
	var environmentSettings []EnvironmentSetting

	//if amEnvironmentManage.GlobalParameter != nil {
	//	err = json.Unmarshal([]byte(*amEnvironmentManage.GlobalParameter), &globalParameter)
	//} else {
	//	globalParameter = GlobalParameter{}
	//}

	if amEnvironmentManage.GlobalVariable != nil {
		err = json.Unmarshal([]byte(*amEnvironmentManage.GlobalVariable), &globalVariable)
		if len(globalVariable.Project) > 0 {
			for _, gp := range globalVariable.Project {
				readVariable := &ReadVariable{
					Id:    gp.Id,
					Key:   gp.Key,
					Value: gp.Value,
					Type:  "全局变量",
				}
				readVariables = append(readVariables, *readVariable)

			}
		}
		if len(globalVariable.Team) > 0 {
			for _, gt := range globalVariable.Team {
				readVariable := &ReadVariable{
					Id:    gt.Id,
					Key:   gt.Key,
					Value: gt.Value,
					Type:  "全局变量",
				}
				readVariables = append(readVariables, *readVariable)

			}
		}
	} else {
		globalVariable = GlobalVariable{}
	}

	if amEnvironmentManage.EnvironmentSettings != nil {
		err = json.Unmarshal([]byte(*amEnvironmentManage.EnvironmentSettings), &environmentSettings)
		if len(environmentSettings) > 0 {
			for _, environmentSetting := range environmentSettings {
				//获取当前选中的自定义环境
				if environmentSetting.IsActive == true {
					for _, variable := range environmentSetting.Variables {
						if variable.Key != "" {
							readVariable := &ReadVariable{
								Id:    variable.Id,
								Key:   variable.Key,
								Value: variable.Value,
								Type:  environmentSetting.Name,
							}
							readVariables = append(readVariables, *readVariable)
						}
					}

				}

				//获取三个mock环境的数据
				if environmentSetting.Id == LOCALMOCK || environmentSetting.Id == REMOTEMOCK || environmentSetting.Id == SELFHOSTMOCK {
					for _, variable := range environmentSetting.Variables {
						if variable.Key != "" {
							readVariable := &ReadVariable{
								Id:    variable.Id,
								Key:   variable.Key,
								Value: variable.Value,
								Type:  environmentSetting.Name,
							}
							readVariables = append(readVariables, *readVariable)
						}
					}
				}
			}
		}
	} else {
		environmentSettings = []EnvironmentSetting{}
	}

	return &types.EnvironmentManageDynamicValueResp{
		Success: true,
		Message: "success",
		Data:    readVariables,
	}, nil
}

type ReadVariable struct {
	Id    string `json:"id"`
	Type  string `json:"type"`
	Key   string `json:"key"`
	Value string `json:"value"`
}
