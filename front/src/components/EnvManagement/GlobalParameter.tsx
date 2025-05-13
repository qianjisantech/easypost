import React, { useState, useEffect } from 'react';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import type { TabsProps } from 'antd';
import { Button, Form, Input, Space, Table, Select, Tabs } from "antd";
import { nanoid } from "nanoid";

interface Parameter {
  id: string;
  key: string;
  type: string;
  value: string;
  description: string;
}

interface GlobalParameterData {
  header: Parameter[];
  cookie: Parameter[];
  query: Parameter[];
  body: Parameter[];
}

interface GlobalParameterProps {
  data?: GlobalParameterData;
  onChange?: (newData: GlobalParameterData) => void;
}

const typeOptions = [
  { value: 'string', label: 'string', color: '#1890ff' },
  { value: 'number', label: 'number', color: '#52c41a' },
  { value: 'boolean', label: 'boolean', color: '#faad14' },
  { value: 'object', label: 'object', color: '#722ed1' },
];

const GlobalParameter: React.FC<GlobalParameterProps> = ({
                                                           data = {
                                                             header: [],
                                                             cookie: [],
                                                             query: [],
                                                             body: []
                                                           },
                                                           onChange
                                                         }) => {
  const [activeTab, setActiveTab] = useState<string>('header');
  const [searchText, setSearchText] = useState('');
  const [editingKey, setEditingKey] = useState<string>('');
  const [form] = Form.useForm();
  const [internalData, setInternalData] = useState<GlobalParameterData>({
    header: [],
    cookie: [],
    query: [],
    body: [],
    ...data
  });

  useEffect(() => {
    setInternalData(data);
  }, [data]);

  const getCurrentTabData = () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return internalData[activeTab as keyof GlobalParameterData] || [];
  };

  const getTypeColor = (type: string) => {
    const option = typeOptions.find(opt => opt.value === type);
    return option ? option.color : '#000000';
  };

  const isEditing = (record: Parameter) => record.id === editingKey;

  const edit = (record: Parameter) => {
    form.setFieldsValue({
      id: record.id,
      key: record.key,
      type: record.type,
      value: record.value,
      description: record.description
    });
    setEditingKey(record.id);
  };

  const save = async (id: string) => {
    try {
      const row = await form.validateFields();
      const newData = { ...internalData };

      newData[activeTab as keyof GlobalParameterData] =
        newData[activeTab as keyof GlobalParameterData].map(item =>
          item.id === id ? { ...item, ...row } : item
        );

      setInternalData(newData);
      onChange?.(newData);
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDelete = (record: Parameter) => {
    const newData = { ...internalData };
    newData[activeTab as keyof GlobalParameterData] =
      newData[activeTab as keyof GlobalParameterData].filter(item => item.id !== record.id);

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
      [activeTab]: [...internalData[activeTab as keyof GlobalParameterData], newParam]
    };

    setInternalData(newData);
    onChange?.(newData);
    edit(newParam);
  };

  const columns = [
    {
      title: '参数名',
      dataIndex: 'key',
      key: 'key',
      filteredValue: [searchText],
      onFilter: (value: string, record: Parameter) => {
        return (
          record.key.toLowerCase().includes(value.toLowerCase()) ||
          record.description.toLowerCase().includes(value.toLowerCase())
        );
      },
      render: (_: any, record: Parameter) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="key"
            style={{ margin: 0 }}
            rules={[{ required: true, message: '请输入参数名' }]}
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
          <Input
            bordered={false}
            readOnly
            value={record.type}
            style={{
              padding: 0,
              backgroundColor: 'transparent',
              color: getTypeColor(record.type)
            }}
          />
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
            readOnly
            value={record.value}
            style={{ padding: 0, backgroundColor: 'transparent' }}
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
          <Input
            bordered={false}
            readOnly
            value={record.description}
            style={{ padding: 0, backgroundColor: 'transparent' }}
          />
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
              onClick={() => save(record.id)}
            >
              保存
            </Button>
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
              onClick={() => { handleDelete(record); }}
            />
          </Space>
        );
      },
    },
  ];

  const renderTable = () => (
    <Form form={form} component={false}>
      <Table
        bordered
        columns={columns}
        dataSource={getCurrentTabData()}
        rowKey="id"
        pagination={false}
      />
    </Form>
  );

  const items: TabsProps['items'] = ['header', 'cookie', 'query', 'body'].map(tab => ({
    key: tab,
    label: tab.charAt(0).toUpperCase() + tab.slice(1),
    children: (
      <>
        <div style={{ marginBottom: 16, marginTop: 16 }}>
          <Space>
            <Input
              placeholder="搜索参数名或说明"
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
        {renderTable()}
      </>
    )
  }));

  return (
    <div className="global-parameter" style={{ padding: 24 }}>
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

export default GlobalParameter;