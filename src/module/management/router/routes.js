import VueRouter from 'vue-router';
import {authorityRouterFilter, allVisibleRouterFilter}  from 'utils/utils.js';
import ls from "utils/local_storage_tool.js";
import ss from "utils/session_storage_tool.js";
import _ from "lodash";
import store from 'src/module/management/vuex/store.js'

import Manager from '../views/Manager.vue';
import Mine from '../views/project/Mine.vue';
import Project from '../views/setting/project/Project.vue';
import ProjectEdit from '../views/setting/project/ProjectEdit.vue';
import User from '../views/setting/user/User.vue';
import UserEdit from '../views/setting/user/UserEdit.vue';
import PersonalProject from '../views/setting/user/UserPersonal.vue';
import Menu from '../views/setting/menu/MenuManagement.vue';
import Home from '../views/home/Home.vue';
import NotFound from 'components/core/core_page/404.vue';
import ProjectDetail from '../views/setting/project/ProjectDetail.vue';
import CloudDataServer from '../views/introduce/CloudDataServer.vue';
import CloudControl from '../views/introduce/CloudControl.vue';
import VideoOrderPlay from '../views/introduce/VideoOrderPlay.vue';
import ObjectStore from '../views/introduce/ObjectStore.vue';
import CacheServer from '../views/introduce/CacheServer.vue';
import SearchEngines from '../views/introduce/SearchEngines.vue';
import Authorization from 'components/utils/user_authorization/Authorization.vue';
import NewMember from 'components/utils/new_member/newMember.vue';
import Author from '../views/setting/user/Author.vue';
// 云市场
import ProductPublish from '../views/cloud_market/product_publish/PublicPublish.vue'
import ProductManagement from '../views/cloud_market/product_management/ProductManagement.vue'
import ProductLaunch from '../views/cloud_market/product_launch/ProductLaunch.vue'
import ProductComment from '../views/cloud_market/product_comment/ProductComment.vue'

import Welcome from '../views/document/welcome/Welcome.vue'
import MessageCenter from '../views/document/message_center/MessageCenter.vue'
import ServeSetting from '../views/setting/serve/ServeSetting.vue';
import CreateServe from '../views/setting/serve/CreateServe.vue';

import DocumentCenter from '../views/document/document_center/DocumentCenter.vue';
import DocumentMain from '../views/document/document_center/Main.vue';
import CloudBasicDoc from '../views/document/document_center/CloudBasicDoc.vue';
import MonitorDoc from '../views/document/document_center/MonitorDoc.vue';
import ObjectStoreDoc from '../views/document/document_center/ObjectStoreDoc.vue';
import SearchDoc from '../views/document/document_center/SearchDoc.vue';
import VideoDoc from '../views/document/document_center/VideoDoc.vue';
import CodeStandard from '../views/document/document_center/CodeStandard.vue';
import Iflow from '../views/document/document_center/Iflow.vue';


/**
 * 没权限的菜单
 * @type {[*]}
 */
const routes = [
  {
    path: '/404',
    component: NotFound,
    name: '404',
    hidden: true
  },
  {
    path: '/home',
    redirect: '/welcome',
    hidden: true,
  }, {
    path: '/d',
    component: DocumentMain,
    hidden: true,
    children: [{
      path: 'center',
      component: DocumentCenter,
      hidden: true,
    }, {
      path: 'cloudbasice',
      component: CloudBasicDoc,
      hidden: true,
    }, {
      path: 'monitor',
      component: MonitorDoc,
      hidden: true,
    }, {
      path: 'oss',
      component: ObjectStoreDoc,
      hidden: true,
    }, {
      path: 'search',
      component: SearchDoc,
      hidden: true,
    }, {
      path: 'video',
      component: VideoDoc,
      hidden: true,
    }, {
      path: 'codestandard',
      component: CodeStandard,
      hidden: true
    }, {
      path: 'iflow',
      component: Iflow,
      hidden: true
    }]
  }, {
    path: '/welcome',
    component: Welcome,
    hidden: true
  }, {
    path: '/message',
    component: MessageCenter,
    hidden: true
  }, {
    path: '/',
    hidden: true,
    redirect: '/home'
  },
  {
    path: '/cloud_data_server',
    component: CloudDataServer,
    name: "云数据服务",
    hidden: true
  }, {
    path: '/cloud_control',
    component: CloudControl,
    name: "云控制",
    hidden: true
  }, {
    path: '/video_order_play',
    component: VideoOrderPlay,
    name: "视频点播",
    hidden: true
  }, {
    path: '/object_store',
    component: ObjectStore,
    name: "对象存储",
    hidden: true
  }, {
    path: '/cache_server',
    component: CacheServer,
    name: "缓存服务",
    hidden: true
  }
  , {
    path: '/search_engines',
    component: SearchEngines,
    name: "搜索引擎",
    hidden: true
  }
  , {
    path: '*',
    hidden: true,
    redirect: {
      path: '/404'
    }
  }];

/**
 * 有权限控制的菜单
 * @type {[*]}
 */
const asyncRouterMap = [
  {
    path: '/setting',
    name: '设置',
    component: Manager,
    iconCls: 'el-icon-setting',
    meta: {
      role: ["admin"],
      linkUnActive: true
    },
    children: [
      {
        path: '/setting/menu',
        component: Menu,
        name: '菜单',
        iconCls: 'el-icon-menu',
        meta: {
          role: ["admin"]
        }
      },
      {
        path: '/setting/user',
        component: User,
        name: '用户',
        iconCls: 'el-icon-message',
        meta: {
          role: ["admin"]
        }
      }, {
        path: '/setting/user/personal_project',
        component: PersonalProject,
        name: '个人项目',
        hidden: true,
        meta: {
          activeMenu: '/setting/user'
        }
      }, {
        path: '/setting/user/project_detail/:projectId',
        name: "项目详情",
        component: ProjectDetail,
        hidden: true,
        meta: {
          activeMenu: '/setting/project'
        },
        children: [
          {
            path: '/setting/user/user_edit',
            name: "添加项目成员",
            component: UserEdit,
            hidden: true,
            meta: {
              activeMenu: '/setting/user'
            }
          }]
      }, {
        path: '/setting/project',
        component: Project,
        name: '项目',
        iconCls: 'el-icon-message',
        leaf: true,
        meta: {
          role: ["admin"]
        },
        children: [{
          path: '/setting/project/add/:id',
          component: ProjectEdit,
          name: '修改项目',
          hidden: true,
          meta: {
            activeMenu: '/setting/project',
            role: ["admin"]
          }
        }]
      }, {
        path: '/setting/serve',
        component: ServeSetting,
        name: '服务',
        iconCls: 'el-icon-message',
        leaf: true,
        meta: {
          role: ['admin']
        },
        children: [{
          path: '/setting/serve/create_serve/:type/:serverId',
          component: CreateServe,
          name: '新建(编辑)服务',
          hidden: true,
          meta: {
            activeMenu: '/setting/serve',
            role: ["admin"]
          }
        }]
      }]
  },
  {
    path: '/project',
    name: '我的项目',
    component: Manager,
    iconCls: 'el-icon-date',
    meta: {
      role: ["operator", "admin", "member"],
      linkUnActive: true
    },
    children: [{
      path: '/project/mine',
      component: Mine,
      name: '项目列表',
      iconCls: 'el-icon-message',
      meta: {
        role: ["operator"]
      }
    }, {
      path: '/user/personalproject',
      component: PersonalProject,
      name: '',
      hidden: true
    }, {
      path: '/project/projectdetail/:projectId',
      name: "项目详情",
      component: ProjectDetail,
      hidden: true,
      meta: {
        activeMenu: '/project/mine',
        role: ["operator"]
      },
      children: [
        {
          path: '/project/projectdetail/useredit/:projectId',
          name: '新增项目成员',
          component: UserEdit,
          meta: {
            role: ["operator"]
          }
        },
        {
          path: '/project/projectdetail/author/:account/:projectId',
          component: Author,
          meta: {
            role: ["operator"]
          }
        }
      ]
    }]
  },
  {
    path: '/market',
    name: '云市场',
    component: Manager,
    iconCls: 'el-icon-upload',
    redirect: '/market/product_management',
    meta: {
      role: ["admin"]
    },
    children: [
      {
        path: '/market/product_management',
        name: '产品管理',
        component: ProductPublish,
        // component: ProductManagement,
        leaf: true,
        children: [
          {
            path: '/market/product_management',
            component: ProductManagement,
            hidden: true,
            meta: {
              activeMenu: '/market/product_management'
            },
            children: [
              {
                path: '/market/product_comment/:productId',
                name: '评论',
                component: ProductComment,
                hidden: true,
                meta: {
                  activeMenu: '/market/product_management',
                  role: ["admin"]
                }
              },
            ]
          },
          {
            path: '/market/product_launch/:productId',
            component: ProductLaunch,
            name: '产品修改',
            hidden: true,
            meta: {
              activeMenu: '/market/product_management'
            }
          }
        ]
      },
      {
        path: '/market/product_launch/publish/product',
        name: '产品发布',
        component: ProductLaunch,
        hidden: true,
        meta: {
          activeMenu: '/market/product_management',
          role: ["admin"]
        }
      }
    ]
  },

];

const router = new VueRouter({
  routes
});

const user = ls.getObject("user");
const need_authority = process.env.authority;

// 线程变量，不需要鉴权则添加所有路由
if (!need_authority) {
  router.addRoutes(asyncRouterMap);
  for (let r of asyncRouterMap) {
    router.options.routes.push(r);
  }
}
else if (user) {//用户角色存在，添加角色路由控制
  const roles = _.map(user.role, 'name'),
    auth_routes = authorityRouterFilter(asyncRouterMap, roles);

  //过滤权限并动态添加路由
  router.addRoutes(auth_routes);
  for (let r of auth_routes) {
    router.options.routes.push(r);
  }
}

export default router;
