// components/EnvironmentSettingsContent.tsx
import React from 'react';
import { Form, Input, Button } from 'antd';
import { EnvironmentSetting } from "@/types";

interface EnvironmentSettingsContentProps {
  setting?: EnvironmentSetting;
  onSettingChange: (newSetting: EnvironmentSetting) => void;
  onAddNew?: () => void;
  onDelete?: (id: string) => void;
}

const EnvironmentSettingsContent: React.FC<EnvironmentSettingsContentProps> =({
                                                                                setting,
                                                                                onSettingChange,
                                                                                onAddNew,
                                                                                onDelete
                                                                              }) => {


  if (!setting) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        color: 'rgba(0, 0, 0, 0.25)'
      }}>
        <p>请从左侧选择环境配置</p>
        {onAddNew && (
          <Button
            type="primary"
            onClick={onAddNew}
            style={{ marginTop: 16 }}
          >
            添加新环境
          </Button>
        )}
      </div>
    );
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
      }}>
        <h3>{setting.name}配置</h3>
        {onDelete && (
          <Button
            danger
            onClick={() => onDelete(setting.id)}
          >
            删除环境
          </Button>
        )}
      </div>

      <Form layout="vertical">
        <Form.Item label="环境名称">
          <Input
            value={setting.name}
            onChange={e => onSettingChange({
              ...setting,
              name: e.target.value
            })}
          />
        </Form.Item>
        <Form.Item label="环境类型">
          <Input
            value={setting.type}
            onChange={e => onSettingChange({
              ...setting,
              type: e.target.value
            })}
          />
        </Form.Item>
        <Form.Item label="API端点">
          <Input
            value={setting.url}
            onChange={e => onSettingChange({
              ...setting,
              url: e.target.value
            })}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default EnvironmentSettingsContent;