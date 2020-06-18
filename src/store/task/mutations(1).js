import * as type from './type'

const mutations = {
  [type.TASK_ID](state, value) { 
    state.taskId = value
  },
  [type.PRODUCT_ID](state, value) { 
    state.productId = value
  }
}

export default mutations