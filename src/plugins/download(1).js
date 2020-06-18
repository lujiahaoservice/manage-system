// 参数： url:请求地址  param：请求参数  way：请求方式 res：回调函数
import { Message } from 'element-ui'

export const download = (url, filename) => {
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  Message.success('导出成功!')
}

export const downloadBlod = (data, filename) => {
  const a = document.createElement('a')
  const blob = new Blob([data], { type: 'application/vnd.ms-excel' })
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
  Message.success('导出成功!')
}

export const downloadFile = (url) => {    
  const iframe = document.createElement('iframe')    
  iframe.style.display = 'none' // 防止影响页面     
  iframe.style.height = 0 // 防止影响页面     
  iframe.src = url      
  document.body.appendChild(iframe) // 这一行必须，iframe挂在到dom树上才会发请求    
  // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）     
  setTimeout(() => {      
    iframe.remove()   
  }, 10000)
}


export const downImg = async(url, name) => {
  var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    img = new Image()  
  img.crossOrigin = 'Anonymous'  
  img.onload = function() {
    canvas.height = img.height  
    canvas.width = img.width  
    ctx.drawImage(img, 0, 0)  
    var ext = url.substring(url.lastIndexOf('.') + 1)
    var dataURL = canvas.toDataURL('image/' + ext) 
    var urlmm = dataURLtoFile(dataURL)
    const a = document.createElement('a')  
    a.href = URL.createObjectURL(urlmm)  
    a.download = name  
    document.body.appendChild(a)  
    a.click()  
    setTimeout(() => {
      document.body.removeChild(a)  
      canvas = null  
    }, 100)  
  }  
  img.src = url   
}  

//将base64转换为文件对象
function dataURLtoFile(dataurl) {
  var arr = dataurl.split(',')
  var mime = arr[0].match(/:(.*?)/)[1]
  var bstr = atob(arr[1])
  var n = bstr.length 
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  //转换成file对象
  // return new File([u8arr], filename, {type:mime})
  //转换成成blob对象
  return new Blob([u8arr], { type: mime })
}