import axios from 'axios'

// 获取记录
export const receivableList = apiParams => {
  return axios({
    method: 'get',
    url: 'receivableIncoming/list',
    params: apiParams
  })
}