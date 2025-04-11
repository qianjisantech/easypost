import React, { useCallback, useEffect, useState } from 'react'

import { LinkOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Empty, Form, Input, message, Modal, Radio, Row, Spin, Table, Tabs } from "antd";

import { ProjectCreate, ProjectQueryPage } from '@/api/project'
import TeamSettings from '@/components/main/TeamSettings'

import MembersAndRoles from './MembersAndRoles'
import ProjectCard from './ProjectCard'
import CollaborationBoard from "@/components/CollaborationBoard";

const { TabPane } = Tabs

const TeamTabs = ({ teamId }) => {
  const [activeKey, setActiveKey] = useState('1')
  const [cardsData, setCardsData] = useState([])
  const [membersData, setMembersData] = useState([])
  const [rolesData, setRolesData] = useState([])
  const [loading, setLoading] = useState(false)
  const [membersLoading, setMembersLoading] = useState(false)
  const [settingsLoading, setSettingsLoading] = useState(false)

  const [data, setData] = useState([]);
  const [loadFailed, setLoadFailed] = useState(false);
  // Modal related state
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [privacy, setPrivacy] = useState(false) // Default is private
  const [form] = Form.useForm() // Create form instance
  const [initialFormValues, setInitialFormValues] = useState({
    id: '',
    projectName: '',
    isPublic: false,
    teamId:teamId
  })

  const handleModalCancel = () => {
    setIsModalVisible(false)
  }
  // Fetch project cards data
  const fetchCardsData = useCallback(async () => {
    setLoading(true)
    setLoadFailed(false)
    try {
      if (teamId) {
        const response = await ProjectQueryPage({
          page: 1,
          pageSize: 10,
          teamId: teamId,
        })
        const data = response.data.data
        if (data.length === 0) {
          setLoadFailed(true)
        }
        setCardsData(data)
      }

    } catch (err) {
      setLoadFailed(true)
      message.error('团队项目数据加载失败')
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch members and roles data
  const fetchMembersData = useCallback(async () => {
    // setMembersLoading(true)
    // try {
    //   setMembersData(members)
    //   setRolesData(roles)
    // } catch (err) {
    //   message.error('成员和角色数据加载失败')
    // } finally {
    //   setMembersLoading(false)
    // }
  }, [])

  useEffect(() => {
    if (cardsData.length === 0 && !loadFailed) {
      fetchCardsData()
    }
  }, [cardsData, loadFailed, fetchCardsData])

  // Handle tab changes
  const handleTabChange = (key) => {
    setActiveKey(key)
    if (key === '1' && cardsData.length === 0 && !loadFailed) {
      fetchCardsData()
    }
    if (key === '2' && membersData.length === 0 && rolesData.length === 0) {
      fetchMembersData()
    }
  }

  // Create new project
  const handleCreateNewProject = () => {
    if (teamId){
      setInitialFormValues({
        id: teamId,
        projectName: '',
        isPublic: false,
        teamId:teamId
      })
    }
    setIsModalVisible(true)
  }

  const handleUrlClick = (url) => {
    window.open(url, '_blank')
  }
// 模拟数据
  const mockData = [
    {
      key: '1',
      name: '百度',
      url: 'https://www.baidu.com',
      description: '全球最大的中文搜索引擎'
    },
    {
      key: '2',
      name: '谷歌',
      url: 'https://www.google.com',
      description: '全球最大的搜索引擎'
    },
    {
      key: '3',
      name: 'GitHub',
      url: 'https://github.com',
      description: '代码托管平台'
    },
    {
      key: '4',
      name: 'Gitee',
      url: 'https://gitee.com',
      description: '国内代码托管平台'
    }
  ]
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{text}</div>
          <div style={{ color: '#999', fontSize: 12 }}>{record.description}</div>
        </div>
      )
    },
    {
      title: '地址',
      dataIndex: 'url',
      key: 'url',
      render: (url) => (
        <Button
          type="link"
          icon={<LinkOutlined />}
          onClick={() => handleUrlClick(url)}
          style={{ padding: 0 }}
        >
          {url}
        </Button>
      )
    }
  ];


  // Handle form submit for project creation
  const handleProjectFormSubmit = async (values) => {
    const payload = {
      ...values,
      teamId: teamId, // 键值对形式，teamId 是变量名
    };
    try {
      await ProjectCreate(payload)
      setIsModalVisible(false)
      fetchCardsData() // Refresh project list after creation
    } catch (err) {
      message.error('项目创建失败')
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    // 模拟API请求
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 800);
  };
  // Handle privacy change
  const handlePrivacyChange = (e) => {
    setPrivacy(e.target.value)
  }
  return (
    <>
      <Tabs activeKey={activeKey} defaultActiveKey="1" onChange={handleTabChange}>
        <TabPane key="1" tab="团队项目">
          <div style={{ position: 'relative' }}>
            {loading ? (
              <Spin tip="加载中..." />
            ) : loadFailed || cardsData.length === 0 ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  minHeight: '200px',
                }}
              >
                <Empty
                  description={false}
                  style={{ fontSize: '48px', transform: 'scale(2.5)', marginTop: '8%' }}
                />
                <Button
                  icon={<PlusOutlined />}
                  style={{ marginTop: '6%' }}
                  type="primary"
                  onClick={handleCreateNewProject}
                >
                  新建项目
                </Button>
              </div>
            ) : (
              <div style={{ width: '90%' }}>
                <Row gutter={[16, 16]} justify="start">
                  {cardsData.map((card) => (
                    <Col key={card.id} span={4.5}>
                      <ProjectCard card={card} fetchCardsData={fetchCardsData} teamId={initialFormValues.teamId} />
                    </Col>
                  ))}
                </Row>
              </div>
            )}
            {cardsData.length > 0 && (
              <Button
                icon={<PlusOutlined />}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  zIndex: 10,
                }}
                type="primary"
                onClick={handleCreateNewProject}
              >
                新建项目
              </Button>
            )}
          </div>
        </TabPane>
        <TabPane key="2" tab="协作看板">
          <CollaborationBoard/>
        </TabPane>
        <TabPane key="3" tab="成员/权限">
          {membersLoading ? <Spin tip="加载成员和角色数据..." /> : <MembersAndRoles teamId={teamId} />}
        </TabPane>
        <TabPane key="4" tab="团队设置">
          {settingsLoading ? <Spin tip="加载团队设置..." /> : <TeamSettings teamId={teamId} />}
        </TabPane>
      </Tabs>

      {/* Modal for creating a new project */}
      <Modal
        footer={null}
        title="新建项目"
        visible={isModalVisible}
        width={400}
        onCancel={handleModalCancel}
      >
        <Form
          form={form}
          initialValues={initialFormValues} // 动态设置初始值
          name="create-project-form"
          style={{ marginTop: '20px' }}
          onFinish={handleProjectFormSubmit}
        >
          <Form.Item name="projectName" rules={[{ required: true, message: '项目名称为必填项' }]}>
            <Input placeholder="项目名称" />
          </Form.Item>

          <Form.Item name="isPublic">
            <Radio.Group value={privacy} onChange={handlePrivacyChange}>
              <Radio value={false}>私有</Radio>
              <Radio value={true}>公开</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" style={{ width: '100%' }} type="primary">
              创建项目
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default TeamTabs
