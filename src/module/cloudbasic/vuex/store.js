import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutation-types';
import * as actions from './actions';
import * as getters from './getters';
import storage from 'utils/local_storage_tool';

Vue.use(Vuex);

// 应用初始状态
const state = {
  // isAuthority: false,
  needProject: false,
  token: storage.getItem("token"),
  project:  storage.getObject("project"),
  user: storage.getObject("user")
};
// 定义所需的 mutations
const mutations = {
  [types.NEED_PROJECT](state,needProject) {
    state.needProject=needProject;  
  }
};

// 创建 store 实例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
});
