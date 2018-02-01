<template>
  <div class="wrapper">
    <div class="content-box">
      <el-row class="title-box" ref="title">
        <el-col style="min-width: 210px;" :lg="{span:3, offset:4}" :md="{span:3, offset:3}" :sm="{span:3, offset:2}" :xs="{span:1, offset:1}">
          <div class="logo">
            <img v-if="productDetail.logo&&productDetail.logo[0]" :src="productDetail.logo[0]"/>
            <img :src="defaultLogo" v-else/>
          </div>
        </el-col>
        <el-col :push="1" :span="12">
          <div class="brief">
            <div class="name">{{productDetail.name}}</div>
            <div class="desc">{{productDetail.introduction}}</div>
            <div class="rating">
              <span>
                好评热度:
                <star v-if="briefData.mark!=-1" :score="briefData.mark/2"></star>
                <star v-else :score="3.5"></star>
                <span class="remark"><i class="mf mf-pinglun"></i>点评</span>
                <span class="times">下载次数: <span>{{productDetail.downloadTimes}}</span>次</span>
              </span>
            </div>
            <div class="download">
              <el-button style="height: 34px;width: 100px;margin-right: 10px" type="primary" v-if="productDetail.download" @click="openDownload(productDetail.download)">立即下载</el-button>
              <el-button style="margin-left: 0px" type="text" @click="openGuide(productDetail.handbook)">查看使用指南</el-button>
            </div>
          </div>
        </el-col>
        <el-col :offset="4"></el-col>
      </el-row>
      <el-row class="tips" ref="tips">
        <el-col :lg="{span:20, offset:4}" :md="{span:21, offset:3}" :sm="{span:22, offset:2}" :xs="{span:23, offset:1}" style="" >
          <ul class='tips-first-ul'>
            <li class="version-box">
              <span class="tl-color">版本信息:&nbsp;</span>
              <el-tooltip v-for="(item,index) in productDetail.version" :key="index" class="item" effect="light" placement="bottom-start">
                <div style="line-height: 24px;" slot="content">版本号:{{item.seq}}<br>版本详情:{{item.detail}}<br>发布时间:{{item.publishTime}}</div>
                <span v-if="item.seq" class="version">
                  <span>{{item.seq}}</span>
                </span>
              </el-tooltip>
            </li>
            <li class="os">
              <div class="word-break"><span class="tl-color">操作系统:</span> {{productDetail.supportOs}}</div>
            </li>
            <li class="os">
              <div class="word-break"><span class="tl-color">发布者:</span> {{productDetail.developer}}</div>
            </li>
          </ul>
          <ul class="tips-second-ul">
            <li class="promulgator">
              <span class="tl-color">最后发布时间: </span><span>&nbsp;{{productDetail.updateTime}}</span>
            </li>
            <li class="compatibility" v-if="productDetail.compatibility">
              <span class="tl-color">兼容性:</span><span>&nbsp;&nbsp;{{productDetail.compatibility}}</span>
            </li>
          </ul>
        </el-col>
      </el-row>
      <el-row class="evaluate">
        <el-col :lg="{span:16, offset:4}" :md="{span:16, offset:3}" :sm="{span:16, offset:2}" :xs="{span:16, offset:1}">
          <el-tabs style="padding-top: 8px; min-height: 300px" v-model="activeName">
            <el-tab-pane label="产品介绍" name="first">
              <div class="introduce-box">
                <div class="introduce" id="introduce-box"></div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="使用概况" name="third" v-if="thirdTabShow">
              <div class="situation-box" v-if="item.depart!==''" v-for="item in productDetail.useSituation">
                <div class="department">
                  <span class="icon-box">
                    <i class="mf mf-bumen"></i>
                  </span>
                  <ul>
                    <li class="content-title">使用部门:</li>
                    <li class="content-words">{{item.depart}}</li>
                  </ul>
                </div>
                <div class="system">
                  <span class="icon-box">
                    <i class="mf mf-xitong"></i>
                  </span>
                  <ul>
                    <li class="content-title">使用系统:</li>
                    <li class="content-words">{{item.system}}</li>
                  </ul>
                </div>
                <div class="comment">
                  <span class="icon-box">
                    <i class="mf mf-pingjia"></i>
                  </span>
                  <ul>
                    <li class="content-title">使用评价:</li>
                    <li class="content-words">{{item.evaluation}}</li>
                  </ul>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>
      <div class="btn-wrapper" v-if="!productDetail.status">
        <div class="btn-group">
          <el-button @click="approveProduct(1)" type="primary">通过</el-button>
          <el-button @click="approveProduct(2)">驳回</el-button>
          <el-button @click="closeThisWindow">取消</el-button>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  // 方法
  import ls from 'utils/local_storage_tool.js';
  import * as srv from '../../../api/service';
  import {getParams} from '../../../common/js/utils'

  // 组件
  import Star from 'components/awesome/star/Star.vue';

  export default {
    name: 'productDetail',
    created() {
      this.params = getParams();
    },
    mounted() {
      this.requestProductDetail();
      this.requestMark();
    },
    data() {
      return {
        defaultLogo: require('./Mmaster200.png'),
        activeName: 'first',
        thirdTabShow: false,
        productDetail: {},
        briefData: {
        },
      }
    },
    methods: {
      /**
       * 使用函数控制产品介绍的样式
       * @params str---后台传回来带有标签的字符串
       * return undefined
       * */
      controlStyle(str) {
        var introBox = document.getElementById('introduce-box');
        introBox.innerHTML = str;
        var imgList = introBox.getElementsByTagName('img');
        var h1List = introBox.getElementsByTagName('h1');
        var h2List = introBox.getElementsByTagName('h2');
        // 处理图片
        var bodyWidth = introBox.clientWidth;
        var index = 0;
        var func = function () {
          index++;
          if(index == imgList.length) {
            for(var i = 0; i < imgList.length; i++) {
              if (imgList[i].width > bodyWidth) {
                imgList[i].setAttribute('width', '100%');
              }
            }
          }
        }
        for(let i = 0; i < imgList.length; i++) {
          imgList[i].onload = func; // 每张图片onload完之后要执行的操作
        }

        // 处理h1
        for(var j = 0; j < h1List.length; j++) {
          h1List[j].style.marginTop = '30px';
          h1List[j].style.marginBottom = '12px';
          h1List[j].style.fontWeight = 'bold';
          h1List[j].style.fontSize = '22px';
          h1List[j].style.color = '#000';
        }

        // 处理h2
        for(var k = 0; k < h2List.length; k++) {
          h2List[k].style.marginTop = '10px';
          h2List[k].style.marginBottom = '10px';
          h2List[k].style.fontWeight = 'bold';
          h2List[k].style.fontSize = '18px';
          h2List[k].style.color = '#000';
        }
      },

      /**
       * 请求产品详情的数据
       * @params productId2---产品id
       * return undefined
       * */
      requestProductDetail(productId2) {
        let productId = this.params.productId || productId2 || 191;
        srv.requestProductDetail({"productId": productId}).then(res => {
          if (res.code === 200 && res.msg === 'ok') {
            if (res.result.status !== 0) {  // 假如不是待审核状态的时候
              this.$notify({
                type: 'warning',
                message: `这款产品您已经审核过了哦`
              });
            }
            res.result.logo = res.result.logo.split(',');
            this.productDetail = res.result;
            let condition = this.productDetail.useSituation[0] && this.productDetail.useSituation[0].depart !== '';
            if ( condition ) {this.thirdTabShow=true;}
            let str, strArr, index, api;
            str = res.result.description;
            strArr = str.split('//');
            index = strArr[1].indexOf('/');
            api = strArr[1].slice(index);
            String(api);
            srv.requestProductionDesc(api).then(res => {
              // 这里写js控制样式
              this.controlStyle(res);
            })
          }
          else if (res.code === 603) {
            this.$notify({
              title: '提示',
              message: '产品不存在',
              type: 'error'
            });
          }
        })
      },

      /**
       * 请求产品的评分和评价个数
       * @params productId2---产品id
       * return undefined
       * */
      requestMark(productId2) {
        let productId = this.params.productId || productId2 || 191;
        srv.requestProductReview({"productId": productId}).then(res => {
          if (res.code === 200 && res.msg === 'ok') {
            this.briefData = res.result;
          }
        })
      },

      /**
       * 打开指南页面
       * @params    where---模板上面传进来的链接
       * return undefined
       * */
      openGuide(where) {
        window.open(where,'_blank');
      },

      /**
       * 打开下载页面
       * @params    where---模板上面传进来的链接
       * return undefined
       * */
      openDownload(where) {
        this.productDetail.downloadTimes++;
        window.open(where,'_blank');
        let productId = this.params.productId;
        srv.requestDownloadCount({"productId": productId}).then(res => {})
      },

      /**
       * 关闭当前窗口
       * */
      closeThisWindow() {
        window.location.href = '/module/management.html#/market/product_management';
      },

      /**
       * 审批页面的请求
       * */
      approveProduct(val) {
        let productId = getParams().productId;
        console.log(productId);
        let params = {
          productId: Number(productId),
          operation: Number(val)
        }
        if (val === 1) {
          // 通过
          srv.requestApproveProduct(params).then(res => {
            if (res.code === 200 && res.msg ==='ok') {
              window.location.href = '/module/management.html#/market/product_management';
            }
          })
        }
        else if (val === 2) {
          // 驳回
          this.$prompt( '请输入驳回原因', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^\S+$/,
            inputErrorMessage: '请输入驳回原因'
          }).then(({ value }) => {
            params.opinion = String(value);
            srv.requestApproveProduct(params).then(res => {
              if (res.code === 200 && res.msg ==='ok') {
                window.location.href = '/module/management.html#/market/product_management';
              }
            })
          })
        }

      }
    },
    components: {
      'star': Star
    }
  }
</script>

<style lang="less" scoped>
  .wrapper {
    width: 100%;
    overflow: hidden;
    background-color: #f1f3f5;
    .crumbs {
      background-color: #fff;
      padding-left: 140px;
      color: #666;
      @media screen and (max-width: 990px) {
        padding-left: 112px;
      }
      @media screen and (max-width: 768px) {
        padding-left: 80px;
      }
      @media screen and (max-width: 758px) {
        padding-left: 60px;
      }
    }
    .content-box {
      padding: 16px;
      .title-box {
        background-color: #fff;
        padding: (230px - 340px / 2) / 2 0;
        padding-left: 16px;
        .logo {
          width: 230px;
          height: 190px;
          overflow: hidden;
          border: 1px solid #ccc;
          border-radius: 4px;
          img {
            height: 90%;
            display: block;
            margin: 0 auto;
            padding: 10px 0;
          }
        }
        .brief {
          font-size: 14px;
          color: #666;
          width: 100%;
          .name {
            padding-top: 4px;
            font-size: 24px;
            font-weight: bold;
            color: #000;
            word-wrap: break-word;
          }
          .desc {
            word-break: break-all;
            line-height: 24px;
            padding-top: 20px;
          }
          .rating {
            padding-top: 24px;
            span {
              .star {
                display: inline-block;
                margin: 0 12px 0 6px;
                vertical-align: bottom;
                @media screen and (max-width: 800px) {
                  margin: 0 6px 0 3px;
                }
              }
              .remark {
                margin-right: 60px;
                cursor: pointer;
                color: #1eb8d4;
                @media screen and (max-width: 800px) {
                  margin-right: 30px;
                }
                @media screen and (max-width: 700px) {
                  margin-right: 24px;
                }
              }
              .times {
                span {
                  color: #ffcc00;
                }
              }
            }
          }
          .download {
            margin-top: 36px;
          }
        }
      }
      .tips {
        margin-top: 16px;
        padding: 30px 0;
        padding-left: 16px;
        background-color: #fff;
        color: #333;
        line-height: 22px;
        .tips-first-ul {
          display: inline-block;
          max-width: 280px;
          padding-right: 60px;
          margin-right: 60px;
          border-right: 1px solid #e7e7e7;
          @media screen and (max-width: 1200px) {
            padding-right: 40px;
            margin-right: 40px;
          }
          @media screen and (max-width: 1024px) {
            padding-right: 20px;
            margin-right: 20px;
          }
          .word-break {
            display: inline-block;
            word-break: break-all;
          }
        }
        .tips-second-ul {
          display: inline-block;
          vertical-align: top;
          max-width: 580px;
        }
        .os {
          padding-top: 24px;
        }
        .compatibility {
          padding-top: 24px;
        }
        .promulgator {
          margin-top: 2px;
        }
        .version-box {
          .version {
            display: inline-block;
            box-sizing: border-box;
            padding: 4px 10px;
            border: 1px solid #e6e6e6;
            border-radius: 2px;
            margin-left: -1px;
            height: 20px;
            min-width: 50px;
            line-height: 12px;
            text-align: center;
            &:hover {
              position: relative;
              border-color: #21b8d5;
            }
          }
          .slot-content {
            line-height: 50px !important;
          }
        }
        .tl-color {
          color: #666;
        }
      }
      .evaluate {
        margin-top: 16px;
        background-color: #fff;
        font-size: 14px;
        /* 设置tabs内容的左padding */
        .el-tab-pane {
          padding: 0 16px;
          padding-bottom: 38px;
        }
        .introduce-box {
          display: flex;
          flex-direction: column;
          .introduce {
            font-size: 16px;
            line-height: 24px;
            color: #666;
            word-wrap: break-word;
          }
        }
        .pagination-box {
          overflow: hidden;
          margin-top: 148px;
        }
        .situation-box {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          padding: 20px 0;
          border-bottom: 1px dashed #bfbfbf;
          word-break: break-all;
          .department {
            flex: 1;
            display: flex;
            margin-bottom: 4px;
            min-width: 124px;
          }
          .system {
            flex: 1;
            display: flex;
            margin-bottom: 4px;
            min-width: 124px;
          }
          .comment {
            flex: 3;
            display: flex;
            margin-bottom: 4px;
          }
          /* 共享css */
          ul {
            width: 100%;
            display: inline-block;
            vertical-align: top;
          }
          .mf-xitong, .mf-bumen, .mf-pingjia {
            font-size: 20px;
            color: #666;
          }
          .content-title {
            margin-bottom: 14px;
            color: #666;
          }
          .content-words {
            display: flex;
            flex-direction: row;
            -ms-flex-direction: row;
            font-weight: 700;
            color: #333;
          }
        }
      }
      .btn-wrapper {
        background-color: #f1f3f5;
        .btn-group {
          padding: 40px 0;
          margin-top: 16px;
          text-align: center;
          background-color: #fff;
          .el-button {
            margin: 0 8px;
            width: 100px;
            height: 32px;
            line-height: 0;
          }
        }
      }
    }
    .icon-box {
      display: inline-block;
      padding: 14px;
      margin-right: 14px;
      border-right: 1px solid #e3e3e3;
    }
  }
</style>
