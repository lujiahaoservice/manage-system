<template>
 <div class="InternalAnnouncement">
  <div class="iatitle">
      <div class="line"></div>
      <p>内容公告</p>
  </div>
  <div class="notice">
      <div class="noticetitle">
        <p>公告标题</p>
        <el-input placeholder="请输入公告标题" v-model="noticetitle"></el-input>
      </div>
      <div class="noticecontent">
          <p>公告内容</p>
          <textarea class="inpt" v-model="noticecontent" placeholder="请输入公告内容"></textarea>
      </div>
  </div>
  <div class="notice_bottom">
      <div class="btn" @click="publish">发布</div>
  </div>
 </div>
</template>
 
<script>
import '@/assets/css/reset.scss'
import { addannouncement } from '@/api/setting/Announcement'
export default {
  data() {
    return {
      noticetitle: '',
      noticecontent: ''
    }
  },
  methods: {
    publish() {
      const data = {
        title: this.noticetitle,
        content: this.noticecontent
      }
      addannouncement(data).then((res) => {
        
      })
      this.noticetitle = ''
      this.noticecontent = ''
    }
  }
}
</script>
 
<style lang="scss" >
    @function px($px){
        $rem: 144;
        @return ($px/ $rem) + rem;
    }
    .InternalAnnouncement{
      width: px(1200);
      height:px(630);
      background:#fff;
      box-shadow:0px -2px 10px 0px rgba(49,137,245,0.04);
      border-radius:4px;
      position: relative;
      top:24px;
      left:24px;
      padding:24px 0 0 24px;
      .iatitle{
        width:100%;
        height:18px;
        display: flex;
        justify-content: flex-start;
        .line{
            width:2px;
            height:18px;
            background:#0097FE;
        }
        p{
          font-size:16px;
          font-weight:500;
          color:rgba(51,57,63,1);
          line-height:18px;
          padding-left:8px;
        }
      }
      .noticetitle{
        width:px(852);
        height:38px;
        display: flex;
        justify-content: flex-start;
        margin-top: 33px;
        p{
          font-size:14px;
          font-weight:500;
          color:rgba(51,57,63,1);
          line-height:38px;
          padding-right:24px;
        }
        input{
          width:px(672);
          height:38px;
          border-radius:4px;
          border:1px solid rgba(197,205,213,1);
        }
        .el-input{
          width:px(672);
          height:38px;
        }
      }
      .noticecontent{
        width:100%;
        height:216px;
        margin-top: 33px;
        display: flex;
        justify-content: flex-start;
        p{
          font-size:14px;
          font-weight:500;
          color:rgba(51,57,63,1);
          line-height:38px;
          padding-right:24px;
        }
        .inpt{
            width:px(672);
            height:216px;
            border-radius:4px;
            border:1px solid rgba(197,205,213,1);
            padding:7px 0 0 16px;
            &::placeholder{
                color:#ADB5C0;
            }
        }
      }
      .notice_bottom{
        width:px(1200);
        height:88px;
        box-shadow:0px -2px 10px 0px rgba(49,137,245,0.04);
        border-radius:0px 0px 4px 4px;
        padding:24px 0 0 48px;
        position: absolute;
        bottom: 0;
        left:0;
        .btn{
          width:100px;
          height:40px;
          background:rgba(0,151,254,1);
          box-shadow:0px 4px 12px 0px rgba(0,151,254,0.24);
          border-radius:4px;
          color:#fff;
          font-size:14px;
          font-weight:400;
          line-height:20px;
          text-align: center;
          line-height: 40px;
          cursor: pointer;
        }
      }
    }
</style>