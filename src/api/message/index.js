import axios from 'axios'
// 发送短信通知
export const sendMessage = apiParams => {
  return axios({
    method: 'post',
    url: 'pushRecord/save',
    data: apiParams
  })
}
// tuisong列表
export const getList = apiParams => {
  return axios({
    method: 'get',
    url: 'pushRecord/page',
    params: apiParams
  })
}

// 删除
export const messageDelete = apiParams => {
  return axios({
    method: 'delete',
    url: 'pushRecord/remove',
    params: apiParams
  })
}