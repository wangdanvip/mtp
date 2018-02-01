import Manager from './views/Manager.vue';
import Open from './views/Open.vue';
import AppManage from './views/AppManage.vue';
import PicManage from './views/PicManage.vue';
import PicDeal from './views/PicDeal.vue';
// import PreView from './views/components/preview.vue';

import NotFound from 'components/core/core_page/404.vue';


let routes = [{
	path: '/404',
	component: NotFound,
	hidden: true
},{
	path: '/',
	hidden: true,
	component: PicManage,
	redirect: '/pic/picmanage'
},{
	path: '/views',
	name: '图片服务',
	meta: {
		linkUnActive:true
	},
	component: Manager,
	iconCls: 'mf mf-tupian',
	children: [{
		path:'/pic/picmanage',
		component:PicManage,
		name:'图片管理'
	}, {
		path:'/pic/PicDeal',
		component:PicDeal,
		name:'图片处理',
	}, {
		path:'/pic/AppManage',
		component:AppManage,
		name:'应用管理',
	}
	// ,{
	// 	path: '/pic/components/preview',
	// 	name: "编辑页",
	// 	component: PreView,
	// 	hidden: true,
	// }
]
}, {
	path: '/pic/Open',
	hidden: true,
	name: '开通图片服务',
	component: Open
}];

export default routes;
