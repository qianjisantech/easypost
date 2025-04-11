import React, { cloneElement, type PointerEvent, useMemo, useState } from 'react'
import useEvent from 'react-use-event-hook'

import {
  AppstoreOutlined, BellOutlined, CloudOutlined, CloudServerOutlined, ClusterOutlined, CodeOutlined, DesktopOutlined,
  EnvironmentOutlined, ExperimentOutlined, GlobalOutlined, LockOutlined, MailOutlined,
  MoreOutlined,
  SearchOutlined,
  SettingOutlined
} from "@ant-design/icons";
import {
  DndContext,
  type DndContextProps,
  PointerSensor as LibPointerSensor,
  useSensor,
} from '@dnd-kit/core'
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  Button,
  ConfigProvider, Divider,
  Dropdown, Menu, Modal,
  Popconfirm,
  Select,
  Tabs,
  type TabsProps,
  theme,
  Tooltip
} from "antd";
import { BadgeInfoIcon, XIcon } from 'lucide-react'
import { nanoid } from 'nanoid'

import type { CatalogId } from '@/components/ApiMenu'
import { useMenuHelpersContext } from '@/contexts/menu-helpers'
import { useStyles } from '@/hooks/useStyle'

import { useMenuTabContext, useMenuTabHelpers } from '../../contexts/menu-tab-settings'

import type { Tab } from './ApiTab.type'
import { ApiTabAction, useApiTabActions } from './ApiTabAction'
import { ApiTabContent } from './ApiTabContent'
import { ApiTabLabel } from './ApiTabLabel'
import { TabContentProvider } from './TabContentContext'

import { css } from '@emotion/css'
import TabPane from "antd/es/tabs/TabPane";
import GlobalVariable from "@/components/EnvManagement/GlobalVariable";
import zhCN from "antd/locale/zh_CN";
import GlobalParameters from "@/components/EnvManagement/GlobalParameters";

// 如果元素有 "data-no-dnd" 属性，则阻止 DnD 事件传播。
const handler = ({ nativeEvent: event }: PointerEvent) => {
  let cur = event.target as HTMLElement

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (cur) {
    if (cur.dataset.noDnd) {
      return false
    }
    cur = cur.parentElement!
  }

  return true
}

class PointerSensor extends LibPointerSensor {
  static activators = [
    { eventName: 'onPointerDown', handler },
  ] as (typeof LibPointerSensor)['activators']
}

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-node-key': string
}

const DraggableTabNode = (props: DraggableTabPaneProps) => {
  const { token } = theme.useToken()

  const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props['data-node-key'],
  })

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 99 : undefined,
    outline: isDragging ? `1px solid ${token.colorPrimaryBorder}` : undefined,
  }

  return cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  })
}

/**
 * 菜单内容页签。
 *
 * 主要逻辑：
 *
 * - 当插入新的页签时，插入的位置应该是当前被激活的页签的后一位。
 * - 当激活中的页签被移除后，应该激活上一次被激活的页签（如果此页签也被移除了，则应该继续往前找）。
 * - 当前激活的是“新建”页时，点击任意菜单会覆盖此“新建”页，而不是新增一个页签。
 */
export function ApiTab(props: TabsProps) {
  const [confirmKey, setConfirmKey] = useState<CatalogId>()

  const { menuRawList } = useMenuHelpersContext()
  const { tabItems, setTabItems, activeTabKey } = useMenuTabContext()
  const { activeTabItem, addTabItem, getTabItem, removeTabItem } = useMenuTabHelpers()
  const { menuItems } = useApiTabActions()

  const handleItemRemove = useEvent((key: CatalogId, forceClose?: boolean) => {
    const item = getTabItem({ key })

    if (forceClose !== true && item?.data?.editStatus === 'changed') {
      setConfirmKey(key)
    } else {
      setConfirmKey(undefined)
      removeTabItem({ key })
    }
  })

  const items: Tab[] = useMemo(() => {
    return tabItems.map((tabItem) => {
      const menuData = menuRawList?.find((it) => it.id === tabItem.key)

      return {
        key: tabItem.key,
        label: <ApiTabLabel menuData={menuData} tabItem={tabItem} />,
        className: 'group',
        closeIcon: (
          <Popconfirm
            icon={<BadgeInfoIcon />}
            okText="确认关闭"
            okType="danger"
            open={tabItem.data?.editStatus === 'changed' && confirmKey === tabItem.key}
            title="有修改的内容未保存！"
            onCancel={(ev) => {
              ev?.stopPropagation()
              setConfirmKey(undefined)
            }}
            onConfirm={(ev) => {
              ev?.stopPropagation()
              handleItemRemove(tabItem.key, true)
            }}
          >
            <span
              className={`main-tabs-tab-close-icon flex size-full items-center justify-center text-[15px] opacity-0 ${
                tabItem.data?.editStatus === 'changed'
                  ? 'changed after:bg-primary-500 group relative overflow-hidden rounded-full after:absolute after:size-2 after:rounded-full after:content-[""] hover:overflow-auto hover:bg-transparent hover:after:hidden'
                  : ''
              }`}
              data-no-dnd="true" // 「关闭」按钮不允许触发拖拽。
            >
              <XIcon
                className={
                  tabItem.data?.editStatus === 'changed' ? '!invisible group-hover:!visible' : ''
                }
                size={18}
              />
            </span>
          </Popconfirm>
        ),
        children: (
          <TabContentProvider tabData={tabItem}>
            <ApiTabContent />
          </TabContentProvider>
        ),
      }
    })
  }, [tabItems, menuRawList, confirmKey, handleItemRemove])

  const sensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  const handleDragEnd: DndContextProps['onDragEnd'] = ({ active, over }) => {
    if (active.id !== over?.id) {
      setTabItems((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id)
        const overIndex = prev.findIndex((i) => i.key === over?.id)
        return arrayMove(prev, activeIndex, overIndex)
      })
    }
  }

  const renderTabBar: TabsProps['renderTabBar'] = (tabBarProps, DefaultTabBar) => {
    return (
      <DndContext sensors={[sensor]} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.key)} strategy={horizontalListSortingStrategy}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              position: 'relative',
            }}
          >
            <DefaultTabBar
              {...tabBarProps}
              className="ui-tabs-nav"
              style={{
                flex: 1,
                marginRight: 0,
                overflow: 'hidden',
              }}
            >
              {(node) => {
                console.log('node', node)
                const isLastTab = node.props['data-node-key'] === tabItems[tabItems.length - 1].key
                return (
                  <DraggableTabNode {...node.props} key={node.key}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Dropdown menu={{ items: menuItems }} trigger={['contextMenu']}>
                        {node}
                      </Dropdown>
                      {isLastTab && (
                        <div
                          style={{
                            marginLeft: 8,
                            display: 'inline-flex',
                            alignItems: 'center',
                          }}
                        >
                          <ApiTabAction />
                        </div>
                      )}
                    </div>
                  </DraggableTabNode>
                )
              }}
            </DefaultTabBar>
          </div>
        </SortableContext>
      </DndContext>
    )
  }

  const { styles } = useStyles(({ token }) => {
    return {
      appTabs: css({
        '&.ant-tabs': {
          '.ui-tabs-nav': {
            '&.ant-tabs-nav': {
              '.ant-tabs-tab:not(.ant-tabs-tab-active) ': {
                '.ui-tabs-tab-label': {
                  color: token.colorTextSecondary,
                },

                '&::before': {
                  backgroundColor: token.colorBorderSecondary,
                },
              },
            },
          },
        },
      }),
    }
  })

  const handleEdit: TabsProps['onEdit'] = (key, action) => {
    if (action === 'add') {
      addTabItem({
        key: nanoid(6),
        label: '新建...',
        contentType: 'blank',
      })
    } else if (
      /* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */
      action === 'remove'
    ) {
      if (typeof key === 'string') {
        handleItemRemove(key)
      }
    }
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            cardBg: 'transparent',
            horizontalMargin: '0',
          },
        },
      }}
    >
      <Tabs
        hideAdd
        activeKey={activeTabKey}
        className={`ui-tabs main-tabs ${styles.appTabs}`}
        items={items}
        renderTabBar={renderTabBar}
        tabBarExtraContent={<TabActionsENVDropdown />}
        tabBarStyle={{ width: '100%', marginBottom: 0 }}
        type="editable-card"
        onEdit={handleEdit}
        onTabClick={(key) => {
          activeTabItem({ key })
        }}
        {...props}
      />
    </ConfigProvider>
  )
}

const TabActionsENVDropdown = () => {
  const [currentEnv, setCurrentEnv] = useState<string | undefined>(undefined);
  const { Option } = Select;
  const [modalState, setModalState] = useState({
    visible: false,
    tab: 'globalVariables' // 默认选中全局变量
  });

  // 定义环境配置
  const envConfig = {
    dev: {
      name: '开发环境',
      url: 'https://dev.api.example.com',
    },
    test: {
      name: '测试环境',
      url: 'https://test.api.example.com',
    },
    stage: {
      name: '演示环境',
      url: 'https://stage.api.example.com',
    },
  };

  // 管理环境弹窗内容
  const content = {
    globalVariables: (
      <div>
        <h3>全局变量管理</h3>
        <ConfigProvider locale={zhCN}>
          <GlobalVariable />
        </ConfigProvider>
        {/* 这里可以添加变量表格 */}
      </div>
    ),
    globalParams: (
      <div>
        <h3>全局参数设置</h3>
        <ConfigProvider locale={zhCN}>
          <GlobalParameters />
        </ConfigProvider>
      </div>
    ),
    vaultSecrets: (
      <div>
        <h3>密钥库管理</h3>
        <p>安全存储和管理敏感信息</p>
      </div>
    ),
    devEnv: (
      <div>
        <h3>开发环境配置</h3>
        <p>当前API端点: {envConfig.dev.url}</p>
      </div>
    ),
    testEnv: (
      <div>
        <h3>测试环境配置</h3>
        <p>当前API端点: {envConfig.test.url}</p>
      </div>
    ),
    prodEnv: (
      <div>
        <h3>正式环境配置</h3>
        <p>当前API端点: {envConfig.stage.url}</p>
      </div>
    ),
    localMock: (
      <div>
        <h3>本地Mock服务</h3>
        <p>配置本地模拟接口服务</p>
      </div>
    ),
    cloudMock: (
      <div>
        <h3>云端Mock服务</h3>
        <p>连接云端模拟接口服务</p>
      </div>
    ),
    selfHostedMock: (
      <div>
        <h3>自托管Mock服务</h3>
        <p>管理自建的Mock服务配置</p>
      </div>
    )
  };

  return (
    <div>
      <Select
        placeholder={'请选择环境'}
        style={{
          width: 150,
          marginLeft: 8,
          textAlign: 'center',
        }}
        suffixIcon={<SearchOutlined />}
        value={currentEnv}
        onChange={(value) => {
          setCurrentEnv(value);
          console.log(`切换到${envConfig[value as keyof typeof envConfig]?.name}`);
        }}
        dropdownRender={(menu) => (
          <>
            {menu}
            <div style={{
              padding: '1px',
              textAlign: 'left',
              borderTop: '1px solid #f0f0f0',
              marginTop: 4
            }}>
              <Button
                size={'small'}
                icon={<SettingOutlined />}
                type="link"
                onClick={(e) => {
                  e.stopPropagation()
                  setModalState({...modalState, visible: true});
                }}
              >
                管理环境
              </Button>
            </div>
          </>
        )}
      >
        {Object.entries(envConfig).map(([key, config]) => (
          <Option key={key} value={key}>
            <Tooltip
              mouseEnterDelay={0.3}
              placement="right"
              title={`${config.name}  ${config.url}`}
            >
              <span>{config.name}</span>
            </Tooltip>
          </Option>
        ))}
      </Select>

      {/* 环境管理弹窗 */}
      <Modal
        title=""
        open={modalState.visible}
        width={1200}
        style={{ maxWidth: '100vw' }}
        footer={null}
        onCancel={() => setModalState({...modalState, visible: false})}
      >
        <div style={{ display: 'flex', minHeight: 400 }}>
          {/* 左侧菜单 */}
          <Menu
            mode="inline"
            selectedKeys={[modalState.tab]}
            style={{ width: 220, borderRight: '1px solid #f0f0f0' }}
            onClick={(e) => setModalState({...modalState, tab: e.key})}
          >
            <Menu.ItemGroup key="globalSettings" title="全局设置">
              <Menu.Item key="globalVariables" icon={<GlobalOutlined />}>
                全局变量
              </Menu.Item>
              <Menu.Item key="globalParams" icon={<GlobalOutlined />}>
                全局参数
              </Menu.Item>
              <Menu.Item key="vaultSecrets" icon={<LockOutlined />}>
                密钥库
              </Menu.Item>
            </Menu.ItemGroup>

            <Menu.ItemGroup key="environmentSettings" title="环境配置">
              <Menu.Item key="devEnv" icon={<CodeOutlined />}>
                开发环境
              </Menu.Item>
              <Menu.Item key="testEnv" icon={<ExperimentOutlined />}>
                测试环境
              </Menu.Item>
              <Menu.Item key="prodEnv" icon={<CloudServerOutlined />}>
                正式环境
              </Menu.Item>
            </Menu.ItemGroup>

            <Menu.ItemGroup key="mockServices" title="Mock服务">
              <Menu.Item key="localMock" icon={<DesktopOutlined />}>
                本地Mock
              </Menu.Item>
              <Menu.Item key="cloudMock" icon={<CloudOutlined />}>
                云端Mock
              </Menu.Item>
              <Menu.Item key="selfHostedMock" icon={<ClusterOutlined />}>
                自托管Mock
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu>

          {/* 右侧内容区 */}
          <div style={{ flex: 1, padding: '0 24px' }}>
            {content[modalState.tab as keyof typeof content]}
          </div>
        </div>
      </Modal>
    </div>
  );
};