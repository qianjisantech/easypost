import React, { useState } from 'react';
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

interface Parameter {
  key: string;
  name: string;
  type: string;
  value: string;
  description: string;
}

const { Text } = Typography;

// 类型选项配置
const typeOptions = [
  { value: 'string', label: 'string', color: '#1890ff' },
  { value: 'number', label: 'number', color: '#52c41a' },
  { value: 'boolean', label: 'boolean', color: '#faad14' },
  { value: 'object', label: 'object', color: '#722ed1' },
];

const GlobalParameters = () => {
  const [activeTab, setActiveTab] = useState<string>('project');
  const [searchText, setSearchText] = useState('');
  const [editingKey, setEditingKey] = useState<string>('');
  const [form] = Form.useForm();

  // 模拟数据 - 项目内共享参数
  const [projectParameters, setProjectParameters] = useState<Parameter[]>([
    {
      key: '1',
      name: 'api_url',
      type: 'string',
      value: 'https://api.example.com',
      description: '项目API基础地址',
    },
    {
      key: '2',
      name: 'max_retry',
      type: 'number',
      value: '3',
      description: '最大重试次数',
    },
  ]);

  // 模拟数据 - 团队内共享参数
  const [teamParameters, setTeamParameters] = useState<Parameter[]>([
    {
      key: '1',
      name: 'auth_token',
      type: 'string',
      value: 'token123',
      description: '团队认证令牌',
    },
    {
      key: '2',
      name: 'timeout',
      type: 'number',
      value: '5000',
      description: '请求超时时间(ms)',
    },
  ]);

  // 获取类型颜色
  const getTypeColor = (type: string) => {
    const option = typeOptions.find(opt => opt.value === type);
    return option ? option.color : '#000000';
  };

  const isEditing = (record: Parameter) => record.key === editingKey;

  const edit = (record: Partial<Parameter> & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Parameter;

      if (activeTab === 'project') {
        const newData = [...projectParameters];
        const index = newData.findIndex(item => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          setProjectParameters(newData);
        }
      } else {
        const newData = [...teamParameters];
        const index = newData.findIndex(item => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          setTeamParameters(newData);
        }
      }
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDelete = (record: Parameter) => {
    if (activeTab === 'project') {
      setProjectParameters(projectParameters.filter((item) => item.key !== record.key));
    } else {
      setTeamParameters(teamParameters.filter((item) => item.key !== record.key));
    }
  };

  const handleAdd = () => {
    const newParam = {
      key: Date.now().toString(),
      name: '',
      type: 'string',
      value: '',
      description: '',
    };

    if (activeTab === 'project') {
      setProjectParameters([...projectParameters, newParam]);
    } else {
      setTeamParameters([...teamParameters, newParam]);
    }
    edit(newParam);
  };

  const columns = [
    {
      title: '变量名',
      dataIndex: 'name',
      key: 'name',
      filteredValue: [searchText],
      onFilter: (value: string, record: Parameter) => {
        return (
          record.name.toLowerCase().includes(value.toLowerCase()) ||
          record.description.toLowerCase().includes(value.toLowerCase())
        );
      },
      render: (_: any, record: Parameter) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="name"
            style={{ margin: 0 }}
            rules={[{ required: true, message: '请输入变量名' }]}
          >
            <Input />
          </Form.Item>
        ) : (
          <Text>{record.name}</Text>
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
              onClick={() => save(record.key)}
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
  ]

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
                onChange={e => setSearchText(e.target.value)}
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
          <Form form={form} component={false}>
            <Table
              bordered
              columns={columns}
              dataSource={projectParameters}
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
                onChange={e => setSearchText(e.target.value)}
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
          <Form form={form} component={false}>
            <Table
              bordered
              columns={columns}
              dataSource={teamParameters}
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

export default GlobalParameters