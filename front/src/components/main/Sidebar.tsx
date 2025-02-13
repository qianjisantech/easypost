import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import { useRouter } from 'next/navigation'
import { AppstoreAddOutlined, PlusOutlined } from '@ant-design/icons'
import { Input, Menu, Modal } from 'antd'

import { TeamCreate } from '@/api/team'
import { UserProfile } from '@/api/user'
import { ROUTES } from '@/utils/routes'
import { useGlobalContext } from "@/contexts/global";

const sidebarStyle = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  width: 200,
  backgroundColor: '#fff',
  borderRight: '1px solid #ddd',
}

const logoStyle = {
  textAlign: 'center',
  padding: '20px',
}
const Sidebar = forwardRef((props, ref) => {
  const router = useRouter()
  const [teams, setTeams] = useState([])
  const [teamName, setTeamName] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const { messageApi } = useGlobalContext()
  // API 请求函数：获取团队列表
  const fetchUserProfile = async () => {
    try {
      const response = await UserProfile()
      if (response.data.success) {
        setTeams(response.data.data.teamList)
      }
    } catch (error) {
      messageApi.error('获取团队列表失败')
    }
  }
  // 预加载目标路由

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await UserProfile()
      if (response.data.success) {
        setTeams(response.data.data.teamList)
      }
    }

    fetchUserProfile()
  }, [])

  useImperativeHandle(ref, () => ({
    fetchUserProfile,
    handleMenuItemClick,
  }))

  const handleCreateTeamClick = () => {
    setModalVisible(true)
  }

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      messageApi.error('团队名称不能为空')
      return
    }
    try {
      const response = await TeamCreate({ teamName })
      if (response.data.success) {
        messageApi.success(response.data.message)
        setTeamName('')
        setModalVisible(false)

        // 重新加载团队列表
        await fetchUserProfile()
        console.log('teams.length',teams.length)
        // 跳转到新创建的团队
        if (teams.length > 0) {
          handleMenuItemClick(teams[0].id) // 跳转到新创建的团队
        }
      }
    } catch (error) {
      messageApi.error('创建团队失败')
    }
  }


  const handleMenuItemClick = (teamId) => {
    router.replace(ROUTES.TEAMS(teamId))
  }

  return (
    <div style={sidebarStyle}>
      {/* Logo */}
      <div style={logoStyle}>
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
      </div>

      {/* Main Menu */}
      <Menu defaultSelectedKeys={['1']} mode="inline" style={{ flexGrow: 1, borderRight: 0 }}>
        <Menu.SubMenu key="1" icon={<AppstoreAddOutlined />} title="我的组织">
          <Menu.Item
            icon={<PlusOutlined />}
            style={{ color: 'rgb(147, 115, 238)' }}
            onClick={handleCreateTeamClick}
          >
            新建团队
          </Menu.Item>
          {teams.length > 0 &&
            teams.map((team) => (
              <Menu.Item
                key={team.id}
                style={{ marginBottom: 5 }}
                onClick={() => {
                  handleMenuItemClick(team.id)
                }}
              >
                {team.teamName}
              </Menu.Item>
            ))}
        </Menu.SubMenu>
      </Menu>

      {/* 自定义 Modal */}
      <Modal
        cancelText="取消"
        okText="新建"
        open={modalVisible}
        title="新建团队"
        width={400}
        onCancel={() => {
          setModalVisible(false)
        }}
        onOk={handleCreateTeam}
      >
        <Input
          placeholder="请输入团队名称"
          value={teamName}
          onChange={(e) => {
            setTeamName(e.target.value)
          }}
        />
      </Modal>
    </div>
  )
})

export default Sidebar
