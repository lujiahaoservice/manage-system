import axios from 'axios'
// 登录列表
export const getRecords = apiParams => {
  return axios({
    method: 'get',
    url: 'loginInfo/page',
    params: apiParams
  })
}
// 登录列表
export const removeRecord = apiParams => {
  return axios({
    method: 'delete',
    url: 'loginInfo/remove',
    params: apiParams
  })
}
// 后台操作列表
export const backHandleRecords = apiParams => {
  return axios({
    method: 'get',
    url: 'operLog/page',
    params: apiParams
  })
}
// 后台操作删除
export const removeHandleRecord = apiParams => {
  return axios({
    method: 'delete',
    url: 'operLog/remove',
    params: apiParams
  })
}
// 短信发送记录
export const shortMessageList = apiParams => {
  return axios({
    method: 'get',
    url: 'smsLog/page',
    params: apiParams
  })
}
// 短信发送记录删除
export const shortMessageListRemove = apiParams => {
  return axios({
    method: 'delete',
    url: 'smsLog/remove',
    params: apiParams
  })
}