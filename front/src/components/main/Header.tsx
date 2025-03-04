import React, { useState } from 'react'

import { useRouter } from 'next/navigation'
import {
  AppstoreOutlined,
  BellOutlined,
  HomeOutlined,
  LoadingOutlined,
  MailOutlined,
  ReloadOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Dropdown, Menu, Modal, Space, Spin, Tooltip } from 'antd'

import { ROUTES } from '@/utils/routes'

const headerStyle = {
  height: '30px',
  backgroundColor: '#f0f0f0',
  display: 'flex',
  alignItems: 'center',
  padding: '0 10px',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
}

const iconStyle = {
  fontSize: '12px',
  cursor: 'pointer',
}

const HeaderPage = () => {
  const [loading, setLoading] = useState(false)
  const [modalState, setModalState] = useState({ visible: false, tab: 'basicSettings' })
  const router = useRouter()

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  // 退出登录
  const logout = () => {
    setModalState({ ...modalState, visible: false })
    localStorage.removeItem('accessToken')
    router.push(ROUTES.LOGIN)
  }
  const returnToProject = () => {
    router.back()
  }

  // 处理菜单点击事件
  const handleMenuClick = ({ key }) => {
    switch (key) {
      case 'logout':
        logout()
        break
      case 'accountSettings':
        setModalState({ ...modalState, visible: true })
        break
      default:
        break
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="accountSettings" icon={<SettingOutlined />}>
        账号设置
      </Menu.Item>
      <Menu.Item key="logout" icon={<UserOutlined />}>
        退出登录
      </Menu.Item>
    </Menu>
  )

  // 账号设置内容
  const content = {
    basicSettings: <div>基础设置功能待开放</div>,
    appearance: <div>外观功能待开放</div>,
    general: <div>通用功能功能待开放</div>,
    shortcuts: <div>快捷键功能待开放</div>,
    about: (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <svg
          className="icon"
          height="64"
          p-id="7534"
          t="1735037586493"
          version="1.1"
          viewBox="0 0 1028 1024"
          width="64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M585.473374 295.885775l-240.51966 65.974206 48.843004 180.976182 240.583927-65.974205 49.067938 180.815514-240.583927 63.854395 46.81859 180.976182-240.583927 63.841341-59.672012-216.962752a178.104246 178.104246 0 0 0 36.250667-159.735902c-17.062918-57.48693-59.639878-102.184705-110.700097-121.336304L55.330969 244.793423l483.288669-127.795149z m304.433301-8.483258L811.147331 0 0.001004 215.005617l78.75834 289.555465c46.81859 8.579659 89.427684 44.697775 102.184705 95.790128 14.90997 51.124486-4.273763 102.184705-40.456146 136.246273l76.606395 287.402517 811.180469-217.126432-76.7038-287.402516c-48.939404-8.579659-89.363417-44.697775-104.273386-95.790128-12.753005-51.124486 4.273763-104.333637 42.57696-136.246274z"
            fill="#FF7300"
            p-id="7535"
          ></path>
        </svg>
        <h2 style={{ marginTop: 10 }}>EasyPost</h2>
        <p>
          当前版本：<strong>0.0.1</strong>
        </p>
        <p>© 2025 EasyPost Inc. All rights reserved.</p>
      </div>
    ),
  }

  return (
    <div style={headerStyle}>
      <Button
        ghost
        size={'small'}
        style={{ color: '#666', borderColor: '#f0f0f0', left: 100 }} // 设置文本和边框颜色为白色
        type="default"
        onClick={returnToProject}
      >
        <HomeOutlined /> Home
      </Button>
      <Space size="middle" style={{ position: 'absolute', right: 10 }}>
        <Tooltip title="刷新">
          {loading ? (
            <Spin indicator={<LoadingOutlined spin style={iconStyle} />} />
          ) : (
            <ReloadOutlined style={iconStyle} onClick={handleRefresh} />
          )}
        </Tooltip>
        <Tooltip title="设置">
          <SettingOutlined style={iconStyle} />
        </Tooltip>
        <Tooltip title="通知">
          <BellOutlined style={iconStyle} />
        </Tooltip>

        <Dropdown overlay={menu} trigger={['hover']}>
          <Avatar icon={<UserOutlined />} size={24} style={{ cursor: 'pointer' }} />
        </Dropdown>
      </Space>

      <Modal
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 100 }}>
            <Button key="logout" danger onClick={logout}>
              退出登录
            </Button>
          </div>
        }
        open={modalState.visible}
        style={{ maxWidth: '90vw' }} // 最大宽度不超过视口 90%
        width={800}
        onCancel={() => {
          setModalState({ ...modalState, visible: false })
        }}
      >
        <div style={{ display: 'flex' }}>
          {/* 左侧菜单 */}
          <Menu
            mode="inline"
            selectedKeys={[modalState.tab]}
            style={{ width: 200, borderRight: 0 }}
            onClick={(e) => {
              setModalState({ ...modalState, tab: e.key })
            }}
          >
            <Menu.ItemGroup key="accountInfo" title="账号信息">
              <Menu.Item key="basicSettings" icon={<SettingOutlined />}>
                基本设置
              </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="preferncesSettings" title="偏好设置">
              <Menu.Item key="appearance" icon={<AppstoreOutlined />}>
                外观
              </Menu.Item>
              <Menu.Item key="general" icon={<SettingOutlined />}>
                通用
              </Menu.Item>
              <Menu.Item key="shortcuts" icon={<MailOutlined />}>
                快捷键
              </Menu.Item>
              <Menu.Item key="about" icon={<BellOutlined />}>
                关于EasyPost
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu>

          {/* 右侧内容 */}
          <div style={{ flex: 1, paddingLeft: 16 }}>{content[modalState.tab]}</div>
        </div>
      </Modal>
    </div>
  )
}

export default HeaderPage
