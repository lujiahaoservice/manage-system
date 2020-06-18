import axios from 'axios'
// 新增的接口
// 当日用户数量
export const getCategories = apiParams => {
  return axios({
    method: 'get',
    url: 'category/parentList',
    params: apiParams
  })
}
export const getSecondsCategories = apiParams => {
  return axios({
    method: 'get',
    url: 'category/page1',
    params: apiParams
  })
}
export const getSecondsCategories2 = apiParams => {
  return axios({
    method: 'get',
    url: 'category/page2',
    params: apiParams
  })
}
export const delCategory = apiParams => {
  return axios({
    method: 'delete',
    url: 'category/remove',
    params: apiParams
  })
}
export const putcategory = apiParams => {
  return axios({
    method: 'put',
    url: 'category/update',
    params: apiParams
  })
}
export const postCategory = apiParams => {
  return axios({
    method: 'post',
    url: 'category/save',
    params: apiParams
  })
}