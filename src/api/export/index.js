import axios from 'axios'


// 用户导出
export const userExport = apiParams => {
  return axios({
    method: 'get',
    url: 'finance/ClientUser/income/export',
    params: apiParams
  })
}

// 合伙人导出
export const agentExport = apiParams => {
  return axios({
    method: 'get',
    url: 'finance/agent/income/export',
    params: apiParams
  })
}

// 平台导出
export const platformExport = apiParams => {
  return axios({
    method: 'get',
    url: 'finance/platform/income/export',
    params: apiParams
  })
}

// 后台操作导出
export const backhandleExport = apiParams => {
  return axios({
    method: 'post',
    url: 'operLog/export',
    data: apiParams
  })
}

// 登录导出
export const loginExport = apiParams => {
  return axios({
    method: 'post',
    url: 'loginInfo/export',
    data: apiParams
  })
}

// 短信导出
export const msgExport = apiParams => {
  return axios({
    method: 'post',
    url: 'smsLog/export',
    data: apiParams
  })
}

// 导出文件
export const downloadFile = (apiParams) => {
  return axios({
    method: 'get',
    url: 'common/download',
    params: apiParams
  })
}
