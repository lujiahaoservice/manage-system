<template>
  <div class="dynamic_content">
    <!-- 港的话 -->
    <div class="scroll_div">
      <div class="div_else">
       <div class="websocket_box">
        <template v-for="(item) in dynamicList">
          <div :class="{dynamicItem:true, dynamicItemWid:(item.type === '5'? true:false)}" :key="item.time_tit">
            <div class="sign_time">
              <div class="sign" :style="{'background':signTitCor(item.type).color}">{{signTitCor(item.type).sign}}</div>
              <div class="time">{{item.time_tit}}</div>
            </div>
            <p v-if="item.type !== '5'">{{item.detail_tit}}</p>
            <div class="opportunity" v-else>
              <span>{{item.left_who}}</span>
              <span class="span2">{{item.center_del}}</span>
              <span>{{item.right_who}}</span>
            </div>
          </div>
        </template>
        </div>
      </div>
    </div>
    <!-- 一些操作 -->
    <div class="operating">
      <div class="left_tx">
        <el-image src="https://static-shanghai.hanku.net.cn/jqyapp/user/IMG_1136.JPG" fit="cover"></el-image>
      </div>
      <div class="rigth_tab">
        <div class="tab_">
          <div :class="{active: TabFourFlag1}" @click="switchTabFour('1')">记录</div>
          <div :class="{active: TabFourFlag2}" @click="switchTabFour('2')">客户上门</div>
          <div :class="{active: TabFourFlag3}" @click="switchTabFour('3')">投诉</div>
          <div :class="{active: TabFourFlag4}" @click="switchTabFour('4')">客户回访</div>
        </div>
        <textarea placeholder="请输入文字" v-model="textArea"></textarea>
        <div class="bot_">
          <el-date-picker
            v-model="datetimeValue"
            type="datetime"
            placeholder="下次跟进时间"
            align="right"
            format= 'M月d日  HH:mm'
            :editable="false"
            :picker-options="pickerOptions">
          </el-date-picker>
          <div class="two_qf_btn">
            <div class="quit">取消</div>
            <div class="submit" @click="submitFun">发布</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      datetimeValue: '',
      textArea: '',
      dynamicList: [
        // {
        //   type: '1',
        //   time_tit: '12月19日 12:33',
        //   detail_tit: '没有人能够在世界上能够“弃”你，除非你自己自暴自弃，因为，我们是属于自己的，并不属于他人。事情已经发生了，要面对的情况才是最实际的。'
        // },
        // {
        //   type: '2',
        //   time_tit: '12月20日 12:33',
        //   detail_tit: '感情里的你来我往，无所谓，幸与不幸，经历过，就好。你简单，遇到简单的是一种幸运，遇到复杂的，就是一场灾难。爱情的样板戏听听就好，无须照本宣科。每个人都一样，都是摸着石头过河，过去了，就对了，滑到了，爬起来，学着承受，试着前行'
        // },
        // {
        //   type: '3',
        //   time_tit: '12月21日 12:33',
        //   detail_tit: '鸟儿可以自由翱翔天空，对它来说就是幸福的；繁星可以守护明月，对它来说就是快乐的；而我可以在这美丽的清晨，给你送去问候，那就是最美的。早安!'
        // },
        // {
        //   type: '3',
        //   time_tit: '12月22日 12:33',
        //   detail_tit: '本可选择平坦磊落的路途，你却选择了荆棘丛生，崎岖危险。本可选择云淡风轻的路过，你却选择了飞蛾扑火，不计后果。世界并不会对你温柔以待，上帝也不会对你特殊照顾，但我会'
        // },
        // {
        //   type: '4',
        //   time_tit: '12月23日 12:33',
        //   detail_tit: '在自己面前，应该一直留有一个地方，独自留在那里，然后去爱，不知道是什么，不知道是谁，不知道如何去爱，也不知道可以爱多久，只是等待一次爱情，也许永远都没有人，可是，这种等待，就是爱情本身'
        // },
        // {
        //   type: '5',
        //   time_tit: '12月24日 12:33',
        //   left_who: '盼盼',
        //   right_who: '钱多多',
        //   center_del: '将商机转给'
        // }
      ],
      TabFourFlag1: true,
      TabFourFlag2: false,
      TabFourFlag3: false,
      TabFourFlag4: false
    }
  },
  methods: {
    /**
     * dynamicList里面的sign的bg颜色
     */
    signTitCor(type) {
      const result = {}
      const signArr = ['记录', '客户上门', '投诉', '客户回访', '商机操作']
      const colors = ['#0097FE', '#66E2C5', '#FF836B', '#F8C35F', '#7590A2']
      if (type === '1') {
        result.color = colors[0]
        result.sign = signArr[0]
      } else if (type === '2') {
        result.color = colors[1]
        result.sign = signArr[1]
      } else if (type === '3') {
        result.color = colors[2]
        result.sign = signArr[2]
      } else if (type === '4') {
        result.color = colors[3]
        result.sign = signArr[3]
      } else if (type === '5') {
        result.color = colors[4]
        result.sign = signArr[4]
      }
      return result
    },
    /**
     * 底部的4个按钮切换样式
     */
    switchTabFour(index) {
      if (index === '1') {
        this.TabFourFlag1 = true
        this.TabFourFlag2 = false
        this.TabFourFlag3 = false
        this.TabFourFlag4 = false
      } else if (index === '2') {
        this.TabFourFlag1 = false  
        this.TabFourFlag2 = true
        this.TabFourFlag3 = false
        this.TabFourFlag4 = false
      } else if (index === '3') {
        this.TabFourFlag1 = false  
        this.TabFourFlag2 = false
        this.TabFourFlag3 = true
        this.TabFourFlag4 = false
      } else if (index === '4') {
        this.TabFourFlag1 = false  
        this.TabFourFlag2 = false
        this.TabFourFlag3 = false
        this.TabFourFlag4 = true
      }
    },
    /***
     * 发布
     */
    submitFun() {
      const dynamicObj = {}
      if (this.TabFourFlag1) {
        dynamicObj.type = '1'
      } else if (this.TabFourFlag2) {
        dynamicObj.type = '2'
      } else if (this.TabFourFlag3) {
        dynamicObj.type = '3'
      } else if (this.TabFourFlag4) {
        dynamicObj.type = '4'
      }
      const d = new Date(this.datetimeValue)
      dynamicObj.time_tit = (d.getMonth() + 1) + '月' + d.getDate() + '日' + '  ' + (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ':' + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes())
      dynamicObj.detail_tit = this.textArea
      this.dynamicList.push(dynamicObj)
    }
  }
}
</script>

<style lang="scss">
  @function px($px){
    $rem: 144;
    @return ($px/ $rem) + rem;
  }
  .dynamic_content{
    padding-left:px(24);
    box-sizing: border-box;
    width: px(840);
    background: #fff;
    height: 100%;
    max-height:822px;
    display: flex;
    flex-direction: column;
    height: px(565);
    .scroll_div{
      // height: px(410);
      height: px(565);
      // flex: 1;
      overflow: scroll;
      padding-bottom: 206px;
      box-sizing: border-box;
      .websocket_box{
        margin-bottom:100px;
        width: 100%;
        .dynamicItem{
          width: 100%;
          background: #F1F8FF;
          padding: 16px px(16);
          border-radius:4px;
          margin-bottom: 26px;
          box-sizing: border-box;
          .sign_time{
            height: 20px;
            display: flex;
            margin-bottom: 12px;
            .sign{
              height: 20px;
              line-height: 20px;
              padding: 0 px(8);
              background: #0097FE;
              margin-right: px(12);
              font-size:14px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(255,255,255,1);
            }
            .time{
              height: 20px;
              line-height: 20px;
              font-size:14px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(111,124,141,1);
            }
          }
          >p{
            font-size:14px;
            font-family:PingFangSC-Regular,PingFang SC;
            color:rgba(51,57,63,1);
          }
          .opportunity{
            span{
              font-size:14px;
              font-family:PingFangSC-Medium,PingFang SC;
              font-weight:500;
              color:rgba(51,57,63,1);
            }
            .span2{
              font-size:14px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(111,124,141,1);
              margin: 0 px(12);
            }
          }
        }
        .dynamicItemWid{
          width: 50%;
        }
      }
    }
    .operating{
      width:100%;
      height:206px;
      // flex: 1;
      padding:0 px(24);
      position: absolute;
      right: 0;
      left: 0;
      bottom:0;
      background:#fff;
      display: flex;
      justify-content: space-between;
      .left_tx{
        height: 100%;
        width: 40px;
        padding-top: 16px;
        box-sizing: border-box;
        .el-image{
          height: 40px;
          width: 100%;
          img{
            height: 100%;
            width: 100%;
            border-radius: 50%;
          }
        }
      }
      .rigth_tab{
        flex: 1;
        padding-top: 22px;
        padding-left: px(24);
        .tab_{
          display: flex;
          margin-bottom: 22px;
          >div{
            height: 28px;
            line-height: 28px;
            padding: 0 16px;
            background:rgba(255,255,255,1);
            border-radius:4px;
            border:1px solid rgba(197,205,213,1);
            font-size:12px;
            font-family:PingFangSC-Regular,PingFang SC;
            color:rgba(111,124,141,1);
            margin-right: px(16);
            cursor: pointer;
            transition: .3s;
          }
          >div.active{
            color: #fff;
            background: #0097FE;
            border:1px solid #0097FE;
            transition: .3s;
          }
        }
        >textarea{
          width:100%;
          height:62px;
          border-radius:4px;
          border:1px solid rgba(197,205,213,1);
          padding: 8px 0 0 px(16);
          color: #333;
          font-weight: 600;
          outline: none;
          margin-bottom: 10px;
          &::placeholder{
            font-size:14px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(173,181,192,1);
          }
        }
        .bot_{
          display: flex;
          justify-content: space-between;
          .two_qf_btn{
            width: px(168);
            height: 32px;
            display: flex;
            justify-content: space-between;
            .quit{
              width:px(72);
              height:100%;
              background:rgba(255,255,255,1);
              border-radius:4px;
              border:1px solid rgba(0,151,254,1);
              font-size:16px;
              font-family:PingFangSC-Medium,PingFang SC;
              font-weight:500;
              color:rgba(0,151,254,1);
              cursor: pointer;
              text-align: center;
              line-height: 32px;
              box-sizing: border-box;
            }
            .submit{
              width:px(72);
              height:100%;
              background:rgba(0,151,254,1);
              border-radius:4px;
              font-size:16px;
              font-family:PingFangSC-Medium,PingFang SC;
              font-weight:500;
              color:rgba(255,255,255,1);
              cursor: pointer;
              text-align: center;
              line-height: 32px;
            }
          }
        }
      }
    }
  }
</style>