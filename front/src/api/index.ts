import { redirect } from 'next/navigation'
import { message, Spin } from 'antd'
import axios, { type AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'
import { ROUTES } from '@/utils/routes'

// 定义响应数据类型
interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  [key: string]: any;
}

const request: AxiosInstance = axios.create({
  baseURL: '/app',
  timeout: 10000,
})

// 错误处理函数（使用类型断言）
const errorHandler = (error: AxiosError<ApiResponse>) => {
  if (!error.response) {
    showMessage('error', 'Network or timeout error')
    hideLoading()
    return Promise.reject(error)
  }

  const { status, data } = error.response

  // 现在可以安全访问 data.message
  const errorMessage = data?.message ||
    (status === 401 ? 'Token已过期，请重新登录' :
      status === 500 ? '系统内部错误' :
        status === 400 ? 'Bad request' :
          status === 404 ? '资源未找到' :
            `Request failed with status: ${status}`)

  showMessage('error', errorMessage)

  if (status === 401) {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('accessToken')) {
      localStorage.removeItem('accessToken')
    }
    redirect(ROUTES.LOGIN)
  }

  hideLoading()
  return Promise.reject(error)
}

// 请求拦截器（添加类型）
request.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    const path = window.location.pathname
    if (path.startsWith('/project')) {
      const projectId = path.split('/')[2]
      config.headers['X-Project-Id'] = projectId || ''
    }
    if (path.startsWith('/main/teams')) {
      const teamId = path.split('/')[3]
      config.headers['X-Team-Id'] = teamId || ''
    }
  }

  showLoading()
  return config
}, (error) => errorHandler(error))

// 响应拦截器（添加类型）
request.interceptors.response.use((response: AxiosResponse<ApiResponse>) => {
  hideLoading()
  if (response.data.success === false) {
    showMessage('error', response.data.message || 'Request failed')
    return Promise.reject(response)
  }
  return response
}, (error) => errorHandler(error))

// 消息工具函数
const showMessage = (type: 'success' | 'error', content: string) => {
  message[type](content)
}

const showLoading = () => {
  message.loading({ content: '', key: 'global_loading', duration: 0 })
}

const hideLoading = () => {
  message.destroy('global_loading')
}

export default request