import * as types from './mutation-types';
// import { noAuthErrorCode } from '../utils/utils'
import { requestSubsystemAuth } from '../api/service.js';

/**
 * 进入页面时判断是否有项目
 * @param commit
 */
export const basicAuthority = ({ commit ,state }) => {
  if(state.user) {
    return new Promise((resolve, reject) => {
      requestSubsystemAuth().then(res => {
        if (res.errorCode === "620002") {
          resolve(false);
        } else {
          commit(types.NEED_PROJECT, true);
          resolve(true);
        }
      });
    }).then((res) => {
      console.log(res);
    // commit(types.NEED_PROJECT, res[0].errorCode !== noAuthErrorCode && res[1]);
    // return  res[0].errorCode !== noAuthErrorCode && res[1];
  });
  }else{
    return new Promise((resolve,reject)=>{resolve(false);});
  }
};


