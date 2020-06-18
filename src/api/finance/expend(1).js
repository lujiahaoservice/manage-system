import axios from 'axios'

// 获取记录
export const expendList = (apiParams) => {
  return axios({
    method: 'get',
    url: 'account/expense/list',
    params: apiParams
  })
} 

// 获取详情
export const detailList = (apiParams) => {
  return axios({
    method: 'get',
    url: 'account/expense',
    params: apiParams
  })
} 

// 获取所有子类目
export const category = (apiParams) => {
  return axios({
    method: 'get',
    url: 'category/allCategory',
    params: apiParams
  })
} 

// 获取taskBase
export const taskBase = (apiParams) => {
  return axios({
    method: 'get',
    url: 'taskBase/list',
    params: apiParams
  })
} 

// 获取taskProduct
export const taskProduct = (apiParams) => {
  return axios({
    method: 'get',
    url: 'taskProduct/list',
    params: apiParams
  })
} 

// 添加
export const addExpend = (apiParams) => {
  return axios({
    method: 'post',
    url: 'account/expense/add',
    data: apiParams
  })
} 

// 导出
export const exportList = (apiParams) => {
  return axios({
    method: 'get',
    url: `account/expense/export?type=${apiParams.type}`
  })
} 

// 审核
export const confirm = apiParams => {
  return axios({
    method: 'put',
    url: 'account/expense/review',
    data: apiParams
  })
}