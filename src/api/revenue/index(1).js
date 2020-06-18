import axios from 'axios'
// 会员配置列表
export const vipConfigurationList = apiParams => {
  return axios({
    method: 'get',
    url: 'feeConfigure/memberPage',
    params: apiParams
  })
}

// 会员和合伙人修改配置
export const vipConfigurationUpload = apiParams => {
  return axios({
    method: 'put',
    url: 'feeConfigure/update',
    data: apiParams
  })
}

// 删除会员或合伙人配置
export const vipConfigurationDelete = apiParams => {
  return axios({
    method: 'DELETE',
    url: 'feeConfigure/remove',
    params: apiParams
  })
}

// 新增会员或代理配置
export const vipConfigurationAdd = apiParams => {
  return axios({
    method: 'post',
    url: 'feeConfigure/save',
    data: apiParams
  })
}
// 合伙人列表

// 合伙人列表
export const agentConfigurationList = apiParams => {
  return axios({
    method: 'get',
    url: 'feeConfigure/agentPage',
    params: apiParams
  })
}

// // 合伙人修改配置
// export const agentConfigurationUpload = apiParams => {
//   return axios({
//     method: 'put',
//     url: 'feeConfigure/update',
//     data: apiParams
//   })
// }

// // 删除合伙人配置
// export const agentConfigurationDelete = apiParams => {
//   return axios({
//     method: 'DELETE',
//     url: 'feeConfigure/remove',
//     params: apiParams
//   })
// }

// // 新增合伙人配置
// export const agentConfigurationAdd = apiParams => {
//   return axios({
//     method: 'post',
//     url: 'feeConfigure/save',
//     data: apiParams
//   })
// }