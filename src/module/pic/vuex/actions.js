import * as types from './mutation-types';
import { requestSearchTenant } from '../api/service.js';
import ss from 'utils/session_storage_tool';

/**
 * auth判断是否有进入子系统权限
 * requestSearchTenant 检验子系统有没有开通
 * @param commit
 */
export const picAuthority = ({commit,state}) => {
  if(state.user) {
    return new Promise((resolve,reject) => {
      let params = {userid: state.user.account};
      requestSearchTenant(params).then(res => {
        if(res.code === 0){
          ss.addItem("tenantInfo",res.data)
          resolve(res)
        }else{
          commit(types.PIC_AUTHORITY,true)
          resolve(true)
        }
      })
    }).then((res) => {
      // console.log(res);
      // commit(types.PIC_AUTHORITY,res[0].code === '0' && res[1])
      // return res[0].code === '0' && res[1]
    })
  }else{
    return new Promise((resolve,reject)=>{resolve(false);});
  }
}

/**
 * 修改权限
 * @param commit
 * @param state
 */
export const changeAuthority =({ commit ,state } , authority )=>{
  commit(types.PIC_AUTHORITY,authority);
};

