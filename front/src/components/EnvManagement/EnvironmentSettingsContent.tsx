import React, { useEffect } from "react";
import { Form, Input, Button, Table, Card } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { EnvironmentSetting } from "@/types";
import { nanoid } from "nanoid";

interface Service {
  id: string;
  name: string;
  url: string;
}

interface EnvironmentVariable {
  id: string;
  key: string;
  value: string;
}

interface EnvironmentSettingsContentProps {
  setting?: EnvironmentSetting & {
    services?: Service[];
    variables?: EnvironmentVariable[];
  };
  onSettingChange: (newSetting: EnvironmentSetting) => void;
  onSave?: () => void;
  onCancel?: () => void;
  onDelete?: (id: string) => void;
  isCreating?: boolean; // 新增属性，标识是否处于创建模式
}

const EnvironmentSettingsContent: React.FC<EnvironmentSettingsContentProps> = ({
                                                                                 setting,
                                                                                 onSettingChange,
                                                                                 onSave,
                                                                                 onCancel,
                                                                                 onDelete,
                                                                                 isCreating = false // 默认值
                                                                               }) => {
  const [form] = Form.useForm();
  const [services, setServices] = React.useState<Service[]>([]);
  const [variables, setVariables] = React.useState<EnvironmentVariable[]>([]);

  useEffect(() => {
    if (isCreating) {
      // 新建环境模式，初始化空白表单
      form.resetFields();
      setServices([]);
      setVariables([]);
    } else if (setting) {
      // 编辑现有环境模式
      form.setFieldsValue({
        name: setting.name,
        type: setting.type,
        url: setting.url
      });
      setServices(setting.services || []);
      setVariables(setting.variables || []);
    } else {
      // 无选中环境模式
      form.resetFields();
      setServices([]);
      setVariables([]);
    }
  }, [setting, form, isCreating]);

  const handleValuesChange = (changedValues: any, allValues: any) => {
    if (isCreating || setting) {
      onSettingChange({
        ...(setting || {}),
        ...allValues,
        services,
        variables
      });
    }
  };

  // ...其他函数保持不变...

  if (!isCreating && !setting) {
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
      </div>
    );
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
    >
      <Card title={isCreating ? "新建环境" : "环境配置"} bordered={false}>
        {/* ...其他表单内容保持不变... */}
      </Card>
    </Form>
  );
};

export default EnvironmentSettingsContent;