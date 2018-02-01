import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import Vuex from 'vuex';
import store from './vuex/store';
import ElementUI from 'element-ui';
import VueSocketio from 'vue-socket.io';
import 'src/assets/theme/theme-midea/index.css';
import 'src/styles/base.less';
import { checkLogin }  from 'utils/utils.js';
import { requestSubsystemAuth } from './api/service.js';


Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(VueSocketio,'/',{
  reconnection: false
});

// store.dispatch('basicAuthority')
// console.log(mapState(["needProject"]));
// console.log(store);
// console.log(store.state.needProject);
// mapState(["needProject"]).then((val) => {
//   console.log(val);
// })
// console.log(store.state);
// console.log(`needProject:${store.state.needProject}`);
// requestSubsystemAuth().then(res => {
//   if(res.errorCode === "620002"){
//     setTimeout('window.location.href = "/module/management.html#/welcome"',3000)
//   }else {
    
    
//   }
// })
// if(store.state.needProject){
//   new Vue({
//     store,
//     render: h => h(App)
//   }).$mount('#app');
// }else{
//   console.log('没有项目');
// }

/**
 * 登录判断
 */
checkLogin();

store.dispatch('basicAuthority').then(res=>{
  new Vue({
    render: h => h(App)
  }).$mount('#app');
});

