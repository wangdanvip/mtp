/**
 * Created by CHENRC2 on 2017-7-25.
 */

// 获取用户列表的接口
export const userList =  '/v1/mtp/service/get/user/list';

// 获取用户信息的接口
export const userInfo =  '/v1/mtp/service/get/user/info';

// 获取用户个人的项目列表
export const userProjectList =  '/v1/mtp/service/get/user/projects';

// 获取项目列表的接口
export const projectList =  '/v1/mtp/service/get/project/list';

// 获取项目信息的接口
export const projectInfo =  '/v1/mtp/service/get/project/info';

// 获取项目成员列表的接口
export const projectMemberList =  '/v1/mtp/service/get/project/member/list';

// 删除项目成员的接口
export const deleteProjectMember = '/v1/mtp/service/delete/project/member';

// 新增项目
export const addProject =  '/v1/mtp/service/add/project';

// 修改项目
export const updateProject =  '/v1/mtp/service/update/project';

// 删除项目
export const deleteProject =  '/v1/mtp/service/delete/project';

// 获取服务授权项列表
export const serviceList =  '/v1/mtp/service/get/server/right/list';

// 开通二级菜单服务
export const openService=  '/v1/mtp/service/open/second/menu';

/*
*-----------------菜单管理
*/

// 获取内部系统菜单
export const systemMenu=  '/v1/mtp/service/get/menus';

// 新建菜单
export const addMenu=  '/v1/mtp/service/menu/add';

// 编辑菜单
export const modifyMenu=  '/v1/mtp/service/menu/edit';

// 获取菜单详情
export const menuDetail=  '/v1/mtp/service/menu/get/detail';

// 获取菜单列表
export const menuList=  '/v1/mtp/service/menu/get/list/by/level';

// 删除菜单
export const deleteMenu=  '/v1/mtp/service/menu/delete';

/*
*-----------------云市场
*/

// 发布或者修改产品
export const publishOrModify = '/v1/market/service/publish/product'

// 获取发布的产品列表
export const productlists = '/v1/market/service/publish/product/list'

// 获取产品列表（首页）
export const masterProductlists = '/v1/market/service/product/list'

// 批量删除产品
export const deleteMultipleProducts = '/v1/market/service/delete/product'

// 获取产品的评价列表
export const commentlists = '/v1/market/service/mark/list'

// 删除评价
export const deleteComments = '/v1/market/service/delete/mark'

// 上传文件
export const uploadFiles = '/v1/image/service/upload'

// 发表评论
export const publishComments = '/v1/market/service/mark/product'

// 获取产品详情
export const productDetails = '/v1/market/service/product/detail'

// 修改产品序号
export const productOrders = '/v1/market/service/update/seq'


//------------------------服务部分
// 获取服务列表
export const serveLists = '/v1/mtp/service/server/get/list'

// 获取首页的服务列表
export const getListByEnable = '/v1/mtp/service/server/get/list/byEnable'

// 子系统认证
export const subsystemAuth = '/v1/mtp/service/subsystem/auth'

// 新建/编辑服务
export const createOrModifyServe = '/v1/mtp/service/server/edit'

// 获取服务详情

export const serveDetails = '/v1/mtp/service/server/get/detail'

// 删除服务
export const deleteServe = '/v1/mtp/service/server/delete'

// 启用/禁用服务
export const openOrforbiddenServe = '/v1/mtp/service/server/update/enable'

//-------------------------消息中心
// 获取用户消息列表
export const messageLists = '/v1/mtp/service/message/get/list'

// 修改用户消息状态
export const modifyMessageSituation = '/v1/mtp/service/message/status/edit'

// 删除用户消息
export const deleteMessage = '/v1/mtp/service/message/delete'

// 获取用户未读消息条数
export const notReadedMessage = '/v1/mtp/service/message/unread'

// 标记用户所有未读消息为已读
export const havebeenReadedMessage = '/v1/mtp/service/message/unread'
