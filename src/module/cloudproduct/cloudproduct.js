/**
 * Created by CHENRC2 on 2017-7-13.
 */
import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'babel-polyfill';
import 'src/assets/theme/theme-midea/index.css';
import 'src/styles/base.less';
import VueRouter from 'vue-router';
import routes from './routes'
import moment from 'moment';
import { checkLogin } from 'utils/utils.js'
import _ from 'lodash';
import VueSocketio from 'vue-socket.io';
import Paper from 'components/awesome/paper/Paper.vue'
import VueQuillEditor from 'vue-quill-editor'

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueSocketio,'/');
Vue.use(VueQuillEditor);


Object.defineProperty(Vue.prototype, '$moment', { value: moment });
Object.defineProperty(Vue.prototype, '$_', { value: _ });

Vue.component('paper',Paper);

const router = new VueRouter({
  routes
});


//获取完权限再加载
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

/**
 * 登录判断
 */
checkLogin(router);

export default Vue;
