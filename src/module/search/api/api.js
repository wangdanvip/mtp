// 创建索引接口
export const createIndex =  '/v1/search/index/create';

// 重建索引接口
export const rebuildIndex =  '/v1/search/index/reindex';

// 获取租户下的索引列表接口
export const getIndexList =  '/v1/search/index/get';

// 输入索引名进行搜索接口
export const searchIndex =  '/v1/search/index/get';

// 简单搜索接口
// export const simpleSearch =  '/v1/search/index/query';

// 获取索引下的数据详情接口
// export const indexDetail =  '/v1/search/index/query';

// 模拟应用推送接口
export const simulationPush =  '/v1/common/push';

// 搜索接口
export const searchDetail =  '/v1/search/index/query';

// 获取租户信息接口
export let tenantInfo =  '/v1/search/tenant/info';

// 创建租户接口
export const createTenant =  '/v1/search/tenant/create';

//判断是否有权限
export const userAuth = '/v1/mtp/service/user/auth';

