/**
 * Created by CHENRC2 on 2017-7-13.
 */
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import 'src/assets/theme/theme-midea/index.css';
import 'src/styles/base.less';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import store from './vuex/store';
import routes from './routes';
import moment from 'moment';
import { checkLogin } from 'utils/utils.js'
import _ from 'lodash';
import VueSocketio from 'vue-socket.io';
import Bus from './api/bus';
import Paper from 'components/awesome/paper/Paper.vue'

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueSocketio,'/');


Object.defineProperty(Vue.prototype, '$moment', { value: moment });
Object.defineProperty(Vue.prototype, '$_', { value: _ });

Vue.component('paper',Paper);

const router = new VueRouter({
  routes
});

Vue.filter('isPreview', function(fileName){
	var ext = fileName.substring(fileName.lastIndexOf('.')+1);
	ext = ext.toLowerCase();
	var previewExt = ['doc','docx','ppt','pptx','xls','xlsx','pdf','txt','jpg','jpeg','gif','png','bmp','ico'];
	return previewExt.indexOf(ext) == -1 ? true : false;
});

// 授权页面路由权限拦截
router.beforeEach((to, from, next) => {
	if(store.state.isAuthority && to.path !== "/pic/Open"){
		router.replace('/pic/Open');
	}else if(to.path === "/pic/Open" && !store.state.isAuthority){
		router.replace('/');
	}else{
		next();
	}
});


//获取完权限再加载
store.dispatch('picAuthority').then(res=>{
	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app');
});

/**
 * 登录判断
 */
checkLogin(router);

