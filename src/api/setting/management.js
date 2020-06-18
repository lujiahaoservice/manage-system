import axios from 'axios'

// 增加子类目
export const postCategories = apiParams => {
  return axios({
    method: 'post',
    url: 'category/add/category',
    data: apiParams
  })
}

// 增加二级类目
export const postSecondarycategory = apiParams => {
  return axios({
    method: 'post',
    url: 'category/add/secondary',
    params: apiParams
  })
}

// 增加任务子类目 Add task subclasses POST /category/add/taskCategory
export const postAddtasksubclasses = apiParams => {
  return axios({
    method: 'post',
    url: 'category/add/taskCategory',
    data: apiParams
  })
}
// 获取子类目
export const getCategories = apiParams => {
  return axios({
    method: 'get',
    url: 'category/get/category',
    params: apiParams
  })
}

// 获取二级类目
export const getSecondarycategory = apiParams => {
  return axios({
    method: 'get',
    url: 'category/get/secondary',
    params: apiParams
  })
}

// 删除子类目
export const delCategories = apiParams => {
  return axios({
    method: 'delete',
    url: 'category/remove',
    params: apiParams
  })
}

// 删除二级类目
export const delSecondarycategory = apiParams => {
  return axios({
    method: 'delete',
    url: 'category/remove/secondary',
    params: apiParams
  })
}

// 修改子类目名称
export const putCategories = apiParams => {
  return axios({
    method: 'PUT',
    url: 'category/update/categoryName',
    params: apiParams
  })
}

// 修改子类目状态
export const putCategorstatus = apiParams => {
  return axios({
    method: 'PUT',
    url: 'category/update/categoryStatus',
    params: apiParams
  })
}

// 修改二级类目
export const putsecondary = apiParams => {
  return axios({
    method: 'PUT',
    url: 'category/update/secondary',
    params: apiParams
  })
}

// 获取所有子类目
export const allCategory = apiParams => {
  return axios({
    method: 'get',
    url: 'category/allCategory',
    params: apiParams
  })
}