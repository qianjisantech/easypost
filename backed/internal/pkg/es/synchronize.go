package es

import (
	"context"
	"fmt"
	_ "log"
)

type LogInfo struct {
	LogMessage string `json:"logmsg"`
	Timestamp  string `json:"@timestamp"`
	Level      string `json:"level"`
}

// SynchronizeData 将数据同步到 Elasticsearch
func (es *Client) SynchronizeData(index string, logData LogInfo) error {
	// 将 LogInfo 数据序列化为 JSON
	// 插入数据到 Elasticsearch
	res, err := es.client.Index().
		Index(index).
		BodyJson(logData).
		Refresh("true"). // 刷新索引以确保数据能立即被查询到
		Do(context.Background())
	if err != nil {
		return fmt.Errorf("failed to index data: %s", err)
	}

	//if res.IsError() {
	//	return fmt.Errorf("failed to index data: %s", res.Status())
	//}
	logx.Debug("成功%v", res)
	return nil
}
