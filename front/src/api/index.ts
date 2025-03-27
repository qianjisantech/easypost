import { redirect } from 'next/navigation'
import { message, Spin } from 'antd'
import axios, { type AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'
import { ROUTES } from '@/utils/routes'

const request: AxiosInstance = axios.create({
  baseURL: '/api', // API的基础URL
  timeout: 10000, // 请求超时
})

// 创建一个全局消息提示的组件
const showMessage = (type: 'success' | 'error', content: string) => {
  message[type](content) // 通过 message 展示不同类型的消息
}

// 错误处理函数
const errorHandler = (error: AxiosError) => {
  if (!error.response) {
    // 网络错误或请求超时
    showMessage('error', 'Network or timeout error')
    hideLoading()
    return Promise.reject(error)
  }

  const { status, data } = error.response

  // 根据 HTTP 状态码显示不同的错误信息
  if (status === 401) {
    showMessage('error', 'Token已过期，请重新登录')
    if (localStorage.getItem('accessToken')) {
      localStorage.removeItem('accessToken')
    }
    // 清除 Token 或重定向到登录页面
    redirect(ROUTES.LOGIN)
  } else if (status === 500) {
    showMessage('error', data.message || '系统内部错误')
  } else if (status === 400) {
    showMessage('error', data.message || 'Bad request')
  } else if (status === 404) {
    showMessage('error', '资源未找到，请联系管理员')
  } else {
    showMessage('error', `Request failed with status: ${status}`)
  }

  hideLoading()
  return Promise.reject(error)
}

// 请求拦截器
request.interceptors.request.use((config) => {

  console.log('pathname', window.location.pathname)
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}` // 添加 Authorization header

  }
  if (typeof window !== 'undefined') {
     if (window.location.pathname.startsWith('/project')){
       const pathSegments = window.location.pathname.split('/')
       const projectId = pathSegments[2] // 对于 "/project/22" 会得到 "22"

       config.headers['X-Project-Id'] = projectId || 'default'
     }
    if (window.location.pathname.startsWith('/main/teams')){
      const pathSegments = window.location.pathname.split('/')
      const teamId = pathSegments[3] // 对于 "/project/22" 会得到 "22"

      config.headers['X-Team-Id'] = teamId || 'default'
    }
  }
  // 显示全局 loading
  showLoading()

  return config
}, errorHandler)

// 响应拦截器
request.interceptors.response.use((response: AxiosResponse) => {
  hideLoading()
  // 判断响应中的业务逻辑，如果有错误则显示消息
  if (response.data.success === false) {
    showMessage('error', response.data.message || 'Request failed')
  } else {
    // 请求成功后可以选择显示成功提示
    // showMessage('success', response.data.message || "请求成功")
    return response
  }
}, errorHandler)

// 显示全局loading
const showLoading = () => {
  message.loading({ content: '', key: 'global_loading', duration: 0 }) // duration: 0 表示持续显示，直到手动隐藏
}

// 隐藏全局loading
const hideLoading = () => {
  message.destroy('global_loading') // 隐藏 loading
}

export default request
