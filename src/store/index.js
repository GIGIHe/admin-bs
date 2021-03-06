 import Vuex from "vuex";
 import Vue from 'vue'
import createPersistedState from "vuex-persistedstate";
 Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    userInfo: null,
    goods: null,
    orders:null,
    cates:null
  },
  actions: {},
  mutations: {
    CHANGE_USER(state, payload) {
      state.userInfo = payload;
    },
    CHANGE_GOODS(state, payload) {
      state.goods = payload;
    },
    CHANGE_ORDER(state, payload) {
      state.orders = payload;
    },
    CHANGE_CATES(state, payload) {
      state.cates = payload;
    }
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => sessionStorage.getItem(key),
        // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
        setItem: (key, value) => sessionStorage.setItem(key, value),
        removeItem: key => sessionStorage.removeItem(key)
      }
    })
  ]
});

export default store
