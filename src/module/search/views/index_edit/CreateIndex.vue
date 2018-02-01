<template>
  <section class="container">
      <paper class="container-card">
        <son-title :headTitle="headTitle"></son-title>
        <div class="form-container">
          <el-form :model="ruleForm" ref="ruleForm" :rules="createIndexRules" label-width="70px" class="demo-ruleForm" label-position="left">
            <div class="inline-box">
              <el-form-item label="索引名称" prop="index_name" class="inline-form">
                <el-input placeholder="请输入索引名称" style="width:200px" v-model="ruleForm.index_name" :maxlength="128"></el-input>
              </el-form-item>
              <el-form-item label="索引类型" class="inline-form" prop="process_type">
                <el-select placeholder="请选择索引类型" v-model="ruleForm.process_type">
                  <el-option label="common" value="0"></el-option>
                  <el-option label="special" value="1"></el-option>
                  <!-- <el-option label="special" value="special"></el-option> -->
                </el-select>
              </el-form-item>
              <el-form-item label="开发者ID" class="inline-form" >
                <el-select placeholder="请选择开发者ID" v-model="ruleForm.appid">
                  <el-option v-for="item in appidOptions" :label="item.appid" :value="item.appid"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="索引描述" prop="desc" class="area-form">
                <el-input type="textarea" v-model="ruleForm.desc" :maxlength="128" placeholder="最多输入128个字符"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="tl clearfix">
          <h3>字段列表</h3>
        </div>
        <border-one-px style="margin: 10px 0;"></border-one-px>
        <!-- <div class="btn">
          <el-button @click="addNewOne">新增</el-button>
        </div>
        <div class="mask">
          <add-index-field ref="addBtn" :tableData="tableData" :isShow="isShow" @close-state="closeState" @get-form-data="getFormData"></add-index-field>
        </div>
        <full-table :data="tableRealData" :title="title" :page="page" :setting="tableSetting" @size-change="sizeChange" @current-change="currentChange" :columnsOperation="columnsOperation"></full-table>
        <border-one-px style="margin: 10px 0;"></border-one-px>
        <div class="btn-group">
          <el-button @click="backBefore">取消</el-button>
          <el-button type="primary" @click="sureCreated" :disabled="buttonDisable">提交</el-button>
        </div> -->
        <div>
          <detail-field :data="ruleForm" :isCreated="isCreated"></detail-field>
        </div>
      </paper>
  </section>
</template>
<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 24px;
    .back{
      cursor: pointer;
    }
    .form-container{
      margin: 0;
      padding-bottom:20px;
      position: relative;
      .demo-ruleForm{

      }
      .inline-form{
        display: inline-block;
        margin: 20px 40px 30px 0;
      }
      .form-appid{
        margin-right: 0;
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
  import Vue from 'vue';
  import DetailField from '../index_edit/DetailField.vue'
  import Paper from 'components/awesome/paper/Paper.vue';
  import SonTitle from 'components/awesome/son_title/SonTitle.vue';
  import BorderOnePx from 'components/awesome/border_one_px/BorderOnePx.vue';
  import * as srv from '../../api/service';

  export default{
    data() {
      return {
        headTitle: {
          titleName: '新建索引', // 标题的名字
          isBack: true,    // 是否显示返回上一步的骚操作，可不传
          path: ''
        },
        isShow: false,
        ruleForm:{
          index_name:'',
          process_type:'',
          appid:'',
          desc:''
        },
        isCreated: true,
        appidOptions:[],
        createIndexRules: {
          index_name: [
            { required: true, message: '请填写索引名称', trigger: 'blur' },
            { required: true, validator:(rule,value,callback)=>{
              if(/^[a-z_0-9]*$/.test(value) == false){
                  callback(new Error("只能输入小写英文,数字,下划线(最多128个字符)"));
              }else{
                  callback();
              }
          }, trigger: 'blur' }
          ],
          process_type: [
            { required: true, message: '请选择字段类型', trigger: 'change' }
          ],
          appid:[
            { required: true, message: '请选择开发者ID', trigger: 'change' }
          ],
        },
      }
    },
    components: {
      "border-one-px": BorderOnePx,
      "son-title": SonTitle,
      "paper": Paper,
      'detail-field':DetailField
    }
  }
</script>
