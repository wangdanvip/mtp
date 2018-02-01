<template>
  <div id="app">
    <section class="container">
      <div class="header">
        <core-header></core-header>
      </div>
      <div class="content">
        <iframe class="ustack" id="ustack" :src="ustackSrc"></iframe>
      </div>
    </section>
  </div>
</template>

<script>
  import CoreHeader from 'components/core/core_header/CoreHeader.vue';
  import { getQueryString } from 'utils/utils';
  import { requestLogout } from '../login/api/service';
  // import {mapState} from 'vuex';
  import store from './vuex/store.js';

  export default {
    name: 'ustack',
    created(){
      // this.$store.dispatch('basicAuthority')
      this.hasProject()
      console.log(this.$store.state);
      console.log(this.$store.state.needProject);
      //iframe 窗口回调
      window.addEventListener('message',function(e){
        if( typeof e.data == 'string'){
          const msg=JSON.parse(e.data);
          if(msg.hasOwnProperty("type")){
              switch(msg.type){
                case "auth":
                    //退出登录
                  requestLogout().then(res =>{
                    if(res.errorCode.toString() === "600000"){
                      window.location.href = '/#/login';
                    }else{
                      this.$notification.error("退出登录失败，"+res.data);
                    }
                  });
                    break;
                case "callback":
                    //保存iframe里传的url信息
                  sessionStorage.setItem("ustack_callback",msg.msg);
                  break;
              }
          }
        }
      },false);
    },
    store,
    computed:{
      ustackSrc(){
        //计算当前访问的地址，如果请求URL存在则以URL为准，否则取sessionStorage
        let callback=sessionStorage.getItem("ustack_callback"),params=getQueryString("url");
        return process.env.url.ustack+"?token=" + localStorage.getItem("token")+"&callback="+ (params ?  params: (callback||""));
      },
    },
    components:{
      'core-header': CoreHeader
    },
    methods: {
      hasProject() {
        if(!this.$store.state.needProject){
          this.$notify({
            title:'提示',
            type:'warning',
            message:'对不起，您暂时还未开通项目，请先到MIP申请开通。'
          });
          setTimeout('window.location.href = "/module/management.html#/welcome"',3000)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~styles/base.less';
  .container{
    .content{
      position: absolute;
      right: 0;
      left: 0;
      top: 60px;
      bottom: 0;
      background-color: @color-background;
      .ustack{
        height:99%;
        width:100%;
      }
    }
  }
</style>
