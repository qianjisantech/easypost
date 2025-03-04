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

// 页面组件
const EsManage = () => <div>ES管理页面</div>
const AgentManage = () => <div>Agent管理页面</div>
const RecordTask = () => <div>录制任务页面</div>
const RulesConfig = () => <div>规则配置页面</div>
const TrafficManage = () => <div>流量管理页面</div>
const ReplayTask = () => <div>回放任务页面</div>
const NoiseReduction = () => <div>噪音消除页面</div>
const TrafficCompare = () => <div>流量对比页面</div>

// key 和 组件映射
const componentMap: Record<string, React.ReactNode> = {
  '1-1': <EsManage />,
  '1-2': <AgentManage />,
  '2-1': <RecordTask />,
  '2-2': <RulesConfig />,
  '3-1': <TrafficManage />,
  '4-1': <ReplayTask />,
  '4-2': <NoiseReduction />,
  '4-3': <TrafficCompare />,
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
      { key: '2-2', label: '规则配置', icon: <ClusterOutlined /> },
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
