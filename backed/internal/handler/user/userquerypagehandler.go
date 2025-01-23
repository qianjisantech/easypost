package user

import (
	"net/http"

	"backed/internal/logic/user"
	"backed/internal/svc"
	"backed/internal/types"
	"github.com/zeromicro/go-zero/rest/httpx"
)

func UserQueryPageHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.UserQueryPageRequest
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := user.NewUserQueryPageLogic(r.Context(), svcCtx)
		resp, err := l.UserQueryPage(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
