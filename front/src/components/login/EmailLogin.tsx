import React, { useEffect, useState, useTransition } from 'react'


import { Button, Col, Input, message, Row, Spin } from 'antd'

import { Login } from '@/api/auth'

import { useGlobalContext } from '@/contexts/global'

const EmailLogin = () => {
  const [email, setEmail] = useState('2497822530@qq.com')
  const [password, setPassword] = useState('123456') // 保存密码
  const [code, setCode] = useState('') // 保存验证码
  const [isCodeLogin, setIsCodeLogin] = useState(false) // 是否是验证码登录

  const [isPending, startTransition] = useTransition()
  const [loading, setLoading] = useState(false) // 登录按钮加载状态

  const { messageApi, isLogin, setIsLogin } = useGlobalContext()

  // 发送验证码
  const handleSendCode = () => {
    console.log('发送验证码到:', email)
    messageApi.info('验证码已发送，请检查邮箱。')
    // 这里可以调用 API 发送验证码
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
        console.log('验证码登录:', email, code)
        // 这里可以调用验证码登录 API
      } else {
        console.log('密码登录:', email, password)
        response = await Login({ email, password })
      }

      if (response?.data?.success) {
        const token = response?.data?.data.accessToken
        localStorage.setItem('accessToken', token)
        setIsLogin(true)
        messageApi.success(response?.data?.message)

      } else {
        messageApi.error(response?.data?.message || '登录失败，请检查账号或密码')
      }
    } catch (error) {
      console.error('登录错误:', error)
      messageApi.error('登录失败，请稍后重试')
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
        placeholder="请输入邮箱"
        style={{ marginBottom: 10, marginTop: 30 }}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />

      {isCodeLogin ? (
        <Row gutter={10} style={{ marginTop: 10 }}>
          <Col span={16}>
            <Input
              placeholder="请输入验证码"
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
              }}
            />
          </Col>
          <Col span={8}>
            <Button block type="primary" onClick={handleSendCode}>
              发送验证码
            </Button>
          </Col>
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

      <Button
        block
        loading={loading}
        style={{ marginTop: 40 }}
        type="primary"
        onClick={handleEmailLogin}
      >
        登录
      </Button>

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
