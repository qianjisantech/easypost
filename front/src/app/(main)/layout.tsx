'use client'

import { Layout, theme } from 'antd'
import HeaderPage from '@/components/main/Header'
import { LayoutProvider } from '@/contexts/layout-settings'
import { useCssVariable } from '@/hooks/useCssVariable'
import { usePathname } from "next/navigation";

export default function MainLayout(props: React.PropsWithChildren) {
  const { token } = theme.useToken()

  const cssVar = useCssVariable()
 const pathname= usePathname()
  return (
    <div style={{ backgroundColor: token.colorFillTertiary, ...cssVar }}>
      <div>
        <div
          style={{
            borderColor: token.colorFillSecondary,
            backgroundColor: token.colorBgContainer,
            borderRadius: 10,
          }}
        >
          {/* 只有当前路径不是 /login 时才展示 HeaderPage */}
          {pathname !== '/login' && <HeaderPage />}
          <LayoutProvider>{props.children}</LayoutProvider>
        </div>
      </div>
    </div>
  )
}
