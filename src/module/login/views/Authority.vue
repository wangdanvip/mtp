/**
* Created by CHENRC2 on 2017-7-30.
* 可传入redirect作为要授权后跳转的页面，默认会跳转到welcome页
*/
<template>
  <section class="container">
    <div class="loading">
      <div class="cssload-loader"></div>
      <h3 class="tip">{{ tip }}</h3>
    </div>
  </section>
</template>
<style lang="less" scoped>
  @import "../styles/loading.less";
  .container{
    .loading{
      top: 40%;
      text-align: center;
      .cssload-loader{
        margin: 0 auto;
        margin-bottom: 12px;
      }
      .tip{
        color: rgb(165,172,177);
        text-align: center;
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
</style>
<script>
  import { checkProject,getUserRole,requestLogout } from '../api/service';
  import ls from 'utils/local_storage_tool.js';
  import {　friendTip　} from "../utils/utils";
  export default{
    data() {
      return {
        tip: friendTip.getProject,
        redirect: this.$route.query.redirect,
      }
    },
    created(){
      checkProject().then((project)=>{
        if(project.errorCode === "600000"){
          this.tip = friendTip.getRole;
          getUserRole(true).then((res)=>{
            if(res.errorCode === "600000"){
              this.tip = friendTip.entry;
            }
            this.navigateHome();
          });
        }else{
          this.navigateHome();
        }
      },err =>{
        this.navigateHome();
      });
    },
    methods: {
      /**
       * 导航
       */
      navigateHome() {
        let historyUrl=ls.getObject("historyUrl"),user=ls.getObject("user");
        //如果更换用户登录 默认返回首页
        if(!!historyUrl&&(!!!historyUrl.account || historyUrl.account== user.account)){
          window.location.href= historyUrl.historyUrl;
        }else{
          window.location.href= "/module/management.html";
        }
      }
    }
  }
</script>
