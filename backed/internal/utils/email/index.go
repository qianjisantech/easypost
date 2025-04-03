package email

import (
	"encoding/base64"
	"fmt"
	"github.com/zeromicro/go-zero/core/logx"
	"net"
	"net/smtp"
	"strings"
	"time"
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
	dialer := &net.Dialer{
		Timeout:   30 * time.Second, // 增加超时时间
		KeepAlive: 30 * time.Second,
	}
	conn, err := dialer.Dial("tcp", e.From.Host+":"+e.From.Port)
	if err != nil {
		logx.Debugf("SMTP连接失败: %v", err.Error())
		return "SMTP连接失败: %v" + err.Error()
	}
	defer conn.Close()

	// 2. 创建带超时的SMTP客户端
	client, err := smtp.NewClient(conn, e.From.Host)
	if err != nil {
		logx.Debugf("SMTP连接失败: %v", err.Error())
		return "创建SMTP客户端失败: %v" + err.Error()
	}
	defer client.Close()

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
	err = smtp.SendMail(host+":"+port, auth, username, to, []byte(message))
	if err != nil {
		logx.Debugf("发送邮件失败: %v", err.Error())
		return "发送邮件失败：" + err.Error()
	}
	return "邮件发送成功,请检查邮箱"
}
