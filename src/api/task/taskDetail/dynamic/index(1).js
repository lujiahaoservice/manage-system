import axios from 'axios'

/**
 * Author: sz
 * 因为params是添加到url的请求字符串中的，用于get请求。 
 * 而data是添加到请求体（body）中的， 
 */

// GET /taskPost/page   分页任务产品对应动态表

export const taskPostPage = apiParams => {
  return axios({
    method: 'get',
    url: 'taskPost/page',
    params: apiParams
  })
}

// POST /taskPost/addOne  添加: 记录 / 任务动态

export const taskPostaddOne = apiParams => {
  return axios({
    method: 'post',
    url: 'taskPost/addOne',
    data: apiParams
  })
}