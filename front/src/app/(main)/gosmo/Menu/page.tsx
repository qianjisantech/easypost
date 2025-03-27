'use client'

import type React from 'react'
import {
  SettingOutlined,
  DatabaseOutlined,
  DeploymentUnitOutlined,
  RocketOutlined,
  ToolOutlined,
  ClusterOutlined,
  SyncOutlined,
  ThunderboltOutlined,
  SoundOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useState } from 'react'
import { useMenuHelpersContext } from "@/contexts/menu-helpers";
import { useApiMenuContext } from "@/components/ApiMenu/ApiMenuContext";
import { useMenuTabContext, useMenuTabHelpers } from "@/contexts/menu-tab-settings";
import useEvent from "react-use-event-hook";
import EsManage from "@/app/(main)/gosmo/SystemSettings/EsManage";
import AgentManage from "@/app/(main)/gosmo/SystemSettings/AgentManage";
import RecordTask from "@/app/(main)/gosmo/Record/RecordTask";
import RecordRule from "@/app/(main)/gosmo/Record/RecordRule";
import TrafficManage from "@/app/(main)/gosmo/Pool/TrafficManage";
import ReplayTask from "@/app/(main)/gosmo/Replay/ReplayTask";
import TrafficComparison from "@/app/(main)/gosmo/Replay/TrafficComparison";
import NoiseFiltering from "@/app/(main)/gosmo/Replay/NoiseFiltering";
// key 和 组件映射
const componentMap: Record<string, React.ReactNode> = {
  '1-1': <EsManage />,
  '1-2': <AgentManage />,
  '2-1': <RecordTask />,
  '2-2': <RecordRule />,
  '3-1': <TrafficManage />,
  '4-1': <ReplayTask />,
  '4-2': <NoiseFiltering />,
  '4-3': <TrafficComparison />,
}

const items: MenuProps['items'] = [
  {
    key: '1',
    label: '系统配置',
    icon: <SettingOutlined />,
    children: [
      { key: '1-1', label: 'ES管理', icon: <DatabaseOutlined /> },
      { key: '1-2', label: 'Agent管理', icon: <ToolOutlined /> },
    ],
  },
  {
    key: '2',
    label: '流量录制',
    icon: <DeploymentUnitOutlined />,
    children: [
      { key: '2-1', label: '录制任务', icon: <RocketOutlined /> },
      { key: '2-2', label: '录制规则', icon: <ClusterOutlined /> },
    ],
  },
  {
    key: '3',
    label: '流量池',
    icon: <SyncOutlined />,
    children: [
      { key: '3-1', label: '流量管理', icon: <ThunderboltOutlined /> },
    ],
  },
  {
    key: '4',
    label: '流量回放',
    icon: <SoundOutlined />,
    children: [
      { key: '4-1', label: '回放任务', icon: <RocketOutlined /> },
      { key: '4-2', label: '噪音消除', icon: <ToolOutlined /> },
      { key: '4-3', label: '流量对比', icon: <ClusterOutlined /> },
    ],
  },
]

export default function GosmoMenu() {
  const [selectedKey, setSelectedKey] = useState<string>('1-1')
  const { moveMenuItem } = useMenuHelpersContext()
  const { expandedMenuKeys, addExpandedMenuKeys, removeExpandedMenuKeys, menuTree } =
    useApiMenuContext()

  const { tabItems, activeTabKey } = useMenuTabContext()
  const { activeTabItem, addTabItem } = useMenuTabHelpers()

  const selectedKeys = activeTabKey ? [activeTabKey] : undefined

  const switchExpandedKeys = useEvent((menuId: string) => {
    if (expandedMenuKeys.includes(menuId)) {
      removeExpandedMenuKeys([menuId])
    } else {
      addExpandedMenuKeys([menuId])
    }
  })

  const onClick: MenuProps['onClick'] = (e) => {

    console.log('点击了菜单：', e.key)

    setSelectedKey(e.key)

  }

  return (
    <div className="flex w-full">
      <Menu
        defaultOpenKeys={['1']}
        defaultSelectedKeys={['1-1']}
        items={items}
        mode="inline"
        style={{ width: 256 }}
        onClick={onClick}
      />
      <div className="flex-1 p-4">
        {componentMap[selectedKey] || <div>请选择一个菜单</div>}
      </div>
    </div>
  )
}
