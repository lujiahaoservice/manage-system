import axios from 'axios'
// 获取app所有用户
export const pushList = apiParams => {
  return axios({
    method: 'get',
    url: 'messagePush/user',
    params: apiParams
  })
}

// 单推
export const pushOne = apiParams => {
  return axios({
    method: 'post',
    url: 'messagePush/onePush',
    data: apiParams
  })
}

// 全推
export const pushAll = apiParams => {
  return axios({
    method: 'post',
    url: 'messagePush/manyPush',
    data: apiParams
  })
}