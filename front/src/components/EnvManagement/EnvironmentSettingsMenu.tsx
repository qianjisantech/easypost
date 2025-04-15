// components/EnvironmentSettingsMenu.tsx
import React from 'react';
import { Button, Menu } from "antd";
import {
  CodeOutlined,
  ExperimentOutlined,
  CloudServerOutlined, PlusOutlined
} from "@ant-design/icons";
import { EnvironmentSetting } from "@/types";
import { nanoid } from "nanoid";

interface EnvironmentSettingsMenuProps {
  values: EnvironmentSetting[];
  activeKey?: string;
  onMenuClick: (key: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const EnvironmentSettingsMenu: React.FC<EnvironmentSettingsMenuProps> = ({
                                                                           values = [],
                                                                           activeKey,
                                                                           onMenuClick,
                                                                           className,
                                                                           style
                                                                         }) => {
  const getEnvironmentIcon = (type: string) => {
    switch(type) {
      case 'dev': return <CodeOutlined />;
      case 'test': return <ExperimentOutlined />;
      case 'prod': return <CloudServerOutlined />;
      default: return <CloudServerOutlined />;
    }
  };
  return (
    <Menu
      mode="inline"
      selectedKeys={activeKey ? [activeKey] : []}
      className={className}
      style={{ width: 220, ...style }}
    >
      <Menu.ItemGroup key="environmentSettings" title="环境配置">
        {values.map(env => (
          <Menu.Item
            key={env.id}
            icon={getEnvironmentIcon(env.type)}
            onClick={() => onMenuClick(env.id)}
          >
            {env.name}
          </Menu.Item>
        ))}
        {/* 新增的新建环境项 */}
        <Menu.Item
          key="create-new-environment"
          icon={<PlusOutlined />}
          onClick={() => { onMenuClick('create-new-environment'); }}
          style={{ color: '#1890ff', fontWeight: 500 }}
        >
          新建环境
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  )
}

export default EnvironmentSettingsMenu;