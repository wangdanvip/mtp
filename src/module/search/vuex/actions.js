import * as types from './mutation-types';
import { noAuthErrorCode } from '../utils/utils'
import { requestTenantInfo } from '../api/service.js';
import ss from 'utils/session_storage_tool';

/**
 * 判断是否有进入页面权限
 * auth判断是否有进入子系统权限
 * requestTenantInfo子系统的权限校验
 * @param commit
 */
export const searchAuthority = ({ commit ,state }) => {
  if(state.user) {
    return new Promise((resolve,reject) => {
      let params = {userid: state.user.account}
      requestTenantInfo(params).then(res => {
        if(res.code === 0){
          ss.addItem("searchTenantInfo",res.data)
          resolve(res)
        }else{
          commit(types.SEARCH_AUTHORITY,true)
          resolve(true)
        }
      })
    }).then(res => {
      console.log(res);
    })
  }else{
    return new Promise((resolve,reject)=>{resolve(false);});
  }
};

/**
 * 修改权限
 * @param commit
 * @param state
 */
export const changeAuthority =({ commit ,state } , authority )=>{
  commit(types.SEARCH_AUTHORITY,authority);
};

