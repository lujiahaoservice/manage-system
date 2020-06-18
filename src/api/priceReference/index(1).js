import axios from 'axios'
// 列表
export const priceList = apiParams => {
  return axios({
    method: 'get',
    url: '/proposedPrice/page',
    params: apiParams
  })
}
// 删除
export const pricedel = apiParams => {
  return axios({
    method: 'delete',
    url: '/proposedPrice/remove',
    params: apiParams
  })
}
// 增加
export const priceadd = apiParams => {
  return axios({
    method: 'post',
    url: '/proposedPrice/save',
    data: apiParams
  })
}
// 修改
export const priceupdate = apiParams => {
  return axios({
    method: 'put',
    url: '/proposedPrice/update',
    data: apiParams
  })
}