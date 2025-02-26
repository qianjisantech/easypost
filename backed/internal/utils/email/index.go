package email

import (
	"encoding/base64"
	"fmt"
	"net/smtp"
	"strings"
)

type Email struct {
	From    From
	To      To
	Content Content
}
type From struct {
	Host     string
	Port     string
	Username string
	Password string
}
type To struct {
	Host string
}
type Content struct {
	Subject string
	Body    string
}

func (e Email) Send() string {
	// 设置邮件服务器信息
	host := e.From.Host         // 邮件服务器地址
	port := e.From.Port         // 邮件服务器端口
	username := e.From.Username // 发件人邮箱地址
	password := e.From.Password // 发件人邮箱密码

	// 收件人地址
	to := []string{e.To.Host}

	// 对主题进行 Base64 编码
	subject := "=?UTF-8?B?" + base64.StdEncoding.EncodeToString([]byte(e.Content.Subject)) + "?="

	// 构建邮件头
	header := make(map[string]string)
	header["From"] = username
	header["To"] = strings.Join(to, ",")
	header["Subject"] = subject
	header["MIME-Version"] = "1.0"
	header["Content-Type"] = "text/plain; charset=UTF-8"
	header["Content-Transfer-Encoding"] = "base64"

	// 构建邮件消息
	message := ""
	for k, v := range header {
		message += fmt.Sprintf("%s: %s\r\n", k, v)
	}
	message += "\r\n" + base64.StdEncoding.EncodeToString([]byte(e.Content.Body))

	// 设置认证信息
	auth := smtp.PlainAuth("", username, password, host)

	// 发送邮件
	err := smtp.SendMail(host+":"+port, auth, username, to, []byte(message))
	if err != nil {
		return "发送邮件失败：" + err.Error()
	}
	return "邮件发送成功,请检查邮箱"
}
