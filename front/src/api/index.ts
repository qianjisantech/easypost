import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { message } from 'antd';

const request: AxiosInstance = axios.create({
    baseURL: '/api/', // API的基础URL
    timeout: 10000,   // 请求超时
});

// 创建一个全局消息提示的组件
const showMessage = (type: 'success' | 'error', content: string) => {
    message[type](content); // 通过 message 展示不同类型的消息
};

// 错误处理函数
const errorHandler = (error: AxiosError) => {
    if (!error.response) {
        // 网络错误或请求超时
        showMessage('error', 'Network or timeout error');
        return Promise.reject(error);
    }

    const { status, data } = error.response;

    // 根据 HTTP 状态码显示不同的错误信息
    if (status === 401) {
        showMessage('error', 'Unauthorized access - Token might be expired');
        // 清除 Token 或重定向到登录页面
        localStorage.removeItem('access_token');
    } else if (status === 500) {
        showMessage('error', 'Internal server error');
    } else if (status === 400) {
        showMessage('error', data.message || 'Bad request');
    } else if (status === 404) {
        showMessage('error', 'Resource not found');
    } else {
        showMessage('error', `Request failed with status: ${status}`);
    }

    return Promise.reject(error);
};

// 请求拦截器
request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // 添加 Authorization header
        }
        return config;
    },
    errorHandler
);

// 响应拦截器
request.interceptors.response.use(
    (response: AxiosResponse) => {
        // 判断响应中的业务逻辑，如果有错误则显示消息
        if (response.data.code !== '200') {
            showMessage('error', response.data.message || 'Request failed');
        } else {
            // showMessage('success', 'Request successful');
        }
        return response;
    },
    errorHandler
);

export default request;
