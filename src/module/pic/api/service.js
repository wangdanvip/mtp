import axios from 'utils/http.js';
import * as api from "./api.js";
import * as utils from "utils/utils.js";
import ss from 'utils/session_storage_tool';
import ls from 'utils/local_storage_tool';

var appInfo = {};
// (function getInfo(){
// 	let params = {userid:ls.getObject("user").account};
// 	axios.post(api.searchTenant,params).then(res => {
// 		appInfo.appid = res.data.data.appid;
// 		appInfo.appkey = res.data.data.appkey;
// 		console.log(appInfo);
// 	})
	
// })()

var interval = setInterval(function() {
	if(ss.getObject("tenantInfo")) {
		clearInterval(interval);
		appInfo.appid = ss.getObject("tenantInfo").appid;
		appInfo.appkey = ss.getObject("tenantInfo").appkey;
	}
}, 100);



/**
 * 删除图片
 * @param params
 * @returns {*}
 */
export const requestDeletePic = params => {
	return axios.post(api.deletePic, Object.assign({}, params, appInfo)).then(res => res.data);
};

/**
 * 图片重命名
 * @param params
 * @returns {*}
 */
export const requestResetImgName = params => {
	return axios.post(api.resetImgName, Object.assign({}, params, appInfo)).then(res => res.data);
};

/**
 * 获取图片列表
 * @param params
 * @returns {*}
 */
export const requstGetPicList = params => {
	return axios.post(api.getPicList, params).then(res => res.data);
};

/**
 * 增加规则
 * @param params
 * @returns {*}
 */
export const requestAddRules = params => {
	return axios.post(api.addRules, Object.assign({}, params, appInfo)).then(res => res.data);
};

/**
 * 删除规则
 * @param params
 * @returns {*}
 */
export const requestDeleteRules = params => {
	return axios.post(api.deleteRules, Object.assign({}, params, appInfo)).then(res => res.data);
};

/**
 * 修改规则
 * @param params
 * @returns {*}
 */
export const requestModifyRules = params => {
	return axios.post(api.modifyRules, Object.assign({}, params, appInfo)).then(res => res.data);
};

/**
 * 查询规则
 * @param params
 * @returns {*}
 */
export const requestSearchRules = params => {
	return axios.post(api.searchRules, Object.assign({}, params, appInfo)).then(res => res.data);
};

/**
 * 下载图片（依据规则id进行图片的下载）
 * @param params
 * @returns {*}
 */
export const requestRuleImgUpload = params => {
	return axios.post(api.ruleImgUpload, Object.assign({}, params, appInfo),{timeout: 1000*60*5	}).then(res => res.data);
};

/**
 * 下载图片（依据规则详情进行图片的下载）
 * @param params
 * @returns {*}
 */
export const requestDetailImgUpload = params => {
	return axios.post(api.detailImgUpload, Object.assign({}, params, appInfo),{timeout: 1000*60*5}).then(res => res.data);
};

/**
 * 创建租户
 * @param params
 * @returns {*}
 */
export const requestCreateTenant = params => {
	return axios.post(api.createTenant, params).then(res => res.data);
};

/**
 * 查询租户
 * @param params
 * @returns {*}
 */
export const requestSearchTenant = params => {
	return axios.post(api.searchTenant, params).then(res => res.data);
};

//获取图片id
export const getPicId = params => {
	return axios.post(api.getPicId, Object.assign({}, params, appInfo)).then(res => res.data);
};

//图片分片
export const uploadPart = params => {
	let config = {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	};
	return axios.post(api.uploadPart, Object.assign({}, params, appInfo), config).then(res => res.data);
};

//取消上传
export const abortUpload = params => {
	return axios.post(api.abortUpload, Object.assign({}, params, appInfo)).then(res => res.data);
};

//上传完成
export const uploadDone = params => {
	return axios.post(api.uploadDone, Object.assign({}, params, appInfo)).then(res => res.data);
};

export const uploadBlob = params => {
	let config = {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	};
	return axios.post("/mimg/v1/image/webshard", Object.assign({}, params, appInfo), config).then(res => res.data);
};