<template>
    <div class="container-fluid">
      <div class="box">
        <h2 class="cloud">美的云图片服务</h2>
        <p class="cloudmsg">
          美的云结合美的内部需求自主研发的图片服务系统，提供海量图片存储，快捷、多样的图片处理功能，极速图片在线预览体验，丰富的开放API和完善的管理控制台，可支持功能定制，帮助企业快速搭建图片应用系统。
        </p>
        <h4 class="des">美 的 云  图 片 服 务 优 势</h4>
        <div class="contentbox">
          <div class="bottom">
            <a><img src="/static/images/cloudDataImg/videoorder1_07.png" alt=""></a>
            <a><img src="/static/images/cloudDataImg/objectstore_03.png" alt=""></a>
            <a><img src="/static/images/cloudDataImg/videoorder1_11.png" alt=""></a>
          </div>
          <div class="bottom_desc">
            <p class="control">自主研发可定制</p>
            <p class="control">多种图片处理</p>
            <p class="control">极速预览体验</p>
          </div>
          <div class="top">
            <a><img src="/static/images/cloudDataImg/cloudcontrol_05.png" alt=""></a>
            <a><img src="/static/images/cloudDataImg/cloudcontrol_07.png" alt=""></a>
          </div>
          <div class="top_desc">
            <p class="control">完善的管理控制台</p>
            <p class="control">快速接入</p>
          </div>
          <el-button class="pri" type="primary"  @click="createTenant">点击开通</el-button>
        </div>
      </div>
    </div>
  <!-- </section> -->
</template>
<style lang="less" scoped>
  @import '~styles/vars.less';
  .container-fluid{
    position: absolute;
    background-color: #eee;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    .box{
      width:100%;
      height:100%;
      overflow: auto;
      min-width:500px;
      text-align:center;
      .cloud{
        margin:75px 0px 40px 0px;
        font:400 18px/18px "微软雅黑";
        color:#211e2e;
      }
      .cloudmsg{
        font-size:14px;
        color:#6a707d;
        margin:0;
        padding:0;
        line-height:24px;
        width:496px;
        margin:0 auto;
        text-align:left;
      }
      .des{
        margin:25px 0 10px 0;
        font:400 18px/18px "微软雅黑";
        color:#211e2e;
      }
      .contentbox{
        .top{
          margin:0 auto;
          width:270px;
          height:71px;
          display:flex;
          justify-content:space-between;
          a{
            display:block;
            width:71px;
            height:71px;
            img{
              width:100%;
            }
          }
        }
        .top_desc{
          width:256px;
          display:flex;
          margin:0 auto;
          justify-content:space-between;
          p{
            font-size:14px;
            margin-top:10px;
            padding:0;
            color:#6a707d;
          }
        }
        .bottom{
          margin:0 auto;
          width:100%;
          height:71px;
          display:flex;
          justify-content:center;
          a{
            display:block;
            width:71px;
            height:71px;
            &:nth-child(2){
              margin-left:138px;
              margin-right:98px;
            }
            img{
              width:100%;
              display:block;
            }
          }
        }
        .bottom_desc{
          display:flex;
          width:437px;
          margin:0 auto;
          margin-top:22px;
          justify-content:space-between;
          .control{
            margin:10px 0 20px 0;
            font:400 14px/14px "微软雅黑";
            color:#6a707d;
          }
        }
        .pri{
          margin-top:20px;
          margin-bottom:40px;
          width:84px;
          height:32px;
          font-size:14px;
          line-height:12px;
        }
        .el-button{
          margin-top: 30px;
        }
      }
    }
  }
  
</style>
<script>
  import CoreBreadCrumb from 'components/core/core_bread_crumb/CoreBreadCrumb.vue';
  import CoreNavSub from 'components/core/core_nav_sub/CoreNavSub.vue';
  import { requestCreateTenant,requestSearchTenant } from '../api/service';
  import storage from 'utils/local_storage_tool';

  export default{
    name:"picSever",
    data(){
      return{
        user:storage.getObject("user").account
      }
    },
    created () {
    //   this.getTenantInfo()
    },
    methods:{
      createTenant() {
        console.log(this.user);
        let params = {userid: this.user}
        requestCreateTenant(params).then(res => {
          if(res.code === 0){
            this.$store.dispatch("changeAuthority",false);
            this.$notify({
              type: 'success',
              message: '已成功创建新租户'
            });
            this.$router.replace('/pic/PicManage');
          }
        })
      },
    },
    components: {
      'core-bread-crumb': CoreBreadCrumb,
      'core-nav-sub': CoreNavSub
    }
}
</script>
