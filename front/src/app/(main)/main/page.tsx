'use client'

import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/navigation'
import { Button, Form, Input, Layout, Modal, Typography } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'

import { TeamCreate } from '@/api/team'
import { UserSetPassword } from '@/api/user'
import HeaderPage from '@/components/main/Header'
import Sidebar from '@/components/main/Sidebar'
import { useGlobalContext } from '@/contexts/global'
import { ROUTES } from '@/utils/routes'

export default function MainPage() {
  const { Title, Text } = Typography
  const [loading, setLoading] = useState(false) // 控制按钮加载状态
  const { messageApi, fetchTeams, needSetPassword } = useGlobalContext()
  const router = useRouter()
  const [passwordModalVisible, setPasswordModalVisible] = useState(false) // 控制设置密码弹窗
  const [password, setPassword] = useState('') // 密码状态
  const [confirmPassword, setConfirmPassword] = useState('') // 确认密码状态
  const [passwordMatch, setPasswordMatch] = useState(true) // 用于判断密码是否匹配
  useEffect(() => {
    if (needSetPassword) {
      setPasswordModalVisible(true)
    }
  }, [needSetPassword])
  const handleTeamJumpTo = (teamId) => {
    router.replace(ROUTES.TEAMS(teamId))
  }

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      const response = await TeamCreate({ teamName: values.teamName })
      if (response.data.success) {
        messageApi.success(response.data.message)
        handleTeamJumpTo(response.data.data.id)
        fetchTeams()
        // 你可以在此进行重定向或其他操作
      } else {
        messageApi.error(response.data.message || '创建团队失败')
      }
    } catch (error) {
      messageApi.error('创建团队失败，请重试')
    } finally {
      setLoading(false)
    }
  }
  const handlePasswordSubmit = async () => {
    // 判断密码是否匹配
    if (password !== confirmPassword) {
      setPasswordMatch(false)
      return
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const response = await UserSetPassword({ password: password })
      if (response.data.success) {
        messageApi.success(response.data.message)
      }
    }
    setPasswordModalVisible(false)
  }

  return (
    <Layout>
      <Sider>
        <Sidebar></Sidebar>
      </Sider>
      <Content
        style={{
          backgroundColor: 'white',
          width: '100%',
          height: '100vh', // 使用视口高度填充整个页面
          display: 'flex',
          justifyContent: 'center', // 水平居中
          alignItems: 'center', // 垂直居中
        }}
      >
        <div
          style={{
            width: '50%', // 让宽度减少一半
            maxWidth: '400px', // 可选，限制最大宽度
            textAlign: 'center',
            backgroundColor: '#fff', // 背景色
            padding: '20px',
            borderRadius: '8px',
          }}
        >
          <Title level={2}>创建团队</Title>
          <Text style={{ display: 'block', marginBottom: '20px' }}>当前账号没有团队，请先创建</Text>

          <Form initialValues={{ teamName: '' }} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="teamName" rules={[{ required: true, message: '请输入团队名称!' }]}>
              <Input placeholder="请输入团队名称" />
            </Form.Item>

            <Form.Item>
              <Button block htmlType="submit" loading={loading} type="primary">
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
      {/* 设置密码弹窗 */}
      <Modal
        closable={false} // 禁止关闭弹窗
        footer={null}
        title="设置密码"
        visible={needSetPassword && passwordModalVisible}
        onCancel={() => {}}
      >
        <Form layout="vertical" onFinish={handlePasswordSubmit}>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password
              placeholder="请输入密码"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="confirmPassword"
            rules={[{ required: true, message: '请确认密码!' }]}
          >
            <Input.Password
              placeholder="确认密码"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
            />
          </Form.Item>

          {!passwordMatch && (
            <div style={{ color: 'red', marginBottom: '10px' }}>密码不匹配，请重新输入</div>
          )}

          <Form.Item>
            <Button block htmlType="submit" type="primary">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  )
}
