import axios from 'axios'


// 获取菜单列表
export const getMenutree = apiParams => {
  return axios({
    method: 'get',
    url: 'menu/tree',
    params: apiParams
  })
}

// 根据角色获取菜单
export const getRolePeople = apiParams => {
  return axios({
    method: 'get',
    url: 'user/page',
    params: apiParams
  })
}