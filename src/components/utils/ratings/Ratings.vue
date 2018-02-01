<template>
  <div>
    <div class="border-bottom" v-for="(item, ratingIndex) in ratingsList" ref="listGroup" :key="ratingIndex">
      <div class="ratings-box">
        <div class="user-name">{{item.userName}}:</div>
        <div class="comment">
          <div style="display: block;padding-right: 10px;">
            <p class="comment-words">
              {{item.markMsg}}
            </p>
            <p class="comment-stars">
              <star :score="item.mark/2"></star>
              <span class="publish-time">{{item.markTime | formatDate}}</span>
              <!-- 这是控制回复盒子开关的回复 -->
              <span ref="answer" class="reply" :class="{'font-color':!itemList[ratingIndex].boxShow?false:true}" @click="answerRating(ratingIndex, item)">
                {{!itemList[ratingIndex].boxShow?item.replyList.length?`回复(${item.replyList.length})`:'回复':'收起'}}
              </span>
              <span class="delete" v-if="isNeedDelete" @click="deleteRating(item.markId, ratingIndex)">删除</span>
            </p>
          </div>
        </div>
      </div>
      <!-- 回复的盒子 -->
      <div class="answers-box" v-show="itemList[ratingIndex].boxShow">
        <div class="answers-list">
          <div class="answer-wrapper" v-show="itemList[ratingIndex].replyListShow">
            <!-- 循环answer -->
            <div class="answer" v-for="(item2, replyIndex) in item.replyList" :key="replyIndex">
              <div class="user">
                <!-- 这里的文字得处理一下 -->
                {{item2.replyUser}} <span><span class="reply">回复</span> {{item2.markUser}}</span>:
              </div>
              <div class="words-box">
                <div class="words">{{item2.replyMsg}}</div>
                <div class="time">
                  {{item2.replyTime | formatDate}}
                  <!-- 回复的函数里面要传入用户的名字 -->
                  <div class="dialogue-btn" v-if="item.replyAcl&&calcShowReply" @click="dialogue(item2.replyUser, item2.replyId, ratingIndex)">回复</div>
                  <div class="delete-reply" v-if="isNeedReplyDelete" @click="deleteReply(item2.replyId)">删除</div>
                </div>
              </div>
            </div>
          </div>
          <div class="reply-form-wrapper" v-if="calcShowReply">
            <el-form class='reply-form' v-show="itemList[ratingIndex].replyFormShow" :model="replyForm[ratingIndex]" :rules="contentRules" @submit.native.prevent ref="replyForm">
              <el-form-item prop="ratingContent">
                <el-input
                  type="textarea"
                  :rows="3"
                  :placeholder="placeholderWords"
                  v-model="replyForm[ratingIndex].ratingContent"
                  :maxlength="301"
                  resize="none"
                  @blur="blurFromInput">
                </el-input>
                <el-button
                  class="reply-btn"
                  type="primary"
                  :disabled="replyStatus"
                  @click.stop="submitRating(ratingIndex, item, ratingsList.length, ratingsList[ratingIndex].replyList.length)">回复</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as srv from 'src/module/cloudproduct/api/service.js';
  import Star from 'components/awesome/star/Star.vue';
  export default {
    props: {
      // 父组件传入的评论数据
      ratingsList: {
        type: Array,
        default() {
          return []
        }
      },
      // 父组件传入的url带来的参数
      urlParams: {
        type: Object,
        default() {
          return {}
        }
      },
      // 是否需要删除评价的功能
      isNeedDelete: {
        type: Boolean,
        default: false
      },
      // 是否需要回复评价的那个回复按钮
      isNeedReply: {
        type: Boolean,
        default: true
      },
      // 是否需要删除回复的功能
      isNeedReplyDelete: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        ratingsListLen: -1,    // 用来记录评论列表的长度，配合下面索引用的
        replyShowIndex: -1,   // 用来记录点击了回复的那条评论的索引
        itemList: [], // 用来装全部评论的true-false值的
        showRatingsIndexList: [],
        replyStatus: false,
        replyFormArr: [],
        placeholderWords: '请填写您的回复',
        contentRules: {
          ratingContent: [
            {required: true, message: '请填写回复', trigger: 'change'},
            {
              required: true, validator: (rule, value, callback) => {
              if (value.length > 300) {
                callback(new Error("只能输入不超过300个字符"));
              } else {
                callback();
              }
            }, trigger: 'blur'
            }
          ],
        }
      }
    },
    watch: {
      // 用于计算需要默认展开的回复列表
      ratingsList(val) {
        if (!val || !val.length) return;
        this.showRatingsIndexList = [];
        this.itemList = [];
        let initShow = {
          boxShow: false,
          replyListShow: false,
          replyFormShow: false
        }
        val.map((item,index) => {
          this.itemList.push(initShow);
          if (item.replyList.length > 0 && item.replyList.length <= 2) {
            let showObj = {
              index: index,
              length: item.replyList.length
            }
            this.showRatingsIndexList.push(showObj);
          }
        })
        // 记录评论数组的长度，第一次进来是-1就用ratingsList的长度作为初始值
        this.ratingsListLen!==-1?this.ratingsListLen=this.ratingsListLen:this.ratingsListLen=val.length;
        // 用来决定要不要往数组里面push新的需要展开的索引
        if (this.replyShowIndex !== -1 && this.ratingsListLen==val.length) {
          let tmp = {
            index: this.replyShowIndex
          }
          this.showRatingsIndexList.push(tmp)
        }
        this.showRatingsList(this.itemList, this.showRatingsIndexList);
      },
    },
    computed: {
      replyForm: {
        get: function()  {
          for (let i = 0; i < this.ratingsList.length; i++) {
            this.replyFormArr.push({ratingContent: ''});
          }
          return this.replyFormArr;
        },
        set: function(val) {
          this.replyFormArr = val;
        }
      },
      calcShowReply() {
        return this.isNeedReply&&window.location.pathname.indexOf('/module/management.html')!==-1?false:true;
      }
    },
    methods: {
      /**
       * 计算什么东西可以直接显示
       * @params  itemList---全部初始化的数组  showList---需要一开始显示元素的索引数组
       * */
      showRatingsList(itemList, showList) {
        for (var i = 0; i < showList.length; i++) {
          for (var j = 0; j < itemList.length; j++) {
            if (showList[i].index === j) {
              this.$set(itemList, j, {
                boxShow: true,
                replyListShow: true,
                replyFormShow: false
              })
            }
          }
        }
      },
      /**
       * 当回复的el-input失去焦点的时候的逻辑
       * */
      blurFromInput() {
        this.placeholderWords = '请填写您的回复';
      },

      /**
       * 删除某条评论
       * @params replyId---回复id
       * */
      deleteReply(replyId) {
        let params = {"replyId": replyId}
        srv.requestDeleteReply(params).then(res => {
          if (res.code === 200 && res.msg === 'ok') {
            this.$emit('delete-reply', replyId);
          }
        })
      },

      /**
       * 回复某人的评论的逻辑
       * @params val---人名   replyId---回复id   index---评价的索引
       * */
      dialogue(val='', replyId, index) {
        console.log(replyId);
        this.placeholderWords = '回复' + val + ':';
        this.replyId = replyId;
        this.$set(this.itemList, index, {
          boxShow: true,
          replyListShow: true,
          replyFormShow: true
        })
      },

      /**
       * 点开回复评价盒子的逻辑
       * @params index---评论索引 len---回复数组的长度   mayI---权限
       * */
      answerRating(index, item) {
        let len = item.replyList.length,
          replyAcl = item.replyAcl,
          itemList = this.itemList
        if (!itemList[index].boxShow) {   // 控制最外层盒子的显隐
          // 显示answersBox
          if (len && replyAcl) {         // 有回复又有权限
            this.$set(itemList, index, {
              boxShow: true,
              replyListShow: true,
              replyFormShow: true
            });
          }
          else if (len && !replyAcl) {   // 有回复没权限
            this.$set(itemList, index, {
              boxShow: true,
              replyListShow: true,
              replyFormShow: false
            });
          }
          else if (!len && replyAcl) {   // 没回复有权限
            this.$set(itemList, index, {
              boxShow: true,
              replyListShow: false,
              replyFormShow: true
            });
          } else {
            this.$set(itemList, index, {
              boxShow: false,
              replyListShow: false,
              replyFormShow: false
            });
          }
        } else {
          this.$set(itemList, index, {
            boxShow: false,
            replyListShow: false,
            replyFormShow: false
          });
        }
      },

      /**
       * 删除评价的方法
       * @params id index
       * */
      deleteRating(id, index) {
        this.ratingsList.splice(index, 1);
        this.$emit('deleteRating', id, index);
      },

      /**
       * 过滤emoji表情字符串
       * @params   str---评价的文字（可能包含emoji表情）
       * return undefined
       * */
      filterEmoji(str){
        var ranges = [
          '\ud83c[\udf00-\udfff]',
          '\ud83d[\udc00-\ude4f]',
          '\ud83d[\ude80-\udeff]'
        ];
        str = str.replace(new RegExp(ranges.join('|'), 'g'), '');
        return str;
      },

      /**
       * 提交回复
       * @params   str---评价的文字（可能包含emoji表情） len---评价列表的长度   replyListLen---回复列表长度
       * return undefined
       * */
      submitRating(index, item, len, replyListLen) {
          // 这里通过emit出去的方式来写的话通用性更好
        let markId = item.markId,
          mayI = item.replyAcl;
        this.$refs.replyForm[index].validate((valid) => {
          if (!mayI) return;
          if (valid) {
            this.replyStatus = true;
            let params = {
              markId: markId,
              replyId: !replyListLen ? -1 : this.replyId,    // 非必填的
              replyMsg: this.filterEmoji(this.replyForm[index].ratingContent),
            }
            srv.requestReplyMark(params).then(res => {
              // 设置两个data里面的值
              this.replyShowIndex = index;
              this.ratingsListLen = len

              this.replyForm[index].ratingContent = '';
              this.$refs["replyForm"][index].resetFields();
              if (res.code == 200 && res.msg === 'ok') {
                // 进行一些操作，应该是emit一些东西出去
                this.$emit('reply-success', true);
              }
            }).then(() => {
              this.$set(this.itemList, index, {
                boxShow: true,
                replyListShow: true,
                replyFormShow: true
              })
            })
          } else {
            return false;
          }
          this.replyStatus = false;
        })
      }
    },
    components: {
      'star': Star
    },
    filters: {
      formatDate: (str) => {
        var a = new Date(str);
        var year = a.getFullYear(); // 年
        var month = a.getMonth() + 1; // 月
        month = month < 10 ? '0' + month : month;
        var day = a.getDate(); // 日
        day = day < 10 ? '0' + day : day;
        var hour = a.getHours(); // 小时
        hour = hour < 10 ? '0' + hour : hour;
        var min = a.getMinutes(); // 分钟
        min = min < 10 ? '0' + min : min;
        var sec = a.getSeconds(); // 秒
        sec = sec < 10 ? '0' + sec : sec;
        let formatData = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
        formatData = formatData.toString();
        return formatData;
      }
    }
  }
</script>

<style lang="less">
  .border-bottom {
    border-bottom: 1px dashed #bfbfbf;
  }
  .ratings-box {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 24px 0;
    .user-name {
      margin: 14px 0;
      word-break: break-all;
      color: #1eb8d4;
    }
    .comment {
      display: inline-block;
      position: relative;
      .comment-words {
        margin-top: -6px;
        line-height: 26px;
        color: #333;
        word-break: break-all;
        overflow: hidden;
      }
      .comment-stars {
        margin-top: 8px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        .star {
          display: inline-block;
          vertical-align: bottom;
        }
        .publish-time {
          margin-left: 30px;
          color: #666;
        }
        .reply, .delete {
          margin-left: 30px;
          color: #666;
          cursor: pointer;
          &.font-color {
            color: #1eb8d4;
          }
          &:hover {
            color: #1eb8d4 !important;
          }
        }
      }
    }
  }
  .answers-box {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-bottom: 8px;
    .answers-list {
      .answer-wrapper {
        padding: 10px 18px;
        margin-bottom: 24px;
        background-color: #f7f7f7;
        .answer {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          margin-bottom: 20px;
          font-size: 14px;
          line-height: 26px;
          color: #333;
          &:last-child {
            margin-bottom: 0;
          }
          .user {
            margin-bottom: 10px;
            .reply {
              color: #c3c3c3;
            }
          }
          .words-box {
            display: flex;
            flex-direction: column;
            line-height: 20px;
            .words {
              word-break: break-all;
            }
            .time {
              margin-top: 10px;
              line-height: 16px;
              color: #666;
              .dialogue-btn {
                display: inline-block;
                margin-left: 20px;
                text-align: center;
                cursor: pointer;
                color: rgb(30, 184, 212);
              }
              .delete-reply {
                display: inline-block;
                margin-left: 20px;
                padding: 0 8px;
                text-align: center;
                cursor: pointer;
                &:hover {
                  color: rgb(30, 184, 212) !important;
                }
              }
            }
          }
        }
      }
    }
  }
  .reply-form-wrapper {
    .reply-form {
      .el-form-item__content {
        position: relative;
        .el-textarea {
          .el-textarea__inner {
            height: 76px;
            padding: 12px 16px;
            padding-right: 132px;
            background-color: #fdfdfd;
            box-shadow: 0 0 3px 3px rgba(244, 244, 244, .3) inset;
            &:focus {
              border-color: #e4e4e4 !important;
            }
            &::-webkit-input-placeholder { /* WebKit browsers */
              color: #999;
              font-size: 14px;
            }
            &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
              color: #999;
              font-size: 14px;
            }
            &::-moz-placeholder { /* Mozilla Firefox 19+ */
              color: #999;
              font-size: 14px;
            }
            &:-ms-input-placeholder { /* Internet Explorer 10+ */
              color: #999;
              font-size: 14px;
            }
            &::-webkit-scrollbar-thumb {
              background: transparent;
            }
            &::-webkit-scrollbar-track {
              background: transparent;
            }
          }
        }
        .reply-btn {
          position: absolute;
          top: 50%;
          right: 20px;
          width: 100px;
          height: 32px;
          transform: translateY(-50%);
          line-height: 0;
          z-index: 10;
          letter-spacing: 2px;
        }
      }
    }
  }
</style>
