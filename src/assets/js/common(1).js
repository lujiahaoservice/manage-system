/**
 * @param {data}
 * type : success  warning  error 
 * title :  提示的文本
 */ 

export const openToast = data => {
  this.$message({
    message: data.title, 
    type: data.type || ''
  })
}