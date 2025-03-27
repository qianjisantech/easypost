package es

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/olivere/elastic/v7"
)

type EsSearchBody struct {
	Field string
	Value string
}

// ExecuteSearch 查询数据
func (es *Client) ExecuteSearch(searchBodys []*EsSearchBody) ([]*LogInfo, error) {
	// 构建查询
	query := elastic.NewBoolQuery()
	// 遍历传入的多个字段条件
	for _, item := range searchBodys {
		// 将每个字段和对应的值添加到 should 子句中，表示 OR 查询
		query.Must(elastic.NewMatchQuery(item.Field, item.Value))
	}
	// 执行查询
	res, err := es.client.Search().
		Query(query).
		Do(context.Background())
	if err != nil {
		return nil, fmt.Errorf("failed to execute search: %s", err)
	}
	var ls []*LogInfo
	if res != nil && res.Hits.TotalHits.Value > 0 {
		for _, hit := range res.Hits.Hits {
			var l *LogInfo
			err = json.Unmarshal(hit.Source, &l)
			if err != nil {
				fmt.Println(err.Error())
				continue
			}
			ls = append(ls, l)
		}

	}
	return ls, nil
}
