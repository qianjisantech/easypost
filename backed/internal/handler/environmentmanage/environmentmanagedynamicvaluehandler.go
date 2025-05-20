package environmentmanage

import (
	"net/http"

	"backed/internal/logic/environmentmanage"
	"backed/internal/svc"
	"backed/internal/types"
	"github.com/zeromicro/go-zero/rest/httpx"
)

func EnvironmentManageDynamicValueHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.EnvironmentManageDynamicValueRequest
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := environmentmanage.NewEnvironmentManageDynamicValueLogic(r.Context(), svcCtx)
		resp, err := l.EnvironmentManageDynamicValue(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
