<template>
  <paper>
    <son-title :headTitle="{titleName:'全部消息'}"></son-title>
    <div v-if="buttonState"  class="btn-list">
      <el-button @click="allChecked()" class="btn">{{checkBnt}}</el-button>
      <el-button @click="deleteMessage(msgIds)" :disabled="deletedDisabled" class="btn">删除</el-button>
    </div>
    <div  :class="{box:isActive}">
      <div :class="{'lastchild': index ===datas.length-1}" class=" msg-box fadeInUp clearfix" v-for="(item,index) in datas" :key="index">
        <div class="icon">
          <img :src="item.srcIcon">
          <span class="lines"></span>
        </div>
        <div class="msg-center  fr" key="index">
          <div class="msg-center-l">
            <el-checkbox v-model="item.checked" @change="checkValueChange"></el-checkbox>
            <span class="sys-title">{{item.title}}</span>
            <span class="fr managers">{{item.management}}</span>
          </div>
          <div class="msg-center-r">
            <p class="fl" :class="[item.showMore===false?'sys-msg':'sys-lg']">
              <span ref="messageWords" v-html="item.message"></span>
            </p>
            <el-button v-if="item.conditions" type="text" size="small" @click="toggle(item)">{{item.showMore ? "隐藏":"显示更多"}}<i :class="[item.showMore ? 'mf mf-lg mf-top':'mf mf-lg mf-bottom']"></i></el-button>
            <span class="sys-dates fr">{{item.time}}</span>
          </div>
          <span @click="deleteItem(item)" class="msg-close mf mf-close"></span>
        </div>
      </div>
      <div v-if="showDrop" class="drop-fresh">
        <span @click="getNoReadMessageLists()" class="loadmore"></span>
      </div>
    </div>
  </paper>
</template>

<style lang="less" scoped>
  @import '~styles/vars.less';
  .paper {
    min-width: 1200px !important;
    overflow-x: auto !important;
  }
  .box {
    background-image: url('/static/images/management/message/message.png');
    background-size: 400px 300px;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 400px;
  }
  .lastchild {
    border: 0px solid !important;
  }
  .drop-fresh {
    width: 24px;
    height: 18.2px;
    margin: 0 auto;
    .loadmore {
      background-image: url('/static/images/management/message/loadmore.png');
      cursor: pointer;
      display: block;
      width: 32px;
      height: 25px;
    }
  }
  .btn-list {
    .btn {
      width: 80px;
      margin-bottom: 40px;
    }
  }
  .msg-box {
    margin-left: 100px;
    margin-right: 20px;
    padding-bottom: 30px;
    border-left: 1px solid #7AD4E5;
    min-height: 90px;
    position: relative;
    .icon {
      width: 60px;
      height: 60px;
      background: rgba(128, 128, 128, 0.3);
      border-radius: 50%;
      left: -30px;
      position: absolute;
    }
    .msg-center {
      width: 90%;
      padding-left: 30px;
      padding-top: 20px; // min-height:59px;
      min-height: 64px;
      position: relative;
      border-radius: 10px;
      border: 1px solid #c4c4c4;
      box-shadow: 4px 4px 4px lightgrey;
      position: relative;
      .sys-title {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #211E2F;
        letter-spacing: 0;
        padding-left: 16px;
      }
      .managers {
        padding-right: 88px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #211E2F;
      }
      .sys-lg, .sys-msg {
        margin-top: 10px;
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #211E2F;
        letter-spacing: 0;
        padding-left: 38px;
        width: 603px;
      }
      .sys-lg {
        line-height: 20px;
        white-space: pre-wrap;
        word-wrap: break-word;
        margin-bottom: 15px;
      }
      .sys-msg {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        a {
          text-decoration: underline;
          color: @color-info;
        }
      }
      .el-button--text {
        margin-top: 3px;
      }
      .sys-dates {
        padding-right: 45px;
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #211E2F;
      }
      .msg-close {
        position: absolute;
        top: 10px;
        right: 20px;
        width: 10px;
        height: 10px;
        color: #c4c4c4;
        &:hover {
          cursor: pointer;
          color: #7AD4E5;
        }
      }
      &::before {
        content: "";
        position: absolute;
        left: -16px;
        top: 26px;
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-right: 16px solid #c4c4c4;
        border-bottom: 12px solid transparent;
      }
      &::after {
        content: '';
        position: absolute;
        top: 26px;
        left: -15px;
        width: 0;
        height: 0;
        border-bottom: 10px solid transparent;
        border-right: 15px solid #fff;
        border-top: 10px solid transparent;
      }
    }
  }
</style>

<script>
  import * as srv from '../../../api/service';
  import SonTitle from 'components/awesome/son_title/SonTitle'

  const SYS_MSG_WIDTH = 600;   // 消息内容p标签的宽度
  export default {
    data() {
      return {
        showDrop: true,
        datas: [],
        msgIds: [],
        index: 0,
        buttonState:true,
        count: 0,
        checkBnt: "全选",
        isActive: false,
        deletedDisabled: true
      }
    },
    created() {
      this.getMessageLists();
      this.getNoReadMessageLists();
    },
    methods: {
      /**
       * checkbox的值发生变化发生的回调函数
       * */
      checkValueChange() {
        for (var i = 0; i < this.datas.length; i++) {
          if (this.datas[i].checked) {
            this.deletedDisabled = false
            return;
          }
          this.deletedDisabled = true;
        }
      },
      //-----勾选删除消息,index默认值是1，然后只要加载就会有数据，
      deleteMessage(msgIds) {
        var that = this;
        this.$confirm('是否删除选中项，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (var i = 0; i < that.datas.length; i++) {
            if (that.datas[i].checked == true && msgIds.indexOf(that.datas[i].id) == -1) {
              msgIds.push(that.datas[i].id);
            }
          }
          let params = {
            msgIds: msgIds,
            JSESSIONID: ""
          }
          srv.deleteMessage(params).then(res => {
            if (res.errorCode == "600000") {
              this.$notify({
                type: 'success',
                message: `删除成功`
              });
              for (var i = that.datas.length - 1; i >= 0; i--) {
                if (msgIds.indexOf(that.datas[i].id) !== -1) {
                  that.datas.splice(i, 1);
                }
              }
              if (that.datas.length == 0) {
                //刷新列表--一次性加载5条数据
                that.index=0;
                that.getMessageLists();
                that.getNoReadMessageLists();
              }
            } else {
              this.$notify({
                type: 'error',
                message: `删除失败`
              });
            }
          });
          // this.deletedDisabled = !this.deletedDisabled
          that.msgIds = [];
        }).catch(() => {});
      },
      //-----全选事件
      allChecked() {
        var flag = false;
        var that = this;
        this.datas.map(item => {
          // 全选
          if (item.checked == false) {
            item.checked = true;
            flag = true;
          }
          this.deletedDisabled = false;
          return item;
        });
        flag = !flag;
        if (flag) {
          this.datas.map(item => {
            // 全不选
            if (item.checked == true) {
              item.checked = false;
              flag = true;
            }
            this.deletedDisabled = true;            
            return item;
          });
        }
      },
      //----删除单个消息
      deleteItem(item) {
        var that = this;
        this.$confirm('是否删除选中项，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            msgIds: [item.id],
            JSESSIONID: ""
          }
          srv.deleteMessage(params).then(res => {
            if (res.errorCode == "600000") {
              this.$notify({
                type: 'success',
                message: `删除成功`
              });
              for (var i = that.datas.length - 1; i >= 0; i--) {
                if (that.datas[i].id == item.id) {
                  that.datas.splice(i, 1);
                }
              }
              if (that.datas.length == 0) {
                //刷新列表--一次性加载5条数据，
                that.index=0;
                that.getMessageLists();
                that.getNoReadMessageLists();
              }
            } else {
              this.$notify({
                type: 'error',
                message: `删除失败`
              });
            }
          });
        }).catch(() => {});
      },
      //----展开和隐藏的切换
      toggle(item) {
        item.showMore = !item.showMore;
      },
      //获取未读消息条数
      getMessageLists() {
        let infos = {
          JSESSIONID: ""
        }
        srv.requestNotReadedMessage(infos).then(res => {
          if (res.errorCode == "600000") {
            this.count = res.result.count;
          }
        });
      },
      //获取消息列表index
      getNoReadMessageLists() {
        var that = this;
        let params = {
          JSESSIONID: "",
          index: ++that.index,
          pageSize: 5
        }
        srv.requestMessageLists(params).then(res => {
          if (res.errorCode === '600000') {
            res.result.map(item => {
              item.srcIcon = '/static/images/management/message/manager.png';
              item.title = "系统消息";
              item.management = '系统管理员';
              item.showMore = false;
              item.checked = false;
              item.message = item.content;
              item.time = that.$moment(item.publishTime).format("hh:mm YYYY/MM/DD");
              item.conditions = false;   // 控制显示更多的显隐的，一开始让他们都隐藏
              return item;
            });
            res.result.forEach(item => {
              that.datas.push(item);
            });
            if (res.result.length == 0) {
              that.showDrop = false;
              if (that.datas.length == 0) {
                that.isActive = true;
                that.buttonState= false;
              }
              return;
            }
            var arrIds = [];
            //遍历一遍数据
            for (var i = 0; i < that.datas.length; i++) {
              if (arrIds && arrIds.indexOf(that.datas[i].id) == -1) {
                arrIds.push(that.datas[i].id);
              }
            }
            let params = {
              msgIds: arrIds,
              status: "1",
              JSESSIONID: ""
            };
            // 处理显示更多什么时候出来
            this.$nextTick(() => {
              for (var i =0; i < this.$refs.messageWords.length; i++) {
                if (this.$refs.messageWords[i].offsetWidth < SYS_MSG_WIDTH) {
                  that.datas[i].conditions = false;
                } else {
                  that.datas[i].conditions = true;
                }
              }
            })
            // 将所有消息，不管是已读还是未读---全部变成已读
            srv.modifyMessageSituation(params).then(res => {
              if (res.errorCode === '600000') {
                that.getMessageLists();
              }
            });
          }
        });
      }
    },
    components: {
      'son-title': SonTitle
    }
  }
</script>
