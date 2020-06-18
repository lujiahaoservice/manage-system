<template>
  <div class="communication">
    <!-- <div class="communication_box">
      <div class="backlog">
        <div class="backlog_box" @click="()=>{isShow=!isShow}">
          <img src="../../assets/image/backlog_logo.png" alt="">
          <span style="margin-left:10px;">工作助理</span>
        </div>
      </div>
    </div>
    <div class="at_me" v-if="isShow">
      <div class="at_me_top">
        <div :style="type===1?'background:#0097FE;color:#fff;':''" @click="()=>{type = 1}">
          @我的
          <div v-if="notProcessed" class="noticeNum">{{notProcessed}}</div>
        </div>
        <div :style="type===2?'background:#0097FE;color:#fff;':''" @click="()=>{type = 2}">
          稍后处理
          <div v-if="laterTotal" class="noticeNum">{{laterTotal}}</div>
        </div>
      </div>
      <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
        <li v-for="(item,index) in list" class="infinite-list-item" :key="index">
          <div class="at_title">
            <div class="at_people">
              <i>{{item.atMessageSendName}}</i>
              @我
            </div>
            <div class="at_time">
              {{item.created}}
            </div>
          </div>
          <div class="at_details">
            {{item.atMessageContent}}
          </div>
          <div class="at_btn" v-if="item.atMessageState === 0 ">
            <el-button class="at_ok" @click="changeState(item.id,1)">
              ok
            </el-button>
            <el-button class="at_later" @click="changeState(item.id,2)">
              稍后处理
            </el-button>
          </div>
          <div class="at_btn" v-if="item.atMessageState === 1">
            <el-button disabled class="at_done">
              已完成
            </el-button>
          </div>
          <div class="at_btn" v-if="item.atMessageState === 2" @click="changeState(item.id,1)">
            <el-button class="at_done">
              完成
            </el-button>
          </div>
        </li>
      </ul>
    </div>
    <div class="at_modal" v-if="isShow" @click="()=>{isShow = false}">
    </div> -->
  </div>
</template>

<script>
import { getAtList, getLaterList, changeState, _getTotal } from '@/api/businessOpportunity'
export default { 
  data() {
    return {
      isShow: false,
      list: [],
      pageNum: 1,
      type: 1,
      laterTotal: '', //稍后处理数量
      notProcessed: '' //未处理数量
    }
  },
  methods: {
    // 获得未处理消息数
    getTotal() {
      _getTotal().then(res => {
        this.laterTotal = res.data.data.laterTotal
        this.notProcessed = res.data.data.notProcessed
      })
    },
    // 获得@我的列表
    getAtMeList() {
      const data = {
        pageSize: 8,
        pageNum: this.pageNum
      }
      getAtList(data).then(res => {
        
        this.list = this.list.concat(res.data.data)
      })
    },
    // 获得稍后处理列表
    getLaterHandleList() {
      const data = {
        pageSize: 8,
        pageNum: this.pageNum
      }
      getLaterList(data).then(res => {
        this.list = this.list.concat(res.data.data)
      })
    },
    // 加载
    load() {
      this.pageNum += 1
      if (this.type === 1) {
        this.getAtMeList()
      } else {
        this.getLaterHandleList()
      }
    },
    // 处理@
    changeState(id, state) {
      const data = {
        id: id,
        state: state
      }
      changeState(data).then(res => {
        
        if (res.data.code === '200') {
          this.$message.success('操作成功')
          var newArr = this.list
          let index = ''
          newArr.map((item, i) => {
            
            if (item.id === id) {
              index = i
            }
          })
          
          if (index || index === 0) {
            
            newArr.splice(index, 1)
          }
          this.list = newArr
          this.getTotal()
        } else {
          this.$message.error('操作失败')
        }
      })
    }
  },
  mounted() {
    this.getAtMeList()
    this.getTotal()
  },
  watch: {
    // 监听type是否变化
    type() {
      this.pageNum = 1
      this.list = []
      if (this.type === 1) {
        this.getAtMeList()
      } else {
        this.getLaterHandleList()
      }
    }
  }
}
</script>

<style lang="scss">
  @function px($px){
    $rem: 144;
    @return ($px/ $rem) + rem;
  }
.communication{
    position: fixed;
    right: 0;
    // top: 616px;
    bottom: 205px;
    z-index: 100;
    .communication_box{
      div{
        width:px(140);
        height:40px;
        background:rgba(0,151,254,1);
        box-shadow: 0px 4px 12px 0px rgba(49,137,245,0.24);
        border-radius: 24px 0px 0px 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      .message{
        position: absolute;
        top: 0;
        right: px(-50);
        transition: all .3s;
        &:hover {
          position: absolute;
          top: 0;
          right: 0;
          transition: all .3s;
        }
        .message_box{
          position: relative;
          img{
              width: 20px;
              height: 19px;
              position: absolute;
              top: 11px;
              left: px(12);
          }
          span{
              font-size:14px;
              font-weight:400;
              color:rgba(255,255,255,1);
              line-height:20px;
              position: absolute;
              top: 10px;
              left: px(48);
          }
          }
        }
        .backlog{
            position: absolute;
            top: 64px;
            right: px(-90);
            transition: all .3s;
            &:hover {
              position: absolute;
              top: 64px;
              right: 0;
              transition: all .3s;
            }
            .backlog_box{
              position: relative;
              img{
                  width: 23px;
                  height: 20px;
                  position: absolute;
                  top: 9px;
                  left: px(12);
              }
              span{
                display: inline-block;
                font-size:12px;
                font-weight:400;
                color:rgba(255,255,255,1);
                line-height:14px;
                position: absolute;
                top: 13px;
                left: px(42);
              }
            }
        }
    }
    .at_me{
      box-shadow:0px 4px 24px 0px rgba(49,137,245,0.24);
      background:rgba(243,245,248,1);
      width:px(496);
      height: 560px;
      position: absolute;
      bottom: -150px;
      right: px(150);
      z-index: 100;
      border-radius: 4px;
      .at_me_top{
        height: 72px;
        background: #fff;
        padding: 16px px(24);
        display: flex;
        div{
          cursor: pointer;
          width: 50%;
          height:40px;
          background:rgba(241,248,255,1);
          border-radius: 2px;
          font-size:16px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(0,151,254,1);
          line-height:40px;
          text-align: center;
          position: relative;
          .noticeNum{
            position: absolute;
            height: 25px;
            width: 25px;
            line-height: 25px;
            text-align: center;
            border-radius: 50%;
            background: #FF3B30;
            color: #fff;
            right: 30px;
            top: 0;
          }
        }
      }
      .infinite-list{
        height:480px;
        padding: 0 px(24);
        li{
          margin-top: 24px;
          background: #fff;
          padding:16px px(24);
          .at_title{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .at_people{
              i{
                color: #557AFF;
              }
              font-weight: bold;
            }
            .at_time{
              color:#ADB5C0;
            }
          }
          .at_details{
            margin-top:16px;
            color: #33393F;
          }
          .at_btn{
            margin-top: 16px;
            border-top: 1px solid rgba(228,235,241,1);
            display: flex;
            justify-content: flex-end;
            padding-top: 16px;
            button{
              height: 30px;
              text-align: center;
              line-height: 0;
            }
            .at_ok{
              background: #fff;
              color: #0097FE;
            }
            .at_later{
              background: #0097FE;
              color: #fff;
            }
            .at_done{
              background: #0097FE;
              color: #fff;
            }
          }
        }
      }
    }
      .at_modal{
        position: absolute;
        height: 2000px;
        width: 2000px;
        top:-500px;
        left: -1000px;
        background: transparent;
      }
}

</style>