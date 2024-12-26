'use client'

import { theme } from 'antd'

import { SideNav } from '@/app/(main)/components/SideNav'
import { HeaderNav } from '@/components/HeaderNav'
import { LayoutProvider } from '@/contexts/layout-settings'
import { useCssVariable } from '@/hooks/useCssVariable'


export default function MainLayout(props: React.PropsWithChildren) {
  const { token } = theme.useToken()

  const cssVar = useCssVariable()

  return (
    <div  style={{ backgroundColor: token.colorFillTertiary, ...cssVar }}>


      <div >

        <div
          style={{
            borderColor: token.colorFillSecondary,
            backgroundColor: token.colorBgContainer,
            borderRadius: 10,
          }}
        >
          <LayoutProvider>{props.children}</LayoutProvider>
        </div>
      </div>
    </div>
  )
}
