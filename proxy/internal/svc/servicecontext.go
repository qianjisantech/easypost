package svc

import (
	"github.com/zeromicro/go-zero/rest"
	"proxy/internal/config"
	"proxy/internal/middleware"
)

type ServiceContext struct {
	Config       config.Config
	ProxyRequest rest.Middleware
}

func NewServiceContext(c config.Config) *ServiceContext {
	return &ServiceContext{
		Config:       c,
		ProxyRequest: middleware.NewProxyMiddleware().Handle,
	}
}
