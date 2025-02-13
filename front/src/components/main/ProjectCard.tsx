import React, { startTransition, useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExportOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { Button, Form, Input, message, Modal, Popover, Radio, Tooltip } from 'antd'

import { ProjectCopy, ProjectDelete, ProjectUpdate } from '@/api/project'

const ProjectCard = ({ card, fetchCardsData, teamId }) => {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredItem, setHoveredItem] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [popoverVisible, setPopoverVisible] = useState(false)
  const [privacy, setPrivacy] = useState(false)
  const [loading, setLoading] = useState(false)
  // Dynamically set the initial form values based on card data
  useEffect(() => {
    if (card) {
      form.setFieldsValue({
        id: card.id, // 设置 id
        projectName: card.projectName,
        isPublic: card.isPublic,
      })
      setPrivacy(card.isPublic)
    }
  }, [card, form])

  const handleCardClick = (route) => {
    startTransition(() => {
      router.push(route)
    })
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
  }

  const handleAction = async (action, e) => {
    e.stopPropagation()
    switch (action) {
      case '修改项目':
        setIsModalVisible(true)
        return
      case '复制项目':
        console.log('复制项目')
        await ProjectCopy({ id: card.id, teamId: teamId })
        fetchCardsData()
        return
      case '删除项目':
        Modal.confirm({
          title: '确定删除该项目吗?',
          content: '删除后无法恢复，确认删除？',
          okText: '删除',
          cancelText: '取消',
          onOk: async () => {
            await ProjectDelete(card.id)
            fetchCardsData()
          },
          onCancel: () => {
            console.log('删除操作被取消')
          },
        })
        console.log('删除项目')
        return
      case '新窗口打开':
        window.open(`/project`, '_blank') // Open project in new window
        return
    }
    setPopoverVisible(false)
  }

  const handleProjectFormSubmit = async (values) => {
    try {
      await ProjectUpdate({ ...values, id: card.id }) // Pass form values to the API
      // 打印表单提交值和 card.id
      console.log('Form Submitted with values:', { ...values, id: card.id })
      console.log('Card ID:', card.id)
      fetchCardsData()
      setIsModalVisible(false)
      message.success('项目修改成功')
    } catch (err) {
      message.error('修改项目失败')
    }
  }

  const handlePrivacyChange = (e) => {
    setPrivacy(e.target.value) // Update privacy state on radio change
  }

  const dropdownContent = (
    <div style={styles.dropdownMenu}>
      <div
        style={{
          ...styles.dropdownItem,
          ...(hoveredItem === 'modify' ? hoverStyles.dropdownItem : {}),
        }}
        onClick={(e) => handleAction('修改项目', e)}
        onMouseEnter={() => {
          setHoveredItem('modify')
        }}
        onMouseLeave={() => {
          setHoveredItem(null)
        }}
      >
        <EditOutlined
          style={{
            ...styles.dropdownIcon,
            ...(hoveredItem === 'modify' ? hoverStyles.icon : {}),
          }}
        />
        <span style={hoveredItem === 'modify' ? hoverStyles.dropdownText : {}}>修改项目</span>
      </div>
      <div
        style={{
          ...styles.dropdownItem,
          ...(hoveredItem === 'copy' ? hoverStyles.dropdownItem : {}),
        }}
        onClick={(e) => handleAction('复制项目', e)}
        onMouseEnter={() => {
          setHoveredItem('copy')
        }}
        onMouseLeave={() => {
          setHoveredItem(null)
        }}
      >
        <CopyOutlined
          style={{
            ...styles.dropdownIcon,
            ...(hoveredItem === 'copy' ? hoverStyles.icon : {}),
          }}
        />
        <span style={hoveredItem === 'copy' ? hoverStyles.dropdownText : {}}>复制项目</span>
      </div>
      <div
        style={{
          ...styles.dropdownItem,
          ...(hoveredItem === 'delete' ? hoverStyles.dropdownItem : {}),
        }}
        onClick={(e) => handleAction('删除项目', e)}
        onMouseEnter={() => {
          setHoveredItem('delete')
        }}
        onMouseLeave={() => {
          setHoveredItem(null)
        }}
      >
        <DeleteOutlined
          style={{
            ...styles.dropdownIcon,
            ...(hoveredItem === 'delete' ? hoverStyles.icon : {}),
          }}
        />
        <span style={hoveredItem === 'delete' ? hoverStyles.dropdownText : {}}>删除项目</span>
      </div>
    </div>
  )

  return (
    <div
      style={{
        ...styles.card,
        ...(isHovered ? styles.cardHovered : {}),
      }}
      onClick={(e) => {
        if (!isModalVisible) {
          handleCardClick(`/project/${card.id}`)
        }
      }}
      onMouseEnter={() => {
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
      }}
    >
      <div
        style={styles.imageContainer}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <Image
          alt="Project Image"
          height={50}
          src={`/assets/svg/project/${card.projectIcon}`}
          width={50}
        />
      </div>

      <div style={styles.cardTitleContainer}>
        <span>{card?.projectName}</span>
      </div>

      <div style={styles.projectLabelContainer}>
        <span style={styles.projectLabel}>{card?.isPublic ? '公开' : '私有'}</span>
      </div>

      <div
        style={{
          ...styles.dotsContainer,
          display: isHovered ? 'flex' : 'none',
        }}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <Tooltip title="新窗口打开">
          <div
            onClick={(e) => handleAction('新窗口打开', e)}
            onMouseEnter={() => {
              setHoveredItem('openInNewWindow')
            }}
            onMouseLeave={() => {
              setHoveredItem('')
            }}
          >
            <ExportOutlined style={styles.icon} />
          </div>
        </Tooltip>
        <Tooltip title="收藏项目">
          <StarOutlined style={styles.icon} />
        </Tooltip>
        <Popover
          content={dropdownContent}
          placement="bottomRight"
          trigger="hover"
          visible={popoverVisible}
          onVisibleChange={(visible) => {
            setPopoverVisible(visible)
          }}
        >
          <EllipsisOutlined style={styles.icon} />
        </Popover>
      </div>

      <Modal
        footer={null}
        title="修改项目"
        visible={isModalVisible}
        width={400}
        onCancel={handleModalCancel}
      >
        <Form
          form={form}
          name="update-project-form"
          style={{ marginTop: '20px' }}
          onFinish={handleProjectFormSubmit}
        >
          <Form.Item hidden initialValue={card.id} name="id">
            <Input type="hidden" />
          </Form.Item>

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
              修改
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

const styles = {
  card: {
    width: '240px',
    height: '170px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    margin: '1px',
  },
  cardHovered: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  imageContainer: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a6cad7',
    borderRadius: '10%',
    padding: '5px',
  },
  cardTitleContainer: {
    position: 'absolute',
    top: '90px',
    left: '20px',
    fontSize: '16px',
    fontFamily: 'SimHei, Arial, sans-serif',
    textAlign: 'left',
    display: 'flex',
    color: 'rgb(52, 64, 84)',
    alignItems: 'center',
    padding: '5px',
  },
  projectLabelContainer: {
    position: 'absolute',
    top: '130px',
    left: '20px',
    fontSize: '12px',
    fontFamily: 'Arial, sans-serif',
    color: '#5a5a5a',
  },
  projectLabel: {
    padding: '2px 5px',
    borderRadius: '4px',
    backgroundColor: '#f1f1f1',
  },
  dotsContainer: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    fontSize: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  icon: {
    fontSize: '16px',
    color: '#333',
  },
  dropdownMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#333',
    borderRadius: '4px',
  },
}

const hoverStyles = {
  dropdownItem: {
    color: '#f4a261',
  },
  icon: {
    color: '#f4a261',
  },
  dropdownText: {
    color: '#f4a261',
  },
}

export default ProjectCard
