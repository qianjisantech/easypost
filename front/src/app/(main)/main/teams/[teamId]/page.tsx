'use client';

import { usePathname, useRouter } from "next/navigation"; // 获取当前路径
import { useEffect, useState, useTransition } from "react";
import { Layout, Menu } from "antd";
import TeamsContent from "@/components/main/TeamContent";

export default function TeamPage() {
  const pathname = usePathname();  // 获取当前路径
  const [loading, setLoading] = useState(false);  // 控制 loading 状态
  const [isPending, startTransition] = useTransition();  // 控制跳转延迟
  const router = useRouter();
  const [teamId, setTeamId] = useState<string | null>(null);


  const cardsData = [
    { title: '中东', icon: 'appstore', color: '#1890ff', route: '/project' },
    { title: '巴西', icon: 'file', color: '#52c41a', route: '/project' },
    { title: '墨西哥', icon: 'database', color: '#faad14', route: '/project' },
    { title: '埃及', icon: 'user', color: '#13c2c2', route: '/project' },
    { title: '阿联酋', icon: 'appstore', color: '#2f54eb', route: '/project' },
  ];

  const handleCardClick = (route) => {
    setLoading(true);  // 跳转前显示 loading
    startTransition(() => {
      router.push(route);  // 执行跳转
    });
  };
  useEffect(() => {
    if (pathname) {
      const match = pathname.match(/\/main\/teams\/([^/]+)/);
      if (match) {
        setTeamId(match[1]); // 提取 teamId
      }
    }
  }, [pathname]);
  const menu = (
    <Menu onClick={(e) => console.log(`Clicked ${e.key}`)}>
      <Menu.Item key="copy">复制</Menu.Item>
      <Menu.Item key="edit">编辑</Menu.Item>
    </Menu>
  );
  if (teamId) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {/*Main content section*/}
        <TeamsContent
          loading={loading}
          cardsData={cardsData}
          handleCardClick={handleCardClick}
          menu={menu}
          teamId={teamId}
        />
      </Layout>
    );
  }

}
