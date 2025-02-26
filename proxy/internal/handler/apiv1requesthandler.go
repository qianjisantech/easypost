package handler

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"proxy/internal/logic"
	"proxy/internal/svc"
)

func ApiV1RequestHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		l := logic.NewApiV1RequestLogic(r.Context(), svcCtx)
		resp, err := l.ApiV1Request()
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
