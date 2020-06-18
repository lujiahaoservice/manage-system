import axios from 'axios'

/**
 * Author: sz
 * 因为params是添加到url的请求字符串中的，用于get请求。 
 * 而data是添加到请求体（body）中的， 
 */

// 登录
export const userLogin = apiParams => {
  return axios({
    method: 'get',
    url: 'user/login',
    params: apiParams
  })
}