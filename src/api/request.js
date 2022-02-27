import axios from 'axios'
import { ElMessage } from 'element-ui'
// eslint-disable-next-line import/no-cycle
// import router from '../router'
// eslint-disable-next-line import/no-cycle
// import store from '../store'
// 创建axios的一个实例
const instance = axios.create({
  baseURL: '/', // 接口统一域名
  timeout: 12000 // 设置超时
})
// ------------------- 一、请求拦截器 忽略
instance.interceptors.request.use((config) => {
  if (localStorage.getItem('token')) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Token = localStorage.getItem('token');
    // eslint-disable-next-line no-param-reassign
    config.headers.Username = encodeURIComponent(localStorage.getItem('username'))
  }
  return config
}, (error) => Promise.reject(error));

// ----------------- 二、响应拦截器 忽略
// eslint-disable-next-line consistent-return
instance.interceptors.response.use((response) => {
  if (response.data.code === 400) {
    // localStorage.clear()
    // store.commit('setLogin', { token: '', username: '' })
    // store.commit('setUpdate', true)
    ElMessage({
      message: '登录超时',
      duration: 2000,
      type: 'error'
    })
    // router.replace('/competitionRule')
  }
  return response.data
}, (error) => Promise.reject(error));

/**
 * 使用es6的export default导出了一个函数，导出的函数代替axios去帮我们请求数据，
 * 函数的参数及返回值如下：
 * @param {String} method  请求的方法：get、post、delete、put
 * @param {String} url     请求的url:
 * @param {Object} data    请求的参数
 * @returns {Promise}     返回一个promise对象，其实就相当于axios请求数据的返回值
 */
export default function (method, url, data = null) {
  // eslint-disable-next-line no-param-reassign
  method = method.toLowerCase();
  if (method === 'post') {
    return instance.post(url, data)
  } if (method === 'get') {
    return instance.get(url, { params: data })
  } if (method === 'delete') {
    return instance.delete(url, { params: data })
  } if (method === 'put') {
    return instance.put(url, data)
  }
  console.error(`未知的method${method}`)
  return false
}
