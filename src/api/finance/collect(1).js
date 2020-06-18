import axios from 'axios'

// 获取记录
export const incomeList = (apiParams) => {
  return axios({
    method: 'get',
    url: 'account/income/review/list',
    params: apiParams
  })
}

// 获取详情
export const incomeDetail = (apiParams) => {
  return axios({
    method: 'get',
    url: 'account/income',
    params: apiParams
  })
}

// 添加收款记录
export const addIncome = apiParams => {
  return axios({
    method: 'post',
    url: 'account/income/add',
    data: apiParams
  })
}

// 查看详情
export const getDetail = apiParams => {
  return axios({
    method: 'get',
    url: 'account/income',
    params: apiParams
  })
}

// 获取公司列表接口
export const companyList = apiParams => {
  return axios({
    method: 'get',
    url: 'serveCompany/list',
    params: apiParams
  })
}

// 获取公司列表接口
export const accountList = apiParams => {
  return axios({
    method: 'get',
    url: 'serveAccount/list',
    params: apiParams
  })
}

// 获取付款客户列表接口
export const customerList = apiParams => {
  return axios({
    method: 'get',
    url: 'taskBase/list',
    params: apiParams
  })
}

// 获取付款产品列表接口
export const productList = apiParams => {
  return axios({
    method: 'get',
    url: 'taskProduct/list',
    params: apiParams
  })
}

// 收款记录导出
export const exportList = apiParams => {
  return axios({
    method: 'get',
    url: `account/income/export?type=${apiParams.type}`
    // params: apiParams
  })
}

// 收款记录导出
export const receivableIncoming = apiParams => {
  return axios({
    method: 'get',
    url: 'receivableIncoming/get',
    params: apiParams
  })
}

// 审核
export const confirm = apiParams => {
  return axios({
    method: 'put',
    url: 'account/income/review',
    data: apiParams
  })
}



