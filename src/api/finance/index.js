import axios from 'axios'

// 获取用户收支明细
export const clientIncome = (apiParams) => {
  return axios({
    method: 'get',
    url: 'finance/ClientUser/income',
    params: apiParams
  })
} 

// 获取用户报表
export const clientForm = (apiParams) => {
  return axios({
    method: 'get',
    url: 'finance/ClientUser/statement',
    params: apiParams
  })
} 

// 获取合伙人收支明细
export const agentIncome = (apiParams) => {
  return axios({
    method: 'get',
    url: 'finance/agent/income',
    params: apiParams
  })
} 

// 获取合伙人报表
export const agentForm = (apiParams) => {
  return axios({
    method: 'get',
    url: 'finance/agent/statement',
    params: apiParams
  })
} 

// 获取平台收支明细
export const platformIncome = (apiParams) => {
  return axios({
    method: 'get',
    url: 'finance/platform/income',
    params: apiParams
  })
} 

// 获取平台报表
export const platformForm = (apiParams) => {
  return axios({
    method: 'get',
    url: 'finance/platform/statement',
    params: apiParams
  })
} 

// 获取平台余额
export const platformBalance = (apiParams) => {
  return axios({
    method: 'get',
    url: 'finance/platform/balance',
    params: apiParams
  })
} 

// 报表导出
export const exportTable = (apiParams) => {
  return axios({
    method: 'get',
    url: 'finance/platform/balance',
    params: apiParams
  })
} 