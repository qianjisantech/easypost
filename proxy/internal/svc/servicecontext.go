package svc

import (
	"github.com/go-resty/resty/v2"
	"proxy/internal/config"
)

type ServiceContext struct {
	Config      config.Config
	ProxyClient *resty.Client
}

func NewServiceContext(c config.Config) *ServiceContext {
	return &ServiceContext{
		Config:      c,
		ProxyClient: resty.New(),
	}
}
