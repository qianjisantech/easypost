import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

// 创建自定义请求函数
export function request(config: Record<string, any>): Promise<AxiosResponse> {
  // 配置跨域请求（可根据需求进行修改）
  const axiosInstance = axios.create({
    ...config,
    // 默认允许跨域请求携带 Cookies，若服务器支持
    withCredentials: true,
    timeout: 5000,
  })

  // 设置必要的请求头，防止跨域请求时没有授权
  if (config.headers) {
    // 如果需要认证信息，可以设置Authorization
    const token = localStorage.getItem('accessToken')
    if (token)
    config.headers['Authorization'] = config.headers['Authorization'] || `Bearer ${token}`
    config.headers['Authorization'] = `Bearer ${token}` // 添加 Authorization header
  }

  // 返回请求结果
  return axiosInstance(config)
}
