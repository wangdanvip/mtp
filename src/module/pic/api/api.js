

// 删除图片
export const deletePic =  '/mimg/v1/image/delete';

// 图片重命名
export const resetImgName =  '/mimg/v1/image/rename';

// 获取图片列表
export const getPicList =  '/mimg/v1/image/get';

// 增加规则
export const addRules =  '/mimg/v1/rule/add';

// 删除规则
export const deleteRules =  '/mimg/v1/rule/delete';

// 修改规则
export const modifyRules =  '/mimg/v1/rule/update';

// 查询规则
export const searchRules =  '/mimg/v1/rule/get';

// 创建租户接口
export const createTenant =  '/mimg/v1/tenant/create';

// 查询租户
export const searchTenant =  '/mimg/v1/tenant/get';

// 下载图片（依据规则id进行图片的下载）
export const ruleImgUpload =  '/mimg/v1/image/rule/scale';

// 下载图片
export const detailImgUpload =  '/mimg/v1/image/scale';

//获取图片id
export const getPicId = '/mimg/v1/image/upload';

//上传分片
export const uploadPart = '/mimg/v1/image/shard';

//取消上传
export const abortUpload = '/mimg/v1/image/abort';

//完成上传
export const uploadDone = '/mimg/v1/image/done';