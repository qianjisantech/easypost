import type { Metadata, Viewport } from 'next'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { App } from 'antd'

import { ThemeProviderClient } from '@/components/ThemeEditor'
import { GlobalContextProvider } from '@/contexts/global'

import { getPageTitle } from '../utils'

import '@/styles/globals.css'

export const metadata: Metadata = {
  icons: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  title: getPageTitle(),
  description: '使用 Next.js + Antd 编写的 API网站',
  authors: [{ name: '', url: 'https://github.com/Codennnn' }],
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  colorScheme: 'light',
}

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html className="h-full" lang="zh-Hans-CN">
      <body className="m-0 h-full">
        <AntdRegistry>
          <App className="h-full">
            <ThemeProviderClient autoSaveId="theme:persistence">
              <main className="h-full">
                <GlobalContextProvider>{props.children}</GlobalContextProvider>
              </main>
            </ThemeProviderClient>
          </App>
        </AntdRegistry>
      </body>
    </html>
  )
}
