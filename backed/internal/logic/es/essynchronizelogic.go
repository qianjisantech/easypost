package es

import (
	"backed/internal/common/errorx"
	"backed/internal/pkg/es"
	"context"
	"log"
	"time"

	"backed/internal/svc"
	"backed/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type EsSynchronizeLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewEsSynchronizeLogic(ctx context.Context, svcCtx *svc.ServiceContext) *EsSynchronizeLogic {
	return &EsSynchronizeLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *EsSynchronizeLogic) EsSynchronize(req *types.EsSynchronizeRequest) (resp *types.EsSynchronizeResp, err error) {
	client := es.Client{
		Address:  "http://localhost:9200",
		Username: "",
		Password: "",
	}

	err = client.Connect()
	if err != nil {
		log.Printf("Failed to connect to Elasticsearch: %v", err) // 打印详细错误信息
		return nil, errorx.NewCodeError(err.Error())
	}
	loginfo := es.LogInfo{
		LogMessage: "traceId[b465441e1cac1712] [03180920510fdb1be484b848c2b483317b4d003106] Inbound Message\n----------------------------\nAddress: http://demoopenapi.jtjms-sa.com/webopenplatformapi/api/logistics/trace\nHttpMethod: POST\nQueryString: null\nEncoding: UTF-8\nContent-Type: application/x-www-form-urlencoded\nHeaders: {host=[demoopenapi.jtjms-sa.com], x-request-id=[eykj1bs_qkslAcM9-xQj6XCW6T0n72-M-WqIzwNZeewafVt4iyvrLg==], x-real-ip=[34.232.130.37], x-forwarded-for=[34.232.130.37], x-forwarded-host=[demoopenapi.jtjms-sa.com], x-forwarded-port=[443], x-forwarded-proto=[http], x-forwarded-scheme=[http], x-scheme=[http], x-original-forwarded-for=[34.232.130.37], content-length=[108], user-agent=[axios/0.19.2], x-forwarded-cluster=[waf,], eagleeye-traceid=[ac11000117422788513302623e007d], x-original-url=[/webopenplatformapi/api/logistics/trace], x-appgw-trace-id=[b4e5ee7bb8539f343ecc50052473d869], x-original-host=[demoopenapi.jtjms-sa.com], digest=[y739e3olpcqCOpmuxGtiXg==], timestamp=[1742278851236], apiaccount=[292508153084379141], via=[1.1 5e6930ff15cb9ece8bd1c3b20d8103c0.cloudfront.net (CloudFront)], x-amz-cf-id=[eykj1bs_qkslAcM9-xQj6XCW6T0n72-M-WqIzwNZeewafVt4iyvrLg==], accept=[application/json, text/plain, */*], eagleeye-rpcid=[0.1], x-true-ip=[10.92.2.25], web-server-type=[nginx], wl-proxy-client-ip=[10.92.2.25], x-client-ip=[34.232.130.37], x5-uuid=[3cd39cfdfd6cae819d1ba7ce366ca927], x-sinfo=[on], Content-Type=[application/x-www-form-urlencoded;charset=UTF-8]}\nPayload: bizContent={\"billCodes\":\"UTE300009819027\",\"digest\":\"VdlpKaoq64AZ0yEsBkvt1A==\"}\n----------------------------------------------",
		Timestamp:  time.Now().Format(time.DateTime),
		Level:      "INFO",
	}
	err = client.SynchronizeData("uat-jmssa-applog-"+time.Now().Format(time.DateOnly), loginfo)
	if err != nil {
		log.Printf("Failed to synchronize data: %v", err) // 打印详细错误信息
		return nil, errorx.NewCodeError(err.Error())
	}
	return &types.EsSynchronizeResp{
		Success: true,
		Message: "success",
	}, nil
}
