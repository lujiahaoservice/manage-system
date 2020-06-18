import { Message } from 'element-ui'

export const selectId = (list, e) => {
  const obj = list.find((item) => {
    return item.name === e
  })
  const id = obj.id || '' // ''防止没有匹配项
  return id
}

export const selectmaterials = (list, e) => {
  const obj = list.find((item) => {
    return item.name === e
  })
  const materials = obj.materials || '' // ''防止没有匹配项
  return materials
}

export const selectDataName = (list, e) => {
  const obj = list.find((item) => {
    return item.adminId === e
  })
  const dataName = obj.dataName || '' // ''防止没有匹配项
  return dataName
}

export const messageWarn = (flag, title) => {
  if (flag) {
    Message.warning(title) 
    return flag
  }
}


/*
  * 判断obj是否为一个整数
  */
const isInteger = (obj) => {
  return Math.floor(obj) === obj
}


/*
  * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
  * @param floatNum {number} 小数
  * @return {object}
  *   {times:100, num: 314}
  */

export const toInteger = (floatNum) => {
  const ret = { times: 1, num: 0 }
  if (isInteger(floatNum)) {
    ret.num = floatNum
    return ret
  }
  const strfi = floatNum + ''
  const dotPos = strfi.indexOf('.')
  const len = strfi.substr(dotPos + 1).length
  const times = Math.pow(10, len)
  const intNum = parseInt(floatNum * times + 0.5, 10)
  ret.times = times
  ret.num = intNum
  return ret
}

