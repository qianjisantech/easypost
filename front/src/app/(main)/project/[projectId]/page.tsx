'use client'
import type React from 'react';
import { useState } from 'react'

import { useRouter } from 'next/navigation'
import { HomeOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Dropdown, Flex, Space, theme,Tooltip } from 'antd'
import { FilterIcon, PlusIcon } from 'lucide-react'

import { ApiMenu } from '@/components/ApiMenu'
import { ApiTab } from '@/components/ApiTab'
import { FileIcon } from '@/components/icons/FileIcon'
import { IconLogo } from '@/components/icons/IconLogo'
import { IconText } from '@/components/IconText'
import { InputSearch } from '@/components/InputSearch'
import { API_MENU_CONFIG } from '@/configs/static'
import { MenuTabProvider } from '@/contexts/menu-tab-settings'
import { MenuItemType } from '@/enums'
import { getCatalogType } from '@/helpers'
import { useHelpers } from '@/hooks/useHelpers'
import { useStyles } from '@/hooks/useStyle'

import { PanelLayout } from '../../components/PanelLayout'

import { css } from '@emotion/css'
import { ApiMenuContextProvider } from "@/components/ApiMenu/ApiMenuContext";

function ProjectContent() {
  const router = useRouter()
  const { createTabItem } = useHelpers()
  const { token } = theme.useToken()

  // 记录当前选中的菜单项
  const [selectedMenu, setSelectedMenu] = useState<string>('接口管理')

  interface NavItemProps {
    active?: boolean
    name: string
    icon: React.ReactNode
    onClick: () => void
  }

  const returnToProject = () => {
    router.back()
  }

  function NavItem({ active, name, icon, onClick }: NavItemProps) {
    const { styles } = useStyles(({ token }) => ({
      item: css({
        color: active ? token.colorPrimary : token.colorTextSecondary,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: token.colorFillTertiary,
        },
      }),
    }))

    return (
      <div
        className={`flex flex-col items-center gap-1 rounded-md p-2 ${styles.item}`}
        onClick={onClick}
      >
        {icon}
        <span className="text-xs">{name}</span>
      </div>
    )
  }

  return (
    <Flex direction="row" style={{ height: '80%', marginTop: '2%' }}>
      {/* 左侧导航栏 */}
      <div className="flex h-full shrink-0 basis-[80px] flex-col items-center overflow-y-auto overflow-x-hidden px-1 pt-layoutHeader">
        <div
          className="mb-5 mt-2 size-10 rounded-xl p-[6px]"
          style={{ color: token.colorText, border: `1px solid ${token.colorBorder}` }}
        >
          <IconLogo />
        </div>

        {/* 导航菜单 */}
        <Space direction="vertical" size={14}>
          {/* 接口管理 */}
          <NavItem
            icon={
              <svg
                aria-hidden="true"
                className="size-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1c0 .6-.4 1-1 1h-4a1 1 0 0 1-1-1Z"
                  fillRule="evenodd"
                />
                <path d="M2 6c0-1.1.9-2 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z" />
              </svg>
            }
            name="接口管理"
            active={selectedMenu === '接口管理'}
            onClick={() => setSelectedMenu('接口管理')}
          />

          {/* 自动化测试 */}
          <NavItem
            icon={
              <svg
                aria-hidden="true"
                className="size-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM10 16l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 8l-8 8Z"
                  fillRule="evenodd"
                />
              </svg>
            }
            name="流量录制"
            active={selectedMenu === '流量录制'}
            onClick={() => setSelectedMenu('流量录制')}
          />
        </Space>
      </div>

      {/* 右侧内容区域 */}
      <PanelLayout
        layoutName={selectedMenu}
        left={
          selectedMenu === '接口管理' ? (
            <>
              <Button type="default" onClick={returnToProject}>
                <HomeOutlined />
              </Button>

              <Flex gap={token.paddingXXS} style={{ padding: token.paddingXS }}>
                <InputSearch />

                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        paddingInline: token.paddingXS,
                        defaultBorderColor: token.colorBorderSecondary,
                      },
                    },
                  }}
                >
                  <Tooltip title="显示筛选条件">
                    <Button>
                      <IconText icon={<FilterIcon size={16} />} />
                    </Button>
                  </Tooltip>

                  <Dropdown
                    menu={{
                      items: [
                        ...[
                          MenuItemType.ApiDetail,
                          MenuItemType.HttpRequest,
                          MenuItemType.Doc,
                          MenuItemType.ApiSchema,
                        ].map((t) => {
                          const { newLabel } = API_MENU_CONFIG[getCatalogType(t)]

                          return {
                            key: t,
                            label: t === MenuItemType.Doc ? '新建 Markdown' : newLabel,
                            icon: (
                              <FileIcon size={16} style={{ color: token.colorPrimary }} type={t} />
                            ),
                            onClick: () => {
                              createTabItem(t)
                            },
                          }
                        }),
                      ],
                    }}
                  >
                    <Button type="primary">
                      <IconText icon={<PlusIcon size={18} />} />
                    </Button>
                  </Dropdown>
                </ConfigProvider>
              </Flex>

              <div className="ui-menu flex-1 overflow-y-auto">
                <ApiMenuContextProvider>
                  <ApiMenu />
                </ApiMenuContextProvider>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-full w-full">
              <h1 className="text-xl font-semibold text-gray-500">流量录制功能待开放</h1>
            </div>
          )
        }
        right={selectedMenu === '接口管理' ? <ApiTab /> : null}
      />
    </Flex>
  )
}

export default function HomePage() {
  return (
    <MenuTabProvider>
      <ProjectContent />
    </MenuTabProvider>
  )
}
