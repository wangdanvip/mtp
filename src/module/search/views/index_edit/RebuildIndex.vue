<template>
  <section class="home-wrapper">
    <paper>
      <son-title :headTitle="headTitle"></son-title>
      <div class="index-name">索引名称：{{rowData.index_name}}</div>
      <div class="desc">描述：{{rowData.desc}}</div>
      <div class="tri">
        <ul>
          <li>类型：{{rowData.process_type}}</li>
          <li>版本：{{rowData.version}}</li>
          <li>数量：{{rowData.count}}</li>
        </ul>
      </div>
      <div class="create-time">创建时间：{{rowData.modify_time}}</div>
      <div class="update-time">更新时间：{{rowData.update_time}}</div>
      <div class="title">
        <h3>索引字段</h3>
        <border-one-px style="margin: 10px 0;"></border-one-px>
      </div>
      <div>
        <detail-field :isCreated="isCreated" ></detail-field>
      </div>
    </paper>
  </section>
</template>
<style lang="less" scoped>
  .home-wrapper {
    width: 100%;
    height: 100%;
    font-size: 14px;
    line-height: 24px;
    .back{
      cursor: pointer;
    }
    .tri {
      overflow: hidden;
      ul {
        li {
          float: left;
          margin-right: 50px;
        }
      }
    }
    .title {
      margin-top: 16px;
      font-size: 16px;
    }
    .btn {
      padding: 10px 0 20px 0;
      button {
        width: 80px;
        height: 30px;
        line-height: 8px;
      }
    }
    .btn-group {
      padding-top: 10px;
      text-align: center;
      button {
        width: 80px;
        height: 30px;
        line-height: 8px;
      }
    }
  }
</style>
<script>
  import * as srv from '../../api/service';
  import Paper from 'components/awesome/paper/Paper.vue';
  import SonTitle from 'components/awesome/son_title/SonTitle.vue';
  import BorderOnePx from '../../common/components/BorderOnePx.vue';
  import DetailField from '../index_edit/DetailField.vue'

  export default{
    data() {
      return {
        headTitle: {
          titleName: '重建索引', // 标题的名字
          isBack: true,    // 是否显示返回上一步的骚操作，可不传
          path:''
        },
        isCreated: false,
        rowData: this.$route.query.indexForm,   // 头部数据
      }
    },
    created() {
    },
    components: {
      "son-title": SonTitle,
      "border-one-px": BorderOnePx,
      "paper": Paper,
      "detail-field": DetailField
    }
  }
</script>
