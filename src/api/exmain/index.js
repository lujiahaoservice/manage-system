import axios from 'axios'


// 用户提现列表
export const withDrawalList = apiParams => {
  return axios({
    method: 'get',
    url: 'cashRecord/memberPage',
    params: apiParams
  })
}

// 用户提现状态更改
export const withDrawalUpdata = apiParams => {
  return axios({
    method: 'put',
    url: 'cashRecord/update',
    data: apiParams
  })
}

// 合伙人提现列表
export const agentwithDrawalList = apiParams => {
  return axios({
    method: 'get',
    url: 'cashRecord/agentPage',
    params: apiParams
  })
}

// 实名认证列表
export const realNameList = apiParams => {
  return axios({
    method: 'get',
    url: 'clientUser/realName',
    params: apiParams
  })
}

// 实名认证状态更改
export const realNameUpdata = apiParams => {
  return axios({
    method: 'post',
    url: 'clientUser/update',
    params: apiParams
  })
}

// 取消待审核列表
export const posterCancelList = apiParams => {
  return axios({
    method: 'get',
    url: 'task/pageOrder',
    params: apiParams
  })
}

// 取消待审核操作
export const posterCancelExmain = apiParams => {
  return axios({
    method: 'put',
    url: 'taskOrder/checkCancel',
    data: apiParams
  })
}





