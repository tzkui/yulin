import { createStore } from 'vuex'
import indexStore from './modules/common';
import socketStore from './modules/socketStore';
import pointLists from './modules/pointLists';
import VuexPersistence from 'vuex-persist';
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
})
export default createStore({
  plugins: [vuexLocal.plugin],
  modules: {
    hmkViewStore: indexStore,
    socketStore,
    pointLists
  }
})
