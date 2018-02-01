<template>
    <paper>
        <son-title :headTitle="titles"></son-title>
        <el-form @submit.native.prevent ref="ruleForm" label-position="left" :model="ruleForm" :rules="rules"
                 label-width="100px" class="demo-ruleForm">
            <el-form-item label="产品名称 :" prop="productName">
                <el-input :maxlength="30" placeholder="请输入产品名称(限30个字符)" v-model="ruleForm.productName"></el-input>
            </el-form-item>
            <el-form-item label="产品简介 :" prop="productIntroduce">
                <el-input resize="none" type="textarea" :maxlength="150" placeholder="请输入产品简介信息(限150个字符)" v-model="ruleForm.productIntroduce"></el-input>
            </el-form-item>
            <el-form-item class="productCategory" label="产品分类 :" prop="productCategory">
                <el-row>
                    <el-col :span="24">
                        <el-select v-model="value" placeholder="前端框架">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="开发者 :" prop="developer">
                <el-input :maxlength="30" placeholder='请输入开发者信息(限30个字符)' v-model="ruleForm.developer"></el-input>
            </el-form-item>
            <el-form-item label="下载地址 :" prop="downloadURL">
                <el-input auto-complete="off"  placeholder='请输入下载地址信息'
                          v-model="ruleForm.downloadURL"></el-input>
            </el-form-item>
            <el-form-item label="手册地址 :" prop="handbookURL">
                <el-input auto-complete="off"  placeholder='请输入手册地址信息'
                          v-model="ruleForm.handbookURL"></el-input>
            </el-form-item>
            <el-form-item  label="版本详情 :" prop="versionDetails">
                <el-row>
                  <el-col :span="24">
                    <table class="detailTable" width="100%" border="1">
                      <thead>
                        <th>版本编号</th>
                        <th>版本详情</th>
                        <th class="AdditemThree">发布时间</th>
                        <th>
                          <span @click="addItem" class="addItem mf mf-lg mf-add"></span>
                        </th>
                      </thead>
                      <tbody>
                        <tr align="center" v-for="(item,key) in versions" :key="key">
                          <td>
                            <el-input
                              class="VersionInput"
                              :maxlength="6"
                              placeholder="请输入版本号(限6个字符)"
                              size="small"
                              type="text"
                              v-model='item.seq'></el-input>
                          </td>
                          <td>
                            <el-input
                              :maxlength="30"
                              size="small"
                              class="VersionInput"
                              type="text"
                              v-model='item.detail'></el-input>
                          </td>
                          <td>
                            <el-date-picker
                              v-model="item.publishTime"
                              type="date"
                              size="small"
                              align="right"
                              :picker-options="pickerOptions"
                              placeholder="选择日期">
                            </el-date-picker>
                          </td>
                          <td>
                            <span @click="deleteItem(item.id)" class="deleteItem mf mf-lg mf-shanchu"></span>
                          </td>
                      </tr>
                      </tbody>
                    </table>
                  </el-col>
                </el-row>
                <!--<span v-if="show" class="el-form-item__error">请输入版本号信息</span>-->
            </el-form-item>
            <el-form-item class="productBrand" label="产品Logo :" prop="productBrand">
                <el-row>
                    <el-col :span="4">
                      <el-upload
                                class="avatar-uploader"
                                :action="imgUrl"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess1"
                                :before-upload="beforeAvatarUpload"
                                :on-preview="handlePictureCardPreview"
                                >
                             <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                             <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                             <div slot="tip" class="el-upload__tip">
                             <div class="tips">首页logo</div>
                               只能上传png文件，且不超过1M
                             </div>
                      </el-upload>
                    </el-col>
                    <el-col :span="4">
                      <el-upload
                                class="avatar-uploader"
                                :action="imgUrl"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess2"
                                :before-upload="beforeAvatarUpload"
                                :on-preview="handlePictureCardPreview"
                                >
                             <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                             <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                              <div slot="tip" class="el-upload__tip">
                              <div class="tips">选中Logo</div>
                              (建议尺寸200*200px)</div>
                      </el-upload>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="操作系统 :" prop="operateSystem">
                <el-input :maxlength="30" placeholder="请输入操作系统(限30个字符)" v-model="ruleForm.operateSystem"></el-input>
            </el-form-item>
            <el-form-item label="兼容性 :" prop="compatibility">
                <el-input :maxlength="30" placeholder="请输入兼容性(限30个字符)" v-model="ruleForm.compatibility"></el-input>
            </el-form-item>
            <el-form-item label="使用概况 :" prop="">
                <el-row>
                    <el-col :span="24">
                        <table class="detailTable" width="100%" border="1">
                            <thead>
                            <th>使用部门</th>
                            <th>使用系统</th>
                            <th class="AdditemThree">使用评价</th>
                            <th><span @click="addDetail" class="addItem mf mf-lg mf-add"></span></th>
                            </thead>
                            <tbody>
                            <tr align="center" v-for="(item,key) in userDetails" :key="key">
                                <td>
                                    <el-input :maxlength="30"  size="small" class="itemInput" type="text" v-model='item.depart'></el-input>
                                </td>
                                <td>
                                    <el-input :maxlength="30"  size="small" class="itemInput" type="text" v-model='item.system'></el-input>
                                </td>
                                <td>
                                    <el-input :maxlength="100" placeholder="请输入使用评价(限100个字符)" resize="none" size="small" class="itemAreaInput" type="textarea"
                                              v-model='item.evaluation'></el-input>
                                </td>
                                <td><span @click="deleteDetail(item.id)" class="deleteItem mf mf-lg mf-shanchu"></span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="产品介绍 :" prop="productEditor">
                <quill-editor
                  ref="myTextEditor"
                  v-model="content"
                  :options="editorOption"
                  @change="onEditorChange($event)"></quill-editor>
            </el-form-item>
            <el-form-item>
                <div class="bottom_btn clearfix">
                    <el-button @click="submitForm()" class="goback " type="primary">确定</el-button>
                    <el-button @click="cancel()" class="nextstep ">取消</el-button>
                </div>
            </el-form-item>
        </el-form>
    </paper>
</template>

<style lang="less" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    border: 1px dashed #d9d9d9;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
.bottom_btn {
  text-align: center;
  margin: 20px 0;
  .goback, .nextstep {
    width: 98px;
  }
  .goback {
    margin-right: 5px;
  }
  .nextstep {
     margin-left: 5px;
  }
}
.upload-demo{
   .up-load{
    width:100px;
    margin-top: 35px;
    margin-left: 20px;
   }
}
.productCategory{
  .el-select{
    width:100%;
  }
}
.detailTable{
   border-left:1px solid #f2f2f2;
   border-right:1px solid #f2f2f2;
   border-top:1px solid #f2f2f2;
   thead{
     background:#eff2f7;
     .addItem{
       color:#21B8D5;
     }
   }
   tbody{
      tr:nth-child(even){
       background: #fafafa;
        input{
         background: #fafafa;
        }
      }
      td{
        border-bottom: 1px solid #f2f2f2;
        line-height:60px;
      }
      tr{
        input{
          width: 100px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
     .itemInput{
       text-align:center;
       width:60%;
     }
     .VersionInput{
      text-align:center;
       width:60%;
     }
     .deleteItem{
       color:#21B8D5;
     }
     .itemAreaInput{
      width:80%;
     }
   }
}
.productBrand{
  .el-upload__tip{
    font-style:italic;
    margin-top:1px;
  }
}
.tips{
   font-style:italic;
   font-size: 12px;
   padding-left:26px;
   color: rgb(131, 154, 165);
}
// .version{
//   &&:before{
//     content: '*';
//     left: 68px;
//     top: 28px;
//     position: relative;
//     color: #ff4949;
//   }

// }
</style>

<script>
  import * as srv from '../../../api/service';
  import * as urv from '../../../api/api'
  import { uuid } from 'utils/utils.js'
  import SonTitle from 'components/awesome/son_title/SonTitle'

  export default {
    name: 'ProductLaunch',
    data(){
      return {
        // ----未来日期的禁止
        pickerOptions:{
           disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        //---标题的变化
        titles: {titleName:'产品发布'},
        imgUrl: urv.uploadFiles,
        imageUrl1: "",
        imageUrl2: "",
        content: '',
        show: false,
        editorOption: {
          placeholder: ' ',
          theme:'snow'
        },
        versions:[{id:uuid(),seq:"v1.0",detail:"",publishTime:new Date()}],//--版本详情
        userDetails:[{id:uuid(),depart:"",system:"",evaluation:""}],//---评价
        options: [{
          value: '1',
          label: '前端框架'
        }, {
          value: '2',
          label: '后端框架'
        }, {
          value: '3',
          label: '技术组件'
        }],
        value: ''||'1',
        ruleForm:{
          productName: "",
          productIntroduce: "",
          developer: "",
          downloadURL: "",
          handbookURL: "",
          operateSystem: "",
          compatibility: "",
          productEditor: ""
        },
        rules: {
          productName: [
             { required: true, message: '请输入产品名称', trigger: 'blur' }
          ],
          productIntroduce:[
             { required: true, message: '请输入产品简介信息', trigger: 'blur' }
          ],
          developer:[
             { required: true, message: '请输入开发者信息',trigger: 'blur' }
          ],
//          downloadURL:[
//            {required: false, message: '请输入下载地址信息',trigger: 'blur'},
//            {required: false, validator:(rule,value,callback)=>{
//              if(/^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/i.test(value) === false){
//                  callback(new Error('输入的必须是网址'));
//              }else{
//                  callback();
//              }
//             },  trigger: 'blur' }
//          ],
          handbookURL:[
            { required: true, message: '请输入手册地址信息', trigger: 'blur' },
            {required: true, validator:(rule,value,callback)=>{
              if(/^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/i.test(value) === false){
                  callback(new Error('输入的必须是网址'));
              }else{
                  callback();
              }
             },  trigger: 'blur' }
          ],
          operateSystem:[
            { required: true, message: '请输入操作系统信息', trigger: 'blur' }
          ],
          productEditor: [
            { required: true, message: '请输入产品介绍', trigger: 'blur' }
          ],
        }
      }
    },
    created(){
      this.judgeHash();
    },
    methods:{
      /**
       * 富文本插件的onchange回调函数
       * */
      onEditorChange({ quill, html, text }) {
        this.content = html;
        this.ruleForm.productEditor = html;
      },
      /**
       * 判断是修改还是新建
       * */
      judgeHash() {
        if (window.location.hash.match('/publish/product')) {

        } else{
          this.titles.titleName = '产品修改'
          //编辑的时候调用
          this.getEditorDatas();
        }
      },
      //限制格式的图片大小
      beforeAvatarUpload(file) {
        const isPNG = file.type === 'image/png';
        const isLt1M = file.size / 1024 / 1024 < 1;

        if (!isPNG) {
          this.$message.error('上传头像图片只能是 PNG 格式!');
        }
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }
        return isPNG && isLt1M;
      },
      //---上传成功后的图片回显
      handleAvatarSuccess1(response, file, fileList) {
        this.imageUrl1 = response.result;
      },
      handleAvatarSuccess2(response, file, fileList) {
        this.imageUrl2 = response.result;
      },
      //---添加版本详情
      addItem(){
        if (this.versions.length >= 3) {
            this.$notify({
               type: 'warning',
               message: `版本详情不能超过3条`
           });
          return;
        }
        this.versions.push({id:uuid(),seq:"",detail:"",publishTime:new Date()});
      },
      //---删除版本详情
      deleteItem(id){
        for (var i = this.versions.length - 1; i >= 0; i--){
          if(id === this.versions[i].id){
            this.versions.splice(i, 1);
          }
        }
      },
      //---取消
      cancel(){
        this.$router.push("/market/product_management");
      },
      //---添加使用概况
      addDetail(){
          if (this.userDetails.length >= 3) {
            this.$notify({
               type: 'warning',
               message: `使用概况不能超过3条`
            });
            return
          }
        this.userDetails.push({id:uuid(),depart:"",system:"",evaluation:""})
      },
      //---删除使用概况
      deleteDetail(id){
        for(var i = this.userDetails.length - 1; i >= 0; i--){
          if (id === this.userDetails[i].id) {
            this.userDetails.splice(i, 1);
          }
        }
      },
      //---表单提交
     submitForm(){
       var that = this;
       this.$refs["ruleForm"].validate((valid) => {
         if(valid){
           this.$confirm('是否确认提交,是否继续?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
          if(that.versions === []) {
            that.versions = [{id:uuid(),seq:"",detail:"",publishTime:new Date()}];
          }
          if(that.userDetails === []) {
          that.userDetails = [{id:uuid(),depart:"",system:"",evaluation:""}];
          }
          let params = {
            name: that.ruleForm.productName,
            productId: Number(that.$route.params.productId) ? that.$route.params.productId : -1,
            introduction: that.ruleForm.productIntroduce,
            cateId: that.value,
            developer: that.ruleForm.developer,
            download: that.ruleForm.downloadURL,
            handbook: that.ruleForm.handbookURL,
            version: that.versions,
            logo: that.imageUrl1 + ',' + that.imageUrl2,
            supportOs: that.ruleForm.operateSystem,
            compatibility: that.ruleForm.compatibility,
            description: that.content,
            useSituation: that.userDetails
           }
           // 清空一些没用的数据  --- 下面两个for要封装一下才行
           for (var i = 0; i < params.version.length; i++) {
              if (params.version[i].seq === '') {
                params.version.splice(i, 1);
              }
           }
           for (var i = 0; i < params.useSituation.length; i++) {
             if (params.useSituation[i].depart === '') {
               params.useSituation.splice(i, 1);
             }
           }
           console.log(params);
           srv.publishOrModifyProduct(params).then(res => {
             if(res.code === 200) {
             this.$notify.success({
                title: '成功',
                message: `提交成功`,
             });
             //最后回到管理页面
               that.$router.push("/market/product_management");
             }
           })
        }).catch(() => {

        });
       }else{
        this.$notify.error({
            title: '提交失败',
            message: `请填写完整表单信息`,
        });
       }
     })
     },
     getEditorDatas(){
        srv.requestProductDetails({productId:this.$route.params.productId}).then(res => {
          if(res.code === 200) {
            this.ruleForm.productName = res.result.name;
            this.ruleForm.productIntroduce = res.result.introduction;
            this.value = res.result.cateId+"";
            this.ruleForm.developer = res.result.developer;
            this.ruleForm.downloadURL = res.result.download;
            this.ruleForm.handbookURL = res.result.handbook;
            //对返回的版本详情进行处理
            if(res.result.version === []) {
              res.result.version.push([{id:uuid(),seq:"v1.0",detail:"",publishTime:new Date()}]);
              this.versions = res.result.version;
            }else{
              res.result.version.map((item) => {
                item.id = uuid();
                if(item.publishTime == ""){
                  item.publishTime = new Date();
                }else{
                  item.publishTime = new Date(item.publishTime.replace(/(\d{4}).(\d{1,2}).(\d{1,2}).+/mg, '$1-$2-$3'));
                }
                return item;
              })
              this.versions = res.result.version;
            }
            //处理logo图片
            if(res.result.logo == null){
              this.imageUrl1 = "";
              this.imageUrl2 = "";
            }else{this.imageUrl1 = res.result.logo.split(",")[0];this.imageUrl2 = res.result.logo.split(",")[1];
            }
            this.ruleForm.operateSystem = res.result.supportOs;
            this.ruleForm.compatibility = res.result.compatibility;
            let str, strArr, index, api;
            str = res.result.description;
            strArr = str.split('//');
            index = strArr[1].indexOf('/');
            api = strArr[1].slice(index);
            String(api);
            var that = this;
            srv.requestProductionDesc(api).then(res => {
              that.content = res;
            })
            if(res.result.useSituation === []){
              res.result.useSituation.push([{id:uuid(),depart:"",system:"",evaluation:""}]);
              this.userDetails = res.result.useSituation
            }else{
              res.result.useSituation.map((item) => {
                item.id =  uuid();return item;
              })
              this.userDetails = res.result.useSituation;
            }
          }
      })
     }
    },
    components:{
      'son-title':SonTitle
    }

  }
</script>
