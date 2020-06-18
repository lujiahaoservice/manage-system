import * as type from './type'

const mutations = {
  [type.BUSINESS_DATA](state, value) {
    state.BusinessData = value
  },
  [type.PRODUCT_DATA](state, value) {
    state.ProductData = value
  },
  [type.DIALOGVIS_JSON](state, value) {
    state.DialogVisJson = value
  }
}

export default mutations