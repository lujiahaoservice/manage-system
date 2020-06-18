// vue.config.js
module.exports = {
  // 是否关闭ESLint：true是，false否
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  lintOnSave: true,
  devServer: {
    port: 3000
  }
} 