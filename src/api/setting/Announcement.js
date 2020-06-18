import axios from 'axios'

// 增加公告
export const addannouncement = apiParams => {
  return axios({
    method: 'post',
    url: 'announcement/add',
    params: apiParams
  })
}