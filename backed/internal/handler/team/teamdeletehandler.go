package team

import (
	"net/http"

	"backed/internal/logic/team"
	"backed/internal/svc"
	"backed/internal/types"
	"github.com/zeromicro/go-zero/rest/httpx"
)

func TeamDeleteHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.TeamDeleteRequest
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := team.NewTeamDeleteLogic(r.Context(), svcCtx)
		resp, err := l.TeamDelete(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
