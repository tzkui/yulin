export default {
  namespaced: true,
  state: {
    yjzyInfos: {}
  },
  getters: {
    GET_YJZYINFOS: (state) => state.yjzyInfos,
  },
  mutations: {
    SET_YJZYINFOS(state,info){
      state.yjzyInfos = info
    }
  }
}