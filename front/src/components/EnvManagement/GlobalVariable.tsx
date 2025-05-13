import React, { useEffect, useState } from "react";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import type { TabsProps } from 'antd';
import { Button, Form, Input, Space, Table, Select, Tabs, Typography } from "antd";
import { nanoid } from "nanoid";

interface Parameter {
  id: string;  // 统一使用 id 作为唯一标识
  key: string;
  type: string;
  value: string;
  description: string;
}

interface GlobalVariableProps {
  data: {
    team: Parameter[];
    project: Parameter[];
  };
  onChange?: (newData: { [p: string]: any[]; cookie: any[]; query: any[]; header: any[]; body: any[] }) => void;
}

const { Text } = Typography;

const typeOptions = [
  { value: 'string', label: 'string', color: '#1890ff' },
  { value: 'number', label: 'number', color: '#52c41a' },
  { value: 'boolean', label: 'boolean', color: '#faad14' },
  { value: 'object', label: 'object', color: '#722ed1' },
];

const GlobalVariable: React.FC<GlobalVariableProps> = ({
                                                         data = { header: [], cookie: [],query: [],body: [] }, // 确保默认值
                                                         onChange
                                                       }) => {
  const [activeTab, setActiveTab] = useState<string>('project');
  const [searchText, setSearchText] = useState('');
  const [editingKey, setEditingKey] = useState<string>('');
  const [projectForm] = Form.useForm();
  const [teamForm] = Form.useForm();
  const [internalData, setInternalData] = useState(data);
  const getCurrentForm = () => activeTab === 'project' ? projectForm : teamForm;

  const getTypeColor = (type: string) => {
    const option = typeOptions.find(opt => opt.value === type);
    return option ? option.color : '#000000';
  };


  useEffect(() => {
    setInternalData(data);
  }, [data]);
  useEffect(() => {
    console.log('当前渲染数据:', data[activeTab]);
    console.log('Current data:', data);
  }, [data]);

  // 统一使用 id 作为标识
  const isEditing = (record: Parameter) => record.id === editingKey;

  const edit = (record: Parameter) => {
    const form = getCurrentForm();
    form.setFieldsValue({
      id: record.id,
      key:record.key,
      type: record.type,
      value: record.value,
      description: record.description
    });
    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id: string) => {
    try {
      const form = getCurrentForm();
      const row = await form.validateFields(); // 获取表单当前值

      const newData = { ...internalData };
      const currentTabData = newData[activeTab as keyof typeof newData];

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      newData[activeTab as keyof typeof newData] = currentTabData.map(item =>
        item.id === id ? { ...item, ...row } : item
      );

      setInternalData(newData);
      onChange?.(newData);
      console.log('全局变量newData', newData);
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDelete = (record: Parameter) => {
    const newData = { ...internalData };

    // 使用类型断言确保 activeTab 是有效的 key
    const tabKey = activeTab as keyof GlobalParameterData;

    // 过滤掉要删除的项目
    newData[tabKey] = newData[tabKey].filter(item => item.id !== record.id);

    setInternalData(newData);
    onChange?.(newData);
  };
  const handleAdd = () => {
    const newParam = {
      id: nanoid(6),
      key: '',
      type: 'string',
      value: '',
      description: '',
    };

    const newData = {
      ...internalData,
      [activeTab]: [...internalData[activeTab as keyof typeof internalData], newParam]
    };

    setInternalData(newData);
    onChange?.(newData);
    setEditingKey(newParam.id);

    // 立即设置表单值
    const form = getCurrentForm();
    form.setFieldsValue({
      key: newParam.key,
      type: newParam.type,
      value: newParam.value,
      description: newParam.description
    });
  };

// 在组件返回前添加调试
  console.log('Current data to render:', data[activeTab as keyof typeof data]);
  const columns = [
    {
      title: '参数名',
      dataIndex: 'key',
      key: 'key',
      filteredValue: [searchText],
      onFilter: (value: string, record: Parameter) => {
        return (
          record.key.includes(value.toLowerCase()) ||
          record.description.includes(value.toLowerCase())
        );
      },
      render: (_: any, record: Parameter) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="key"
            rules={[{ required: true, message: '请输入参数名' }]}
            style={{ margin: 0 }}
          >
            <Input />
          </Form.Item>
        ) : (
          <Input
            bordered={false}
            value={record.key}
            style={{ padding: 0, backgroundColor: 'transparent' }}
          />
        );
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (_: any, record: Parameter) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="type"
            style={{ margin: 0 }}
            rules={[{ required: true, message: '请选择类型' }]}
          >
            <Select
              style={{ width: '100%' }}
              dropdownStyle={{ minWidth: '120px' }}
              options={typeOptions.map(opt => ({
                value: opt.value,
                label: (
                  <span style={{ color: opt.color }}>
                    {opt.label}
                  </span>
                ),
              }))}
            />
          </Form.Item>
        ) : (
          <span style={{ color: getTypeColor(record.type) }}>
            {record.type}
          </span>
        );
      },
    },
    {
      title: '值',
      dataIndex: 'value',
      key: 'value',
      render: (_: any, record: Parameter) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="value"
            style={{ margin: 0 }}
            rules={[{ required: true, message: '请输入值' }]}
          >
            <Input />
          </Form.Item>
        ) : (
          <Input
            bordered={false}
            style={{ width: '100%' }}
            value={record.value}
            visibilityToggle={false}
          />
        );
      },
    },
    {
      title: '说明',
      dataIndex: 'description',
      key: 'description',
      render: (_: any, record: Parameter) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="description"
            style={{ margin: 0 }}
          >
            <Input />
          </Form.Item>
        ) : (
          <Text>{record.description}</Text>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Parameter) => {
        const editable = isEditing(record);
        return editable ? (
          <Space size="middle">
            <Button
              type="link"
              icon={<CheckOutlined />}
              onClick={() => save(record.id)}
            />
            <Button
              type="link"
              icon={<CloseOutlined />}
              onClick={cancel}
            />
          </Space>
        ) : (
          <Space size="middle">
            <Button
              type="link"
              icon={<EditOutlined />}
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            />
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
            />
          </Space>
        );
      },
    },
  ];

  const items: TabsProps['items'] = [
    {
      key: 'project',
      label: '项目内共享',
      children: (
        <>
          <div style={{ marginBottom: 16, marginTop: 16 }}>
            <Space>
              <Input
                placeholder="搜索变量名或说明"
                prefix={<SearchOutlined />}

                onChange={e => { setSearchText(e.target.value); }}
                style={{ width: 250 }}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
                disabled={editingKey !== ''}
              >
                新增
              </Button>
            </Space>
          </div>
          <Form component={false} form={projectForm}>
            <Table
              dataSource={internalData[activeTab as keyof typeof internalData]}
              rowKey="id"
              columns={columns}
              pagination={false}
            />
          </Form>
        </>
      ),
    },
    {
      key: 'team',
      label: '团队内共享',
      children: (
        <>
          <div style={{ marginBottom: 16, marginTop: 16 }}>
            <Space>
              <Input
                placeholder="搜索变量名或说明"
                prefix={<SearchOutlined />}
                onChange={e => { setSearchText(e.target.value); }}
                style={{ width: 250 }}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
                disabled={editingKey !== ''}
              >
                新增
              </Button>
            </Space>
          </div>
          <Form form={teamForm} component={false}>
            <Table
              dataSource={internalData[activeTab as keyof typeof internalData]}
              rowKey="id"
              columns={columns}
              pagination={false}
            />
          </Form>
        </>
      ),
    },
  ];

  return (
    <div className="global-parameters" style={{ padding: 24 }}>
      <Tabs
        activeKey={activeTab}
        items={items}
        onChange={(key) => {
          setActiveTab(key);
          setSearchText('');
          setEditingKey('');
        }}
      />
    </div>
  );
};

export default GlobalVariable;