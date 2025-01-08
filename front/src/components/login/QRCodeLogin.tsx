import React from 'react'
import { Row, Col, Button, Typography,QRCode } from 'antd'

const { Title } = Typography

const QRCodeLogin = () => {
  // 模拟生成的登录二维码
  const generateQRCodeData = () => {
    return `https://example.com/login?session=${Math.random().toString(36).substring(7)}`
  }

  return (
    <>
      <Title level={5}>请使用飞书扫码登录</Title>

      {/* 二维码展示 */}
      <Row
        gutter={[16, 16]}
        style={{
          marginBottom: 24,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Col>
          <QRCode value={generateQRCodeData()} size={144} />
        </Col>
        <div>
          <p>
            扫码表示您同意{" "}
            <span style={{ color: "#D6A5D6" }}>服务协议</span> 和{" "}
            <span style={{ color: "#D6A5D6" }}>隐私协议</span>
          </p>
        </div>
      </Row>

      {/*<Button*/}
      {/*  type="primary"*/}
      {/*  block*/}
      {/*  onClick={() => console.log('扫码成功')}*/}
      {/*  style={{ marginTop: 20 }}*/}
      {/*>*/}
      {/*  模拟扫码成功*/}
      {/*</Button>*/}
    </>
  )
}

export default QRCodeLogin
