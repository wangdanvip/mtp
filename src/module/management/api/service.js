/**
 * Created by CHENRC2 on 2017-7-26.
 */
import axios from 'utils/http.js';
import * as api from "./api.js";
import * as utils from "utils/utils.js";
import storage from 'utils/local_storage_tool';
import ss from 'utils/session_storage_tool';


/**
 * 用户列表
 * @param params
 * @returns {*}
 */
export const requestUserList = params => {
  return axios.post(api.userList, params).then(res => res.data);
};

/**
 * 用户信息
 * @param params
 * @returns {*}
 */
export const requestUserInfo = params => {
  return axios.post(api.userInfo, params).then(res => res.data);
};


/**
 * 个人项目列表
 * */
export const requestUserProject = params => {
  let user=storage.getObject("user");
  return axios.post(api.userProjectList,Object.assign({},{ account:user.account,index:1,pageSize:1000 },params)).then(res => res.data);
};


/**
 * 项目列表
 * @param params
 * @returns {*}
 */
export const requestProjectList = params => {
  return axios.post(api.projectList, params).then(res => res.data);
};


/**
 * 项目信息
 * @param params
 * @returns {*}
 */
export const requestProjectInfo = params => {
  return axios.post(api.projectInfo, params).then(res => res.data);
};


/**
 * 项目成员列表
 * @param params
 * @returns {*}
 */
export const requestProjectMemberList = params => {
  return axios.post(api.projectMemberList, params).then(res => res.data);
};


/**
 * 删除项目成员
 * @param params
 * @returns {*}
 * */
export const requestDeleteProjectMember = params => {
  return axios.post(api.deleteProjectMember, params).then(res => res.data);
}


/**
 * 新增项目
 * @param params
 * @returns {*}
 */
export const requestAddProject = params => {
  return axios.post(api.addProject, params).then(res => res.data);
};


/**
 * 修改项目
 * @param params
 * @returns {*}
 */
export const requestUpdateProject = params => {
  return axios.post(api.updateProject, params).then(res => res.data);
};


/**
 * 删除项目
 * @param params
 * @returns {*}
 */
export const requestDeleteProject = params => {
  return axios.post(api.deleteProject, params).then(res => res.data);
};


/**
 * 获取服务授权列表
 * */
export const requestServiceList = params => {
  return axios.post(api.serviceList, params).then(res => res.data);
};


/**
 * 开通二级菜单服务
 * @param params  二级菜单ID
 * @returns {*}
 */
export const openService = params => {
  return axios.post(api.openService, params).then(res => res.data);
};


/**
 * 获取内部菜单系统
 * @param params
 * @returns {*}
 */
export const getSystemMenu = params => {
  return axios.get(api.systemMenu, params).then(res => res.data);
};



/**
 * 新建菜单
 * @param params
 * @returns {*}
 */
export const addMenu = params => {
  return axios.post(api.addMenu, params).then(res => res.data);
};



/**
 * 编辑菜单
 * @param params
 * @returns {*}
 */
export const modifyMenu = params => {
  return axios.post(api.modifyMenu, params).then(res => res.data);
};


/**
 * 获取菜单详情
 * @param params
 * @returns {*}
 */
export const getMenuDetail = params => {
  return axios.post(api.menuDetail, params).then(res => res.data);
};



/**
 * 获取菜单列表
 * @param params
 * @returns {*}
 */
export const getMenuList = params => {
  return axios.post(api.menuList, params).then(res => res.data);
};



/**
 * 删除菜单
 * @param params
 * @returns {*}
 */
export const deleteMenu = params => {
  return axios.post(api.deleteMenu, params).then(res => res.data);
};


/*
* ---------------------云市场
*/

//  发布或者修改产品
export const publishOrModifyProduct = params => {
 return axios.post(api.publishOrModify,params).then(res => res.data);
}

// 获取发布的产品列表
export const requestPublishProductLists = params => {
 return axios.post(api.productlists,params).then(res => res.data);
}

// 获取产品列表（首页）
export const requestMasterProductlists = params => {
  return axios.get(api.masterProductlists).then(res => res.data);
}

// 批量删除产品
export const deleteMultipleProducts = params => {
 return axios.post(api.deleteMultipleProducts,params).then(res => res.data);
}

// 获取产品的评论列表
export const requestProductCommentLists = params => {
 return axios.post(api.commentlists,params).then(res => res.data);
}

// 删除评论
export const deleteComments = params => {
  return axios.post(api.deleteComments,params).then(res => res.data);
}

// 上传文件
export const uploadFiles = params => {
  return axios.post(api.uploadFiles,params).then(res => res.data);
}

// 发表评论
export const requestPublishComments = params => {
  return axios.post(api.publishComments,params).then(res => res.data);
}

// 获取产品详情
export const requestProductDetails = params => {
  return axios.post(api.productDetails,params).then(res => res.data);
}

// 修改产品序号
export const modifyProductOrders = params => {
  return axios.post(api.productOrders,params).then(res =>res.data);
}

// 获取详情信息
export const requestProductionDesc = api => {
  return axios.get(api).then(res => res.data);
}

// ----------------设置服务
//  获取服务列表
export const requestServeLists = params => {
  return axios.post(api.serveLists,params).then(res =>res.data);
}

// 获取首页服务列表
export const requestListByEnable = params => {
  return axios.post(api.getListByEnable, params).then(res => res.data);
}

// 获取服务权限
export const requestSubsystemAuth = params => {
  return axios.post(api.subsystemAuth, params).then(res => res.data);
}

// 新建/编辑服务
export const createOrModifyServe = params => {
  return axios.post(api.createOrModifyServe,params).then(res =>res.data);
}

// 获取服务详情
export const getServeDetails = params => {
  return axios.post(api.serveDetails,params).then(res =>res.data);
}

// 删除服务
export const deleteServe = params => {
  return axios.post(api.deleteServe,params).then(res =>res.data);
}

// 启用/禁用服务
export const openOrforbiddenServe = params => {
  return axios.post(api.openOrforbiddenServe,params).then(res =>res.data);
}

// -------------消息中心
// 获取用户消息列表
export const requestMessageLists = params => {
  return axios.post(api.messageLists,params).then(res =>res.data);
}

// 修改用户消息状态
export const modifyMessageSituation = params => {
  return axios.post(api.modifyMessageSituation,params).then(res =>res.data);
}

// 删除用户消息
export const deleteMessage = params => {
  return axios.post(api.deleteMessage,params).then(res =>res.data);
}

// 获取用户未读消息条数
export const requestNotReadedMessage = params => {
  return axios.post(api.notReadedMessage,params).then(res =>res.data);
}

//  标记用户所有未读消息为已读
export const havebeenReadedMessage = params => {
  return axios.post(api.havebeenReadedMessage,params).then(res =>res.data);
}

