import axios from 'axios'
// client列表
export const feedbackList = apiParams => {
  return axios({
    method: 'get',
    url: 'feedback/page',
    params: apiParams
  })
}
// client列表
export const feedbackRemove = apiParams => {
  return axios({
    method: 'delete',
    url: 'feedback/remove',
    params: apiParams
  })
}
