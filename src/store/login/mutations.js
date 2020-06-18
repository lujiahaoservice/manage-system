import * as type from './type'

const mutations = {
  [type.LOGIN_INFO](state, action) { 
    state.loginInfo = action
    
  }
}

export default mutations