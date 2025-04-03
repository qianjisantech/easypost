package config

import "github.com/zeromicro/go-zero/rest"

type Config struct {
	rest.RestConf
	Mysql struct {
		Datasource string
	}
	Redis struct {
		Host     string
		Port     string
		Password string
		Tls      bool
	}
	Email struct {
		Host     string
		Port     string
		Username string
		Password string
	}
}
