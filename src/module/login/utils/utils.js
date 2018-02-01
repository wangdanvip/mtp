import _ from 'lodash';
import dict from 'common/dict_enum.js';

export const friendTip={
  getProject: "系统拼命加载中...",
  noProject: "对不起，您暂时还未开通项目，请先到MIP申请开通。",
  errorProject: "项目获取出错",
  getRole: "系统拼命加载中...",
  errorRole:"角色获取出错",
  entry: "系统拼命加载中..."
};

/**
 * 角色过滤器
 * @param role
 * @returns {{}}
 */
export const roleFormatter = (roles) => {
  let roleFormat={};
  _.forIn(dict,(value,key) => {
    let index=_.findIndex(roles,r => r.name === value);
    roleFormat[value]=!!(index+1);
  });
  return roleFormat;
};
