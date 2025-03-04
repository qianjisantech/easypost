'use client'
import  React, { ReactNode,useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'
import { HomeOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Dropdown, Flex, Space, theme, Tooltip } from 'antd'
import { FilterIcon, PlusIcon } from 'lucide-react'

import { ApiTreeQueryPage } from '@/api/am'
import { ApiMenu } from '@/components/ApiMenu'
import { ApiMenuContextProvider } from '@/components/ApiMenu/ApiMenuContext'
import { ApiTab } from '@/components/ApiTab'
import { FileIcon } from '@/components/icons/FileIcon'
import { IconLogo } from '@/components/icons/IconLogo'
import { IconText } from '@/components/IconText'
import { InputSearch } from '@/components/InputSearch'
import { API_MENU_CONFIG } from '@/configs/static'
import { useMenuHelpersContext } from '@/contexts/menu-helpers'
import { MenuTabProvider } from '@/contexts/menu-tab-settings'
import { MenuItemType } from '@/enums'
import { getCatalogType } from '@/helpers'
import { useHelpers } from '@/hooks/useHelpers'
import { useStyles } from '@/hooks/useStyle'

import { PanelLayout } from '../../components/PanelLayout'

import { css } from '@emotion/css'
import GosmoMenu from "@/app/(main)/gosmo/menu/page";

interface NavItemProps {
  active?: boolean
  name: string
  icon: ReactNode
  onClick: () => void
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

function ProjectContent() {
  const router = useRouter()
  const { createTabItem } = useHelpers()
  const { token } = theme.useToken()
  const { setMenuRawList } = useMenuHelpersContext()
  const pathname = usePathname()
  const [selectedMenu, setSelectedMenu] = useState<string>('接口管理')


  useEffect(() => {
    if (pathname) {
      const match = pathname.match(/project\/([^/]+)/)
      if (match) {
        const projectId = match[1]
        if (projectId) {
          loadingMenuTree(projectId)
        }
      }
    }
  }, [pathname])

  const loadingMenuTree = async (projectId: string) => {
    const response = await ApiTreeQueryPage({ projectId })
    if (response.data.success && setMenuRawList) {
      setMenuRawList(response.data?.data)
    }
  }


  return (
    <Flex direction="row" style={{ height: '80%', marginTop: '2%' }}>
      {/* Left Sidebar */}
      <div className="flex h-full shrink-0 basis-[80px] flex-col items-center overflow-y-auto overflow-x-hidden px-1 pt-layoutHeader">
        <div
          className="mb-5 mt-2 size-10 rounded-xl p-[6px]"
          style={{ color: token.colorText, border: `1px solid ${token.colorBorder}` }}
        >
          <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <svg
              t="1735037586493"
              className="icon"
              viewBox="0 0 1028 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="7534"
              width="64"
              height="64"
            >
              <path
                d="M585.473374 295.885775l-240.51966 65.974206 48.843004 180.976182 240.583927-65.974205 49.067938 180.815514-240.583927 63.854395 46.81859 180.976182-240.583927 63.841341-59.672012-216.962752a178.104246 178.104246 0 0 0 36.250667-159.735902c-17.062918-57.48693-59.639878-102.184705-110.700097-121.336304L55.330969 244.793423l483.288669-127.795149z m304.433301-8.483258L811.147331 0 0.001004 215.005617l78.75834 289.555465c46.81859 8.579659 89.427684 44.697775 102.184705 95.790128 14.90997 51.124486-4.273763 102.184705-40.456146 136.246273l76.606395 287.402517 811.180469-217.126432-76.7038-287.402516c-48.939404-8.579659-89.363417-44.697775-104.273386-95.790128-12.753005-51.124486 4.273763-104.333637 42.57696-136.246274z"
                fill="#FF7300"
                p-id="7535"
              ></path>
            </svg>
          </div>
        </div>

        {/* Navigation Menu */}
        <Space direction="vertical" size={14}>
          {/* API Management */}
          <NavItem
            active={selectedMenu === "接口管理"}
            icon={<HomeOutlined />}
            name="接口管理"
            onClick={() => setSelectedMenu("接口管理")}
          />

          {/* Traffic Recording */}
          <NavItem
            active={selectedMenu === "Gosmo"}
            icon={<FilterIcon />}
            name="Gosmo"
            onClick={() => setSelectedMenu("Gosmo")}
          />
        </Space>
      </div>

      {/* Right Content Area */}
      <PanelLayout
        layoutName={selectedMenu}
        left={
          selectedMenu === "接口管理" ? (
            <>

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
                        ].map((t) => ({
                          key: t,
                          label: t === MenuItemType.Doc ? '新建 Markdown' : API_MENU_CONFIG[getCatalogType(t)].newLabel,
                          icon: <FileIcon size={16} style={{ color: token.colorPrimary }} type={t} />,
                          onClick: () => createTabItem(t),
                        })),
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
            <div className="flex size-full items-center justify-center">
              <GosmoMenu></GosmoMenu>
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
