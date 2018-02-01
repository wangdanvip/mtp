import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as types from './mutation-types';
import storage from 'utils/local_storage_tool';

Vue.use(Vuex);

// 应用初始状态
const state = {
  isAuthority: false,
  token: storage.getItem("token"),
  project:  storage.getObject("project"),
  user: storage.getObject("user"),
};
// 定义所需的 mutations
const mutations = {
  [types.PIC_AUTHORITY](state,isAuthority) {
    state.isAuthority=isAuthority;
  },
  // [types.TENANT_INFO](state,tenantInfo) {
  //   state.tenantInfo = tenantInfo;
  // }
};

// 创建 store 实例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
});
