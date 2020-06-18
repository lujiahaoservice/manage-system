import axios from 'axios'
// 订单列表
export const orderList = apiParams => {
  return axios({
    method: 'get',
    url: 'task/pageOrder',
    params: apiParams
  })
}

// 评论详情
export const getComment = apiParams => {
  return axios({
    method: 'get',
    url: 'taskOrderComment/page',
    params: apiParams
  })
}

// 提交取消订单
export const cancelOrder = apiParams => {
  return axios({
    method: 'put',
    url: 'taskOrder/cancel',
    data: apiParams
  })
}

// 审核取消订单
export const checkCancelOrder = apiParams => {
  return axios({
    method: 'put',
    url: 'taskOrder/checkCancel',
    data: apiParams
  })
}
