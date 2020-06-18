<template>
  <div class="manage">
    <!-- 头部 -->
    <div class="header_tit">
      <div class="line"></div>
      <span>消息推送</span>
    </div>

    <!-- tabs -->
    <div class="table_tabs">
      <div :class="['tab', tab_active === '1' ? 'active_tab' : '']" @click="tab_active = '1'">客户app通知</div>
      <div :class="['tab', tab_active === '2' ? 'active_tab' : '']" @click="tab_active = '2'">消息推送记录</div>
    </div>
    <!-- 客户APP通知 -->
    <div class="APPinform" v-show="tab_active == '1'"> 
      <el-form label-width="120px" class="demo-ruleForm">
        <el-form-item label="通知标题" >
          <el-input type="text" placeholder="请输入App通知标题" v-model="title"></el-input>
        </el-form-item>
        <el-form-item label="通知内容" >
          <el-input type="textarea" placeholder="请输入App通知内容" v-model="content"></el-input>
        </el-form-item>
        <el-form-item label="选择推送对象" >
          <el-radio v-model="type" :label="0">个人用户</el-radio>
          <el-radio v-model="type" :label="1">全部</el-radio>
        </el-form-item>
        <el-form-item label="送达用户手机号" v-if="type === 0">
          <el-input type="text" placeholder="请输入推送用户手机号" maxlength="11" v-model="mobile"></el-input>
          <div v-if="pushList !== ''" style="positon:relative;">送达用户：
            <div class="checkUser">
              <div v-for="item in pushList" :key="item.id" class="flexIt">
                <div>{{item.username}}</div>
                <div class="selectIt" @click="selectIt(item)">选择</div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-button type="primary" @click="sendPush">发送</el-button>
      </el-form>
    </div>
    <infoList v-if="tab_active == '2'"></infoList>
  </div>
</template>

<script>
import { sendMessage } from '@/api/message'
import infoList from './infoList'
export default {
  components: {
    infoList
  },
  data() {
    return {
      type: 0, //'0个推 1群推
      tab_active: '1',
      title: '',
      content: '',
      pushList: '',
      mobile: ''
    }
  },
  created() {
    // this.initData()
  },
  methods: {
    sendPush() {
      const data = {
        title: this.title,
        content: this.content,
        type: this.type
      }
      if (this.type === 0) {
        data.phone = this.mobile
      }
      sendMessage(data).then(res => {
        if (res.status === 200) {
          this.$message({
            message: '推送成功',
            type: 'success'
          })
          this.title = ''
          this.content = ''
          this.mobile = ''
        } else {
          this.$message({
            message: '推送失败',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
@function px($px){
  $rem: 144;
  @return ($px/ $rem) + rem;
}
.manage{
  margin: 24px px(24);
  background: #fff;
  padding:24px px(24);
  .header_tit{
    display: flex;
    height:18px;
    margin-bottom:24px;
    .line{//蓝色竖线
      width:2px;
      height:18px;
      background:rgba(0,151,254,1);
      margin-right:px(8);
    }
    span{
      font-size:16px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(51,57,63,1);
      line-height:16px;
    }
  }

  //tabs切换
  .table_tabs{
    display: flex;
    margin-top: 24px;
    // margin-bottom: 16px;
    padding-left: px(7);
    border-bottom: 1px solid #E4EEF9;
    position: relative;
    height: 41px;
    .tab{
      width: 160px;
      height: 40px;
      line-height: 40px;
      background:rgba(246,248,251,1);
      border-radius:4px 4px 0px 0px;
      border:1px solid rgba(228,238,249,1);
      padding-left: 16px;
      margin-right: px(4);
      font-size:14px;
      font-weight:500;
      margin-top: 1px;
      cursor: pointer;
      color: #6F7C8D;
    }
    .active_tab{
      background:rgba(255,255,255,1);
      color:rgba(0,151,254,1);
      border-bottom: #fff;
    }
  }

  .APPinform,.wechat_inform{
    padding:32px px(74) 32px 0;
    .el-textarea__inner{
      width:px(964);
      height:136px;
    }
    .el-button{
      width:119px;
      height:32px;
      background:rgba(0,151,254,1);
      border-radius:4px;
      padding:0;
      text-align: center;
      line-height: 32px;
      margin-top:px(80);
      margin-left:80px;
    }
  }
  .selectIt{
    width: 50px;
    height: 25px;
    background: #0097fe;
    text-align: center;
    line-height: 25px;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
  .checkUser{
    position: absolute;
    left: 120px;
    top: 40px;
    height: px(230);
    overflow: auto;
    width: 200px;
    .flexIt{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>