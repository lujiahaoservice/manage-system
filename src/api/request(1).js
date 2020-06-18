import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import store from '@/store'
//import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create()
// 环境的切换
if (process.env.NODE_ENV == 'development') {
  service.defaults.baseURL = process.env.VUE_APP_BASE_API
} else if (process.env.NODE_ENV === 'debug') {
  service.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'production') {
  // service.defaults.baseURL = 'http://134.98.104.113:8080';
  service.defaults.baseURL = 'https://tlshs.18weiquan.com'
}
// 请求超时时间
service.defaults.timeout = 30000
// 请求头
service.defaults.headers = {
  'Content-Type': 'application/json;charset-UTF-8'
}

// 请求拦截
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    return Promise.resolve(response.data);
  },
  error => {
    // 状态码判断
    Message.close()
    switch (error.response.status) {
      /**
       * 以下状态码为后台给的约束
      */
      // 401: 身份信息过期
      case 401:
        Message.error('身份信息过期,请重新登录');
        // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        setTimeout(() => {
          store.dispatch('user/logout')
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
        }, 1000)
        break
      // 403: 密码错误
      case 403:
        break
      // 404请求不存在
      case 404:
        Message.error('请求' + error.response.config.url + '接口不存在')
        break
      default:
        Message.error(error.response.data.msg || error.response.config.url + '接口请求错误')
    }
    return Promise.reject(error.response.data)
  }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const get = (url, params) => service.get(url, { params })
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const post = (url, params) => service.post(url, params)

/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const put = (url, params) => service.put(url, params)

/**
 * delete方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const del = (url, params) => service.delete(url, { params })
