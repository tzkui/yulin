export default {
  namespaced: true,
  state: {
    loading: false,
    pagePath: '/homePage',
    userName: '', // 系统用户名
  },
  mutations: {
    SET_LOADING (state, type) {
      state.loading = type;
    }, // 页面loading 事件
    SET_USERNAME (state, name) {
      state.userName = name;
    }, // 系统用户名
  },
  getters: {
    PAGE_LOADING: (state) => state.loading, // 页面loading
    GET_USERNAME: (state) => state.userName,
  },
  actions: {}
}