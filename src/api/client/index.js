import axios from 'axios'

/**
 * Author: sz
 * 因为params是添加到url的请求字符串中的，用于get请求。 
 * 而data是添加到请求体（body）中的， 
 */

// 新建客户
export const addClient = apiParams => {
  return axios({
    method: 'post',
    url: '/customer/add',
    data: apiParams
  })
}

//查询部门列表
export const getTreeList = apiParams => {
  return axios({
    method: 'get',
    url: 'dept/tree',
    params: apiParams
  })
}

//通过部门id查询用户列表
export const departmentUser = apiParams => {
  return axios({
    method: 'get',
    url: 'user/list',
    params: apiParams
  })
}

//客户来源
export const clientSource = apiParams => {
  return axios({
    method: 'get',
    url: '/channel/get',
    params: apiParams
  })
}

//概况列表
export const profilingApiList = apiParams => {
  return axios({
    method: 'get',
    url: '/customer/list',
    params: apiParams
  })
}

//批量删除 暂时不用
// export const logicRemove = apiParams => {
//   return axios({
//     method: 'delete',
//     url: '/customer/remove',
//     params: apiParams
//   })
// }

//客户详情
export const customerDetailsApi = apiParams => {
  return axios({
    method: 'get',
    url: '/customer/',
    params: apiParams
  })
}

//客户详情信息里的steps
export const detailsStepApi = apiParams => {
  return axios({
    method: 'get',
    url: '/bookkeeping/list',
    params: apiParams
  })
}


//添加代帐期
export const addAccountperiodApi = apiParams => {
  return axios({
    method: 'patch',
    url: '/customer/renew',
    data: apiParams
  })
}

//添加记账
export const beginAccountApi = apiParams => {
  return axios({
    method: 'post',
    url: '/bookkeeping/add',
    data: apiParams
  })
}

//查看记账
export const checkAccountApi = apiParams => {
  return axios({
    method: 'get',
    url: 'bookkeeping/',
    params: apiParams
  })
}


//发布客户动态
export const dynamicApi = apiParams => {
  return axios({
    method: 'post',
    url: '/customer/post/add',
    data: apiParams
  })
}

//查看客户动态
export const checkDynamicApi = apiParams => {
  return axios({
    method: 'get',
    url: '/customer/post/list',
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

// 获取公司列表接口
export const companyList = apiParams => {
  return axios({
    method: 'get',
    url: 'serveCompany/list',
    params: apiParams
  })
}

//公告列表接口
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

// 客户资料上传接口
export const dataUploadApi = apiParams => {
  return axios({
    method: 'post',
    url: '/customerProfiles/digital/upload',
    data: apiParams
  })
}

//客户索要资料
export const demandApi = apiParams => {
  return axios({
    method: 'post',
    url: '/customerProfiles/ask',
    data: apiParams
  })
}

//客户资料列表
export const clientDataApi = apiParams => {
  return axios({
    method: 'get',
    url: '/customerProfiles/list',
    params: apiParams
  })
}

//已寄存 已确认
export const checkDataApi = apiParams => { //1=已寄存/未确认, 2=已确认
  return axios({
    method: 'get',
    url: '/customerProfiles/physical/confirm/list',
    params: apiParams
  })
}

//确认收货
export const confirmReceiptApi = apiParams => { //0=未收到, 1=已收到
  return axios({
    method: 'put',
    url: '/customerProfiles/physical/confirm',
    params: apiParams
  })
}

//操作日志
export const journalApi = apiParams => { //0=未收到, 1=已收到
  return axios({
    method: 'get',
    url: '/customerProfiles/logs',
    params: apiParams
  })
}

// ----------- 操作来源

//任务来源
export const taskSource = apiParams => {
  return axios({
    method: 'get',
    url: 'channel/get',
    params: apiParams
  })
}

//服务变更
export const serviceChangesApi = apiParams => {
  return axios({
    method: 'put',
    url: '/customer/service',
    data: apiParams
  })
}

//转移负责人
export const contactChangesApi = apiParams => {
  return axios({
    method: 'put',
    url: '/customer/accountant',
    data: apiParams
  })
}

//变更来源
export const sourceChangesApi = apiParams => {
  return axios({
    method: 'put',
    url: '/customer/source',
    data: apiParams
  })
}

//暂挂客户
export const pendingApi = apiParams => {
  return axios({
    method: 'put',
    url: '/customer/suspend',
    params: apiParams
  })
}

//终止客户
export const endCustomerApi = apiParams => {
  return axios({
    method: 'put',
    url: '/customer/end',
    params: apiParams
  })
}

