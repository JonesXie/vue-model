import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

const sessionData = {
  indexData: JSON.parse(sessionStorage.getItem("indexData")),
};

const state = {
  indexData: sessionData.indexData,
  source: {
    // 取消axios请求
    token: null,
    cancel: null,
  },
  fullPath: "/",
};

const mutations = {
  SET_SOURCE(state, val) {
    state.source = val;
  },
  SET_FULLPATH(state, val) {
    state.fullPath = val;
  },
};
const actions = {
  // SET_INDEXDATA({ commit }, val) {
  //   commit('SET_INDEXDATA', val)
  // },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
});

//使用模块化
// import isBar from './modules/layout.js'
// export default new Vuex.Store({
//   modules: {
//     layout,
//   },
//   state,
//   mutations,
//   actions,
// })
