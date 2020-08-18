import axios from 'axios';
import store from './store';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});
instance.interceptors.request.use((config) => {
  if (config.url.indexOf('/passport') === -1) {
    return {
      ...config.data,
      appkey: store.state.user.appkey,
    };
  }
  return config;
}, (error) => Promise.reject(error));
instance.interceptors.response.use((response) => {
  console.log(response.data.status === 'fail', response);
  if (response.data.status === 'fail') {
    return Promise.reject(response.data.msg);
  }
  // 对响应数据做点什么
  return response.data.data;
}, (error) => Promise.reject(error));
export default instance;
