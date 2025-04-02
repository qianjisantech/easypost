package es

import (
	"backed/internal/common/errorx"
	"backed/internal/pkg/es"
	"backed/internal/svc"
	"backed/internal/types"
	"context"
	"github.com/zeromicro/go-zero/core/logx"
	"regexp"
)

type EsSearchLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewEsSearchLogic(ctx context.Context, svcCtx *svc.ServiceContext) *EsSearchLogic {
	return &EsSearchLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

type APiInfo struct {
	Address string                 `json:"address"`
	Method  string                 `json:"method"`
	Payload string                 `json:"payload"`
	Headers map[string]interface{} `json:"headers"`
}

func (l *EsSearchLogic) EsSearch(req *types.EsSearchRequest) (resp *types.EsSearchResp, err error) {
	client := es.Client{
		Address:  "http://localhost:9200",
		Username: "",
		Password: "",
	}

	err = client.Connect()
	if err != nil {
		logx.Debug("Failed to connect to Elasticsearch: %v", err) // 打印详细错误信息
		return nil, errorx.NewCodeError(err.Error())
	}
	// 执行搜索
	var searchbodys []*es.EsSearchBody
	if len(req.Query) > 0 {
		for _, query := range req.Query {
			searchBody := es.EsSearchBody{
				Field: query.Key,
				Value: query.Value,
			}
			// 处理查询结果
			searchbodys = append(searchbodys, &searchBody)
		}
	}
	results, err := client.ExecuteSearch(searchbodys)
	if err != nil {
		logx.Debug("Failed to execute search: %v", err) // 打印详细错误信息
		return nil, errorx.NewCodeError(err.Error())
	}
	//// 正则表达式
	//
	//addressRegex := regexp.MustCompile(req.Regex.Address)
	//httpMethodRegex := regexp.MustCompile(req.Regex.Method)
	//payloadRegex := regexp.MustCompile(req.Regex.Paylod)
	//var apiInfos []*APiInfo
	//if len(results) > 0 {
	//	for _, result := range results {
	//
	//		// 提取字段
	//		address := extractField(addressRegex, result.LogMessage)
	//
	//		httpMethod := extractField(httpMethodRegex, result.LogMessage)
	//		payload := extractField(payloadRegex, result.LogMessage)
	//		//var headers map[string]interface{}
	//		//if len(req.Regex.Header) == 2 {
	//		//	headersRegexOne := regexp.MustCompile(req.Regex.Header[0])
	//		//	headersString := extractField(headersRegexOne, result.LogMessage)
	//		//	headersRegexTwo := regexp.MustCompile(req.Regex.Header[1])
	//		//	matches := headersRegexTwo.FindAllStringSubmatch(headersString, -1)
	//		//	for _, match := range matches {
	//		//		if len(match) == 3 {
	//		//			key := strings.TrimSpace(match[1])
	//		//			value := strings.TrimSpace(match[2])
	//		//			headers[key] = value
	//		//		}
	//		//	}
	//		//} else {
	//		//	return nil, errorx.NewCodeError("正则不对")
	//		//}
	//		apiInfos = append(apiInfos, &APiInfo{
	//			Address: address,
	//			Method:  httpMethod,
	//			//Headers: headers,
	//			Payload: payload,
	//		})
	//	}
	//}
	return &types.EsSearchResp{
		Success: true,
		Message: "success",
		Data:    results,
	}, nil
}

// 提取字段的辅助函数
func extractField(regex *regexp.Regexp, logmsg string) string {
	match := regex.FindStringSubmatch(logmsg)
	if len(match) > 1 {
		return match[1]
	}
	return ""
}
