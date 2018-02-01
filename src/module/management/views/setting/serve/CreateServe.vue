<template>
  <el-dialog :close-on-click-modal="modal" custom-class="dialog__" :title="indexTitle" :visible.sync="dialogFormVisible" @close="cancel()">
    <el-form @submit.native.prevent ref="ruleForm" label-position="left" :model="ruleForm" :rules="rules" label-width="90px" class="demo-ruleForm">
      <el-form-item label="服务名称 :" prop="serveName">
        <el-input :disabled="disabled" :maxlength="70" placeholder="请输入服务名称，长度不超过70字符" v-model="ruleForm.serveName"></el-input>
      </el-form-item>
      <el-form-item label="服务标识 :" prop="serveIndex">
        <el-input :disabled="disabled" :maxlength="128" placeholder="请输入服务名称，长度不超过128字符" v-model="ruleForm.serveIndex"></el-input>
      </el-form-item>
      <el-form-item class="classes" label="所属分类 :" prop="classes">
        <el-row>
          <el-col :span="24">
            <el-select :disabled="disabled" v-model="ruleForm.classes" placeholder="请选择所属分类">
              <el-option label="基础资源" value="0"></el-option>
              <el-option label="基础服务" value="1"></el-option>
              <el-option label="基础应用" value="2"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="排列次序 :" prop="orderLists">
        <el-input @change="changeCode(ruleForm.orderLists)" :disabled="disabled" :minlength="1" :maxlength="3" placeholder="请设置菜单位置次序" v-model="ruleForm.orderLists"></el-input>
      </el-form-item>
      <el-form-item label="系统类别 :" prop="systemClass">
        <el-radio-group @change="changeSelect" :disabled="disabled" v-model="ruleForm.systemClass">
          <el-radio label="0">内部系统</el-radio>
          <el-radio label="1">外部系统</el-radio>
          <el-radio label="2">金融系统</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="访问地址 :" prop="visitAddress">
        <el-input :disabled="disabled" placeholder="请输入系统访问地址" v-model="ruleForm.visitAddress"></el-input>
      </el-form-item>
      <el-form-item label="需要项目 :" prop="needProject">
        <el-radio-group :disabled="dis" v-model="ruleForm.needProject">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="服务图标 :" prop="servesIcon">
        <el-upload class="avatar-uploader" :action="imgUrl" :disabled="disabled" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-preview="handlePictureCardPreview">
          <img v-if="ruleForm.servesIcon" :src="ruleForm.servesIcon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">只能上传png文件，且不超过1M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="描述 :" prop="description">
        <el-input :disabled="disabled" :maxlength="128" type="textarea" v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item>
        <div v-if="showButton" class="bottom_btn clearfix">
          <el-button @click="cancel()" class="nextstep ">取消</el-button>
          <el-button @click="submitForm('ruleForm')" class="goback " type="primary">确定</el-button>
        </div>
        <div v-else>
          <el-button @click="backhome()" class="backhome">返回</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<style lang="less">
  .dialog__ {
    width: 500px;
    min-height: 730px;
    .classes {
      .el-select {
        width: 100%;
      }
    }
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
    .el-upload__tip {
      font-style: italic;
      margin-top: 1px;
    }
    .bottom_btn {
      text-align: center;
      margin: 20px 0;
      margin-left: -80px;
      .goback,
      .nextstep {
        width: 98px;
      }
      .goback {
        margin-right: 5px;
      }
      .nextstep {
        margin-left: 5px;
      }
    }
    .backhome {
      width: 98px;
      margin-left: 100px;
    }
  }
</style>
<script>
  import * as urv from '../../../api/api'
  import * as srv from '../../../api/service';
  export default {
    data() {
      return {
        dialogFormVisible: true,
        modal: false,
        imgUrl: urv.uploadFiles,
        dialogVisible: false,
        dialogImageUrl: "",
        disabled: false,
        dis:false,
        showButton: true,
        ruleForm: {
          servesIcon: "",
          classes: "",
          serveName: "",
          serveIndex: "",
          orderLists: "",
          systemClass: "0",
          visitAddress: "",
          needProject: "1",
          servesIcon: "",
          description: ""
        },
        rules: {
          servesIcon: [{
            required: true,
            message: '请上传图片',
            trigger: 'change'
          }],
          needProject: [{
            required: true,
            message: '请选择是否需要项目',
            trigger: 'change'
          }],
          systemClass: [{
            required: true,
            message: '请选择系统类别',
            trigger: 'change'
          }],
          orderLists: [{
            required: true,
            message: '请输入排列次序',
            trigger: 'blur'
          }],
          classes: [{
            required: true,
            message: '请选择服务类别',
            trigger: 'change'
          }],
          serveName: [{
              required: true,
              message: '请输入服务名称',
              trigger: 'blur'
            },
            {
              required: true,
              validator: (rule, value, callback) => {
                if (/^[\u4e00-\u9fa5_-a-zA-Z0-9]+$/i.test(value) == false) {
                  callback(new Error("只能输入数字，英文大小写字母，中文字符，下划线“  _ ”，中划线”- “"));
                } else {
                  callback();
                }
              },
              trigger: 'blur'
            }
          ],
          serveIndex: [{
              required: true,
              message: '请输入服务标识',
              trigger: 'blur'
            },
            {
              required: true,
              validator: (rule, value, callback) => {
                if (/^[\u4e00-\u9fa5_-a-zA-Z0-9]+$/i.test(value) == false) {
                  callback(new Error("只能输入数字，英文大小写字母，中文字符，下划线“  _ ”，中划线”- “"));
                } else {
                  callback();
                }
              },
              trigger: 'blur'
            }
          ],
          visitAddress: [{
            required: true,
            message: '请选择访问地址',
            trigger: 'blur'
          }]
        }
      }
    },
    //---标题的设置
    computed: {
      indexTitle() {
        if (this.$route.params.type === 'new') {
          return '创建服务'
        } else if (this.$route.params.type === 'editor') {
          return '编辑服务'
        } else if (this.$route.params.type === "detail") {
          return '服务详情'
        }
      }
    },
    //----新增，编辑，查看详情下的调用
    created() {
      if (this.$route.params.type === "detail") {
        this.disabled = true;
        this.showButton = false;
        this.dis = true;
        this.getServerDetail();
      } else if (this.$route.params.type === 'new') {} else if (this.$route.params.type === 'editor') {
        this.getServerDetail();
      }
    },
    methods: {
      //设置radio值的改变
      changeSelect(val){
        if(val=="1"||val=="2"){
          this.dis = true;
          this.ruleForm.needProject = "0"
        }else if(val=="0"){
          this.dis = false;
          this.ruleForm.needProject = "1"
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
      //---图片上传成功后的回显
      handleAvatarSuccess(response, file, fileList) {
        this.ruleForm.servesIcon = response.result;
      },
      //---取消
      cancel() {
        this.$router.push('/setting/serve');
      },
      //---返回
      backhome() {
        this.$router.push('/setting/serve');
      },
      //---表单特殊值输入的处理
      changeCode(value) {
        let reg = /^[0-9]\d*$/;
        if (value > 999 || new RegExp(reg).test(value) == false) {
          setTimeout(() => {
            this.ruleForm.orderLists = '';
          }, 0);
        }
      },
      //---获取服务详情
      getServerDetail() {
        var params = {
          serverId: this.$route.params.serverId,
          JSESSIONID: ""
        }
        srv.getServeDetails(params).then(res => {
          if (res.errorCode == "600000") {
            this.ruleForm.serveName = res.result.result.serverName;
            this.ruleForm.serveIndex = res.result.result.mark;
            this.ruleForm.orderLists = res.result.result.sort + "";
            this.ruleForm.systemClass = res.result.result.systemClass;
            this.ruleForm.visitAddress = res.result.result.link;
            this.ruleForm.needProject = res.result.result.needProject;
            this.ruleForm.servesIcon = res.result.result.serverIcon;
            this.ruleForm.description = res.result.result.memo;
            this.ruleForm.classes = res.result.result.type;
          }
        });
      },
      //----表单提交
      submitForm(ruleForm) {
        var that = this;
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.$confirm('是否确认提交,是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let params;
              if (that.ruleForm.classes == "基础资源") {
                that.ruleForm.classes = "0"
              } else if (that.ruleForm.classes == "基础服务") {
                that.ruleForm.classes = "1"
              } else if (that.ruleForm.classes == "基础应用") {
                that.ruleForm.classes = "2"
              }
              if (that.$route.params.serverId === "-1") {
                params = {
                  serverName: that.ruleForm.serveName,
                  mark: that.ruleForm.serveIndex,
                  type: that.ruleForm.classes,
                  sort: parseInt(that.ruleForm.orderLists) + "",
                  systemClass: that.ruleForm.systemClass + "",
                  link: that.ruleForm.visitAddress,
                  needProject: that.ruleForm.needProject + "",
                  serverIcon: that.ruleForm.servesIcon,
                  memo: that.ruleForm.description,
                  JSESSIONID: ""
                }
              } else {
                params = {
                  serverId: that.$route.params.serverId,
                  serverName: that.ruleForm.serveName,
                  mark: that.ruleForm.serveIndex,
                  type: that.ruleForm.classes,
                  sort: parseInt(that.ruleForm.orderLists) + "",
                  systemClass: that.ruleForm.systemClass + "",
                  link: that.ruleForm.visitAddress,
                  needProject: that.ruleForm.needProject + "",
                  serverIcon: that.ruleForm.servesIcon,
                  memo: that.ruleForm.description,
                  JSESSIONID: ""
                }
              }
              srv.createOrModifyServe(params).then(res => {
                if (res.code == "670001") {
                  this.$notify({
                    type: 'warning',
                    message: `服务标识不能重复`
                  });
                }
                if (res.errorCode == "600000") {
                  this.$notify.success({
                    title: '成功',
                    message: `提交成功`,
                  });
                  this.$router.push('/setting/serve');
                  this.$parent.$refs.wt.getData();
                }
              });
            }).catch(() => {});
          } else {
            this.$notify.error({
              title: '提交失败',
              message: `请填写完整表单信息`,
            });
          }
        });
      }
    }
  }
</script>
