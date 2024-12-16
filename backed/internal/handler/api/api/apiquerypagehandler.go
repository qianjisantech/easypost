package api

import (
	"net/http"

	"github.com/qianjisantech/easypost/backed/internal/logic/api/api"
	"github.com/qianjisantech/easypost/backed/internal/svc"
	"github.com/qianjisantech/easypost/backed/internal/types"
	"github.com/zeromicro/go-zero/rest/httpx"
)

func ApiQueryPageHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.ApiQueryPageRequest
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := api.NewApiQueryPageLogic(r.Context(), svcCtx)
		resp, err := l.ApiQueryPage(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
