import Vue from 'vue'
222222222222222
import App from './App.vue'
import router from './router'
import store from './store'
import md5 from 'js-md5'
import './plugins/element.js'
import './plugins/axios.js'
import getUuid from './plugins/common.js'
import echarts from 'echarts'
import vueSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(vueSwiper)

Vue.prototype.$uuid = getUuid

Vue.prototype.$md5 = md5

Vue.prototype.$echarts = echarts
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('yqToken') // 是否token
  if (to.path !== '/login' && !isLogin) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
