import { createStore } from 'vuex'
import indexStore from './modules/common';
import socketStore from './modules/socketStore';
import VuexPersistence from 'vuex-persist';
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
})
export default createStore({
  plugins: [vuexLocal.plugin],
  modules: {
    hmkViewStore: indexStore,
    socketStore
  }
})
