import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';


const TeamSettings = () => {
  // 设置弹窗的显示状态和表单数据
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ label: '', value: '' });

  const [form] = Form.useForm();

  const normalDataSource = [
    {
      key: '1',
      label: '团队名称',
      value: '客户服务',
    },
    {
      key: '2',
      label: '团队ID',
      value: '1213212',
    },
    {
      key: '3',
      label: '我的团队内昵称',
      value: '管理员',
    },
  ];

  const normalColumns = [
    {
      dataIndex: 'label',
      key: 'label',
      render: (text) => <span>{text}</span>,
      width: 80, // 设置label列宽度
    },
    {
      dataIndex: 'value',
      key: 'value',
      render: (text) => <span>{text}</span>,
      width: 300, // 设置value列宽度
    },
    {
      key: 'actions',
      render: (text, record) => {
        // 判断当前行的label是否为 '团队ID'，如果是则不显示编辑按钮
        if (record.label === '团队ID') {
          return null; // 不显示编辑按钮
        }
        return (
          <Button onClick={() => handleEdit(record)}>编辑</Button> // 显示编辑按钮
        );
      },
      width: 100, // 设置编辑按钮列宽度
      align: 'right', // 让编辑按钮对齐到右边
    },
  ];

  const dangerDataSource = [
    {
      key: '1',
      label: '移交',
      value: '将团队的所有者权限移交给其他成员',
    },
    {
      key: '2',
      label: '解散团队',
      value: '务必谨慎，解散后无法找回',
    },
    {
      key: '3',
      label: '退出团队',
      value: '退出当前所在团队',
    },
  ];

  const dangerColumns = [
    {
      dataIndex: 'label',
      key: 'label',
      render: (text) => <span>{text}</span>,
      width: 80, // 设置label列宽度
    },
    {
      dataIndex: 'value',
      key: 'value',
      render: (text) => <span>{text}</span>,
      width: 300, // 设置value列宽度
    },
    {
      key: 'actions',
      render: (text, record) => {
        const buttonText = record.label === '移交' ? '移交' : record.label === '退出团队' ? '退出' : '解散';
        return <Button>{buttonText}</Button>;
      },
      width: 100, // 设置编辑按钮列宽度
      align: 'right', // 让编辑按钮对齐到右边
    },
  ];

  // 处理点击编辑按钮
  const handleEdit = (record) => {
    setFormData({ label: record.label, value: record.value });
    setVisible(true);
  };

  // 处理表单提交
  const handleSubmit = (values) => {
    console.log('提交的数据：', values);
    setVisible(false); // 关闭弹窗
  };

  return (
    <div>
      <div style={{ fontSize: '16px', marginBottom: '10px' }}>基础信息</div>
      {/* 标题 */}
      <div style={{ border: '0.5px solid #d9d9d9', borderRadius: '1px' }}>
        {/* 外层容器添加边框 */}
        <Table
          dataSource={normalDataSource}
          columns={normalColumns}
          pagination={false}
          bordered={false} // 禁用表格内部边框
          showHeader={false} // 隐藏表头
          style={{
            backgroundColor: 'white',
            width: '100%',
            tableLayout: 'fixed', // 固定表格布局
          }}
        />
      </div>
      <div style={{ fontSize: '16px', marginBottom: '10px', marginTop: '20px' }}>危险区域</div>
      {/* 标题 */}
      <div style={{ border: '0.5px solid #d9d9d9', borderRadius: '1px' }}>
        {/* 外层容器添加边框 */}
        <Table
          dataSource={dangerDataSource}
          columns={dangerColumns}
          pagination={false}
          bordered={false} // 禁用表格内部边框
          showHeader={false} // 隐藏表头
          style={{
            backgroundColor: 'white',
            width: '100%',
            tableLayout: 'fixed', // 固定表格布局
          }}
        />
      </div>

      {/* 弹窗内容 */}
      <Modal
        title={`修改`}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          initialValues={formData}
          onFinish={handleSubmit}
        >
          <Form.Item
            label={formData.label}
            name="teamName"
            rules={[{ required: true, message: '请输入内容' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button onClick={() => setVisible(false)} style={{ marginLeft: 10 }}>
              取消
            </Button>
          </Form.Item>
        </Form>


      </Modal>
    </div>
  );
};

export default TeamSettings;
