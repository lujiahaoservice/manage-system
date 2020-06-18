import axios from 'axios'

// 获取通知列表
export const getnewslist = apiParams => {
  return axios({
    method: 'get',
    url: 'notification/getAll',
    params: apiParams
  })
}