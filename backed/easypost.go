package main

import (
	"backed/internal/common/errorx"
	"backed/internal/config"
	"backed/internal/handler"
	"backed/internal/svc"
	"context"
	"database/sql"
	"errors"
	"flag"
	"fmt"
	"github.com/zeromicro/go-zero/core/conf"
	"github.com/zeromicro/go-zero/rest"
	"github.com/zeromicro/go-zero/rest/httpx"
	"gorm.io/gorm"
	"io"
	"net"
	"net/http"
	"os"
)

var configFile = flag.String("f", "etc/easypost-api.yaml", "the config file")

func main() {
	flag.Parse()

	var c config.Config
	conf.MustLoad(*configFile, &c)
	ctx := svc.NewServiceContext(c)
	server := rest.MustNewServer(c.RestConf)
	defer server.Stop()
	server.Use(ctx.Log)
	server.Use(ctx.Auth)
	server.Use(ctx.Recover)
	handler.RegisterHandlers(server, ctx)
	// 自定义错误
	httpx.SetErrorHandler(func(err error) (int, interface{}) {
		var e *errorx.CodeError
		switch {
		case errors.As(err, &e):
			return http.StatusOK, e.Data()
		case errors.Is(err, sql.ErrNoRows) || errors.Is(err, gorm.ErrRecordNotFound):
			return errorx.ErrorResponse(http.StatusOK, errorx.ErrMessageNotFound)
		case errors.Is(err, sql.ErrConnDone):
			return errorx.ErrorResponse(http.StatusInternalServerError, errorx.ErrMessageDBConnClosed)
		case errors.Is(err, sql.ErrTxDone):
			return errorx.ErrorResponse(http.StatusInternalServerError, errorx.ErrMessageTxDone)
		case errors.Is(err, os.ErrNotExist):
			return errorx.ErrorResponse(http.StatusNotFound, errorx.ErrMessageResourceNotFound)
		case errors.Is(err, http.ErrBodyNotAllowed):
			return errorx.ErrorResponse(http.StatusBadRequest, errorx.ErrMessageBodyNotAllowed)
		case errors.Is(err, http.ErrContentLength):
			return errorx.ErrorResponse(http.StatusBadRequest, errorx.ErrMessageContentLength)
		case errors.Is(err, http.ErrHandlerTimeout):
			return errorx.ErrorResponse(http.StatusRequestTimeout, errorx.ErrMessageHandlerTimeout)
		case errors.Is(err, os.ErrPermission):
			return errorx.ErrorResponse(http.StatusForbidden, errorx.ErrMessagePermissionDenied)
		//case errors.As(err, &json.SyntaxError{}):
		//	return errorx.ErrorResponse(http.StatusBadRequest, errorx.ErrMessageJSONSyntax)
		//case errors.As(err, &json.UnmarshalTypeError{}):
		//	return errorx.ErrorResponse(http.StatusBadRequest, errorx.ErrMessageJSONTypeMismatch)
		//case errors.As(err, &json.InvalidUnmarshalError{}):
		//	return errorx.ErrorResponse(http.StatusBadRequest, errorx.ErrMessageInvalidUnmarshal)
		case errors.Is(err, net.ErrClosed):
			return errorx.ErrorResponse(http.StatusBadRequest, errorx.ErrMessageNetClosed)
		case errors.Is(err, net.ErrWriteToConnected):
			return errorx.ErrorResponse(http.StatusBadRequest, errorx.ErrMessageUDPWrite)
		//case errors.As(err, &time.ParseError{}):
		//	return errorx.ErrorResponse(http.StatusBadRequest, errorx.ErrMessageTimeFormat)
		case errors.Is(err, context.DeadlineExceeded):
			return errorx.ErrorResponse(http.StatusRequestTimeout, errorx.ErrMessageTimeout)
		case errors.Is(err, io.EOF):
			return errorx.ErrorResponse(http.StatusBadRequest, errorx.ErrMessageEOF)
		case errors.Is(err, context.DeadlineExceeded):
			return errorx.ErrorResponse(http.StatusBadRequest, errorx.ContextDeadlineExceeded)
		default:
			// 记录未知错误的详细信息
			logx.Debug("未知错误: %v", err)
			return errorx.ErrorResponse(http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError))
		}

	})

	fmt.Printf("Starting server at %s:%d...\n", c.Host, c.Port)
	server.Start()
}
