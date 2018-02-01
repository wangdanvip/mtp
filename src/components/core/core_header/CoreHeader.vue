<template>
  <section class="container-header">
    <section class="logo" @click="goBackLogin">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp美的技术平台</section>
    <section class="nav hidden-xs" v-if="switchProjectShow">
      <el-dropdown v-for="moduler in menuList" :class="{'head-nav': true}" menu-align="star" @command="navigate">
        <section class="header-name" v-if="moduler.link !==''" :class="{'is-active': moduler.link.indexOf(pathTest) !== -1}"><a :href="moduler.link" :target="(moduler.link.indexOf('http')+1)?'_blank':'_self'">{{moduler.name}}</a></section>
        <section class="header-name" v-else :class="{'is-active': moduler.path.indexOf(pathTest) !== -1}">{{moduler.name}}</section>
        <el-dropdown-menu slot="dropdown" class="head-menu" :class="{'menu-hidden':moduler.children.length==0}">
          <section>
            <div class="triangle"><img src="/static/images/triangleImg/u266.png"/></div>
          </section>
          <el-dropdown-item :command="item.link" v-for="item in moduler.children">
            {{item.name}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </section>
    <section class="other">
      <section class="project-wrapper hidden-xs hidden-sm"
               v-if="switchProjectShow&&!!simulation.length&&!!simulation[0].projectId && noNeedProject.indexOf(pathTest) === -1">
        <el-dropdown class="project-group" @command="clickProjectName">
          <section>
            <span class="mf mf-lg mf-xiangmuwenjianjia"></span>
            <span ref="clickProjectName">{{this.showSimulation}}</span>
            <!-- <span v-else></span> -->
            <span class="mf mf-lg mf-bottom"></span>
          </section>
          <!-- 下拉菜单的选项 -->
          <el-dropdown-menu slot="dropdown" class="project-menu">
            <section class="dropdown-menu-box">
              <div class="triangle"><img src="/static/images/triangleImg/u266.png"/></div>
              <el-dropdown-item :command="item" @click="getRole" v-for="(item,index) in simulation">
                <span :title="item.projectName.length>14?`${item.projectName}`:''">{{item.projectName}}</span>
              </el-dropdown-item>
            </section>
          </el-dropdown-menu>
        </el-dropdown>
      </section>
      <section class="setting">
        <!--<a class="header-icon" title="云市场" href="/market/#/home" target="_blank"><i-->
          <!--class="mf mf-lg mf-shichang"></i></a>-->
        <a class="header-icon" title="帮助文档" href="/module/management.html#/d/center" target="_blank"><i
          class="mf mf-lg mf-bangzhuwendang"></i></a>
        <!-- <div class="header-icon mf mf-lg mf-bangzhuwendang" title="帮助文档" style="height:60px"></div> -->
        <div @click="gotoMessageCenter()" class="header-icon" title="消息中心"><i class="mf mf-lg mf-xiaoxizhongxin"></i>
          <badge v-if="badge>0" v-model="badge"></badge>
        </div>
        <!--<div class="header-icon" title="工单系统"><i class="mf mf-lg mf-gongdanxitong"></i></div>-->
        <el-dropdown class="set-item" @command="settingItemClick" menu-align="end">
          <section class="header-icon"><span class="mf mf-lg mf-yonghuzhongxin"></span></section>
          <el-dropdown-menu slot="dropdown" class="set-group">
            <div class="triangle"><img src="/static/images/triangleImg/u266.png" /></div>
            <el-dropdown-item v-for="(item, index) in settings" :command="index.toString()" v-role-authority:item.roles="item.roles">
              {{item.setItem}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </section>
    </section>
  </section>
</template>

<style lang="less" scoped>
  @import "~styles/vars.less";
  .container-header {
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
    background-color: @color-background;
    color: #eee;
    height: 60px;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1030;
    .logo {
      width: 220px;
      height: 60px;
      background: url('/static/images/loginImg/logo1.png') no-repeat;
      background-size: 40px 28px;
      background-position: 20px 14px;
      line-height: 60px;
      position: absolute;
      font-weight: 700;
      font-size: 18px;
      top: 0px;
      left: 0px;
      text-align: center;
      cursor: pointer;
    }
    .nav {
      height: 60px;
      margin-left: 220px;
      .header-name {
        a {
          text-align: center;
          color: #a5acbe;
        }
        a:hover {
          color: @color-primary;
        }
      }
      .head-nav {
        float: left;
        height: 60px;
        line-height: 60px;
        margin-right: 40px;
        // width: 60px;
        cursor: pointer;
        position: relative !important;
        section {
          text-align: center;
          color: #a5acbe;
        }
        section:hover {
          color: @color-primary;
        }
        .is-active {
          height: 58px;
          line-height: 58px;
          border-bottom: 2px solid @color-primary;
          color: @color-primary;
          a {
            color: @color-primary;
          }
        }
      }
    }
    .other {
      width: 410px;
      height: 60px;
      position: absolute;
      line-height: 60px;
      right: 0px;
      top: 0px;
      .project-wrapper {
        cursor: pointer;
        position: absolute;
        right: 140px;
        .project-group {
          position: relative;
          section {
            span {
              color: #a5acbe;
            }
          }
          section:hover {
            span {
              color: @color-primary;
            }
          }
        }
      }
      .setting {
        cursor: pointer;
        position: absolute;
        right: 0;
        overflow: hidden;
        padding: 0;
        .header-icon {
          display: inline-block;
          position: relative;
          margin: 0;
          height: 60px;
          line-height: 60px;
          margin-right: 16px;
        }
        .header-icon .mf {
          color: #a5acbe;
        }
        .header-icon:hover .mf {
          color: @color-primary;
        }
      }
    }
  }

  .el-dropdown {
    font-size: 16px;
  }

  .el-dropdown-menu {
    border: none;
    box-shadow: none;
    padding: 5px;
    margin: 0;
    background: @color-background;
    border-radius: 5px;
    .el-dropdown-menu__item {
      text-align: center;
      color: #a5acbe;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .el-dropdown-menu__item:hover {
      color: @color-primary;
      background: #090718;
    }
    .triangle {
      height: 6px;
      width: 180px;
      position: absolute;
      top: -6px;
      left: 0;
      img {
        position: absolute;
        left: 20px;
        width: 18px;
        height: 6px;
      }
    }
  }

  .menu-hidden {
    display: none;
  }

  .head-menu {
    margin-top: 66px;
    .el-dropdown-menu__item {
      width: 150px;
    }
  }

  .project-menu {
    margin-top: 6px;
    .dropdown-menu-box {
      overflow: hidden;
      max-height: 310px;
      overflow-y: auto;
    }
    .dropdown-menu-box::-webkit-scrollbar {
      width: 4px;
    }
    .dropdown-menu-box::-webkit-scrollbar-thumb {
      background: rgba(183, 174, 174, .4)
    }
    .dropdown-menu-box::-webkit-scrollbar-track {
      background: @color-background;
    }
    .el-dropdown-menu__item {
      width: 100px;
    }
    .triangle {
      width: 130px;
      img {
        position: absolute;
        left: 44%;
      }
    }
  }

  .set-group {
    margin-top: 6px !important;
    .el-dropdown-menu__item {
      width: 100px;
    }
    .triangle {
      width: 130px;
      img {
        position: absolute;
        left: 100px;
      }
    }
  }
</style>

<script>
  import { switchProject } from './service';
  import * as srv from 'src/module/management/api/service';
  import * as srv1 from 'src/module/login/api/service';
  import roleDirective from 'common/directive/authority_role_directive';
  import ls from 'utils/local_storage_tool';
  import ss from 'utils/session_storage_tool';
  import Badge from '../../awesome/badge/Badge.vue';
  import store from '../../../module/management/vuex/store.js';
  import {mapState} from 'vuex';
  export default{
    name:"CoreHeader",
    created () {
      console.log(this.pathTest);
      this.getProjectList(this.switchShow);
      this.getMenuList();
      this.getNotReadedMessage();
      //socket 登录成功并授权通过后发送sockets
      this.$socket.emit('login', {'account': this.user.account});
    },
    watch: {
      "$route": "switchShow"
    },
    store,
    computed:mapState(["menuList"]),
    data() {
      return {
        // 根据路径来判读是否显示某些元素
        switchProjectShow: false,
        badge: "0",
        noNeedProject:['/module/pic.html'],
        pathTest: window.location.href.indexOf('#') === -1 ? window.location.href.slice(window.location.href.indexOf('/module')) : window.location.href.slice(window.location.href.indexOf('/module'), window.location.href.indexOf('#')),
        isActive: false,
        user: ls.getObject("user"),
        showSimulation: '项目列表',
        simulation: [{
          projectDesc: "",
          projectId: "",
          projectName: "没有项目信息"
        }],
        settings: [
          {
            setItem: '我的项目',
            roles: ['operator', 'member', 'admin'],
            url: '/module/management.html#/project/mine'
          }, {
            setItem: '管理后台',
            roles: ['admin'],
            url: '/module/management.html#/setting/user'
          }, {
            setItem: '退出登录',
            roles: ['*'],
            type: 'method',
            method: 'logout'
          }
        ]
      }
    },
    components: {
      'badge': Badge
    },
    sockets: {
      connect: function () {
        console.log('socket 连接成功');
      },
      message: function (data) {
        console.log("socket返回信息:", data);
      },
      relogin: function (res) {
        let that = this;
        if (res.account === this.user.account) {
          this.$alert('权限变更，需重新登录！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              that.logout();
            }
          });
        }
      },
      //未读消息
      msgRead: function (res) {
        console.log("socket返回信息:msgRead", res);
        let that = this;
        if (res.account === this.user.account) {
          this.badge = res.unread.toString();
        }
      }
    },
    methods: {
      /**
       * 获取未读消息条数
       */
      getNotReadedMessage() {
        let params = {};
        srv.requestNotReadedMessage(params).then(res => {
          if(res.errorCode === '600000'){
            this.badge = String(res.result.count)
          }else{
            console.log(res.msg);
          }
        })
      },
      /**
       * 跳转消息中心页面
       */
      gotoMessageCenter(){
        window.location.href = "/module/management.html#/message";
      },
      /**
       *  帮助文档，分类页看不到菜单
       *  消息中心，有项目看到菜单，没项目看不到菜单
       */
      switchShow() {
        if ((window.location.href.indexOf('/management.html#/welcome')+1) || (window.location.href.indexOf('/management.html#/document')+1)) {
          this.switchProjectShow = false;
        }
//        else if (window.location.href.indexOf('/management.html#/message')+1) {
        else {
          let project = ls.getObject(['project']);
          if(project) {
            this.switchProjectShow = true;
          }else{
            this.switchProjectShow = false;
          }
        }
      },
      /**
       * 点击图标跳转回去首页
       * */
      goBackLogin() {
        window.location.href = "/module/management.html#/welcome";
      },

      /**
       *  获取菜单列表
       */
      getMenuList() {
        this.$store.dispatch('getMenuList')
      },
      /**
       * 获取用户的项目列表
       * @params callback---做你想做的事
       */
      getProjectList(callback){
        let project = ls.getObject(['project']);
        if (project) {
          this.showSimulation = project.projectName;
        }
        srv.requestUserProject().then(data => {
          if(data.errorCode == "600000"){
            this.simulation = data.result.info;
            if (!project) {
              ls.addItem('project', this.simulation[0]);
              this.showSimulation = this.simulation[0].projectName;
            }
            callback();
          }
        });
      },
      /**
       * 项目名称点击下拉项
       * @params  command--下拉选项的索引
       * */
      clickProjectName(command) {
        this.$refs.clickProjectName.innerHTML = command.projectName;
        // 声明BOM的pathname， 在管理后台页面
        ls.addItem('project', command);
        this.getRole(command);
      },
      /**
       * 点击项目菜单项获得角色以及在该项目下的逻辑
       * @params project
       * */
      getRole(project) {
        let lsUser = ls.getObject(['user']);
        switchProject({projectId: project.projectId}).then(res => {
          if (res.errorCode == '600000') {
            srv1.getUserRole(true, lsUser.account, project.projectId).then(data => {
              if (data.errorCode == '600000') {
                ls.addItem('project', project);
                if (window.location.hash.indexOf('/project/projectdetail/') != -1) {
                  this.$router.push('/project/projectdetail/' + project.projectId);
                  window.location.reload();
                } else {
                  window.location.reload();
                }
              }
            });
          }else{
            this.$notify({
              title: '提示',
              message: '项目切换失败',
              type: 'error'
            });
          }
        });
      },
      /**
       * 退出登录
       */
      logout() {
        srv1.requestLogout().then(res => {
          if (res.errorCode == '600000') {
            window.location.href = '/#/login';
          } else {
            this.$notify({
              title: '提示',
              message: '退出登录失败',
              type: 'error'
            });
          }
        });
      },
      /**
       * 菜单跳转
       * @param command
       */
      navigate(link) {
        window.location.href = link;
      },
      /**
       * 下拉点击事件
       */
      settingItemClick(id){
        let item = this.settings[id];
        //执行方法
        if(item.type === "method"){
          this[item["method"]]();
        } else {
          let curUrl = window.location.pathname + window.location.hash;
          if (curUrl === item.url) {
            this.$router.go(0);
          } else {
            window.location.href = item.url;
          }
        }
      }
    }
  }
</script>
