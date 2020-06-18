import axios from 'axios'
// 角色相关列表
// 添加角色
export const addrole = apiParams => {
  return axios({
    method: 'post',
    url: 'role/add',
    data: apiParams
  })
}

// 查看用户对应角色列表
export const getroleId = apiParams => {
  return axios({
    method: 'get',
    url: 'role/getByUserId',
    params: apiParams
  })
}

// 查看角色列表
export const getRolelist = apiParams => {
  return axios({ 
    method: 'get',
    url: 'role/list',
    params: apiParams
  })
}

// 逻辑删除
export const delRoleremove = apiParams => {
  return axios({
    method: 'delete',
    url: 'role/remove',
    params: apiParams
  })
}

// 修改角色 X
export const putRolename = apiParams => {
  return axios({
    method: 'put',
    url: 'role/update',
    data: apiParams
  })
}

// 修改角色名称
export const putRole = apiParams => {
  return axios({
    method: 'put',
    url: 'role/updateName',
    params: apiParams
  })
}




// 部门相关列表
// 查询部门列表
export const getDepttree = apiParams => {
  return axios({
    method: 'get',
    url: 'dept/tree',
    params: apiParams
  })
}
// 部门添加子部门
export const postDeptadd = apiParams => {
  return axios({
    method: 'post',
    url: 'dept/add',
    data: apiParams
  })
}
// 部门修改部门名称
export const putDeptupdate = apiParams => {
  return axios({
    method: 'put',
    url: 'dept/update',
    params: apiParams
  })
}
// 部门删除部门
export const delDeptremove = apiParams => {
  return axios({
    method: 'delete',
    url: 'dept/remove',
    params: apiParams
  })
}
// 部门id显示tab
export const getUserpage = apiParams => {
  return axios({
    method: 'get',
    url: 'user/page',
    params: apiParams
  })
}


// 菜单相关
// 查询菜单树形列表X
export const getMenuroleid = apiParams => {
  return axios({
    method: 'get',
    url: 'menu/getMenuByRoleId',
    params: apiParams
  })
}

// 菜单加载不传参
export const getMenutree = apiParams => {
  return axios({
    method: 'get',
    url: 'menu/tree',
    params: apiParams
  })
}

// 通过id获取用户详情
export const getByid = apiParams => {
  return axios({
    method: 'get',
    url: 'user/getById',
    params: apiParams
  })
}

// 权限用配置
export const getPowerid = apiParams => {
  return axios({
    method: 'get',
    url: 'user/getByRoleId',
    params: apiParams
  })
}

// 新增用户
export const postAdduser = apiParams => {
  return axios({
    method: 'post',
    url: 'user/save',
    data: apiParams
  }) 
}

// 修改用户
export const putUserupdate = apiParams => {
  return axios({
    method: 'put',
    url: 'user/update',
    data: apiParams
  })
}

// 离职
export const deldimission = apiParams => {
  return axios({
    method: 'delete',
    url: 'user/remove',
    params: apiParams
  })
}