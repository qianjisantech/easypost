'use client'

import { useEffect, useState, useTransition } from 'react'

import { usePathname, useRouter } from 'next/navigation' // 获取当前路径
import { Layout, Menu } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'

import Sidebar from '@/components/main/Sidebar'
import TeamsContent from '@/components/main/TeamContent'

export default function TeamPage() {
  const pathname = usePathname() // 获取当前路径
  const [loading, setLoading] = useState(false) // 控制 loading 状态
  const [isPending, startTransition] = useTransition() // 控制跳转延迟

  const [teamId, setTeamId] = useState<string | null>(null)

  useEffect(() => {
    if (pathname) {
      const match = pathname.match(/\/main\/teams\/([^/]+)/)
      if (match) {
        setTeamId(match[1]) // 提取 teamId
      }
    }
  }, [pathname])
  if (teamId) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <Sidebar ></Sidebar>
        </Sider>
        <Content >
          <TeamsContent  loading={loading} teamId={teamId} />
        </Content>
      </Layout>
    )
  }
}
