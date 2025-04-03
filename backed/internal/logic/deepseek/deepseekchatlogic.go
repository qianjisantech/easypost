package deepseek

import (
	"backed/internal/svc"
	"backed/internal/types"
	"context"

	"github.com/zeromicro/go-zero/core/logx"
)

type DeepSeekChatLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewDeepSeekChatLogic(ctx context.Context, svcCtx *svc.ServiceContext) *DeepSeekChatLogic {
	return &DeepSeekChatLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *DeepSeekChatLogic) DeepSeekChat(req *types.DeepSeekChatRequest) (resp *types.DeepSeekChatResp, err error) {
	//url := "https://api.deepseek.com/chat/completions"
	//method := "POST"
	//
	//payload := strings.NewReader("{\n    \"model\": \"deepseek-chat\",\n    \"messages\": [\n        {\n            \"role\": \"assistant\",\n            \"content\": \"哈喽\"\n        }\n    ],\n    \"stream\": false\n}")
	//
	//client := &http.Client{}
	//req, err := http.NewRequest(method, url, payload)
	//
	//if err != nil {
	//	fmt.Println(err)
	//	return
	//}
	//req.Header.Add("Content-Type", "application/json")
	//req.Header.Add("Authorization", "Bearer sk-104629b15b9e4e10b8b5a1123e1c1046")
	//req.Header.Add("Cookie", "HWWAFSESID=dc6902febe3eac2155a; HWWAFSESTIME=1743578037298")
	//
	//res, err := client.Do(req)
	//if err != nil {
	//	fmt.Println(err)
	//	return
	//}
	//defer res.Body.Close()
	//
	//body, err := io.ReadAll(res.Body)
	//if err != nil {
	//	fmt.Println(err)
	//	return
	//}
	//fmt.Println(string(body))

	return
}
