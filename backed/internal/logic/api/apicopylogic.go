package api

import (
	"backed/internal/svc"
	"backed/internal/types"
	"context"

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
	//db := l.svcCtx.DB.Debug().Begin() // 开始事务
	//defer db.Rollback()               // 确保在出错时回滚事务
	//
	//id, err := strconv.ParseInt(req.Id, 10, 64)
	//if err != nil {
	//	return nil, errorx.NewDefaultError(err.Error()) // 返回错误信息
	//}
	//
	//err = l.QueryApiDetailByIdAndCopy(db, id) //根据id查询api详情
	//if err != nil {
	//	return nil, errorx.NewDefaultError(err.Error())
	//}
	//
	////err = l.QueryApiParametersQueryByIdAndCopy(db, id) //根据id查询Param入参
	////if err != nil {
	////	return nil, errorx.NewDefaultError(err.Error())
	////}
	//
	//err = l.QueryApiResponseQueryByIdAndCopy(db, id) //根据id查询返回参数
	//if err != nil {
	//	return nil, errorx.NewDefaultError(err.Error())
	//}
	//
	//err = l.QueryApiResponseExampleQueryByIdAndCopy(db, id) //根据id查询返回参数
	//if err != nil {
	//	return nil, errorx.NewDefaultError(err.Error())
	//}
	//
	//err = l.QueryResponseBodyJsonByIdAndCopy(db, id) //查询响应体JSON
	//if err != nil {
	//	return nil, errorx.NewDefaultError(err.Error())
	//}
	//
	//db.Commit() // 提交事务

	return &types.ApiCopyResp{
		Success: true,
		Message: "复制成功",
	}, nil
}
