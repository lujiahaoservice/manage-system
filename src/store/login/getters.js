const getters = {
  getLoginInfo(state, loginMsg) {
    state.loginInfo = loginMsg
    return state.loginInfo
  }
}

export default getters
