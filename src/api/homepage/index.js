import axios from 'axios'
// 新增的接口
// 当日用户数量
export const getClientNumber = apiParams => {
  return axios({
    method: 'get',
    url: 'analysis/ClientUsers/new',
    params: apiParams
  })
}
// 会员及详情页访问数量
export const getDetailsPageNumber = apiParams => {
  return axios({
    method: 'get',
    url: 'analysis/uv',
    params: apiParams
  })
}
// 订单数量
export const getOrderNumber = apiParams => {
  return axios({
    method: 'get',
    url: 'analysis/orders/count',
    params: apiParams
  })
}
// 流水
export const getTradeNumber = apiParams => {
  return axios({
    method: 'get',
    url: 'analysis/platform/amount',
    params: apiParams
  })
}


// 获取客户和款项
export const getaccountClient = apiParams => {
  return axios({
    method: 'get',
    url: 'homePage/accountClient',
    params: apiParams
  })
}

// 商机数
export const getbusiness = apiParams => {
  return axios({
    method: 'get',
    url: 'homePage/totalBusiness',
    params: apiParams
  })
}
// 查询今日营收
export const getaccountnum = apiParams => {
  return axios({
    method: 'get',
    url: 'homePage/accountNumber',
    params: apiParams
  })
}

// 查询客户数
export const getnumber = apiParams => {
  return axios({
    method: 'get',
    url: 'homePage/number',
    params: apiParams
  })
}

// 营收统计图
export const getrevenueView = apiParams => {
  return axios({
    method: 'get',
    url: 'homePage/revenueView',
    params: apiParams
  })
}

// 商机折线图
export const getbusinessView = apiParams => {
  return axios({
    method: 'get',
    url: 'homePage/businessView',
    params: apiParams
  })
}

// 新增客户统计图
export const getcustomer = apiParams => {
  return axios({
    method: 'get',
    url: 'homePage/customerNewView',
    params: apiParams
  })
}

// 代账客户流失统计图
export const getcustomerchurn = apiParams => {
  return axios({
    method: 'get',
    url: 'homePage/customerView',
    params: apiParams
  })
}

// 支出统计图
export const getexpenditure = apiParams => {
  return axios({
    method: 'get',
    url: 'homePage/expenditureView',
    params: apiParams
  })
}

// // 内部公告
// export const getannouncement = apiParams => {
//   return axios({
//     method: 'get',
//     url: 'announcement/list',
// 获取付款产品列表接口
export const announceList = apiParams => {
  return axios({
    method: 'get',
    url: '/announcement/list',
    params: apiParams
  })
}