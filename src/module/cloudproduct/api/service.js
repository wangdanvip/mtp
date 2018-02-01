/**
 * Created by wenZerrrrrr on 2017/10/9.
 */
import axios from 'utils/http.js';
import * as api from "./api.js";


/**
 * 产品详情
 * @param params
 * @returns {*}
 */
export const requestProductDetail = params => {
  return axios.post(api.productDetail, params).then(res => res.data);
};

/**
 * 获取评分，下载次数，评价个数
 * @param params
 * @returns {*}
 */
export const requestProductReview = params => {
  return axios.post(api.productReview, params).then(res => res.data);
};

/**
 * 获取产品的评价列表
 * @param params
 * @returns {*}
 */
export const requestMarkList = params => {
  return axios.post(api.markList, params).then(res => res.data);
};

/**
 * 发表评论
 * @param params
 * @returns {*}
 */
export const requestMarkProduct = params => {
  return axios.post(api.markProduct, params).then(res => res.data);
};

/**
 * 产品描述的单独的请求
 * @param api
 * @returns {*}
 * */
export const requestProductionDesc = api => {
  return axios.get(api).then(res => res.data);
}

/**
 * 回复评论的接口
 * */
export const requestReplyMark = params => {
  return axios.post(api.replyMark, params).then(res => res.data);
}

/**
 * 删除回复的接口
 * */
export const requestDeleteReply = params => {
  return axios.post(api.deleteReply, params).then(res => res.data);
}

/**
 * 审核发布产品的接口
 * */
export const requestApproveProduct = params => {
  return axios.post(api.approveProduct, params).then(res => res.data);
}
