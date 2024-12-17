import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// 创建自定义请求函数
export function request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    // 配置跨域请求（可根据需求进行修改）
    const axiosInstance = axios.create({
        ...config,
        // 默认允许跨域请求携带 Cookies，若服务器支持
        withCredentials: true,
    });

    // 设置必要的请求头，防止跨域请求时没有授权
    if (config.headers) {
        config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json';
        // 如果需要认证信息，可以设置Authorization
        config.headers['Authorization'] = config.headers['Authorization'] || 'Bearer your-token';
    }

    console.log('axiosInstance(config)',axiosInstance(config))
    // 返回请求结果
    return axiosInstance(config);
}
