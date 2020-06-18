<template>
  <div class="error">
    <div class="error_box">
      <div class="left">
        <div class="title">
          404
        </div>
        <div class="sorry">
          您访问的页面离开了
        </div>
        <div class="sorry_des">
          对不起，您访问的页面离开了。您可以先返回
        </div>
        <div class="button">
          <div class="back" @click="goHome">
            返回首页
          </div>
          <div class="question">
            问题反馈
          </div>
        </div>
      </div>
      <div class="right">
        <img src="../../assets/error404.png" alt="404"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 跳转回首页
    goHome() {
      this.$router.push({ path: '/' }) 
    }
  }
}
</script>

<style lang="scss" scoped>
@function px($px){
  $rem: 192;
  @return ($px/ $rem) + rem;
}
.left {
  float: left;
}
.right {
  float: right;
}
.error {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .error_box {
    height: 100%;
    width: px(1050);
    margin: px(250) auto 0;
    .title {
      height: px(127);
      font-size: px(88);
      font-family: SourceHanSansSC-Bold, SourceHanSansSC;
      font-weight: bold;
      color: rgba(193, 194, 197, 1);
      line-height: px(127);
    }
    .sorry {
      margin-top:px(32);
      width: px(216);
      height: px(33);
      font-size: px(24);
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: px(33);
    }
    .sorry_des {
      margin-top:px(8);
      width: px(322);
      height: px(20);
      font-size: px(14);
      font-family: PingFangSC;
      color: rgba(153, 153, 153, 1);
      line-height: px(20);
    }
    .button {
      
      margin-top: px(40);
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      line-height:px(20);
      color:rgba(255,255,255,1);
      div{
        display: inline-block;
        cursor: pointer;
      }
      
      .back {
        outline: 0;
        background: #017CFF;
        border-radius: px(18);
        padding:px(8) px(24);
      }
      .question {
        margin-left:px(32);
        padding:px(8) px(24);
        background:#6C7AB8;
        border-radius: 18px;
       
      }
    }
    .right img {
      width: px(596);
      height: px(495);
    }
  }
}
</style>
