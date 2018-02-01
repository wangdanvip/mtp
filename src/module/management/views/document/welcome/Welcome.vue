<template>
  <paper>
    <!-- 基础资源 -->
    <div class="services">
      <h3 class="title">基础资源</h3>
      <ul class="link-box clearfix">
        <transition-group name="fadeLeft" tag="ul">
          <li class="" v-for="(item, index) in sourcesList" :key="item.serverId">
            <a class="link" @click="whereToGo(item, $event.target)" href="javascript:void(0)">
              <img class="contentBox" :src="item.serverIcon">
              <p class="doc_title">{{item.serverName}}</p>
            </a>
          </li>
        </transition-group>
      </ul>
      <BorderOnePx class="singleLine"></BorderOnePx>
    </div>

    <!-- 基础服务 -->
    <div class="services">
      <h3 class="title">基础服务</h3>
      <ul class="link-box clearfix">
        <transition-group name="fadeLeft" tag="ul">
          <li class="" v-for="(item, index) in servicesList" :key="item.serverId">
            <a class="link" @click="whereToGo(item, $event.target)" href="javascript:void(0)">
              <img class="contentBox" :src="item.serverIcon">
              <p class="doc_title">{{item.serverName}}</p>
            </a>
          </li>
        </transition-group>
      </ul>
      <BorderOnePx class="singleLine"></BorderOnePx>
    </div>

    <!-- 基础应用 -->
    <div class="services">
      <h3 class="title">基础应用</h3>
      <ul class="link-box clearfix">
        <transition-group name="fadeLeft" tag="ul">
          <li class="" v-for="(item, index) in applyList" :key="item.serverId">
            <a class="link" @click="whereToGo(item, $event.target)" href="javascript:void(0)">
              <img class="contentBox" :src="item.serverIcon" :alt="item.serverName">
              <p class="doc_title">{{item.serverName}}</p>
            </a>
          </li>
        </transition-group>
      </ul>
    </div>
  </paper>
</template>

<style lang="less" scoped>
  .services {
    margin-top: 36px;
    &:first-child {
      margin-top: 0;
    }
    .title {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #211E2E;
      letter-spacing: 0;
      margin-bottom: 24px;
    }
    .link-box {
      min-height: 180px;
      li {
        float: left;
        margin-bottom: 12px;
        width: 16.6%;
        @media screen and (max-width: 1220px) {
          width: 20%;
        }
        @media screen and (max-width: 1000px) {
          width: 25%;
        }
        @media screen and (max-width: 768px) {
          width: 33.3%;
        }
        @media screen and (max-width: 600px) {
          width: 50%;
        }
        @media screen and (max-width: 430px) {
          width: 100%;
        }
        .link {
          display: inline-block;
          width: 100%;
          height: 100%;
          text-align: center;
          .contentBox {
            width: 184px;
            height: 110px;
            padding-bottom: 20px;
            transition: all 0.6s;
            &:hover {
              transform: scale(1.1);
            }
          }
          .doc_title {
            font-family: PingFangSC-Light;
            font-size: 12px;
            color: #211E2E;
            word-wrap: break-word;
            letter-spacing: 0;
            margin-bottom: 22px;
          }
        }
      }
    }
    .singleLine {
      margin-top: 15px;
    }
  }

  .clearfix {
    zoom: 1;
    &:before, &:after {
      content: "";
      display: block;
      clear: both;
    }
  }
</style>

<script>
  import * as srv from '../../../api/service.js';
  import ls from 'utils/local_storage_tool.js';
  import ss from 'utils/session_storage_tool.js';
  import utils from 'utils/utils.js';
  import BorderOnePx from 'components/awesome/border_one_px/BorderOnePx'
  export default {
    data(){
      return {
        servicesList: [],
        sourcesList: [],
        applyList: []
      }
    },
    created() {
      this.requestData();
    },
    methods: {
      /**
       * 请求数据
       * */
      requestData() {
        let params = {
          index: 1,
          pageSize: 1000
        };
        srv.requestListByEnable(params).then(res => {
          if (res.errorCode === "600000" && res.msg === "success") {
            let {info} = res.result;
            for (var i = 0; i < info.length; i++) {
              //0基础资源 1基础服务 2基础应用
              if (info[i].type === "基础资源") {
                this.sourcesList.push(info[i]);
              }
              else if (info[i].type === "基础服务") {
                this.servicesList.push(info[i]);
              }
              else if (info[i].type === "基础应用") {
                this.applyList.push(info[i]);
              }
            }
          }
        });
      },
      /**
       * 决定去哪里的函数
       * @params
       *   needProject 0 1 是否需要项目
       *   systemClass 0 1 2   内部  外部  金融
       *   link
       * return     none
       * */
      whereToGo(item, target) {
        if (!item.serverId) return;
        let params = {
          "serverId": item.serverId
        };
        srv.requestSubsystemAuth(params).then(res => {
          if (res.errorCode === "600000" && res.msg === "success") {
            if (res.result.ossToken) {
              ls.addItem("token", res.result.ossToken);
            }
              // 0是内部系统
            if (res.result.systemClass != "0") {
              window.open(res.result.link);       // 不是内部系统
            }
            else {
              const user = ls.getObject("user");
              if( !parseInt(item.needProject) || user.projectId.length ){
                window.location.href = res.result.link;    // 内部系统
              }
              else{
                this.$notify({
                  title: '提示',
                  message: '对不起，您暂时还未开通项目，请先到MIP申请开通。',
                  type: 'warning'
                });
              }
            }
          }
          else if (res.errorCode === "670001") {
            this.$notify({
              title: '提示',
              message: '找不到服务',
              type: 'error'
            });
          }
          else if (res.errorCode === "620002") {
            this.$notify({
              title: '提示',
              message: '对不起，您暂时还未开通项目，请先到MIP申请开通。',
              type: 'warning'
            });
          }
          else if(res.errorCode === "610001"){
            this.$notify({
              title: '提示',
              message: '您无权限访问该系统，请联系管理员开通访问权限',
              type: 'warning'
            });
          }
        });
      }
    },
    components: {
      'BorderOnePx': BorderOnePx
    }
  }
</script>
