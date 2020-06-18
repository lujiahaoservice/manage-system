const getters = {
  getBusinessData(state) {
    return state.BusinessData
  },
  getProductData(state) {
    return state.ProductData
  },
  getBusinessId(state) {
    return state.BusinessId
  },
  getDialogVisJson(state) {
    return state.DialogVisJson
  }
}

export default getters