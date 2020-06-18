import axios from 'axios'
// client列表
export const clientList = apiParams => {
  return axios({
    method: 'get',
    url: 'clientUser/page',
    params: apiParams
  })
}
// 合伙人列表
export const agentList = apiParams => {
  return axios({
    method: 'get',
    url: 'agent/page',
    params: apiParams
  })
}

// 合伙人修改
export const agentUpdata = apiParams => {
  return axios({
    method: 'put',
    url: 'agent/update',
    data: apiParams
  })
}

export const updateFee = apiParams => {
  return axios({
    method: 'put',
    url: 'clientUser/updateFee',
    data: apiParams
  })
}
// 查看多少种会员配置
export const getVipItem = apiParams => {
  return axios({
    method: 'get',
    url: 'feeConfigure/list2',
    params: apiParams
  })
}

// 查看会员详情
export const getVipdetails = apiParams => {
  return axios({
    method: 'get',
    url: 'feeConfigure/detail',
    params: apiParams
  })
}

// 合伙人添加
export const agentAdd = apiParams => {
  return axios({
    method: 'post',
    url: 'agent/save',
    data: apiParams
  })
}

// 合伙人删除
export const agentRemove = apiParams => {
  return axios({
    method: 'delete',
    url: 'agent/remove',
    params: apiParams
  })
}

// user黑名单或解除黑名单
export const userBlack = apiParams => {
  return axios({
    method: 'post',
    url: 'clientUser/realNameExamine',
    params: apiParams
  })
}