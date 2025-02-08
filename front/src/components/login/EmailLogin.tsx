import React, { useState, useTransition } from 'react';
import { Button, Col, Row, Input, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { Login } from '@/api/auth';
import { useGlobalContext } from "@/contexts/global";

const EmailLogin = () => {
  const [email, setEmail] = useState('2497822530@qq.com');
  const [password, setPassword] = useState('123456');  // 保存密码
  const [code, setCode] = useState('');                // 保存验证码
  const [isCodeLogin, setIsCodeLogin] = useState(false); // 控制是否是验证码登录
  const router = useRouter();
  const { messageApi } = useGlobalContext();
  // 使用 useTransition 管理页面跳转的 loading 状态
  const [isPending, startTransition] = useTransition();

  // 发送验证码
  const handleSendCode = () => {
    console.log('发送验证码到:', email);
    // 调用API发送验证码
  };

  // 登录处理
  const handleEmailLogin = async () => {
    if (isCodeLogin) {
      console.log('Email:', email);
      console.log('Verification Code:', code);
      // 处理邮箱验证码登录逻辑
    } else {
      console.log('Email:', email);
      console.log('Password:', password);
      try {
        const response = await Login({ email, password });
        console.log('res', response);

        if (response.data.success) {
          const token = response.data.data.accessToken;
          if (token) {
            localStorage.setItem('accessToken', token);
          }
          // 使用 startTransition 包裹路由跳转，isPending 状态会在过渡期间为 true
          startTransition(() => {
            router.push('/main/teams/1');
          });
          console.log('Token saved to localStorage');
        } else {
          console.error('Login failed:', response.data.message);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
  };

  // 切换登录方式
  const handleSwitchLoginMethod = () => {
    setIsCodeLogin(!isCodeLogin);
  };

  return (
    <>
      {/* 当 isPending 为 true 时，使用 Ant Design 的 Spin 组件显示全屏 loading */}
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
            style={{ color: '#D6A5D6' }}
          >
            {isCodeLogin ? '邮箱密码登录' : '验证码登录/注册'}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default EmailLogin;
