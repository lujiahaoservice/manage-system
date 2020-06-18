<template>
  <div class="layout" style="height:100%">
    <el-container style="height:100%">
      <el-aside class="aside_width">
        <el-row class="tac">
          <el-col>
            <div class="layout_logo">
              用勤后台管理系统
              <!-- <img class="logo_img" src="@/assets/image/icon_yongqin.png" alt="logo"> -->
            </div>
            <transition name="move" mode="out-in">
              <template>
                <div>
                  <el-menu
                    background-color="#333744"
                    text-color="#fff"
                    active-text-color="#409EFF"
                    unique-opened
                    router
                  >
                    <!-- 一级菜单 -->
                    <template v-for="item in sidebarInfo">
                      <!-- 有下拉菜单 -->
                      <el-submenu :index="item.toPath" :key="item.index" v-if="item.subNav">
                        <!-- 一级菜单的模板区域 -->
                        <template slot="title">
                          <!-- 图标 -->
                          <!-- <i :class="iconsObj[item.id]"></i> -->
                          <!-- 文本 -->
                          <span>{{item.titleName}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item
                          v-for="subItem in item.subNav"
                          :index="subItem.toPath"
                          :key="subItem.index"
                          style="padding-left: 0px;"
                        >
                          <!-- @click="saveNavState('/' + subItem.path)" -->
                          <template slot="title">
                            <!-- 图标 -->
                            <i class="el-icon-menu"></i>
                            <!-- 文本 -->
                            <span>{{subItem.title}}</span>
                          </template>
                        </el-menu-item>
                      </el-submenu>
                      <!-- 无下拉菜单 -->
                      <el-menu-item :index="item.toPath" :key="item.index" v-else>
                        <!-- 一级菜单的模板区域 -->
                        <span slot="title">
                          <!-- 图标 -->
                          <!-- <i :class="iconsObj[item.id]"></i> -->
                          <!-- 文本 -->
                          <span>{{item.titleName}}</span>
                        </span>
                      </el-menu-item>
                    </template>
                  </el-menu>
                </div>
              </template>
            </transition>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <div class="system_name">{{enterprise}}</div>
          <div class="system_user">
            <div class="line">|</div>
            <div>
              <el-dropdown>
                <span class="el-dropdown-link layout_userMsg">
                  <div class="layout_userNum">
                    <img :src="photoList[userid%4]" alt />
                  </div>
                  <div class="layout_user">{{username}}</div>
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="willChangePW">
                    <span>
                      <img
                        src="https://static-shanghai.hanku.net.cn/jqy_system/homepage/fwsgl.png"
                        alt
                      />
                      <span>修改密码</span>
                    </span>
                  </el-dropdown-item>
                  <el-dropdown-item @click.native="login_out">
                    <span>
                      <img src="https://static-shanghai.hanku.net.cn/tuichu%402x.png" alt />
                      <span>退出登录</span>
                    </span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-header>
        <el-main>
          <transition name="el-fade-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="修改密码" :visible.sync="withdrawalModal" width="30%" left>
      <div class="vip_main">
        <div class="vip_main_item">
          <div class="vip_main_item_text">新的密码</div>
          <div class="vip_main_item_input">
            <el-input type="password" placeholder="请输入新的密码" size="mini" v-model="onePw"></el-input>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">确认新密码</div>
          <div class="vip_main_item_input">
            <el-input type="password" placeholder="请输入新的密码" size="mini" v-model="twoPw"></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="commentModal = false">取 消</el-button> -->
        <el-button type="primary" @click="submit">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { GetMenuList } from "@/api/layout";
import { users, userUptade } from "@/api/setting/personal";

export default {
  name: "layout",
  components: {
    // Breadcrumb
  },
  data() {
    return {
      onePw: "",
      twoPw: "",
      withdrawalModal: false,
      photoList: [
        "https://static-shanghai.hanku.net.cn/jqy_wx/my/1@2x.png",
        "https://static-shanghai.hanku.net.cn/jqy_wx/my/2@2x.png",
        "https://static-shanghai.hanku.net.cn/jqy_wx/my/3@2x.png",
        "https://static-shanghai.hanku.net.cn/jqy_wx/my/4@2x.png"
      ],
      username: "",
      userid: "",
      enterprise: "",
      imgrt: "",
      noticelist: [],
      loading: false,
      noMore: false,
      notice: {
        pageNum: 0,
        pageSize: 10,
        totalPages: 1
      },
      drawer: false,
      brandFold: true,
      announcement_brandFold: true,
      menu: "1",
      openAndClose: false,
      sidebarInfo: [
        // {
        //   titleName: '首页',
        //   toPath: '/homepage',
        //   iconImg: 'https://static-shanghai.hanku.net.cn/home_icon_sy_nor%402x.png',
        //   selIconImg: 'https://static-shanghai.hanku.net.cn/home_icon_sy_sel%402x.png',
        //   index: '1',
        //   disNone: 'block' //控制item显示还是隐藏，none为隐藏，block为显示
        // },
        // {
        //   titleName: '权限管理',
        //   toPath: '/competence',
        //   iconImg: 'https://static-shanghai.hanku.net.cn/home_icon_sj_nor%402x.png',
        //   selIconImg: 'https://static-shanghai.hanku.net.cn/home_icon_sj_sel%402x.png',
        //   index: '2',
        //   disNone: 'block'
        // },
        // {
        //   titleName: '用户管理',
        //   toPath: '/user',
        //   iconImg: 'https://static-shanghai.hanku.net.cn/home_icon_rw_nor%402x.png',
        //   selIconImg: 'https://static-shanghai.hanku.net.cn/home_icon_rw_sel%402x.png',
        //   index: '3',
        //   disNone: 'block'
        // },
        // {
        //   titleName: '审核管理',
        //   toPath: '/examine',
        //   iconImg: 'https://static-shanghai.hanku.net.cn/home_icon_kh_nor%402x.png',
        //   selIconImg: 'https://static-shanghai.hanku.net.cn/home_icon_kh_sel%402x.png',
        //   index: '4',
        //   disNone: 'block',
        //   subNav: [ //有下拉列表
        //     {
        //       toPath: '/userWithdrawal',
        //       title: '用户提现审核',
        //       index: '4-1'
        //     },
        //     {
        //       toPath: '/agentWithdrawal',
        //       title: '合伙人提现审核',
        //       index: '4-2'
        //     },
        //     {
        //       toPath: '/receiverCancel',
        //       title: '接单者取消订单审核',
        //       index: '4-3'
        //     },
        //     {
        //       toPath: '/posterCancel',
        //       title: '发布者取消订单审核',
        //       index: '4-4'
        //     },
        //     {
        //       toPath: '/realname',
        //       title: '实名认证审核',
        //       index: '4-5'
        //     }
        //   ]
        // },
        // {
        //   titleName: '消息推送',
        //   toPath: '/manage',
        //   iconImg: 'https://static-shanghai.hanku.net.cn/home_icon_gl_nor%402x.png',
        //   selIconImg: 'https://static-shanghai.hanku.net.cn/home_icon_gl_sel%402x.png',
        //   index: '5',
        //   disNone: 'block'
        // },
        // {
        //   titleName: '订单管理',
        //   toPath: '/orderManage',
        //   iconImg: 'https://static-shanghai.hanku.net.cn/home_icon_jx_nor%402x.png',
        //   selIconImg: 'https://static-shanghai.hanku.net.cn/home_icon_jx_sel%402x.png',
        //   index: '6',
        //   disNone: 'block'
        // },
        // {
        //   titleName: '任务管理',
        //   toPath: '/taskManage',
        //   iconImg: 'https://static-shanghai.hanku.net.cn/home_icon_bb_nor%402x.png',
        //   selIconImg: 'https://static-shanghai.hanku.net.cn/home_icon_bb_sel%402x.png',
        //   index: '7',
        //   disNone: 'block'
        // },
        // {
        //   titleName: '财务管理',
        //   toPath: '/moneyManage',
        //   iconImg: 'https://static-shanghai.hanku.net.cn/home_icon_sz_nor%402x.png',
        //   selIconImg: 'https://static-shanghai.hanku.net.cn/home_icon_sz_sel%402x.png',
        //   index: '8',
        //   disNone: 'block',
        //   subNav: [ //有下拉列表
        //     {
        //       toPath: '/platformMoney',
        //       title: '平台收入明细',
        //       index: '8-1'
        //     },
        //     {
        //       toPath: '/agentMoney',
        //       title: '合伙人收入明细',
        //       index: '8-2'
        //     },
        //     {
        //       toPath: '/userMoney',
        //       title: '用户收入明细',
        //       index: '8-3'
        //     }
        //   ]
        // },
        // {
        //   titleName: '会员配置',
        //   toPath: '/revenue',
        //   iconImg: 'https://static-shanghai.hanku.net.cn/home_icon_gl_nor%402x.png',
        //   selIconImg: 'https://static-shanghai.hanku.net.cn/home_icon_gl_sel%402x.png',
        //   index: '9',
        //   disNone: 'block'
        // },
        // {
        //   titleName: '意见反馈',
        //   toPath: '/feedback',
        //   iconImg: 'https://static-shanghai.hanku.net.cn/home_icon_zw_nor%402x.png',
        //   selIconImg: 'https://static-shanghai.hanku.net.cn/home_icon_zw_sel%402x.png',
        //   index: '10',
        //   disNone: 'block'
        // },
        // {
        //   titleName: '类目管理',
        //   toPath: '/category',
        //   iconImg: 'https://static-shanghai.hanku.net.cn/home_icon_sz_nor%402x.png',
        //   selIconImg: 'https://static-shanghai.hanku.net.cn/home_icon_sz_sel%402x.png',
        //   index: '11',
        //   disNone: 'block'
        // },
        // {
        //   titleName: '价格参考管理',
        //   toPath: '/Pricereference',
        //   iconImg: 'https://static-shanghai.hanku.net.cn/home_icon_sz_nor%402x.png',
        //   selIconImg: 'https://static-shanghai.hanku.net.cn/home_icon_sz_sel%402x.png',
        //   index: '12',
        //   disNone: 'block'
        // },
        // {
        //   titleName: '系统管理',
        //   toPath: '/system',
        //   iconImg: 'https://static-shanghai.hanku.net.cn/home_icon_bb_nor%402x.png',
        //   selIconImg: 'https://static-shanghai.hanku.net.cn/home_icon_bb_sel%402x.png',
        //   index: '13',
        //   disNone: 'block'
        // }
      ]
    };
  },
  methods: {
    submit() {
      if (this.onePw !== this.twoPw) {
        this.$message.error("您两次输入的密码不一致");
        return;
      }
      const data = {
        userId: localStorage.getItem("tokenId") || "",
        password: this.$md5(this.twoPw)
      };
      userUptade(data).then(res => {
        if (res.status === 200) {
          this.$message.success("提交成功");
          this.withdrawalModal = false;
          this.login_out();
        } else {
          this.$message.error("操作失败，请稍后重试");
        }
      });
    },
    willChangePW() {
      this.withdrawalModal = true;
    },
    FunGetMenuList() {
      GetMenuList().then(res => {
        const result = res.data;
        if (result.code === "200") {
          this.sidebarInfo = result.data;
          console.log(res);
        }
      });
    },
    init() {
      const data = {
        id: this.userid
      };
      users(data).then(res => {
        this.username = res.data.data.username;
        console.log(this.username)

      });
    },
    // load() {
    //   this.loading = true
    //   this.notice.pageNum++
    //   const data = {
    //     pageNum: this.notice.pageNum,
    //     pageSize: this.notice.pageSize
    //   }
    //   setTimeout(() => {
    //     if (this.notice.pageNum <= this.notice.totalPages) {
    //       getnewslist(data).then(res => {
    //         if (res.data.code === '200') {
    //           this.loading = false
    //           this.noticelist = [...this.noticelist, ...res.data.data.records]
    //           this.notice.totalPages = res.data.data.pages
    //         }
    //       })
    //     } else {
    //       this.noMore = true
    //       this.loading = false
    //     }
    //   }, 1000)
    // },
    /**
     * 展开收起
     */
    changeFoldState(item, index) {
      item.check1 = !item.check1;
    },
    //退出登录
    login_out() {
      console.log(2222);
      localStorage.removeItem("yqToken");
      localStorage.removeItem("tokenId");
      location.reload();
    },
    // 服务商管理跳转
    handleOpen(key, keyPath) {
      // this.reset()
      if (key === "4") {
        this.sidebarInfo[3].selIconImg =
          "https://static-shanghai.hanku.net.cn/home_icon_kh_sel%402x.png";
        this.sidebarInfo[3].iconImg =
          "https://static-shanghai.hanku.net.cn/home_icon_kh_sel%402x.png";
        this.sidebarInfo[7].selIconImg =
          "https://static-shanghai.hanku.net.cn/home_icon_sz_nor%402x.png";
        this.sidebarInfo[7].iconImg =
          "https://static-shanghai.hanku.net.cn/home_icon_sz_nor%402x.png";
      } else if (key === "8") {
        this.sidebarInfo[7].selIconImg =
          "https://static-shanghai.hanku.net.cn/home_icon_sz_sel%402x.png";
        this.sidebarInfo[7].iconImg =
          "https://static-shanghai.hanku.net.cn/home_icon_sz_sel%402x.png";
        this.sidebarInfo[3].selIconImg =
          "https://static-shanghai.hanku.net.cn/home_icon_kh_nor%402x.png";
        this.sidebarInfo[3].iconImg =
          "https://static-shanghai.hanku.net.cn/home_icon_kh_nor%402x.png";
      }
    },
    handleClose(key, keyPath) {
      if (key === "4") {
        this.sidebarInfo[3].selIconImg =
          "https://static-shanghai.hanku.net.cn/home_icon_kh_nor%402x.png";
        this.sidebarInfo[3].iconImg =
          "https://static-shanghai.hanku.net.cn/home_icon_kh_nor%402x.png";
      } else if (key === "8") {
        this.sidebarInfo[7].selIconImg =
          "https://static-shanghai.hanku.net.cn/home_icon_sz_nor%402x.png";
        this.sidebarInfo[7].iconImg =
          "https://static-shanghai.hanku.net.cn/home_icon_sz_nor%402x.png";
      }
    }
  },
  watch: {
    $route: {
      handler: function(val, oldval) {
        const path = val.path;
        if (path === "/homepage") {
          this.menu = "1";
          localStorage.setItem("menu", "1");
        } else if (path === "/competence") {
          this.menu = "2";
        } else if (path === "/user") {
          this.menu = "3";
        } else if (
          path === "/userWithdrawal" ||
          path === "/agentWithdrawal" ||
          path === "/receiverCancel" ||
          path === "/posterCancel" ||
          path === "/realname"
        ) {
          if (path === "/userWithdrawal") {
            this.menu = "4-1";
          } else if (path === "/agentWithdrawal") {
            this.menu = "4-2";
          } else if (path === "/receiverCancel") {
            this.menu = "4-3";
          } else if (path === "/posterCancel") {
            this.menu = "4-4";
          } else if (path === "/realname") {
            this.menu = "4-5";
          }
        } else if (path === "/manage") {
          this.menu = "5";
        } else if (path === "/orderManage") {
          this.menu = "6";
        } else if (path === "/taskManage") {
          this.menu = "7";
        } else if (
          path === "/platformMoney" ||
          path === "/agentMoney" ||
          path === "/userMoney"
        ) {
          if (path === "/platformMoney") {
            this.menu = "8-1";
          } else if (path === "/agentMoney") {
            this.menu = "8-2";
          } else if (path === "/userMoney") {
            this.menu = "8-3";
          }
        } else if (path === "/revenue") {
          this.menu = "9";
        } else if (path === "/feedback") {
          this.menu = "10";
        } else if (path === "/category") {
          this.menu = "11";
        } else if (path === "/Pricereference") {
          this.menu = "12";
        } else if (path === "/system") {
          this.menu = "13";
        }
      },
      deep: true
    }
  },
  mounted() {
    const path = this.$route.path;
    if (path === "/homepage") {
      this.menu = "1";
      localStorage.setItem("menu", "1");
    } else if (path === "/competence") {
      this.menu = "2";
    } else if (path === "/user") {
      this.menu = "3";
    } else if (
      path === "/userWithdrawal" ||
      path === "/agentWithdrawal" ||
      path === "/receiverCancel" ||
      path === "/posterCancel" ||
      path === "/realname"
    ) {
      if (path === "/userWithdrawal") {
        this.menu = "4-1";
      } else if (path === "/agentWithdrawal") {
        this.menu = "4-2";
      } else if (path === "/receiverCancel") {
        this.menu = "4-3";
      } else if (path === "/posterCancel") {
        this.menu = "4-4";
      } else if (path === "/realname") {
        this.menu = "4-5";
      }
    } else if (path === "/manage") {
      this.menu = "5";
    } else if (path === "/orderManage") {
      this.menu = "6";
    } else if (path === "/taskManage") {
      this.menu = "7";
    } else if (
      path === "/platformMoney" ||
      path === "/agentMoney" ||
      path === "/userMoney"
    ) {
      if (path === "/platformMoney") {
        this.menu = "8-1";
      } else if (path === "/agentMoney") {
        this.menu = "8-2";
      } else if (path === "/userMoney") {
        this.menu = "8-3";
      }
    } else if (path === "/revenue") {
      this.menu = "9";
    } else if (path === "/feedback") {
      this.menu = "10";
    } else if (path === "/category") {
      this.menu = "11";
    } else if (path === "/Pricereference") {
      this.menu = "12";
    } else if (path === "/system") {
      this.menu = "13";
    }
  },
  computed: {},
  created() {
    this.FunGetMenuList(); // 左侧menu列表
    this.userid = localStorage.getItem("tokenId");
    this.init();
  },
  updated() {}
};
</script>
<style lang="scss">
@function px($px) {
  $rem: 144;
  @return ($px/ $rem) + rem;
}
.el-header {
  background-color: #fff;
  color: #333;
  height: 63px !important;
  line-height: 63px;
  display: flex;
  justify-content: space-between;
  padding-left: px(20);
  padding-right: px(0) !important;
}
.vip_main_item {
  display: flex;
  margin-top: 30px;
  align-items: center;
  .vip_main_item_text {
    margin-right: 25px;
    width: 70px;
  }
}
//通知抽屉
.announcement_drawer_box {
  .announcement_drawer {
    .el-drawer__header {
      height: 56px;
      background: rgba(241, 248, 255, 1);
      span {
        font-size: 18px;
        font-weight: 600;
        color: rgba(51, 57, 63, 1);
        display: inline-block;
        margin-top: -20px;
        outline: none;
      }
      .el-drawer__close-btn {
        margin-top: -20px;
      }
    }
    .demo-drawer__content {
      .announcement_drawer_ul {
        padding: 0 px(24) 24px px(24);
        li {
          width: px(912);
          background: rgba(241, 248, 255, 1);
          border-radius: 4px;
          margin-top: 24px;
          .announcement_drawer_li_top {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 12px px(24);
            .announcement_drawer_title {
              color: rgba(51, 57, 63, 1);
              font-size: 14px;
              font-weight: 600;
            }
            .announcement_drawer_title_content {
              :nth-child(1) {
                font-size: 14px;
                font-weight: 400;
                color: rgba(111, 124, 141, 1);
                line-height: 16px;
              }
              :nth-child(2) {
                font-size: 14px;
                color: rgba(0, 151, 254, 1);
                line-height: 16px;
                display: inline-block;
                padding-left: px(24);
                cursor: pointer;
              }
            }
          }
          .announcement_drawer_li_bottom {
            width: px(775);
            padding: 4px px(24) 16px px(24);
            font-size: 14px;
            font-weight: 400;
            color: rgba(51, 57, 63, 1);
          }
        }
      }
    }
  }
}
.menu_li {
  height: 48px;
  text-align: left;
}
.el-menu-item {
  line-height: 48px;
  border-right: 4px solid #fff;
}
.homeHaoveOne {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.el-aside {
  color: #333;
  text-align: center;
}
.aside_width {
  width: px(192) !important;
}
.el-submenu__title {
  border-right: 0 !important;
  text-align: left;
}
.el-menu {
  border-right: 0 !important;
}
.el-main {
  background-color: #f3f5f8;
  padding: 0 !important;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-submenu__title:hover {
  background-color: rgba(241, 248, 255, 1) !important;
}
.el-menu-item:hover {
  background-color: rgba(241, 248, 255, 1) !important;
  border-right: 4px solid rgba(241, 248, 255, 1);
}
.el-menu-item.is-active {
  background-color: rgba(241, 248, 255, 1) !important;
  border-right: 4px solid rgba(0, 151, 254, 1);
}
.el-submenu .el-menu-item {
  min-width: px(196) !important;
}
.el-submenu.is-opened .el-submenu__title span {
  color: #0097fe;
}
.my_icon {
  margin-right: px(5);
  width: 14px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
  height: 14px;
  margin-right: px(8);
  img {
    width: 14px;
    height: 14px;
    margin-bottom: 5px;
  }
}
.layout_logo {
  line-height: 63px;
  height: 48px;
  background: rgb(254, 254, 254);
  color: #0097fe;
  font-weight: bold;
  font-size: 20px;
}
.logo_img {
  width: 48px;
  height: 48px;
}
.el-row {
  height: 100%;
  .el-col {
    display: flex;
    height: 100%;
    flex-direction: column;
  }
}
.el-menu-vertical-demo {
  margin-top: 7px;
  position: relative;
  flex: 1;
  overflow-y: scroll;
  .dis_none {
    display: none !important;
  }
  .scroll_aside {
    overflow-y: auto;
    overflow-x: hidden;
  }
  .scroll_aside::-webkit-scrollbar {
    width: 4px !important;
    height: 8px;
  }
  .scroll_aside::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(243, 245, 248, 1);
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  /*定义滑块，内阴影及圆角*/
  .scroll_aside::-webkit-scrollbar-thumb {
    height: 10px;
    border-radius: 10px;
    background-color: rgba(197, 205, 213, 1);
  }
  .workbench {
    width: 144px;
    height: 46px;
    display: block;
    background: rgba(0, 151, 254, 1);
    box-shadow: 0px 4px 12px 0px rgba(0, 151, 254, 0.24);
    border-radius: 6px;
    margin: 0 auto;
    // margin-top:100px;
    // margin-bottom: 100px;
    position: absolute;
    bottom: 48px;
    left: 0;
    right: 0;
    margin: auto;
    img {
      width: px(18);
      height: 18px;
      margin-top: 14px;
      margin-right: px(6);
    }
    span {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 46px;
    }
  }
}
.system_name {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 57, 63, 1);
}
.system_user {
  display: flex;
  font-size: 14px;
  font-weight: 400;
  color: rgba(27, 41, 58, 1);
}
.layout_notify,
.layout_guid {
  margin-right: px(26);
  font-size: 14px;
  display: flex;
  align-items: center;
}
.layout_point {
  cursor: pointer;
  display: flex;
  &:hover {
    color: #3c72e7;
  }
  .head_img {
    width: 14px;
    height: 15px;
    display: block;
    margin-right: px(3);
    margin-bottom: 2px;
    img {
      width: 14px;
      height: 100%;
    }
  }
}
.line {
  color: rgba(27, 41, 58, 1);
  opacity: 0.24;
}
.layout_userMsg {
  min-width: px(200);
  height: 63px;
  display: flex;
  align-items: center;
  &:hover {
    background: #f1f9ff !important;
  }
  i {
    width: px(8.5);
    height: 6px;
    font-size: 9px;
    color: #6f7c8d;
  }
}
.layout_userNum {
  width: 36px;
  height: 36px;
  margin-left: px(24);
  margin-right: px(6);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 10px 0px rgba(49, 137, 245, 0.04);
  border-radius: 50%;
  img {
    width: 36px;
    height: 100%;
    border-radius: 50%;
  }
}
.layout_user {
  height: 18px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(111, 124, 141, 1);
  line-height: 20px;
}
.out {
  width: px(120);
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  padding-right: px(24);
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown-menu {
  // width: 160px!important;
  left: 90% !important;
  font-weight: bold !important;
  color: rgba(27, 41, 58, 1) !important;
  .el-dropdown-menu__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 46px;
    // width:159px;
  }
  img {
    width: px(12);
    height: px(13);
    margin-right: px(3);
  }
  span {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(100, 109, 120, 1);
    line-height: 20px;
    cursor: pointer;
  }
}
.layout_time {
  height: 64px;
  padding-left: 20px;
}
.past_date {
  color: rgba(123, 123, 123, 1);
  font-weight: 400 !important;
  line-height: 35px;
}
// .el-dropdown-menu{
//   // width:160px!important;
// }
// .websocket_sBox{
//   height: 104px;
//   width: 48px;
//   position: fixed;
//   right: 0;
//   bottom: 200px;
//   z-index: 99999;
//   display: flex;
//   display: -webkit-flex;
//   justify-content: space-between;
//   flex-direction: column;
//   .socket_top,.socket_bot{
//     width: 48px;
//     height: 40px;
//     background:rgba(0,151,254,1);
//     box-shadow:0px 4px 12px 0px rgba(49,137,245,0.24);
//     border-radius:24px 0px 0px 24px;
//     display: flex;
//     display: -webkit-flex;
//     justify-content: center;
//     align-items: center;
//     padding-left: 8px;
//     img{
//       height: 20px;
//       width: 20px;
//     }
//   }
// }

//gathering_drawer_box
.gathering_drawer {
  .el-drawer__container {
    .el-drawer {
      .el-drawer__header {
        height: 56px;
        background: rgba(241, 248, 255, 1);
        span {
          font-size: 18px;
          font-weight: 600;
          color: rgba(51, 57, 63, 1);
          display: inline-block;
          margin-top: -20px;
          outline: none;
        }
        button {
          margin-top: -20px;
        }
      }
      .record_form_box11 {
        box-sizing: border-box;
        padding-bottom: 100px;
        .el-form {
          display: flex;
          height: 70px;
          box-sizing: border-box;
          .el-form-item {
            margin-right: px(48);
            width: px(264);
            margin-bottom: 32px;
            .el-form-item__content {
              width: px(264);
            }
            .el-form-item__label {
              padding-right: px(24);
            }
            .el-input {
              width: px(264);
              height: 38px;
            }
          }
          .is_drawer {
            width: 100%;
            .el-form-item__content {
              display: flex;
              align-items: center;
              width: 80%;
              .el-input {
                width: px(264);
                height: 38px;
                margin-left: px(24);
              }
            }
          }
        }
        .textarea-ruleForm {
          height: 168px;
          .el-textarea {
            width: px(672);
            height: 136px;
          }
          .el-textarea__inner {
            width: px(672);
            height: 136px;
          }
        }
        .upload-ruleForm {
          height: 182px;
          width: 100%;
          .el-form-item__content {
            width: 100% !important;
          }
        }
        .form1 {
          display: flex !important;
          justify-content: space-between;
          width: 76.1%;
          // padding-right: px(138);
        }
        .phoneNum {
          position: absolute;
          left: px(290);
          top: 0px;
          width: 264px;
          height: 38px;
          background: rgba(241, 248, 255, 1);
          border-radius: 4px;
          padding-left: 16px;
          font-size: 14px;
          color: rgba(173, 181, 192, 1);
        }
        .moneyMsg {
          position: absolute;
          left: 300px;
          top: 0;
          height: 38px;
          line-height: 38px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(111, 124, 141, 1);
          left: px(300);
          width: 500px;
        }
      }
      .record_draw_footer1 {
        width: 100%;
        height: 88px;
        background: rgba(241, 248, 255, 1);
        border-radius: 4px 0px 0px 4px;
        position: fixed;
        display: flex;
        align-items: center;
        padding-left: px(48);
        bottom: 0;
        .el-button {
          width: 100px;
          height: 40px;
          background: rgba(0, 151, 254, 1);
          box-shadow: 0px 1px 0px 0px rgba(22, 29, 37, 0.1);
          border-radius: 4px;
          margin-right: px(25);
        }
        .el_button2 {
          background: #fff;
          color: #2078e5;
        }
      }
    }
  }
}
//内部公告弹出框
.el-drawer__header {
  height: 56px;
  background: rgba(241, 248, 255, 1);
  span {
    font-size: 18px;
    font-weight: 600;
    color: rgba(51, 57, 63, 1);
    display: inline-block;
    margin-top: -20px;
    outline: none;
  }
  .el-drawer__close-btn {
    margin-top: -20px;
  }
}
.el-drawer__body {
  .announcement_drawer_content {
    overflow: auto;
    height: PX(630);
    .announcement_drawer_ul {
      padding: 0 px(24) 24px px(24);
      li {
        width: px(912);
        background: rgba(241, 248, 255, 1);
        border-radius: 4px;
        margin-top: 24px;
        .announcement_drawer_li_top {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 12px px(24);
          .announcement_drawer_title {
            color: rgba(51, 57, 63, 1);
            font-size: 14px;
            font-weight: 600;
          }
          .announcement_drawer_title_content {
            :nth-child(1) {
              font-size: 14px;
              font-weight: 400;
              color: rgba(111, 124, 141, 1);
              line-height: 16px;
            }
            :nth-child(2) {
              font-size: 14px;
              color: rgba(0, 151, 254, 1);
              line-height: 16px;
              display: inline-block;
              padding-left: px(24);
              cursor: pointer;
            }
          }
        }
        .announcement_drawer_li_bottom {
          width: px(775);
          padding: 4px px(24) 16px px(24);
          font-size: 14px;
          font-weight: 400;
          color: rgba(51, 57, 63, 1);
        }
      }
      .ins {
        text-align: center;
        margin-top: 15px;
      }
    }
  }
}
.el-submenu__title {
  border-right: 0 !important;
  text-align: center;
}
ul.el-menu {
  background-color: rgb(51, 55, 68);
  width: 190px;
}
</style>
