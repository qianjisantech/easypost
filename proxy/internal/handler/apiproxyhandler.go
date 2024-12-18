package handler

import (
	"encoding/xml"
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
		}
		contentType := w.Header().Get("Content-Type")
		switch contentType {
		case "application/json":
			httpx.OkJsonCtx(r.Context(), w, resp)
		case "":
			httpx.OkJsonCtx(r.Context(), w, resp)
		case "text/html":
			// 设置响应头为 "text/html"
			w.Header().Set("Content-Type", "text/html")

			// 直接将响应作为 HTML 返回
			// 假设这里的 resp 是字节数组类型，表示 HTML 内容
			_, err := w.Write(resp.([]byte))
			if err != nil {
				return
			} // 注意类型断言，确保 resp 是字节数组
			return
		case "application/xml":
			w.Header().Set("Content-Type", "application/xml")
			// 这里需要根据实际的数据结构将 resp 转换为 XML 格式
			xmlData, _ := xml.Marshal(resp) // 根据实际结构调整
			_, err := w.Write(xmlData)
			if err != nil {
				return
			}
			return
		default:
			http.Error(w, "Not Acceptable", http.StatusNotAcceptable)
		}

	}
}
