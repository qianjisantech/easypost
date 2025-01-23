'use client';
import React, { useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Table, Tabs, Typography, Modal, Input, Form, Card } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { UserQueryPage } from "@/api/user";

const { Text } = Typography;

// 创建成员和角色全选组件
const MembersAndRoles = ({
                           onView,
                           onAdd,
                         }) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [membersData, setMembersData] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const [activeTab, setActiveTab] = useState("1");

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // 处理分页变化
  const handleTableChange = (pagination) => {
    setPagination({
      current: pagination.current || 1,
      pageSize: pagination.pageSize || 5,
      total: pagination.total || 0,
    });
  };

  // 切换Tab时触发
  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  // 打开编辑弹窗
  const onEdit = (id) => {
    const selectedMember = membersData.find(item => item.id === id);
    setEditData(selectedMember);
    setEditModalVisible(true);
  };

  // 打开删除确认弹窗
  const onDelete = (id) => {
    setDeleteId(id);
    setDeleteModalVisible(true);
  };

  // 获取成员数据
  const fetchMembersData = async () => {
    try {
      const response = await UserQueryPage({
        current: pagination.current,
        pageSize: pagination.pageSize,
      });
      setMembersData(response.data.data.records); // 假设返回的数据包含 records 字段
      setPagination((prev) => ({
        ...prev,
        total: response.data.total, // 假设返回的数据包含 total 字段
      }));
    } catch (error) {
      console.error("Error fetching members data:", error);
    }
  };

  // 获取角色数据
  const fetchRolesData = async () => {
    try {
      const response = await UserQueryPage({
        current: pagination.current,
        pageSize: pagination.pageSize,
      });
      setRolesData(response.data.data.records); // 假设返回的数据包含 records 字段
      setPagination((prev) => ({
        ...prev,
        total: response.data.total, // 假设返回的数据包含 total 字段
      }));
    } catch (error) {
      console.error("Error fetching roles data:", error);
    }
  };

  // 根据当前活动的 Tab 页，决定调用哪个请求
  useEffect(() => {
    if (activeTab === "1") {
      fetchMembersData();
    } else {
      fetchRolesData();
    }
  }, [pagination.current, pagination.pageSize, activeTab]);

  // 成员 Tab 的列定义
  const memberColumns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <span>{text}</span>,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text}</span>,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <span>{text}</span>,
    },
    {
      title: '操作',
      key: 'operation',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            size="small"
            type="link"
            onClick={() => onEdit(record.id)}
          >
            编辑
          </Button>
          <Button
            icon={<DeleteOutlined />}
            size="small"
            type="link"
            onClick={() => onDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // 角色 Tab 的列定义
  const roleColumns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text}</span>,
    },
    {
      title: '操作',
      key: 'operation',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            size="small"
            type="link"
            onClick={() => onEdit(record.id)}
          >
            编辑
          </Button>
          <Button
            icon={<DeleteOutlined />}
            size="small"
            type="link"
            onClick={() => onDelete(record.id)}
          >
            删除
          </Button>
          <Button
            icon={<DeleteOutlined />}
            size="small"
            type="link"
            onClick={() => onDelete(record.id)}
          >
            配置权限
          </Button>
        </Space>
      ),
    },
  ];

  // 确认删除
  const handleConfirmDelete = () => {
    console.log("删除成员/角色 ID:", deleteId);
    setDeleteModalVisible(false);
  };

  // 取消删除
  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={handleTabChange}>
        {/* 成员 Tab */}
        <TabPane key="1" tab="成员">
          <Row gutter={8}>
            {/* 成员统计看板 */}
            <Col span={8}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#f0f0f0",  // 浅灰色背景
                padding: "16px",  // 加点内边距，使内容不太贴边
                borderRadius: "8px"  // 圆角
              }}>
                <Text
                  style={{
                    fontSize: "36px",
                    fontWeight: "bold",
                  }}
                >
                  20
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: "24px",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  成员
                </Text>
              </div>
            </Col>

            {/* 游客统计 */}
            <Col span={8}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#f0f0f0",  // 浅灰色背景
                padding: "16px",  // 加点内边距，使内容不太贴边
                borderRadius: "8px"  // 圆角
              }}>
                <Text
                  style={{
                    fontSize: "36px",
                    fontWeight: "bold",
                  }}
                >
                  5
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: "24px",
                    fontFamily: "Arial, sans-serif"
                  }}
                >
                  游客
                </Text>
              </div>
            </Col>

            {/* 待定统计 */}
            <Col span={8}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#f0f0f0",  // 浅灰色背景
                padding: "16px",  // 加点内边距，使内容不太贴边
                borderRadius: "8px"  // 圆角
              }}>
                <Text
                  style={{
                    fontSize: "36px",
                    fontWeight: "bold",
                  }}
                >
                  3
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: "24px",
                    fontFamily: "Arial, sans-serif"
                  }}
                >
                  待定
                </Text>
              </div>
            </Col>
          </Row>

          {/* 新增成员按钮 */}
          <Col span={24} style={{ marginTop: "16px", textAlign: "right", marginBottom: "16px" }}>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={onAdd}
            >
              邀请成员
            </Button>
          </Col>

          <Table
            bordered
            columns={memberColumns}
            dataSource={membersData}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSizeOptions: ['10', '20', '50'],
              showTotal: (total) => `共 ${total} 条`,
            }}
            rowKey="id"
            onChange={handleTableChange}
          />
        </TabPane>

        {/* 角色 Tab */}
        <TabPane key="2" tab="角色/权限">
          <Table
            bordered
            columns={roleColumns}
            dataSource={rolesData}
            rowKey="id"
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSizeOptions: ['10', '20', '50'],
              showTotal: (total) => `共 ${total} 条`,
            }}
            onChange={handleTableChange}
          />
        </TabPane>
      </Tabs>

      {/* 编辑弹窗 */}
      {editModalVisible && (
        <Modal
          title="编辑成员/角色"
          visible={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          onOk={() => setEditModalVisible(false)} // 在这里处理编辑保存的逻辑
        >
          <Form
            layout="vertical"
            initialValues={editData} // 自动填充表单数据
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}

            >
              <Input />
            </Form.Item>
            <Form.Item
              label="姓名"
              name="name"
              rules={[{ required: true, message: '请输入姓名!' }]}

            >
              <Input />
            </Form.Item>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[{ required: true, message: '请输入邮箱!' }, { type: 'email', message: '请输入有效的邮箱!' }]}

            >
              <Input />
            </Form.Item>
            <Form.Item
              label="角色"
              name="role"
              rules={[{ required: true, message: '请选择角色!' }]}

            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      )}

      {/* 删除确认弹窗 */}
      <Modal
        title="确认删除"
        visible={deleteModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="确认"
        cancelText="取消"
      >
        <p>确定要删除此项吗？</p>
      </Modal>
    </div>
  );
};

export default MembersAndRoles;
