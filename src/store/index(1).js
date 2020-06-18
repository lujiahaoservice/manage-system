import Vue from 'vue'
import Vuex from 'vuex'

import loginModule from './login'
import taskModule from './task'
import businessModule from './businessOpportunity'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    login: loginModule,
    task: taskModule,
    businessOpportunity: businessModule
  }
})

export default store