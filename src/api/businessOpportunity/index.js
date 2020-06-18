import axios from 'axios'

/**
 * Author: sz
 * 因为params是添加到url的请求字符串中的，一般用于get请求。 
 * 而data是添加到请求体（body）中的， 视情况而定
 */

// 商机列表(分页)
export const businessApiList = apiParams => {
  return axios({
    method: 'get',
    url: 'business/page',
    params: apiParams
  })
}

// 新建商机
export const addBusiness = apiParams => {
  return axios({
    method: 'post',
    url: 'business/add',
    data: apiParams
  })
}

// 导出商机
export const exportBusiness = apiParams => {
  return axios({
    method: 'get',
    url: 'business/download',
    params: apiParams
  })
}

// 新建详情(通过id获取)
export const createDetail = apiParams => {
  return axios({
    method: 'get',
    url: 'business/getById',
    params: apiParams
  })
}

// // 逻辑删除
// export const logicRemove = apiParams => {
//   return axios({
//     method: 'delete',
//     url: 'business/remove',
//     params: apiParams
//   })
// }

// 商机作废
export const cancelBusiness = apiParams => {
  return axios({
    method: 'post',
    url: 'business/updateInvalid',
    data: apiParams
  })
}

// 商机转出
export const businessOut = apiParams => {
  return axios({
    method: 'post',
    url: 'business/updateTurnOut',
    data: apiParams
  })
}
export const outbusi = () => {
  return axios({
    method: 'get',
    url: 'user/list'
    // data: apiParams
  })
}

//商机来源
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
export const businessProductList = apiParams => {
  return axios({
    method: 'get',
    url: 'product/taskList',
    params: apiParams
  })
}

// GET 分页查询商机产品
export const productPageList = apiParams => {
  return axios({
    method: 'get',
    url: 'businessProduct/page',
    params: apiParams
  })
}

// GET 分页查询商机动态
export const dynamicPageList = apiParams => {
  return axios({
    method: 'get',
    url: '/businessPost/page',
    params: apiParams
  })
}
// POST 添加商机动态
export const addDynamic = apiParams => {
  return axios({
    method: 'post',
    url: '/businessPost/addOne',
    data: apiParams
  })
}
// PUT 变更来源
export const changeSource = apiParams => {
  return axios({
    method: 'put',
    url: 'business/updateCatepory',
    data: apiParams
  })
}

// POST /business/updateById根据id修改商机
export const changeBusinessbyId = apiParams => {
  return axios({
    method: 'post',
    url: 'business/updateById',
    data: apiParams
  })
}

// GET /businessProduct/page 分页查询产品表格
export const productTable = apiParams => {
  return axios({
    method: 'get',
    url: 'businessProduct/page',
    params: apiParams
  })
}

// DELETE /businessProduct/delete 删除商机产品
export const productRemove = apiParams => {
  return axios({
    method: 'delete',
    url: 'businessProduct/delete',
    data: apiParams
  })
}

// POST /businessProduct/update 修改详情产品列表
export const modifyProduct = apiParams => {
  return axios({
    method: 'post',
    url: 'businessProduct/update',
    data: apiParams
  })
}

// get  获得@我的列表
export const getAtList = apiParams => {
  return axios({
    method: 'get',
    url: 'atMessage/getSelectA',
    params: apiParams
  })
}
// get  获取稍后处理我的列表
export const getLaterList = apiParams => {
  return axios({
    method: 'get',
    url: 'atMessage/getSelect',
    params: apiParams
  })
}
// put  处理@我的的状态
export const changeState = apiParams => {
  return axios({
    method: 'put',
    url: 'atMessage/putUpdate',
    params: apiParams
  })
}

// get  获得@我的消息数量
export const _getTotal = apiParams => {
  return axios({
    method: 'get',
    url: 'atMessage/getTotal',
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

//POST /businessProduct/taskStart  开始任务
export const taskStart = apiParams => {
  return axios({
    method: 'post',
    url: 'businessProduct/taskStart',
    data: apiParams
  })
}

// POST /businessProduct/proxyAccount 代理记账
export const agencyAccount = apiParams => {
  return axios({
    method: 'post',
    url: 'businessProduct/proxyAccount',
    data: apiParams
  })
}


// // POST /businessProduct/add
// export const addProductNew = apiParams => {
//   return axios({
//     method: 'post',
//     url: 'businessProduct/add',
//     data: apiParams
//   })
// }


// POST /businessProduct/addList
export const addProductNew = apiParams => {
  return axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset-UTF-8'
    },
    url: 'businessProduct/addList',
    data: apiParams
  })
}

// -------------  配置start --------------

//GET /category/allCategory 直接获取所有子类目

export const allCategoryList = apiParams => {
  return axios({
    method: 'get',
    url: 'category/allCategory',
    params: apiParams
  })
}

// POST /businessProduct/updateTaskLink
export const configCommit = apiParams => {
  return axios({
    method: 'post',
    url: 'businessProduct/updateTaskLink',
    data: apiParams
  })
}
// -------------  配置end -----------------

