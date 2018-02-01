<template>
  <div class="son-title-wrapper">
    <div class="son-title">
      <h3>{{headTitle.titleName}}</h3>
      <div class="back fr" v-show="headTitle.isBack" @click="headTitle.path ==='' ? $router.go(-1) : $router.push(headTitle.path)"><span>返回上一页</span> <i class="mf mf-huitiao"></i></div>
    </div>
    <section class="line"></section>
  </div>
</template>

<script>
  export default {
    props: {
      headTitle: {
        titleName: '',
        isBack: {
          type: Boolean,
          default: false
        },
        path: ''
      },
    }
  }
</script>

<style lang="less" scoped>
  .son-title-wrapper {
    .son-title {
      font-size: 0;
      position: relative;
      vertical-align: bottom;
      h3 {
        margin: 8px 0 20px 0;
        padding-left: 12px;
        font: normal bold 16px 'PingFang SC, Microsoft YaHei';
        color: #21B8D5;
        line-height: 16px;
        &:before {
          content: '';
          position: absolute;
          top: 2px;
          /*top: 50%;*/
          left: 0;
          /*transform: translateY(-50%);*/
          width: 2px;
          height: 14px;
          border-radius: 1px;
          background: #21B8D5;
        }
      }
      .back {
        position: absolute;
        top: -2px;
        right: 4px;
        cursor: pointer;
        font-size: 14px;
        color: #6a707d;
        .mf-icongoback {
          font-size: 18px;
          font-weight: bold;
          color: #8a8a8a;
        }
      }
      .back:hover{
        color: #21B8D5;
        .mf-icongoback{
          color: #21B8D5;
        }
      }
    }
    .line {
      height: 0;
      width: 100%;
      margin-left: -20px;
      margin-bottom: 20px;
      padding-right: 40px;
      border-bottom: 1px solid #c1c1c1;      
    }
  }
</style>
