import Manager from './views/Manager.vue';
import NotFound from 'components/core/core_page/404.vue';

// 子组件
import ProductPublish from 'src/module/cloudproduct/views/product_publish/PublicPublish.vue'
import ProductManagement from 'src/module/management/views/cloud_market/product_management/ProductManagement.vue';
import ProductLaunch from 'src/module/management/views/cloud_market/product_launch/ProductLaunch.vue'
import ProductComment from 'src/module/management/views/cloud_market/product_comment/ProductComment.vue'

import ProductOverviewBox from './views/product_overview/ProductOverviewBox.vue'
import ProductOverview from './views/product_overview/ProductOverview/ProductOverview.vue'

let routes = [
  {
		path: '/404',
		component: NotFound,
		name: '',
		hidden: true
	},
  {
    path: '/',
    component: ProductManagement,
    redirect: '/market/product_management',
    hidden:true
  },
  {
		path: '/market',
		name: '云产品',
		component: Manager,
		iconCls: 'mf mf-shichang',
    redirect: '/market/product_management',
    meta: {
      linkUnActive:true
    },
		children: [
		  {
        path: '/market/product_management',
        component: ProductPublish,
        name: '产品管理',
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
                  activeMenu: '/market/product_management'
                }
              }
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
        component: ProductLaunch,
        name: '产品发布',
        meta: {
          activeMenu: '/market/product_launch/publish/product'
        }
      },
    ]
	},
  {
    path: '/product_overview',
    name: '产品预览',
    component: ProductOverviewBox,
    redirect: '/product_overview/show',
    hidden: true,
    meta: {
      role: ["admin"]
    },
    children: [
      {
        path: '/product_overview/show',
        component: ProductOverview
      }
    ]
  },
  {
		path: '*',
		hidden: true,
		redirect: {
			path: '/404'
		}
	}
];

export default routes;
