import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store/modules/user';
import router from '@/router/';
import CryptoJS from 'crypto-js';

let baseURL = '/api';
const request = axios.create({
  baseURL: baseURL,
});

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    const userStore = useUserStore();
    if (userStore.user && userStore.user.token) {
      config.headers && (config.headers.Authorization = `Bearer ${userStore.user.token}`);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  function (response) {
    debugger;
    const status = response.data.status;
    // 请求正常情况
    if (!status || status === 200) {
      return response;
    }

    // 登录失效
    if (status === 410000) {
      store.commit('setUser', null);
      router.push({
        name: 'login',
        query: {
          redirect: router.currentRoute.value.fullPath,
        },
      });
      // 在内部消化掉这个业务异常 阻止往下执行
      return Promise.reject(response);
    }

    // 其他异常情况
    ElMessage.error(response.data.msg || '请求失败，请联系管理员');
    // 手动返回一个Primise异常
    return Promise.reject(response);
    // if (response.data.status && response.data.status !== 200) {
    //   ElMessage.error(response.data.msg || '请求失败，请联系管理员')
    //   return Promise.reject(response.data)
    // }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default (config) => {
  return request(config).then((response) => {
    if (typeof response !== 'object') return {};
    return response.data?.data || response.data;
  });
};
