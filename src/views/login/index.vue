<template>
  <div class="login">
    <div class="box">
      <div class="content">
        <div class="left">
          <swiper :options="swiperOption">
            <swiper-slide class="swiper-slide" v-for="(item, index) in swiperlist" :key="index">
              <img :src="item" alt />
            </swiper-slide>
          </swiper>
        </div>
        <div class="right">
          <img src="../../assets/image/SignIn.png" alt />
          <div class="title">登录</div>
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginFormRules"
            label-width="0px"
            class="login_form"
          >
            <!-- 用户名 -->
            <el-form-item prop="phone">
              <el-input v-model="loginForm.phone"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <div class="eye">
                <el-input
                  class="psd"
                  v-model="loginForm.password"
                  :type="open === true ? 'text' : 'password'"
                ></el-input>
                <img src="../../assets/image/open.png" alt v-if="open" @click="open = false" />
                <img src="../../assets/image/close.png" alt v-else @click="open = true" />
              </div>
            </el-form-item>
            <!-- 按钮区域 -->
            <el-form-item class="btns">
              <el-button type="primary" @click="userQuitLogin">登录</el-button>
              <el-button type="info" @click="resetLoginForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div
      style="width:300px;margin:0 auto; padding:20px 0;position: fixed;bottom: 0;left: 50%;transform: translateX(-50%)"
    ></div>
  </div>
</template>

<script>
import { userLogin } from "@/api/login";
export default {
  data() {
    return {
      open: false,
      loginForm: {
        phone: "test",
        password: "lxj391106"
      },
      checked: false,
      swiperlist: [
        "https://static-shanghai.hanku.net.cn/jqy_system/login/swiper1.png",
        "https://static-shanghai.hanku.net.cn/jqy_system/login/swiper2.png",
        "https://static-shanghai.hanku.net.cn/jqy_system/login/swiper3.png"
      ],
      swiperOption: {
        //显示分页
        pagination: {
          el: ".swiper-pagination"
        },
        //设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        //自动轮播
        autoplay: {
          delay: 5000,
          //当用户滑动图片后继续自动轮播
          disableOnInteraction: false
        },
        //开启循环模式
        loop: true
      },
      loginFormRules: {
        // 验证用户名是否合法
        phone: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    userQuitLogin() {
      const data = {
        username: this.loginForm.phone,
        password: this.$md5(this.loginForm.password)
      };
      userLogin(data).then(res => {
        const result = res.data;
        if (result.code === "200") {
          this.$store.commit("LOGIN_INFO", result.data);
          localStorage.setItem("yqToken", result.data.token);
          localStorage.setItem("tokenId", result.data.userId);
          this.$router.push("/homepage");
        } else if (result.code === "500") {
          this.$message({
            message: result.msg,
            type: "error"
          });
          return;
        }
      });
    },
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    }
  }
};
</script>

<style lang="scss">
@function px($px) {
  $rem: 192;
  @return ($px/ $rem) + rem;
}
.login {
  width: 100%;
  height: 100%;
  padding-top: 28px;
  .box {
    display: flex; 
    justify-content: center;
    width: 100%;
    height: 472px;
    margin-top: px(90);
   
    .content {
      display: flex;
      box-shadow: 0px 4px 24px 0px rgba(0, 55, 100, 0.5);
      border-radius: 5px;
    }
    .left {
      width: 472px;
    }
    .right {
      width: 306px;
      height: 100%;
      background: #fff;
      padding: 60px 48px 0 49px;
      img {
        width: 143px;
        height: 50px;
      }
      .title {
        font-size: 22px;
        font-weight: 400;
        color: rgba(71, 74, 77, 1);
        line-height: 22px;
      }
      input {
        width: 210px;
        border: none;
        padding: 8px 0;
        border-bottom: 1px solid #dddee1;
        margin-top: 40px;
      }
      .eye {
        position: relative;
        img {
          position: absolute;
          width: 12px;
          height: 12px;
          right: 8px;
          bottom: 8px;
        }
      }
      .psd {
        margin-top: 15px;
      }
    }
  }
}
</style>