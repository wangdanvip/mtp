import * as types from './mutation-types';
import * as srv from '../api/service';
import Vue from 'vue';

export const selectedProject = ({ commit }, project) => {
  commit(types.SELECTED_PROJECT,{
    project : project
  });
};

export const getMenuList = ({ commit ,state }, parmas ) => {
  return new Promise((resolve,reject) => {
    if(!state.menuList.length){
      srv.getSystemMenu(parmas).then(res => {
        if(res.errorCode === '600000'){
          for(let i = 0;i<res.result.length;i++){
            for(let x = 0;x<res.result[i].children.length;x++){
              if(res.result[i].children[x].link.indexOf('#') === -1){
                // Vue.set 给一级菜单添加path字段，将对应二级菜单中的link字段中的值以字符串的形式拼接到该path字段中。
                Vue.set(res.result[i],'path', res.result[i].path+res.result[i].children[x].link.slice(res.result[i].children[x].link.indexOf('/module')));
              }else{
                Vue.set(res.result[i],'path', res.result[i].path+res.result[i].children[x].link.slice(res.result[i].children[x].link.indexOf('/module'), res.result[i].children[x].link.indexOf('#')));
              }
            }
          }
          let menuList = res.result;
          resolve(menuList);
          commit(types.GET_MENU_LIST,menuList)
        }else{
          console.log(res.msg);
        }
      }).catch(error =>{
        reject(error)
      });
    }else{
      resolve(state.menuList);
      commit(types.GET_MENU_LIST,state.menuList);
    }
  })
};


