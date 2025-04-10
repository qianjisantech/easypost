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
  const [activeTab, setActiveTab] = useState<string>('header');
  const [searchText, setSearchText] = useState('');
  const [editingKey, setEditingKey] = useState<string>('');
  const [form] = Form.useForm();

  // 模拟数据 - Header参数
  const [headerParameters, setHeaderParameters] = useState<Parameter[]>([
    {
      key: '1',
      name: 'Content-Type',
      type: 'string',
      value: 'application/json',
      description: '请求内容类型',
    },
    {
      key: '2',
      name: 'Authorization',
      type: 'string',
      value: 'Bearer token123',
      description: '认证令牌',
    },
  ]);

  // 模拟数据 - Cookie参数
  const [cookieParameters, setCookieParameters] = useState<Parameter[]>([
    {
      key: '1',
      name: 'session_id',
      type: 'string',
      value: 'abc123',
      description: '会话ID',
    },
    {
      key: '2',
      name: 'user_prefs',
      type: 'object',
      value: '{"theme":"dark"}',
      description: '用户偏好设置',
    },
  ]);

  // 模拟数据 - Query参数
  const [queryParameters, setQueryParameters] = useState<Parameter[]>([
    {
      key: '1',
      name: 'page',
      type: 'number',
      value: '1',
      description: '页码',
    },
    {
      key: '2',
      name: 'limit',
      type: 'number',
      value: '10',
      description: '每页数量',
    },
  ]);

  // 模拟数据 - Body参数
  const [bodyParameters, setBodyParameters] = useState<Parameter[]>([
    {
      key: '1',
      name: 'username',
      type: 'string',
      value: 'john_doe',
      description: '用户名',
    },
    {
      key: '2',
      name: 'is_active',
      type: 'boolean',
      value: 'true',
      description: '是否激活',
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

      switch (activeTab) {
        case 'header':
          updateParameters(row, key, headerParameters, setHeaderParameters);
          break;
        case 'cookie':
          updateParameters(row, key, cookieParameters, setCookieParameters);
          break;
        case 'query':
          updateParameters(row, key, queryParameters, setQueryParameters);
          break;
        case 'body':
          updateParameters(row, key, bodyParameters, setBodyParameters);
          break;
      }

      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const updateParameters = (
    row: Parameter,
    key: React.Key,
    parameters: Parameter[],
    setParameters: React.Dispatch<React.SetStateAction<Parameter[]>>
  ) => {
    const newData = [...parameters];
    const index = newData.findIndex(item => key === item.key);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      setParameters(newData);
    }
  };

  const handleDelete = (record: Parameter) => {
    switch (activeTab) {
      case 'header':
        setHeaderParameters(headerParameters.filter(item => item.key !== record.key));
        break;
      case 'cookie':
        setCookieParameters(cookieParameters.filter(item => item.key !== record.key));
        break;
      case 'query':
        setQueryParameters(queryParameters.filter(item => item.key !== record.key));
        break;
      case 'body':
        setBodyParameters(bodyParameters.filter(item => item.key !== record.key));
        break;
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

    switch (activeTab) {
      case 'header':
        setHeaderParameters([...headerParameters, newParam]);
        break;
      case 'cookie':
        setCookieParameters([...cookieParameters, newParam]);
        break;
      case 'query':
        setQueryParameters([...queryParameters, newParam]);
        break;
      case 'body':
        setBodyParameters([...bodyParameters, newParam]);
        break;
    }

    edit(newParam);
  };

  const columns = [
    {
      title: '参数名',
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
            rules={[{ required: true, message: '请输入参数名' }]}
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
  ];

  const items: TabsProps['items'] = [
    {
      key: 'header',
      label: 'Header',
      children: (
        <>
          <div style={{ marginBottom: 16, marginTop: 16 }}>
            <Space>
              <Input
                placeholder="搜索参数名或说明"
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
              dataSource={headerParameters}
              pagination={false}
            />
          </Form>
        </>
      ),
    },
    {
      key: 'cookie',
      label: 'Cookie',
      children: (
        <>
          <div style={{ marginBottom: 16, marginTop: 16 }}>
            <Space>
              <Input
                placeholder="搜索参数名或说明"
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
              dataSource={cookieParameters}
              pagination={false}
            />
          </Form>
        </>
      ),
    },
    {
      key: 'query',
      label: 'Query',
      children: (
        <>
          <div style={{ marginBottom: 16, marginTop: 16 }}>
            <Space>
              <Input
                placeholder="搜索参数名或说明"
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
              dataSource={queryParameters}
              pagination={false}
            />
          </Form>
        </>
      ),
    },
    {
      key: 'body',
      label: 'Body',
      children: (
        <>
          <div style={{ marginBottom: 16, marginTop: 16 }}>
            <Space>
              <Input
                placeholder="搜索参数名或说明"
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
              dataSource={bodyParameters}
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

export default GlobalParameters;