import axios from 'axios'

/**
 * Author: sz
 * 因为params是添加到url的请求字符串中的，用于get请求。 
 * 而data是添加到请求体（body）中的， 
 */

// 任务首页列表
export const createTaskFinsh = apiParams => {
  return axios({
    method: 'post',
    url: 'taskBase/add',
    data: apiParams
  })
}

//任务来源
export const taskSource = apiParams => {
  return axios({
    method: 'get',
    url: 'channel/get',
    params: apiParams
  })
}

// 商品左边列表 获取二级类目,note=传入type,1=产品类目,2=支出类目,3=开票内容类目,4=任务环节类目,5=渠道类目

export const secondary = apiParams => {
  return axios({
    method: 'get',
    url: 'category/get/secondary',
    params: apiParams
  })
}

// GET /product/taskList 获取产品列表

export const taskProductList = apiParams => {
  return axios({
    method: 'get',
    url: 'product/taskList',
    params: apiParams
  })
}

//GET /category/allCategory 直接获取所有子类目

export const allCategoryList = apiParams => {
  return axios({
    method: 'get',
    url: 'category/allCategory',
    params: apiParams
  })
}

//GET /dept/tree  查询部门树形列表

export const getTreeList = apiParams => {
  return axios({
    method: 'get',
    url: 'dept/tree',
    params: apiParams
  })
}

// GET /user/list  通过部门id查询用户列表


export const departmentUser = apiParams => {
  return axios({
    method: 'get',
    url: 'user/list',
    params: apiParams
  })
}

// GET /taskBase/getById   渲染添加任务基础数据
export const getTaskBaseInfo = apiParams => {
  return axios({
    method: 'get',
    url: 'taskBase/getById',
    params: apiParams
  })
}

// POST /taskProduct/add  添加产品

export const addProductTask = apiParams => {
  return axios({
    method: 'post',
    url: 'taskProduct/add',
    data: apiParams
  })
}
