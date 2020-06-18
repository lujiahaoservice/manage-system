import axios from 'axios'


// 任务列表
export const taskList = apiParams => {
  return axios({
    method: 'get',
    url: 'task/page',
    params: apiParams
  })
}

// 删除任务
export const taskRemove = apiParams => {
  return axios({
    method: 'delete',
    url: 'task/remove',
    params: apiParams
  })
}

// 删除任务
export const taskCancel = apiParams => {
  return axios({
    method: 'put',
    url: 'task/cancel',
    data: apiParams
  })
}

// 任务修改
export const taskUpdata = apiParams => {
  return axios({
    method: 'put',
    url: 'task/update',
    data: apiParams
  })
}

// 任务修改
export const taskUpdataBody = apiParams => {
  return axios({
    method: 'put',
    url: 'task/update',
    data: apiParams
  })
}

// 任务审核
export const taskExamine = apiParams => {
  return axios({
    method: 'put',
    url: 'task/updateState',
    data: apiParams
  })
}

// 任务增加
export const taskAdd = apiParams => {
  return axios({
    method: 'post',
    url: 'task/save?url=https://yongqin-manager-web.frp.hanku.net.cn/#/taskManage',
    data: apiParams
  })
}

// 类目列表
export const categoryList = apiParams => {
  return axios({
    method: 'get',
    url: 'category/childList',
    params: apiParams
  })
}

// 任务指定
export const taskPointer = apiParams => {
  return axios({
    method: 'get',
    url: 'task/designated',
    params: apiParams
  })
}
