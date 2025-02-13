'use client'

import { useRef, useState } from "react";

import { Button, Form, Input, Layout, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'

import { TeamCreate } from '@/api/team'
import Sidebar from '@/components/main/Sidebar'
import { useGlobalContext } from "@/contexts/global";

export default function MainPage() {
  const { Title, Text } = Typography
  const [loading, setLoading] = useState(false) // 控制按钮加载状态
  const sidebarRef = useRef(null);
  const { messageApi } = useGlobalContext()
  const refreshTeams = () => {
    if (sidebarRef.current) {
      sidebarRef.current.fetchUserProfile()
    }
  };
  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      const response = await TeamCreate({ teamName: values.teamName })
      if (response.data.success) {

        messageApi.success(response.data.message)
        refreshTeams()
        // 你可以在此进行重定向或其他操作
      } else {
        messageApi.error(response.data.message || '创建团队失败')
        refreshTeams()
      }
    } catch (error) {
      messageApi.error('创建团队失败，请重试')
      refreshTeams()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <Sider>
        <Sidebar ref={sidebarRef}>

        </Sidebar>
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
          <Text style={{ display: 'block', marginBottom: '20px' }}>
            当前账号没有团队，请先创建
          </Text>

          <Form
            initialValues={{ teamName: '' }}
            layout="vertical"
            onFinish={handleSubmit}
          >
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

    </Layout>
  )
}
