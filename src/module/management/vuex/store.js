import Vue from 'vue';
import Vuex from 'vuex';
import "babel-polyfill";
import * as types from './mutation-types';
import * as actions from './actions';
import * as getters from './getters';

Vue.use(Vuex);

// 应用初始状态
const state = {
  selectedProject: {},
  menuList:[], // 请求菜单列表
};

// 定义所需的 mutations
const mutations = {
  SELECTED_PROJECT(state,{ project }) {
    state.selectedProject = project;
  },

  //获取系统菜单的方法
  [types.GET_MENU_LIST](state, result) {
    state.menuList = result
  },
};

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
});
