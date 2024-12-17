import axios from 'axios';

// 获取后端 API 基础 URL（通过 Next.js 环境变量）
// 创建 axios 实例
const request = axios.create({
    baseURL: '/api/', // 使用环境变量的 baseURL
    timeout: 10000,   // 请求超时时间 10 秒
});

// 错误处理函数
const errorHandler = async (error) => {
    if (!error.response) {
        // 如果没有响应，可能是网络错误或请求超时
        console.error("Network or timeout error: ", error);
        return Promise.reject(error);
    }

    const { status, data } = error.response;

    // 可以根据 status 码来进行不同的错误处理
    if (status === 401) {
        // 处理 401 错误，例如访问令牌失效
        console.error('Unauthorized access - Token might be expired');
        // 例如，可以清除 token 或者跳转到登录页面
        localStorage.removeItem('access_token');
    } else if (status === 500) {
        // 处理 500 错误 - 服务端错误
        console.error('Internal server error', data);
    } else {
        // 其他错误
        console.error('Request failed with status: ', status, data);
    }

    return Promise.reject(error);
};

// 请求拦截器
request.interceptors.request.use(
    (config) => {
        // 可以在请求头中加入认证 token
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    errorHandler
);

// 响应拦截器
request.interceptors.response.use(
    (response) => {
        // 你可以在这里进行一些全局数据的处理，例如统一处理响应数据格式
        return response;
    },
    errorHandler
);

export default request;
