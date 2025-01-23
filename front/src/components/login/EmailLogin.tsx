import React, { useState } from 'react'
import { Button, Col, Row, Input,message  } from 'antd'
import { useRouter } from "next/navigation";
import {login} from "@/api/auth";

const EmailLogin = () => {
  const [email, setEmail] = useState('2497822530@qq.com')
  const [password, setPassword] = useState('123456')  // 用于保存密码
  const [code, setCode] = useState('')          // 用于保存验证码
  const [isCodeLogin, setIsCodeLogin] = useState(false) // 控制是否是验证码登录
  const router = useRouter()
  // 发送验证码
  const handleSendCode = () => {
    console.log('发送验证码到:', email)
    // 在此处调用API发送验证码
  }

  // 登录处理
// 登录处理
  const handleEmailLogin = async () => {
    if (isCodeLogin) {
      console.log('Email:', email)
      console.log('Verification Code:', code)
      // 在此处进行邮箱验证码登录的逻辑
    } else {
      console.log('Email:', email)
      console.log('Password:', password)
      const res = await login({email,password})
      console.log("res",res)
      // 在此处进行邮箱密码登录的逻辑
    }

    // 显示登录成功的弹窗
    message.success('登录成功')

    // 成功后跳转到首页
    router.push('/main/teams')
    console.log('登录成功')
  }
  // 切换登录方式
  const handleSwitchLoginMethod = () => {
    setIsCodeLogin(!isCodeLogin)  // 切换登录方式
  }

  return (
    <>
      <Input
        placeholder="请输入邮箱"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: 10, marginTop: 30 }}
      />

      {/* 如果是验证码登录，显示验证码输入框 */}
      {isCodeLogin ? (
        <>
          <Row gutter={10} style={{ marginTop: 10 }}>
            <Col span={16}>
              <Input
                placeholder="请输入验证码"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </Col>
            <Col span={8}>
              <Button
                block
                onClick={handleSendCode}
                type="primary"
                style={{ height: '100%' }}
              >
                发送验证码
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        // 如果是密码登录，显示密码输入框
        <Input
          type="password"
          placeholder="请输入密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginTop: 10 }}
        />
      )}

      {/* 登录按钮 */}
      <Button
        type="primary"
        block
        onClick={handleEmailLogin}
        style={{ marginTop: 40 }}
      >
        登录
      </Button>

      {/* 切换登录方式按钮 */}
      <Row justify="start" style={{ marginTop: 5 }}>
        <Col>
          <Button
            type="link"
            onClick={handleSwitchLoginMethod}
            style={{
              color: "#D6A5D6",
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
