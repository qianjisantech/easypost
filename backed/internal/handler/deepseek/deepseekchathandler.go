package deepseek

import (
	"context"
	"errors"
	"io"
	"net/http"

	"backed/internal/logic/deepseek"
	"backed/internal/svc"
	"backed/internal/types"
	"github.com/zeromicro/go-zero/rest/httpx"
)

func DeepSeekChatHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.DeepSeekChatRequest
		err := r.ParseMultipartForm(10 << 20)
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}
		file, _, err := r.FormFile("file")
		if err != nil && !errors.Is(err, http.ErrMissingFile) {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}
		// 如果有文件，将其信息存入 context
		ctx := r.Context()
		if file != nil {
			defer file.Close()

			// 创建一个包含文件信息的结构体
			fileInfo := struct {
				File io.Reader
			}{
				File: file,
			}

			// 使用自定义 key 存储到 context
			ctx = context.WithValue(ctx, "file", fileInfo)
		}
		l := deepseek.NewDeepSeekChatLogic(r.Context(), svcCtx)
		resp, err := l.DeepSeekChat(&req)
		// 确保文件在逻辑处理后关闭
		if file != nil {
			defer file.Close()
		}

		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}

}
