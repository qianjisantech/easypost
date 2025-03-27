package es

import (
	"fmt"
	"github.com/olivere/elastic/v7"
)

type Client struct {
	Address  string
	Username string
	Password string
	client   *elastic.Client
}

// Connect 连接到 Elasticsearch
func (es *Client) Connect() error {
	if es.Address == "" {
		return fmt.Errorf("Address is empty")
	}
	if es.Username == "" && es.Password == "" {
		client, err := elastic.NewClient(
			elastic.SetURL(es.Address),
			//elastic.SetBasicAuth(es.Username, es.Password), // 如果需要用户名和密码
			elastic.SetSniff(false), // 如果需要禁用嗅探（可选）
		)
		if err != nil {
			return fmt.Errorf("连接es失败: %s", err)
		}
		es.client = client
	} else {
		client, err := elastic.NewClient(
			elastic.SetURL(es.Address),
			elastic.SetBasicAuth(es.Username, es.Password), // 如果需要用户名和密码
			elastic.SetSniff(false),                        // 如果需要禁用嗅探（可选）
		)
		if err != nil {
			return fmt.Errorf("连接es失败: %s", err)
		}
		es.client = client
	}

	return nil
}
