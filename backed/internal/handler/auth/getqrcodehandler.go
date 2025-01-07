package auth

import (
	"net/http"

	"backed/internal/logic/auth"
	"backed/internal/svc"
	"github.com/zeromicro/go-zero/rest/httpx"
)

func GetQRCodeHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		l := auth.NewGetQRCodeLogic(r.Context(), svcCtx)
		resp, err := l.GetQRCode()
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
