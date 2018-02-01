<template>
    <paper>
      <son-title :headTitle="{titleName:'美的技术平台文档'}"></son-title>
      <el-row>
        <el-col :span="24">
          <p class="title">欢迎使用美的技术平台，在开启美的技术之旅前，您可以先了解<a href="/module/management.html#/d/codestandard" target="_blank">《美的IT内部编程规范(试行版)》</a></p>
        </el-col>
      </el-row>
      <div class="doc_header">
        <el-row>
          <el-col :sm="8" :lg="8" :md="8" class="text-center">
            <img class="contentBox" src="/static/images/management/message/baseSource.png">
            <div class="doc_title">
              <dl>
                <dt>基础资源</dt>
                <dd><a href="/module/management.html#/d/cloudbasice" target="_blank">云基础</a></dd>
                <!--<dd><a href="javascript:;">云数据库MySQL</a></dd>
                <dd><a href="javascript:;">云缓存Redis</a></dd>-->
              </dl>
            </div>
          </el-col>
          <el-col :sm="8" :lg="8" :md="8" class="text-center">
            <img class="contentBox" src="/static/images/management/message/baseServer.png">
            <div class="doc_title">
              <dl>
                <dt>基础服务</dt>
                <dd><a href="/module/management.html#/d/monitor" target="_blank">云监控</a></dd>
                <dd><a href="/module/management.html#/d/oss" target="_blank">对象存储</a></dd>
                <dd><a href="/module/management.html#/d/video" target="_blank">视频点播</a></dd>
                <dd><a href="/module/management.html#/d/search" target="_blank">搜索引擎</a></dd>
              </dl>
            </div>
          </el-col>
            <el-col :sm="8" :lg="8" :md="8" class="text-center">
            <img class="contentBox" src="/static/images/management/message/baseApply.png">
            <div class="doc_title">
              <dl>
                <dt>基础应用</dt>
                <dd><a href="/module/management.html#/d/iflow" target="_blank">流程引擎</a></dd>
              </dl>
            </div>
          </el-col>
        </el-row>
      </div>
    </paper>
</template>
<style lang="less" scoped>
  .title {
    text-align: center;
    margin-top: 71px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    height: 16px;
    color: #211E2E;
    letter-spacing: 0;
  }
  .doc_header {
    margin: 0 auto;
    margin-top: 78px;
    .contentBox {
      width: 233px;
      height: 198px;
      margin-bottom: 20px;
    }
  }
  .doc_title {
    text-align: center;
    dt {
      font-weight: 900;
      margin-bottom: 20px;
    }
    dd {
      margin-top: 17px;
      margin-bottom: 17px;
      a {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #21B8D5;
        letter-spacing: 0;
      }
    }
  }
</style>
<script>
  import SonTitle from 'components/awesome/son_title/SonTitle'
  export default {
    data() {
      return {
      }
    },
    components: {
      'son-title': SonTitle
    }
  }
</script>
