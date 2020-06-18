// import { Message } from 'element-ui'

const downImg = async(url, name) => {
  var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    img = new Image()  
  img.crossOrigin = 'Anonymous'  
  img.onload = function() {
    canvas.height = img.height  
    canvas.width = img.width  
    ctx.drawImage(img, 0, 0)  
    var ext = img.substring(img.lastIndexOf('.')+1).toLowerCase()
    
    var dataURL = canvas.toDataURL('image/' + ext) 
    const a = document.createElement('a')  
    a.href = dataURL  
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

export default downImg