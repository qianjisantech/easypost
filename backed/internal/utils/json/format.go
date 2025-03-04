package json

import (
	"encoding/json"
	"log"
)

func Format(val string) (map[string]interface{}, error) {
	// 定义一个空的接口来接收解析的结果
	var result map[string]interface{}

	// 解析 JSON 字符串
	err := json.Unmarshal([]byte(val), &result)
	if err != nil {
		log.Fatalf("JSON Unmarshal error: %s", err)
		return nil, err
	}
	return result, nil
}
