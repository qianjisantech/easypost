package environmentmanage

import (
	"backed/gen/model"
	"context"
	"encoding/json"
	"strconv"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type EnvironmentManageDetailLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewEnvironmentManageDetailLogic(ctx context.Context, svcCtx *svc.ServiceContext) *EnvironmentManageDetailLogic {
	return &EnvironmentManageDetailLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *EnvironmentManageDetailLogic) EnvironmentManageDetail(req *types.EnvironmentManageDetailRequest) (resp *types.EnvironmentManageDetailResp, err error) {
	db := l.svcCtx.DB.Debug()
	id, err := strconv.ParseInt(req.Id, 10, 64)
	var amEnvironmentManage *model.AmEnvironmentManage
	tx := db.First(&amEnvironmentManage, id)
	if tx.Error != nil {
		logx.Errorf("Error query EnvironmentManage: %v", tx.Error)
		return nil, tx.Error
	}
	var globalParameter GlobalParameter //全局参数
	var globalVariable GlobalVariable
	var keyStores []KeyStore
	var environmentSettings []EnvironmentSetting
	var localMock LocalMock
	var cloudMock CloudMock
	var selfHostMock SelfHostMock

	if amEnvironmentManage.GlobalParameter != nil {
		err = json.Unmarshal([]byte(*amEnvironmentManage.GlobalParameter), &globalParameter)
	} else {
		globalParameter = GlobalParameter{}
	}

	if amEnvironmentManage.GlobalVariable != nil {
		err = json.Unmarshal([]byte(*amEnvironmentManage.GlobalVariable), &globalVariable)
	} else {
		globalVariable = GlobalVariable{}
	}

	if amEnvironmentManage.KeyStores != nil {
		err = json.Unmarshal([]byte(*amEnvironmentManage.KeyStores), &keyStores)
	} else {
		keyStores = []KeyStore{}
	}
	if amEnvironmentManage.EnvironmentSettings != nil {
		err = json.Unmarshal([]byte(*amEnvironmentManage.EnvironmentSettings), &environmentSettings)
	} else {
		environmentSettings = []EnvironmentSetting{}
	}
	if amEnvironmentManage.LocalMock != nil {
		err = json.Unmarshal([]byte(*amEnvironmentManage.LocalMock), &localMock)
	} else {
		localMock = LocalMock{}
	}

	if amEnvironmentManage.CloudMock != nil {
		err = json.Unmarshal([]byte(*amEnvironmentManage.CloudMock), &cloudMock)
	} else {
		cloudMock = CloudMock{}
	}

	if amEnvironmentManage.SelfHostMock != nil {
		err = json.Unmarshal([]byte(*amEnvironmentManage.SelfHostMock), &selfHostMock)
	} else {
		selfHostMock = SelfHostMock{}
	}

	return &types.EnvironmentManageDetailResp{
		Success: true,
		Message: "success",
		Data: types.EnvironmentManageDetailData{
			Id:                  strconv.FormatInt(amEnvironmentManage.ID, 10),
			GlobalParameter:     globalParameter,
			GlobalVariable:      globalVariable,
			KeyStores:           keyStores,
			EnvironmentSettings: environmentSettings,
			LocalMock:           localMock,
			CloudMock:           cloudMock,
			SelfHostMock:        selfHostMock,
		},
	}, nil
}

type GlobalParameter struct {
	Header []GlobalParameterChildren `json:"header"`
	Cookie []GlobalParameterChildren `json:"cookie"`
	Query  []GlobalParameterChildren `json:"query"`
	Body   []GlobalParameterChildren `json:"body"`
}
type GlobalParameterChildren struct {
	Id          string `json:"id"`
	Key         string `json:"key"`
	Type        string `json:"type"`
	Value       string `json:"value"`
	Description string `json:"description"`
}

type GlobalVariable struct {
	Team    []GlobalVariableTeam    `json:"team"`
	Project []GlobalVariableProject `json:"project"`
}
type GlobalVariableTeam struct {
	Id          string `json:"id"`
	Key         string `json:"key"`
	Type        string `json:"type"`
	Value       string `json:"value"`
	Description string `json:"description"`
}
type GlobalVariableProject struct {
	Id          string `json:"id"`
	Key         string `json:"key"`
	Type        string `json:"type"`
	Value       string `json:"value"`
	Description string `json:"description"`
}
type KeyStore struct {
	Id          string `json:"id"`
	Key         string `json:"key"`
	Type        string `json:"type"`
	Value       string `json:"value"`
	Description string `json:"description"`
}
type EnvironmentSetting struct {
	Id              string           `json:"id"`
	Name            string           `json:"name"`
	Servers         []Server         `json:"servers"`
	GlobalVariables []GlobalVariable `json:"globalVariables"`
}
type Server struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	FrontUrl string `json:"frontUrl"`
}

type LocalMock struct {
	Servers         []Server         `json:"servers"`
	GlobalVariables []GlobalVariable `json:"globalVariables"`
}

type CloudMock struct {
	Servers         []Server         `json:"servers"`
	GlobalVariables []GlobalVariable `json:"globalVariables"`
}

type SelfHostMock struct {
	Servers         []Server         `json:"servers"`
	GlobalVariables []GlobalVariable `json:"globalVariables"`
}
