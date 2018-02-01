<template>
    <div class="container-fluid">
      <!-- <div class="box">
        <h2 class="cloud">搜索引擎</h2>
        <p class="cloudmsg">
          美的云结合美的内部需求自主研发的一套企业版搜索引擎，简称美易搜，致力于帮助企业用户精准，快速检索出需要的信息，支持分权限查看，智能拍讯，多语言，对接多种数据源等功能。
        </p>
        <h4 class="des">美易搜平台优势</h4>
        <div class="contentbox">
          <div class="bottom">
            <a><img src="/static/images/cloudDataImg/videoorder1_07.png" alt=""></a>
            <a><img src="/static/images/cloudDataImg/objectstore_03.png" alt=""></a>
            <a><img src="/static/images/cloudDataImg/videoorder1_11.png" alt=""></a>
          </div>
          <div class="bottom_desc">
            <p class="control">自主研发可定制</p>
            <p class="control">智能排序</p>
            <p class="control">实时性强</p>
          </div>
          <div class="top">
            <a><img src="/static/images/cloudDataImg/cloudcontrol_05.png" alt=""></a>
            <a><img src="/static/images/cloudDataImg/cloudcontrol_07.png" alt=""></a>
          </div>
          <div class="top_desc">
            <p class="control">全文检索</p>
            <p class="control">智能学习</p>
          </div>
          <el-button class="pri" type="primary" v-if="isAuth" @click="createTenant">点击开通</el-button>
          <p class="tip_text" v-if="!isAuth">项目成员无权开通该服务，请联系项目管理员开通服务。</p>
        </div>
      </div> -->
      <paper>
        <div class="content-box">
          <div class="product-desc">
            <div class="search-title">
              <div class="search-icon"><span class="el-icon-search"></span></div>
              <p>美的云搜索引擎</p>
            </div>
            <p class="detail-desc">美的云搜索引擎（Midea Search Kit）是美的云结合美的内部需求自主研发一套企业数据搜索需求的托管服务，支持搜索结构、搜索排序及数据处理自由定制，为美的企业内部应用提供简单集成、低成本、稳定、高效的搜索解决方案。</p>
            <div class="search-op">
              <el-button @click="createTenant">点击开通</el-button>
              <div class="help-doc">查看帮助文档</div>
            </div>
          </div>
          <div class="detail-content">
            <search-tabs></search-tabs>
          </div>
        </div>
      </paper>
    </div>
</template>
<style lang="less" scoped>
  @import '~styles/vars.less';
  .container-fluid{
    width: 100%;
    height: 100%;
    .content-box {
      padding: 20px 80px 80px 80px ;
      .product-desc {
        height: 30%;
        .search-title {
          position: relative;
          margin-bottom: 25px;
          .search-icon {
            border-radius: 4px;
            padding: 2px;
            background-color: #21b8d5;
            position: absolute;
            left: 0;
            top: 0;
            span {
              color: #ffffff;
              font-size: 30px;
            }
          }
          p{
            height: 34px;
            line-height: 34px;
            font-size: 28px;
            font-weight: 400;
            text-align: left;
            margin-left: 40px;
          }
        }
        .detail-desc {
          font-size: 14px;
          line-height: 25px;
          text-align: left;
          font-weight: 400;
          margin-bottom: 35px;
        }
        .search-op{
          position: relative;
          margin-bottom: 60px;
          .el-button {
            background: #21b8d5;
            width: 100px;
            color: #ffffff;
            font-size: 16px;
            font-weight: 700;
          }
          .help-doc{
            position: absolute;
            left: 140px;
            top: 0;
            font-size: 16px;
            font-weight: 700;
            color: #21b8d5;
            height: 35px;
            line-height: 35px;
            cursor: pointer;
          }
        }
      }
      .detaol-content {
        height: 70%;
      }
    }
  }
  
</style>
<script>
  import CoreBreadCrumb from 'components/core/core_bread_crumb/CoreBreadCrumb.vue';
  import CoreNavSub from 'components/core/core_nav_sub/CoreNavSub.vue';
  import { noAuthErrorCode } from '../../utils/utils';
  import { requestTenantInfo, requestCreateTenant } from '../../api/service';
  import SearchTabs from '../index_edit/SearchTabs.vue';
  import ls from 'utils/local_storage_tool';

  export default{
    name:"cacheServer",
    data(){
      return{
        user:ls.getObject("user").account
      }
    },
    created () {
      // this.$notify.error('该项目下尚未开通搜索引擎，请开通应用再继续其他操作！');
      // this.getTenantInfo()
    },
    methods:{
      createTenant() {
        let params = {userid: this.user}
        requestCreateTenant(params).then(res => {
          if(res.code === 0){
            this.$store.dispatch("changeAuthority",false);
            this.$notify({
              type: 'success',
              message: '已成功创建新租户'
            });
            this.$router.replace('/search/indexmanagement');
          }
        })
      },
      // createTenant() {
      //   this.$prompt('请输入租户描述', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     inputPattern: /^\w+$/,
      //     inputErrorMessage: '租户描述格式不正确(只能输入英文，数字，下划线)'
      //   }).then(({ value }) => {
      //     let params = {"desc":value}
      //     requestCreateTenant(params).then(data => {
      //       if(data.errorCode === 0){
      //         this.$store.dispatch("changeAuthority",true);
      //         this.$message({
      //           type: 'success',
      //           message: '已成功创建新租户'
      //         });
      //         this.$router.replace('/search/indexmanagement');
      //       }
      //     })
      //   }).catch(() => {
      //   });
      // },
      // getTenantInfo () {
			// 	let params = JSON.stringify({
			// 	}),that=this;
      //   //如果没有系统级别权限则隐藏按钮，否则按子系统判断是否显示按钮
      //   if(!this.$store.state.isSystemAuth){
      //     that.isAuth=false;
      //   }else{
      //     requestTenantInfo(params).then(res => {
      //       that.isAuth = res.errorCode == noAuthErrorCode;
      //     });
      //   }
			// }
    },
    components: {
      'core-bread-crumb': CoreBreadCrumb,
      'core-nav-sub': CoreNavSub,
      'search-tabs': SearchTabs
    }
  }
</script>
