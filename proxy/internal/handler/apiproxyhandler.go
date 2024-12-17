package handler

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"proxy/internal/logic"
	"proxy/internal/svc"
)

func ApiProxyHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		l := logic.NewApiProxyLogic(r.Context(), svcCtx)
		resp, err := l.ApiProxy()
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
