'use client'

import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter,usePathname } from 'next/navigation'
import { Provider as NiceModalProvider } from '@ebay/nice-modal-react'
import { message, Modal } from 'antd'

import { UserProfile } from '@/api/user'
import { MenuHelpersContextProvider } from '@/contexts/menu-helpers'
import { ROUTES } from "@/utils/routes";
import { TeamQueryPage } from "@/api/team";
import { useSession } from "next-auth/react";

type ModalHookApi = ReturnType<typeof Modal.useModal>[0]
type MessageApi = ReturnType<typeof message.useMessage>[0]

interface Team{
  id:string
  teamName:string
}
interface GlobalContextData {
  modal: ModalHookApi
  messageApi: MessageApi
  isLogin: boolean
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
  teams: Team[]
  fetchTeams: () => Promise<Team[]>
  needSetPassword: boolean
  setNeedSetPassword: React.Dispatch<React.SetStateAction<boolean>>
}

const GlobalContext = createContext({} as GlobalContextData)

export function GlobalContextProvider(props: React.PropsWithChildren) {
  const { children } = props
  const router = useRouter()
  const [modal, modalContextHolder] = Modal.useModal()
  const [messageApi, messageContextHolder] = message.useMessage({ duration: 1 })
  const [isLogin, setIsLogin] = useState(false)
  const pathname = usePathname()
  const [teams, setTeams] = useState<Team[]>([]) // 存储菜单数据
  const [needSetPassword, setNeedSetPassword]=useState(false)
  // 获取菜单数据
  const fetchTeams = async () => {
    try {
      const response = await TeamQueryPage({})
      if (response.data.success) {
        setTeams(response.data.data)
        return response.data.data
      } else {
        messageApi.error('团队加载失败')
        return []
      }
    } catch (error) {
      messageApi.error('获取团队失败')
      return  []
    }
  }
  // 使用 useEffect 监听 isLogin 变化
  useEffect(() => {

    // 判断是否登录，并且是否存在 accessToken
    if (localStorage.getItem('accessToken')) {
      // 当 isLogin 为 true 且 accessToken 存在时，触发后端接口请求
      const userProfile = async () => {
        try {
          const response = await UserProfile()
          if (response.data.success) {
            if (response.data.data.teamList && response.data.data.teamList.length > 0) {
              if (pathname.startsWith(ROUTES.LOGIN)){
                router.push(ROUTES.TEAMS(response.data.data.teamList[0].id))
              }
            } else {
              router.push(ROUTES.MAIN)
            }
          } else {
            messageApi.error('用户信息加载失败')
          }
        } catch (error) {
          messageApi.error('请求失败')
        }
      }
      userProfile()

    } else{
      router.push(ROUTES.LOGIN)
    }
  }, [isLogin, messageApi, router,pathname]) // 监听 isLogin 和 router 变化

  return (
    <MenuHelpersContextProvider>
      <NiceModalProvider>
        <GlobalContext.Provider
          value={{
            modal,
            messageApi,
            isLogin,
            setIsLogin, // 正确地传递 setIsLogin
            fetchTeams,
            teams,
            needSetPassword,
            setNeedSetPassword,
          }}
        >
          {children}

          {modalContextHolder}
          {messageContextHolder}
        </GlobalContext.Provider>
      </NiceModalProvider>
    </MenuHelpersContextProvider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
