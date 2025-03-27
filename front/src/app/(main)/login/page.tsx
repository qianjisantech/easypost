'use client'

import React, { useState } from 'react'
import { Button, Card, Typography } from 'antd'
import QRCodeLogin from '@/components/login/QRCodeLogin'
import EmailLogin from '@/components/login/EmailLogin'
import SwitchLoginMethodButton from '@/components/login/SwitchLoginMethodButton'

const { Title } = Typography

const LoginPage = () => {
  const [isQRCodeLogin, setIsQRCodeLogin] = useState(false)


  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        position: 'relative',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.1))',
        overflow: 'hidden',
      }}
    >
      {/* 左上角的SVG */}
      <div style={{ position: "absolute", top: 30, left: 30, display: "flex", alignItems: "center" }}>
        <svg
          t="1735037586493"
          className="icon"
          viewBox="0 0 1028 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="7534"
          width="64"
          height="64"
        >
          <path
            d="M585.473374 295.885775l-240.51966 65.974206 48.843004 180.976182 240.583927-65.974205 49.067938 180.815514-240.583927 63.854395 46.81859 180.976182-240.583927 63.841341-59.672012-216.962752a178.104246 178.104246 0 0 0 36.250667-159.735902c-17.062918-57.48693-59.639878-102.184705-110.700097-121.336304L55.330969 244.793423l483.288669-127.795149z m304.433301-8.483258L811.147331 0 0.001004 215.005617l78.75834 289.555465c46.81859 8.579659 89.427684 44.697775 102.184705 95.790128 14.90997 51.124486-4.273763 102.184705-40.456146 136.246273l76.606395 287.402517 811.180469-217.126432-76.7038-287.402516c-48.939404-8.579659-89.363417-44.697775-104.273386-95.790128-12.753005-51.124486 4.273763-104.333637 42.57696-136.246274z"
            fill="#FF7300"
            p-id="7535"
          ></path>
        </svg>
        <Title level={2} style={{ marginLeft: 10 }}>EasyPost</Title>
      </div>

      {/* 卡片展示二维码或邮箱登录信息 */}
      <Card
        style={{
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
          padding: "20px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          transition: "box-shadow 0.3s ease"
        }}
        hoverable
      >
        <Title level={2}>欢迎使用EasyPost</Title>

        {isQRCodeLogin ? (
          <QRCodeLogin />
        ) : (
          <EmailLogin />
        )}

        {/* 切换登录方式按钮 */}
        <SwitchLoginMethodButton
          isQRCodeLogin={isQRCodeLogin}
          setIsQRCodeLogin={setIsQRCodeLogin}
        />
      </Card>
      <div style={{
        position: 'fixed',
        bottom:100,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: '#666',
        padding: '10px 0',
        backgroundColor: '#fff',  // 可选：添加背景色
        zIndex: 1000              // 确保在其他内容之上
      }}>
        测试团队 出品
      </div>
    </div>
  )
}

export default LoginPage
