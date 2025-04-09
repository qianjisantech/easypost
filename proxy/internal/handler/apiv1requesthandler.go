package handler

import (
	"log"
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"proxy/internal/logic"
	"proxy/internal/svc"
)

func ApiV1RequestHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Printf("r *http.Request%s", r)
		log.Printf("http.ResponseWriter%s", w.Header())
		l := logic.NewApiV1RequestLogic(r, w, svcCtx)
		resp, err := l.ApiV1Request()
		// 调试日志 - 查看从 ApiV1Request 返回后的头信息
		log.Printf("After ApiV1Request, headers: %v", w.Header())
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
