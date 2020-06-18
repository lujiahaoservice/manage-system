import axios from 'axios'

// 添加服务 公司
export const addcompany = apiParams => {
  return axios({
    method: 'post',
    url: 'serveCompany/add',
    data: apiParams
  })
}

// 查询公司列表
export const getcompanylist = apiParams => {
  return axios({
    method: 'get',
    url: 'serveCompany/list',
    params: apiParams
  })
}

// 分页查询服务商公司
export const geypagecompany = apiParams => {
  return axios({
    method: 'get',
    url: 'serveCompany/page',
    params: apiParams
  })
}

// 公司删除按钮
export const delcompany = apiParams => {
  return axios({
    method: 'delete',
    url: 'serveCompany/remove',
    params: apiParams
  })
}

// 修改服务公司
export const changecompany = apiParams => {
  return axios({
    method: 'put',
    url: 'serveCompany/update',
    data: apiParams
  })
}

// 添加服务商账户
export const addserveuser = apiParams => {
  return axios({
    method: 'post',
    url: 'serveAccount/add',
    data: apiParams
  })
}

// 查询服务商账户列表
export const getserveUserlist = apiParams => {
  return axios({
    method: 'get',
    url: 'serveAccount/list',
    params: apiParams
  })
}

// 分页查询服务商用户
export const getUserpagelist = apiParams => {
  return axios({
    method: 'get',
    url: 'serveAccount/page',
    params: apiParams
  })
}

// 服务商删除
export const delserveUser = apiParams => {
  return axios({
    method: 'delete',
    url: 'serveAccount/remove',
    params: apiParams
  })
}

// 修改服务商用户
export const updateserveUser = apiParams => {
  return axios({
    method: 'put',
    url: 'serveAccount/update',
    data: apiParams
  })
}