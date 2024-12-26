'use client'

import { Button, ConfigProvider, Dropdown, Flex, theme, Tooltip } from 'antd'
import { FilterIcon, PlusIcon } from 'lucide-react'

import { ApiMenu } from '@/components/ApiMenu'
import { ApiMenuContextProvider } from '@/components/ApiMenu/ApiMenuContext'
import { ApiTab } from '@/components/ApiTab'
import { FileIcon } from '@/components/icons/FileIcon'
import { IconText } from '@/components/IconText'
import { InputSearch } from '@/components/InputSearch'
import { API_MENU_CONFIG } from '@/configs/static'
import { MenuTabProvider } from '@/contexts/menu-tab-settings'
import { MenuItemType } from '@/enums'
import { getCatalogType } from '@/helpers'
import { useHelpers } from '@/hooks/useHelpers'

import { PanelLayout } from '../components/PanelLayout'
import { useRouter } from 'next/navigation'
import { SideNav } from '@/app/(main)/components/SideNav'

function ProjectContent() {
    const { token } = theme.useToken()
    const router = useRouter()
    const { createTabItem } = useHelpers()

    // 修改了 returnToProject 函数，去掉了 startTransition
    const returnToProject = (route) => {
        router.push(route) // 执行跳转
    }

    return (
        <>
            {/* 父容器设置 flex 布局 */}
            <Flex style={{ height: '100vh' }} direction="row">
                <SideNav/> {/* 侧边栏宽度固定 */}
                <PanelLayout
                    layoutName="接口管理"
                    left={
                        <>
                            <Button type="default" onClick={() => returnToProject('/main')}>
                                首页
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
                                                        icon: <FileIcon size={16} style={{ color: token.colorPrimary }} type={t} />,
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
                    }
                    right={<ApiTab />}
                />
            </Flex>
        </>
    )
}

export default function HomePage() {
    return (
        <MenuTabProvider>
            <ProjectContent />
        </MenuTabProvider>
    )
}
