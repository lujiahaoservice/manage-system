import axios from 'axios'

// 获取用户详情
export const users = apiParams => {
  return axios({
    method: 'get',
    url: 'user/detail',
    params: apiParams
  })
}

// 修改
export const userUptade = apiParams => {
  return axios({
    method: 'put',
    url: 'user/update',
    data: apiParams
  })
}