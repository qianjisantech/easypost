'use client';

import { Layout } from 'antd';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/main/Sidebar'; // 自定义 Sidebar
import React, { useEffect, useState } from 'react';

const { Sider, Content } = Layout;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [teamId, setTeamId] = useState<string | null>(null);

  useEffect(() => {
    if (pathname) {
      const match = pathname.match(/\/main\/teams\/([^/]+)/);
      if (match) {
        setTeamId(match[1]); // 提取 teamId
      }
    }
  }, [pathname]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar: 侧边栏不随路由变化 */}
      <Sider width={200} style={{ background: '#fff' }}>
        <Sidebar />
      </Sider>

      {/* Content: 根据路由变化动态更新 Content 部分 */}
      <Layout >
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            backgroundColor: '#fff',
          }}
        >
          {children}  {/* 渲染子页面内容 */}
        </Content>
      </Layout>
    </Layout>
  );
}
