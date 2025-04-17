// components/EnvironmentSettingsMenu.tsx
import React from "react";
import { Menu, Dropdown, Button } from "antd";
import {
  CodeOutlined,
  ExperimentOutlined,
  CloudServerOutlined,
  PlusOutlined,
  MoreOutlined
} from "@ant-design/icons";

interface EnvironmentSetting {
  id: string;
  type: string;
  name: string;
  url?: string;
}

interface EnvironmentSettingsMenuProps {
  values: EnvironmentSetting[];
  activeKey?: string;
  onChange: (key: string, env?: EnvironmentSetting) => void; // 修改为可传递环境对象
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const EnvironmentSettingsMenu: React.FC<EnvironmentSettingsMenuProps> = ({
                                                                           values = [],
                                                                           activeKey,
                                                                           onChange,
                                                                           onDelete,
                                                                           onDuplicate,
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

  const renderActionMenu = (envId: string) => (
    <Menu>
      <Menu.Item key="duplicate" onClick={() => onDuplicate?.(envId)}>
        复制
      </Menu.Item>
      <Menu.Item key="delete" danger onClick={() => onDelete?.(envId)}>
        删除
      </Menu.Item>
    </Menu>
  );

  const handleAddNewEnvironment = () => {
    const newEnv: EnvironmentSetting = {
      id: 'new', // 特殊ID表示新建
      type: 'dev',
      name: '',
      url: ''
    };
    onChange('create-new-environment', newEnv);
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
            onClick={() => onChange(env.id, env)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{env.name}</span>
              <Dropdown
                overlay={renderActionMenu(env.id)}
                trigger={['hover']}
                placement="topRight"
              >
                <Button
                  type="text"
                  icon={<MoreOutlined />}
                  onClick={(e) => e.stopPropagation()}
                  style={{ marginLeft: 8 }}
                />
              </Dropdown>
            </div>
          </Menu.Item>
        ))}
        <Menu.Item
          key="create-new-environment"
          icon={<PlusOutlined />}
          onClick={handleAddNewEnvironment}
          style={{ color: '#1890ff', fontWeight: 500 }}
        >
          新建环境
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );
};

export default EnvironmentSettingsMenu;