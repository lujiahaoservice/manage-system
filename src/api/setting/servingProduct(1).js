import axios from 'axios'
// 添加产品
export const addproduct = apiParams => {
  return axios({
    method: 'post',
    url: 'product/add',
    data: apiParams
  })
}

// 获取详情
export const getproductdetial = apiParams => {
  return axios({
    method: 'get',
    url: 'product/detial',
    params: apiParams
  })
}

// 获取产品
export const getproductlist = apiParams => {
  return axios({
    method: 'get',
    url: 'product/list',
    params: apiParams
  })
}

// 产品删除
export const delproduct = apiParams => {
  return axios({
    method: 'delete',
    url: 'product/remove',
    params: apiParams
  })
}

// 获取任务产品
export const gettasklist = apiParams => {
  return axios({
    method: 'get',
    url: 'product/taskList',
    params: apiParams
  })
}

// 修改产品
export const putproductupdate = apiParams => {
  return axios({
    method: 'put',
    url: 'product/update',
    data: apiParams
  })
}

// 修改状态
export const putstatus = apiParams => {
  return axios({
    method: 'put',
    url: 'product/update/status',
    params: apiParams
  })
}

// 获取子类目list
export const getcategory = apiParams => {
  return axios({
    method: 'get',
    url: 'category/get/category/list',
    params: apiParams
  })
}