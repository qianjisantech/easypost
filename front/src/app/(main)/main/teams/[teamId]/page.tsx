'use client';

import { usePathname, useRouter } from "next/navigation"; // 获取当前路径
import { useEffect, useState, useTransition } from "react";
import { Layout, Menu } from "antd";
import TeamsContent from "@/components/main/TeamContent";

export default function TeamPage() {
  const pathname = usePathname();  // 获取当前路径
  const [loading, setLoading] = useState(false);  // 控制 loading 状态
  const [isPending, startTransition] = useTransition();  // 控制跳转延迟

  const [teamId, setTeamId] = useState<string | null>(null);




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

          teamId={teamId}
        />
      </Layout>
    );
  }

}
