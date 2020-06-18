import axios from 'axios'

/**
 * Author: sz
 * 因为params是添加到url的请求字符串中的，用于get请求。 
 * 而data是添加到请求体（body）中的， 
 */

// GET /taskBase/getById   
export const getTaskBaseInfo = apiParams => {
  return axios({
    method: 'get',
    url: 'taskBase/getById',
    params: apiParams
  })
}

// GET /taskData/getListByTaskProductId  任务对应产品id
export const getProductInfoOne = apiParams => {
  return axios({
    method: 'get',
    url: 'taskData/getListByTaskProductId',
    params: apiParams
  })
}

// GET /taskProduct/getById   任务对应产品id

export const getProductInfoTwo = apiParams => {
  return axios({
    method: 'get',
    url: 'taskProduct/getById',
    params: apiParams
  })
}


// POST /taskData/add 上传资料

export const uploadFile = apiParams => {
  return axios({
    method: 'post',
    url: 'taskData/add',
    data: apiParams
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

//GET /category/allCategory 直接获取所有子类目

export const allCategoryList = apiParams => {
  return axios({
    method: 'get',
    url: 'category/allCategory',
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

// PUT /taskProduct/turnProduct 转出任务

export const taskTransferSure = apiParams => {
  return axios({
    method: 'put',
    url: 'taskProduct/turnProduct',
    data: apiParams
  })
}

// PUT /taskProduct/putPending 暂挂任务

export const taskHoldSure = apiParams => {
  return axios({
    method: 'put',
    url: 'taskProduct/putPending',
    data: apiParams
  })
}

// PUT /taskProduct/putReject 拒绝环节

export const taskReduceSure = apiParams => {
  return axios({
    method: 'put',
    url: 'taskProduct/putReject',
    data: apiParams
  })
}

// PUT /taskProduct/putFin   完成环节

export const taskFinshSure = apiParams => {
  return axios({
    method: 'put',
    url: 'taskProduct/putFin',
    data: apiParams
  })
}

// PUT /taskProduct/dataLose  材料缺失

export const fileDataLose = apiParams => {
  return axios({
    method: 'put',
    url: 'taskProduct/dataLose',
    data: apiParams
  })
}

// PUT /taskProduct/putTermination  终止任务

export const putTermination = apiParams => {
  return axios({
    method: 'put',
    url: 'taskProduct/putTermination',
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

// PUT /taskBase/updateById   根据id修改任务基础数据  （变更来源）

export const updateBaseData = apiParams => {
  return axios({
    method: 'put',
    url: 'taskBase/updateById',
    data: apiParams
  })
}

// PUT /taskProduct/updateById   根据id修改任务产品数据

export const updateProductData = apiParams => {
  return axios({
    method: 'put',
    url: 'taskProduct/updateById',
    data: apiParams
  })
}