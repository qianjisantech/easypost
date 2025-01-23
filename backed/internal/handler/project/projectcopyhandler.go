package project

import (
	"net/http"

	"backed/internal/logic/project"
	"backed/internal/svc"
	"backed/internal/types"
	"github.com/zeromicro/go-zero/rest/httpx"
)

func ProjectCopyHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.ProjectCopyRequest
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := project.NewProjectCopyLogic(r.Context(), svcCtx)
		resp, err := l.ProjectCopy(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
