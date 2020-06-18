import axios from 'axios'

/**
 * Author: sz
 * 因为params是添加到url的请求字符串中的，用于get请求。 
 * 而data是添加到请求体（body）中的， 
 */

// GET /account/income/review/list  收款审核列表
export const reviewList = apiParams => {
  return axios({
    method: 'get',
    url: 'account/income/review/list',
    params: apiParams
  })
}

// GET /receivableIncoming/  应收款项详情

export const receivableIncoming = apiParams => {
  return axios({
    method: 'get',
    url: 'receivableIncoming/get',
    params: apiParams
  })
}

// GET /account/expense/list  支出记录列表

export const expenseList = apiParams => {
  return axios({
    method: 'get',
    url: 'account/expense/list',
    params: apiParams
  })
}