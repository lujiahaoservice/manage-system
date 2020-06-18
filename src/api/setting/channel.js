// 渠道设置
import axios from 'axios'
// 获取渠道商列表
export const getChannellist = apiParams => {
  return axios({
    method: 'get',
    url: 'channel/get',
    params: apiParams
  })
}
// 增加渠道商
export const addChanel = apiParams => {
  return axios({
    method: 'post',
    url: 'channel/add',
    data: apiParams
  })
}
// 修改渠道信息
export const changechannel = apiParams => {
  return axios({
    method: 'put',
    url: 'channel/update',
    data: apiParams
  })
}
// 修改渠道商状态
export const changechannelstatus = apiParams => {
  return axios({
    method: 'put',
    url: 'channel/update/status',
    params: apiParams
  })
}