import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'

// 创建一个自定义的请求函数
export function request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    console.log("请求配置", config);
    // 使用axios.create生成自定义实例，并发送请求
    const axiosInstance = axios.create(config);

    // 发起请求并返回 Promise
    return axiosInstance(config);
}