import axios from 'axios';
import { getToken } from '@/composables/auth';
import { toast } from '@/composables/util';

// 创建实例时配置默认值
const instance = axios.create({
  baseURL: '/api'
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.token = token;
    }
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data.data;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    toast(error.response.data.msg || '请求失败', 'error');
    return Promise.reject(error);
  }
);

export default instance;
