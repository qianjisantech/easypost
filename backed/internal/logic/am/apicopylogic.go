package am

import (
	"backed/gen/model"
	"backed/internal/common/errorx"
	"context"
	"gorm.io/gorm"
	"strconv"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type ApiCopyLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewApiCopyLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ApiCopyLogic {
	return &ApiCopyLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ApiCopyLogic) ApiCopy(req *types.ApiCopyRequest) (resp *types.ApiCopyResp, err error) {
	db := l.svcCtx.DB.Debug().Begin() // 开始事务
	defer db.Rollback()               // 确保在出错时回滚事务

	id, err := strconv.ParseInt(req.Id, 10, 64)
	if err != nil {
		return nil, errorx.NewDefaultError(err.Error()) // 返回错误信息
	}

	err = l.QueryApiDetailByIdAndCopy(db, id) //根据id查询api详情
	if err != nil {
		return nil, errorx.NewDefaultError(err.Error())
	}

	//err = l.QueryApiParametersQueryByIdAndCopy(db, id) //根据id查询Param入参
	//if err != nil {
	//	return nil, errorx.NewDefaultError(err.Error())
	//}

	err = l.QueryApiResponseQueryByIdAndCopy(db, id) //根据id查询返回参数
	if err != nil {
		return nil, errorx.NewDefaultError(err.Error())
	}

	err = l.QueryApiResponseExampleQueryByIdAndCopy(db, id) //根据id查询返回参数
	if err != nil {
		return nil, errorx.NewDefaultError(err.Error())
	}

	err = l.QueryResponseBodyJsonByIdAndCopy(db, id) //查询响应体JSON
	if err != nil {
		return nil, errorx.NewDefaultError(err.Error())
	}

	db.Commit() // 提交事务

	return &types.ApiCopyResp{
		Success: true,
		Message: "复制成功",
	}, nil
}

// QueryApiDetailByIdAndCopy 根据id查询api详情并复制
func (l *ApiCopyLogic) QueryApiDetailByIdAndCopy(db *gorm.DB, id int64) error {
	var amApi *model.AmAPI
	tx := db.First(&amApi, id)
	if tx.Error != nil {
		logx.Errorf("Error query ApiDetailById: %v", tx.Error)
		return tx.Error
	}

	// 创建新的对象并复制字段
	newAmApi := *amApi
	var nameCopy string
	if amApi.Name != nil {
		nameCopy = *amApi.Name + "-复制"
	} else {
		nameCopy = "复制"
	}
	newAmApi.Name = &nameCopy
	newAmApi.ID = 0 // 清空 ID，准备插入新记录
	if err := db.Create(&newAmApi).Error; err != nil {
		logx.Errorf("Error copying ApiDetailById: %v", err)
		return err
	}
	return nil
}

// QueryApiParametersQueryByIdAndCopy 根据api id 查询相关联的参数并复制
// QueryApiParametersQueryByIdAndCopy 批量复制
func (l *ApiCopyLogic) QueryApiParametersQueryByIdAndCopy(db *gorm.DB, id int64) error {
	var amApqs []*model.AmAPIParameter
	if err := db.Where("api_id = ?", id).Find(&amApqs).Error; err != nil {
		logx.Errorf("Error query ApiParametersQueryById: %v", err)
		return err
	}

	if len(amApqs) == 0 {
		return nil
	}

	var newAmApqs []*model.AmAPIParameter
	for _, amApq := range amApqs {
		newAmApq := *amApq
		newAmApq.ID = 0
		newAmApq.CreateTime = nil
		newAmApq.UpdateTime = nil
		newAmApqs = append(newAmApqs, &newAmApq)
	}
	if len(newAmApqs) > 0 {
		if err := db.Create(newAmApqs).Error; err != nil {
			logx.Errorf("Error batch copying ApiParametersQueryById: %v", err)
			return err
		}
	}

	return nil
}

// QueryApiResponseQueryByIdAndCopy 根据api id 查询相关联的返回参数并复制
func (l *ApiCopyLogic) QueryApiResponseQueryByIdAndCopy(db *gorm.DB, id int64) error {
	var amARs []*model.AmAPIResponse
	tx := db.Where("api_id = ?", id).Find(&amARs)
	if tx.Error != nil {
		logx.Errorf("Error query ApiResponseQueryById: %v", tx.Error)
		return tx.Error
	}

	// 创建新的对象并复制字段
	for _, amAR := range amARs {
		newAmAR := *amAR
		newAmAR.ID = 0 // 清空 ID，准备插入新记录
		if err := db.Create(&newAmAR).Error; err != nil {
			logx.Errorf("Error copying ApiResponseQueryById: %v", err)
			return err
		}
	}
	return nil
}

// QueryApiResponseExampleQueryByIdAndCopy 根据api id 查询相关联的返回参数示例并复制
func (l *ApiCopyLogic) QueryApiResponseExampleQueryByIdAndCopy(db *gorm.DB, id int64) error {
	var amAREs []*model.AmAPIResponseExample
	tx := db.Where("api_id = ?", id).Find(&amAREs)
	if tx.Error != nil {
		logx.Errorf("Error query ApiResponseExampleQueryById: %v", tx.Error)
		return tx.Error
	}

	// 创建新的对象并复制字段
	for _, amARE := range amAREs {
		newAmARE := *amARE
		newAmARE.ID = 0 // 清空 ID，准备插入新记录
		if err := db.Create(&newAmARE).Error; err != nil {
			logx.Errorf("Error copying ApiResponseExampleQueryById: %v", err)
			return err
		}
	}
	return nil
}

// QueryResponseBodyJsonByIdAndCopy 根据response id 查询相关联的Body JSON并复制
func (l *ApiCopyLogic) QueryResponseBodyJsonByIdAndCopy(db *gorm.DB, id int64) error {
	var amARBJ *model.AmAPIRequestBodyJSON
	tx := db.Where("api_id = ?", id).First(&amARBJ)
	if tx.Error != nil {
		logx.Errorf("Error query ResponseBodyJsonById: %v", tx.Error)
		return tx.Error
	}

	// 创建新的对象并复制字段
	newAmARBJ := *amARBJ
	newAmARBJ.ID = 0 // 清空 ID，准备插入新记录
	if err := db.Create(&newAmARBJ).Error; err != nil {
		logx.Errorf("Error copying ResponseBodyJsonById: %v", err)
		return err
	}
	return nil
}
