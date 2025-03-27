import React, { useEffect, useState, useTransition } from 'react'

import { Button, Col, Input, message, Row, Spin } from 'antd'

import { EmailSendCode, LoginByEmail, RegisterByEmail } from '@/api/auth'
import { useGlobalContext } from '@/contexts/global'

const EmailLogin = (p: { password: string; email: string }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') // 保存密码
  const [code, setCode] = useState('') // 保存验证码
  const [isCodeLogin, setIsCodeLogin] = useState(false) // 是否是验证码登录
  const [codeLoading, setCodeLoading] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [loading, setLoading] = useState(false) // 登录按钮加载状态
  const [countdown, setCountdown] = useState(0)
  const { messageApi, isLogin, setIsLogin,setNeedSetPassword } = useGlobalContext()

  // 发送验证码
  const handleSendCode = async () => {
    if (loading || countdown > 0) {
      return
    } // 防止重复点击
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const response = await EmailSendCode({ email })
    if (response?.data?.success) {
      setCodeLoading(true)
      setCountdown(60) // 设置倒计时为60秒
      message.info(response?.data?.message)
      // 模拟发送验证码的异步操作
      setTimeout(() => {
        setLoading(false)
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      }, 1000)
    }
  }
  const handleEmailCodeLoginAndRegister = async () => {
    if (loading) {
      return
    }
    setLoading(true)
    try {

      const response = await RegisterByEmail({ email, code })
      if (response?.data?.success) {
        const token = response.data?.data.accessToken
        localStorage.setItem('accessToken', token)
        setIsLogin(true)
        messageApi.success(response.data?.message)
        if (response.data.data.needSetPassword){
          setNeedSetPassword(true)
        }
      }
    } catch (e) {
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  // 处理登录
  const handleEmailLogin = async () => {
    if (loading) {
      return
    } // 防止重复点击
    setLoading(true)

    try {
      let response
      if (isCodeLogin) {

        // 这里可以调用验证码登录 API
      } else {

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        response = await LoginByEmail({ email, password })
      }

      if (response?.data?.success) {
        const token = response.data?.data.accessToken
        localStorage.setItem('accessToken', token)
        setIsLogin(true)
        messageApi.success(response.data?.message)
      }
    } catch (error) {
      console.error('登录错误:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* 过渡加载动画 */}
      {isPending && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.7)', // 半透明背景
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <Spin size="large" tip="Loading..." />
        </div>
      )}

      <Input
        placeholder="邮箱"
        style={{ marginBottom: 10, marginTop: 30 }}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />

      {isCodeLogin ? (
        <Row gutter={10} style={{ marginTop: 10 }}>
          <Input.Group compact>
            <Input
              placeholder="验证码"
              style={{ width: 'calc(100% - 120px)', textAlign: 'left' }}
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
              }}
            />
            <Button
              disabled={countdown > 0}
              loading={codeLoading}
              style={{ width: '120px', color: '#D6A5D6' }}
              onClick={handleSendCode}
            >
              {countdown > 0 ? `${countdown}s` : '获取邮箱验证码'}
            </Button>
          </Input.Group>
        </Row>
      ) : (
        <Input
          placeholder="请输入密码"
          style={{ marginTop: 10 }}
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      )}
      {isCodeLogin && (
        <p>
          点击“登录/注册”表示您同意 <span style={{ color: '#D6A5D6' }}>服务协议</span> 和{' '}
          <span style={{ color: '#D6A5D6' }}>隐私协议</span>
        </p>
      )}
      {isCodeLogin ? (
        <Button
          block
          loading={loading}
          style={{ marginTop: 10 }}
          type="primary"
          onClick={handleEmailCodeLoginAndRegister}
        >
          登录/注册
        </Button>
      ) : (
        <Button
          block
          loading={loading}
          style={{ marginTop: 10 }}
          type="primary"
          onClick={handleEmailLogin}
        >
          登录
        </Button>
      )}

      <Row justify="start" style={{ marginTop: 5 }}>
        <Col>
          <Button
            style={{ color: '#D6A5D6' }}
            type="link"
            onClick={() => {
              setIsCodeLogin(!isCodeLogin)
            }}
          >
            {isCodeLogin ? '邮箱密码登录' : '验证码登录/注册'}
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default EmailLogin
