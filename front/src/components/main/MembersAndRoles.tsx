'use client'
import React, { useEffect, useState } from 'react'

import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Space,
  Table,
  Tabs,
  Tag,
  Typography,
} from 'antd'
import TabPane from 'antd/es/tabs/TabPane'

import { TeamInviteMember, TeamMemberUserPage ,TeamUserSearch} from '@/api/team'


const { Text } = Typography

// 创建成员和角色全选组件
const MembersAndRoles = ({ teamId }) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  })
  const [membersData, setMembersData] = useState([])
  const [rolesData, setRolesData] = useState([])
  const [activeTab, setActiveTab] = useState('1')
  const [activeInviteTab, setActiveInviteTab] = useState('0')
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [editData, setEditData] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [inviteModalVisible, setInviteModalVisible] = useState(false)
  const [inviteForm] = Form.useForm()
  const inviteLink = 'http://10.66.110.142:3000/invite?token=1213131232131321' // 模拟邀请码链接
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  // 处理分页变化
  const handleTableChange = (pagination) => {
    setPagination({
      current: pagination.current || 1,
      pageSize: pagination.pageSize || 5,
      total: pagination.total || 0,
    })
  }
  // 表格列配置
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '团队权限',
      dataIndex: 'name1',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
  ]
  // 模拟搜索，返回带有 id 和 name 的数据
  const handleSearch = async (value) => {
    try {
      console.log('搜索关键词:', value)
      const response = await TeamUserSearch({
        current: pagination.current,
        pageSize: pagination.pageSize,
        keyword: value,
        teamId: teamId,
      })
      if (response.data.success) {
        setSearchResult(response.data.data.records)
      } else {
        setSearchResult([])
      }
    } catch (e) {
      console.error('搜索失败:', e)
      setSearchResult([])
    }
    // 重置选中项
    setSelectedRowKeys([])
  }
  // 切换Tab时触发
  const handleTabChange = (key) => {
    setActiveTab(key)
  }
  // 关闭邀请弹窗
  const handleCancelInvite = () => {
    setInviteModalVisible(false)
    setSearchResult([]) // 清空表单数据
    setSearchQuery('')
  }
  // 处理邀请成员
  const handleInviteByEmail = async () => {
    try {
      const values = await inviteForm.validateFields()
      console.log('邮箱邀请数据:', values)

      // 这里可以调用 API 发送邀请
      // await inviteMemberAPI(values);

      message.success('邀请已发送！')
      setInviteModalVisible(false)
      inviteForm.resetFields()
    } catch (error) {
      console.error('表单校验失败:', error)
    }
  }
  // 选择行变化的处理
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  // 表格行选择配置
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  // 复制邀请码
  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      message.success('邀请码已复制！')
    })
  }
  // 打开编辑弹窗
  const onEdit = (id) => {
    const selectedMember = membersData.find((item) => item.id === id)
    setEditData(selectedMember)
    setEditModalVisible(true)
  }

  // 打开删除确认弹窗
  const onDelete = (id) => {
    setDeleteId(id)
    setDeleteModalVisible(true)
  }

  // 获取成员数据
  const fetchMembersData = async () => {
    try {
      const response = await TeamMemberUserPage({
        current: pagination.current,
        pageSize: pagination.pageSize,
        teamId: teamId,
      })
      setMembersData(response.data.data.records) // 假设返回的数据包含 records 字段
      setPagination((prev) => ({
        ...prev,
        total: response.data.total, // 假设返回的数据包含 total 字段
      }))
    } catch (error) {
      console.error('Error fetching members data:', error)
    }
  }
  // 打开邀请弹窗
  const handleOpenInvite = () => {
    setInviteModalVisible(true)
    inviteForm.resetFields()
  }
  // 获取角色数据
  const fetchRolesData = async () => {
    try {
      const response = await UserQueryPage({
        current: pagination.current,
        pageSize: pagination.pageSize,
      })
      setRolesData(response.data.data.records) // 假设返回的数据包含 records 字段
      setPagination((prev) => ({
        ...prev,
        total: response.data.total, // 假设返回的数据包含 total 字段
      }))
    } catch (error) {
      console.error('Error fetching roles data:', error)
    }
  }
  const handleConfirmInvite = async () => {
    setInviteModalVisible(false)
    const response = await TeamInviteMember({
      teamId: teamId,
      userIds: selectedRowKeys,
    })
    if (response.data.success) {
      message.success(response.data.message)
    }
    fetchMembersData()
    setSearchQuery('')
    setSearchResult([])
  }
  // 根据当前活动的 Tab 页，决定调用哪个请求
  useEffect(() => {
    if (activeTab === '1') {
      fetchMembersData()
    } else {
      fetchRolesData()
    }
  }, [pagination.current, pagination.pageSize, activeTab])

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
      title: '团队权限',
      dataIndex: 'permission',
      key: 'name',
      render: (text) => (
        <Tag color={text === 0 ? 'red' : 'green'}>{text === 0 ? '团队所有者' : '团队成员'}</Tag>
      ),
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <span>{text}</span>,
    },
    {
      title: '最近活跃',
      key: 'operation',
      render: (_, record) => (
        <Space justify="space-between" style={{ width: '100%' }}>
          <p>6 小时前</p>
          <Button
            icon={<SettingOutlined />}
            size="small"
            style={{ float: 'right' }}
            type="link"
            onClick={() => {
              onEdit(record.id)
            }}
          ></Button>
        </Space>
      ),
    },
  ]

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
            onClick={() => {
              onEdit(record.id)
            }}
          >
            编辑
          </Button>
          <Button
            icon={<DeleteOutlined />}
            size="small"
            type="link"
            onClick={() => {
              onDelete(record.id)
            }}
          >
            删除
          </Button>
          <Button
            icon={<DeleteOutlined />}
            size="small"
            type="link"
            onClick={() => {
              onDelete(record.id)
            }}
          >
            配置权限
          </Button>
        </Space>
      ),
    },
  ]

  // 确认删除
  const handleConfirmDelete = () => {
    console.log('删除成员/角色 ID:', deleteId)
    setDeleteModalVisible(false)
  }

  // 取消删除
  const handleCancelDelete = () => {
    setDeleteModalVisible(false)
  }

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={handleTabChange}>
        {/* 成员 Tab */}
        <TabPane key="1" tab="成员">
          <Row gutter={8}>
            {/* 成员统计看板 */}
            <Col span={8}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#f0f0f0', // 浅灰色背景
                  padding: '16px', // 加点内边距，使内容不太贴边
                  borderRadius: '8px', // 圆角
                }}
              >
                <Text
                  style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                  }}
                >
                  **
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: '24px',
                    fontFamily: 'Arial, sans-serif',
                  }}
                >
                  成员（功能待开发）
                </Text>
              </div>
            </Col>

            {/* 游客统计 */}
            <Col span={8}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#f0f0f0', // 浅灰色背景
                  padding: '16px', // 加点内边距，使内容不太贴边
                  borderRadius: '8px', // 圆角
                }}
              >
                <Text
                  style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                  }}
                >
                  **
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: '24px',
                    fontFamily: 'Arial, sans-serif',
                  }}
                >
                  游客（功能待开发）
                </Text>
              </div>
            </Col>

            {/* 待定统计 */}
            <Col span={8}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#f0f0f0', // 浅灰色背景
                  padding: '16px', // 加点内边距，使内容不太贴边
                  borderRadius: '8px', // 圆角
                }}
              >
                <Text
                  style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                  }}
                >
                  **
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: '24px',
                    fontFamily: 'Arial, sans-serif',
                  }}
                >
                  待定（功能待开发）
                </Text>
              </div>
            </Col>
          </Row>

          {/* 新增成员按钮 */}
          <Col span={24} style={{ marginTop: '16px', textAlign: 'right', marginBottom: '16px' }}>
            <Button icon={<PlusOutlined />} type="primary" onClick={handleOpenInvite}>
              邀请成员
            </Button>
          </Col>

          <Modal
            footer={null}
            open={inviteModalVisible}
            title="邀请成员"
            width={600}
            onCancel={handleCancelInvite}
          >
            <Tabs activeKey={activeInviteTab} onChange={setActiveInviteTab}>
              {/* 通用邀请 */}
              <TabPane key="0" tab="通用邀请">
                <Input.Search
                  enterButton="搜索"
                  placeholder="请输入用户名/邮箱"
                  style={{ marginBottom: 20 }}
                  onSearch={handleSearch}
                />
                <Table
                  columns={columns}
                  dataSource={searchResult.filter(
                    (member) =>
                      member.username.includes(searchQuery) ||
                      member.name.includes(searchQuery) ||
                      member.email.includes(searchQuery)
                  )}
                  pagination={pagination}
                  rowKey="id"
                  rowSelection={rowSelection}
                  onChange={handleTableChange}
                />
                <Button
                  disabled={selectedRowKeys.length === 0}
                  style={{ marginTop: 10, width: '100%' }}
                  type={'primary'}
                  onClick={handleConfirmInvite}
                >
                  确认邀请
                </Button>
              </TabPane>

              {/* 链接邀请 - 置灰并禁用 */}
              <TabPane
                key="1"
                style={{ opacity: 0.5, pointerEvents: 'none' }}
                tab="链接邀请(待开放）"
              >
                <p>将以下链接发送给用户，他们可以点击链接加入：</p>
                <Input
                  disabled
                  style={{ flex: 1, backgroundColor: '#f5f5f5', color: '#333' }}
                  value={inviteLink}
                />
                <Button
                  disabled
                  icon={<CopyOutlined />}
                  style={{ marginTop: 10, width: '100%' }}
                  type={'primary'}
                  onClick={handleCopyLink}
                >
                  复制
                </Button>
              </TabPane>

              {/* 邮箱邀请 - 置灰并禁用 */}
              <TabPane
                key="2"
                style={{ opacity: 0.5, pointerEvents: 'none' }}
                tab="邮箱邀请(待开放）"
              >
                <Form form={inviteForm} layout="vertical">
                  <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[
                      { required: true, message: '请输入邮箱地址' },
                      { type: 'email', message: '请输入有效的邮箱' },
                    ]}
                  >
                    <Input disabled placeholder="请输入成员邮箱" />
                  </Form.Item>
                  <Form.Item>
                    <Button disabled type="primary" onClick={handleInviteByEmail}>
                      发送邀请
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
          </Modal>

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
        {/*<TabPane key="2" tab="角色/权限">*/}
        {/*  <Table*/}
        {/*    bordered*/}
        {/*    columns={roleColumns}*/}
        {/*    dataSource={rolesData}*/}
        {/*    rowKey="id"*/}
        {/*    pagination={{*/}
        {/*      current: pagination.current,*/}
        {/*      pageSize: pagination.pageSize,*/}
        {/*      total: pagination.total,*/}
        {/*      showSizeChanger: true,*/}
        {/*      showQuickJumper: true,*/}
        {/*      pageSizeOptions: ['10', '20', '50'],*/}
        {/*      showTotal: (total) => `共 ${total} 条`,*/}
        {/*    }}*/}
        {/*    onChange={handleTableChange}*/}
        {/*  />*/}
        {/*</TabPane>*/}
      </Tabs>

      {/* 编辑弹窗 */}
      {editModalVisible && (
        <Modal
          title="设置成员权限"
          visible={editModalVisible}
          onCancel={() => {
            setEditModalVisible(false)
          }}
          onOk={() => {
            setEditModalVisible(false)
          }} // 在这里处理编辑保存的逻辑
        >
          <Form
            initialValues={editData} // 自动填充表单数据
            layout="vertical"
          >
            <Form.Item
              label="团队内昵称"
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="团队权限"
              name="permission"
              rules={[{ required: true, message: '请输入姓名!' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      )}

      {/* 删除确认弹窗 */}
      <Modal
        cancelText="取消"
        okText="确认"
        title="确认删除"
        visible={deleteModalVisible}
        onCancel={handleCancelDelete}
        onOk={handleConfirmDelete}
      >
        <p>确定要删除此项吗？</p>
      </Modal>
    </div>
  )
}

export default MembersAndRoles
