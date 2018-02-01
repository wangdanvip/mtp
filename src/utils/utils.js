/**
 * Created by CHENRC2 on 2017-7-20.
 */

import _ from 'lodash';
import moment from 'moment';
import aes from './aes.js';
import ls from './local_storage_tool.js';
import ss from './session_storage_tool.js';
import store from 'src/module/management/vuex/store.js'
import VueCookie from "vue-cookie";



/**
 * 检测是否已经处理登录状态
 * @param router 路由
 * @params params 检验参数  redirect为需要重定向  空表示不需要项目的检验
 */
export const checkLogin = (router,params = {}) => {
  let auth = true;
  if(params.hasOwnProperty("redirect")){
    auth = authorityFilter(params);
  }
  if(auth){
    if(router){
      router.beforeEach((to, from, next) => {
        const pathName=window.location.pathname,
          url = pathName + window.location.hash,
          jsessionid = VueCookie.get("JSESSIONID"),
          user = ls.getObject("user"),
          filterUrl=process.env.urlNoAuthority,
          isFilterUrl =!!(_.findIndex(filterUrl,u=>u===to.path )+1);// 过滤不需要鉴权的页面
        if ((!user||!jsessionid) && !isFilterUrl && to.path != "/login") { //用户或者cookie不存在跳转登录
          ls.addItem('historyUrl',JSON.stringify({ historyUrl: window.location.href,account:"" }));//记录访问的地址
          window.location.href = '/#/login';
          if(pathName=="/"){
            router.push('login');
          }
        } else if (jsessionid && user && user.role && (url === "/#/login"|| to.path == "/login")){
          window.location.href = '/module/management.html#/home';
        } else {
          next();
        }
      });
    }else{
      const jsessionid = VueCookie.get("JSESSIONID"),user = ls.getObject("user");
      if(!jsessionid || !user){
        ls.addItem('historyUrl',JSON.stringify({ historyUrl: window.location.href,account:"" }));//记录访问的地址
        window.location.href = '/#/login';
      }
    }
  }
};

/**
 * 权限过滤检验
 * @param redirect 重定向链接
 * @returns {boolean}http://localhost:9527/#/authority/http://localhost:9527/module/objectstroe.html#/
 */
export const authorityFilter = (params)=>{
  const user = ls.getObject("user");
  if(user.hasOwnProperty("role")){
    return true;
  }else{
    window.location.href="/#/authority?redirect="+params.redirect;
    return false;
  }
};

/**
 * 密码加密
 * @param data 需加密的串
 * @param keyStr
 * @param ivStr
 * @returns {string}
 */
export const aesEncrypt = (data, keyStr, ivStr="0102030405060708") => {
  var sendData = aes.enc.Utf8.parse(data);
  var key = aes.enc.Utf8.parse(aes.MD5(''+keyStr).toString().substr(8, 16));
  var iv  = aes.enc.Utf8.parse(ivStr);
  var encrypted = aes.AES.encrypt(sendData, key,{ iv: iv,mode: aes.mode.CBC,padding: aes.pad.Pkcs7  });
  return encrypted.ciphertext.toString();
};

/**
 * 根据角色过滤路由
 * @param router 路由
 * @param roles 角色数据
 */
export const authorityRouterFilter=(router,roles)=>{
  let auth_router=[];
  _.forEach(router,item=>{
    let existRouter=auth_router.filter(i=>i.path==item.path);
    if(item.meta&&item.meta.role&&existRouter.length <= 0){
      const auth_role=item.meta.role;
      if(auth_role.length=== 1 &&auth_role[0]=== "*"){
        auth_router.push(item);
      }else{
        let isContainer=false;
        _.forEach(roles,role=>{
          if(filterArrValue(auth_role,role)){
            if(!isContainer){
              auth_router.push(item);
              isContainer=true;
            }
          }
        });
      }
    }else{
      auth_router.push(item);
    }
  });
  return auth_router;
};


/**
 * value 是否包涵在数组arr中
 * @param arr
 * @param value
 */
export const filterArrValue=(arr,value)=>{
  return _.filter(arr,item=> {
    return item === value;
  }).length>0;
};

/**
 * 关闭当前窗口
 */
export const closeWindow = (url)=> {
  if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") !=-1){
    window.location.href=url;
    window.close();
  } else {
    window.opener = null;
    window.open("", "_self");
    window.close();
  }
};

/**
 * 数组合并
 * @param origin 原始数组
 * @param target 需要合并的object
 */
export const arrayAssign = (origin,object)=>{
  origin.map((item)=>{
    return _.assign(item,object);
  });
  return origin;
};

/**
 * JS原生判断是否存在类
 * @param elem
 * @param cls
 * @returns {boolean}
 */
export const hasClass = (elem, cls) => {
  cls = cls || '';
  if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
};

/**
 * JS原生判断添加类
 * @param ele
 * @param cls
 */
export const addClass = (ele, cls) => {
  if (!hasClass(ele, cls)) {
    ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
  }
}

/**
 * JS原生判断删除类
 * @param ele
 * @param cls
 */
export const removeClass = (ele, cls) => {
  if (hasClass(ele, cls)) {
    var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
      newClass = newClass.replace(' ' + cls + ' ', ' ');
    }
    ele.className = newClass.replace(/^\s+|\s+$/g, '');
  }
}

/**
 * 生成UUID
 * @returns {string}
 */
export const uuid =  (len = 16, radix = 16) => {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [], i;
  radix = radix || chars.length;
  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
  } else {
    // rfc4122, version 4 form
    var r;
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random()*16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
};

/**
 * 获取主域
 * @param weburl
 * @returns {string}
 */
export const getDomain = (host = document.domain) => {
  var hostExts = [".com", ".cn", ".net", ".cc", ".sh", ".org"], ext = [], reExt, exist = false;
  for (var i = 0; i < hostExts.length; i++) {
    if (host.indexOf(hostExts[i]) != -1) {
      ext[ext.length] = hostExts[i];
      reExt = new RegExp("\\" + hostExts[i]);
      host = host.replace(reExt, "{" + (ext.length - 1) + "}");
      exist = true;
    }
    else
      break;
  }
  if(!exist){
    return host;
  }
  var hostarray = host.split('.');
  host = hostarray[hostarray.length - 1];
  for (var i = 0; i < ext.length; i++) {
    reExt = new RegExp("\\{" + i + "\\}");
    host = host.replace(reExt, ext[i]);
  }
  return host;
};

/**
 * 清除所有cookie
 */
export const clearCookie = () => {
  var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--;) {
      VueCookie.delete(keys[i], { expires: new Date(0).toUTCString()});
      VueCookie.delete(keys[i], { expires: new Date(0).toUTCString(),domain : getDomain()});
    }
  }
};
/**
 * 设置cookie
 * @param name 键
 * @param value 值
 * @param domain 域
 */
export const setCookie = (name,value,params)=>{
  document.cookie = name + "="+  value + ";domain="+params.domain||window.location.hostname;
};
/**
 * 获取URL参数
 * @param name
 * @returns {null}
 */
export const getQueryString = (name)=>{
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null)return  decodeURI(r[2]); return null;
}
