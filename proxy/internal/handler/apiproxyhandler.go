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
		} // 根据请求头的 "Accept" 字段来决定返回格式
		acceptHeader := r.Header.Get("Accept")

		// 默认返回 JSON 格式
		if acceptHeader == "" || acceptHeader == "application/json" {
			// 返回 JSON 格式
			httpx.OkJsonCtx(r.Context(), w, resp)
			return
		}

		// 如果客户端请求 HTML 格式
		if acceptHeader == "text/html" {
			// 设置响应头为 "text/html"
			w.Header().Set("Content-Type", "text/html")

			// 直接将响应作为 HTML 返回
			// 假设这里的 resp 是字节数组类型，表示 HTML 内容
			w.Write(resp.([]byte)) // 注意类型断言，确保 resp 是字节数组
			return
		}

		// 如果客户端请求其他格式，如 XML、文本等，可以继续添加其他判断
		if acceptHeader == "application/xml" {
			// 返回 XML 格式，这里需要你转换为 XML 格式
			// 例如，你可以用 xml.Marshal() 转换数据为 XML 字符串
			w.Header().Set("Content-Type", "application/xml")
			// 这里需要根据实际的数据结构将 resp 转换为 XML 格式
			xmlData, _ := xml.Marshal(resp) // 根据实际结构调整
			w.Write(xmlData)
			return
		}

		// 默认返回 406 Not Acceptable
		http.Error(w, "Not Acceptable", http.StatusNotAcceptable)
	}
}
