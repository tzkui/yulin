export default {
  namespaced: true,

  state: {
    socket: {}
  },

  mutations: {
    setSocket (state, data) {
      let val = "";
      if (!data.key || !data.val) {
        console.info(`设置socket的数据错误，请查看,key=${data.key};val=${data.val}`)
        return
      };
      if (typeof data.val == 'object') {
        val = Object.assign({}, data.val)
      }
      val = data.val;
      state.socket[data.key] = val;
    }
  }
}