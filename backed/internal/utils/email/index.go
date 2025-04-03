package email

import (
	"crypto/tls"
	"encoding/base64"
	"fmt"
	"github.com/zeromicro/go-zero/core/logx"
	"net/smtp"
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
	// 1. 连接 SMTP 服务器
	tlsconfig := &tls.Config{
		InsecureSkipVerify: false, // 推荐设置为 false，确保证书验证
		ServerName:         e.From.Host,
	}

	conn, err := tls.Dial("tcp", e.From.Host+":"+e.From.Port, tlsconfig)
	if err != nil {
		logx.Debugf("SMTP 连接失败: %v", err.Error())
		return "SMTP 连接失败: " + err.Error()
	}
	defer conn.Close()

	// 2. 创建 SMTP 客户端
	client, err := smtp.NewClient(conn, e.From.Host)
	if err != nil {
		logx.Debugf("创建 SMTP 客户端失败: %v", err.Error())
		return "创建 SMTP 客户端失败: " + err.Error()
	}

	// 3. 进行身份认证
	auth := smtp.PlainAuth("", e.From.Username, e.From.Password, e.From.Host)
	if err = client.Auth(auth); err != nil {
		logx.Debugf("SMTP 认证失败: %v", err.Error())
		return "SMTP 认证失败: " + err.Error()
	}

	// 4. 设置发件人和收件人
	if err = client.Mail(e.From.Username); err != nil {
		logx.Debugf("设置发件人失败: %v", err.Error())
		return "设置发件人失败: " + err.Error()
	}
	if err = client.Rcpt(e.To.Host); err != nil {
		logx.Debugf("设置收件人失败: %v", err.Error())
		return "设置收件人失败: " + err.Error()
	}

	// 5. 发送邮件内容
	w, err := client.Data()
	if err != nil {
		logx.Debugf("获取写入器失败: %v", err.Error())
		return "获取写入器失败: " + err.Error()
	}

	// 构造邮件内容
	subject := "=?UTF-8?B?" + base64.StdEncoding.EncodeToString([]byte(e.Content.Subject)) + "?="
	message := fmt.Sprintf("From: %s\r\nTo: %s\r\nSubject: %s\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n%s",
		e.From.Username, e.To.Host, subject, base64.StdEncoding.EncodeToString([]byte(e.Content.Body)))

	if _, err = w.Write([]byte(message)); err != nil {
		logx.Debugf("写入邮件内容失败: %v", err.Error())
		return "写入邮件内容失败: " + err.Error()
	}
	w.Close()

	client.Quit()
	return "邮件发送成功，请检查邮箱"
}
