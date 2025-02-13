'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()

  const checkAccessToken = () => {
    const access_token = localStorage.getItem('access_token')
    if (!access_token) {
      router.push('/login')
      console.log('没有获取到access_token：', access_token)
    } else {
      console.log('获取到access_token：', access_token)
      console.log('成功跳转路由：', access_token)
      router.push('/main')
    }
  }

  useEffect(() => {
    // 初次加载时检查token
    checkAccessToken()

    // 监听localStorage变化 (跨标签页更新)
    const handleStorageChange = () => {
      checkAccessToken()
    }

    window.addEventListener('storage', handleStorageChange)

    // 清理监听器
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [router])

  return null
}
