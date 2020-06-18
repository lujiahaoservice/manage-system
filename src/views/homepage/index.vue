<template>
  <div class="homepage" ref="homepage" @scroll.passive="getScroll($event)">
    <!-- 1 -->
    <ul class="homepage_top">
      <li class="homepage_top_left">
        <img
          src="https://static-shanghai.hanku.net.cn/jqy_system/homepage/circle.png"
          alt
          class="homepage_circle"
        />
        <div class="homepage_top_left_img_box">
          <img :src="photoList[userid%4]" alt />
        </div>
        <div class="homepage_top_left_name">
          <p>{{ name }}</p>
          <p>{{typeclub[types-1]}}</p>
        </div>
        <p class="homepage_top_left_background"></p>
      </li>
      <li class="homepage_top_right">
        <img
          src="https://static-shanghai.hanku.net.cn/jqy_system/homepage/circle2.png"
          alt
          class="homepage_circle"
        />
        <p class="totalRevenue">当日平台流水</p>
        <div class="money">
          <span id="revenue">{{ (tradeNumber/100).toFixed(2) }}</span>
          <span>元</span>
        </div>
        <p class="homepage_top_right_background"></p>
      </li>
    </ul>
    <!-- 2 -->
    <ul class="homepage_top_second">
      <li class="homepage_top_second_li1">
        <p class="common_number">
          <span id="opportunity_number">{{ registerNumber }}</span>
          <span>位</span>
        </p>
        <p class="common_bottom">当日新增用户数量</p>
      </li>
      <li class="homepage_top_second_li2">
        <p class="common_number">
          <span id="gathering_money">{{ detailsNumber }}</span>
          <span>次</span>
        </p>
        <p class="gathering">
          <span>当日详情页访问量</span>
        </p>
      </li>
      <li class="homepage_top_second_li3">
        <p class="common_number">
          <span id="increased_number">{{ vipNumber }}</span>
          <span>次</span>
        </p>
        <p class="common_bottom">当日会员页访问量</p>
      </li>
      <li class="homepage_top_second_li4">
        <p class="common_number">
          <span id="totalCustomer_number">{{ orderNumber }}</span>
          <span>单</span>
        </p>
        <p class="common_bottom">今日订单量</p>
      </li>
    </ul>
    <!-- 选择查看方式 -->
    <div class="choiceSeeType">
      <div class="choiceSeeType_text">统计图数据 :</div>
      <div class="choiceSeeType_input">
        <el-select v-model="seeType" placeholder="请选择查看方式">
          <el-option
            v-for="item in seeOptions"
            :key="item.type"
            :label="item.value"
            :value="item.type"
          ></el-option>
        </el-select>
      </div>
      <div class="choiceSeeType_text" v-if="seeType === 1">请选择具体日期:</div>
      <div class="choiceSeeType_input" v-if="seeType === 1">
        <el-date-picker
          v-model="day"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <div class="choiceSeeType_text" v-if="seeType === 2">请选择具体月份:</div>
      <div class="choiceSeeType_input" v-if="seeType === 2">
        <el-date-picker
          v-model="month"
          type="monthrange"
          format="yyyy-MM"
          value-format="yyyy-MM-dd"
          range-separator="-"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
        ></el-date-picker>
      </div>
      <div class="choiceSeeType_text" v-if="seeType === 3">请选择开始年份:</div>
      <div class="choiceSeeType_input" v-if="seeType === 3">
        <el-date-picker
          v-model="yearStart"
          type="year"
          value-format="yyyy-MM-dd"
          range-separator="-"
          placeholder="开始年份"
        ></el-date-picker>
      </div>
      <div class="choiceSeeType_text" v-if="seeType === 3">请选择结束年份:</div>
      <div class="choiceSeeType_input" v-if="seeType === 3">
        <el-date-picker
          v-model="yearEnd"
          type="year"
          format="yyyy"
          value-format="yyyy-MM-dd"
          range-separator="-"
          placeholder="结束年份"
        ></el-date-picker>
      </div>
    </div>
    <!-- 4 -->
    <div class="homepage_top_fourth">
      <div class="homepage_top_fourth_left">
        <div class="homepage_top_fourth_left_title">
          <span>注册量(日)</span>
        </div>
        <!-- 注册量折线图 -->
        <div id="register_echarts"></div>
      </div>
      <div class="homepage_top_fourth_right">
        <div class="homepage_top_fourth_left_title">
          <span>详情页访问量(日)</span>
        </div>
        <!-- 第三个柱状图 -->
        <div id="details_echarts"></div>
      </div>
    </div>
    <!-- 5 -->
    <div class="homepage_top_fifth">
      <div class="homepage_top_fifth_left">
        <div class="homepage_top_fifth_left_title">
          <span>订单量(日)</span>
        </div>
        <!-- 第四个柱状图 -->
        <div id="order_echarts"></div>
      </div>
      <div class="homepage_top_fifth_right">
        <div class="homepage_top_fifth_left_title">
          <span>交易量(日)</span>
        </div>
        <!-- 第五个折线图 -->
        <div id="trade_echarts"></div>
      </div>
    </div>
    <!-- <Communication /> -->
    <div class="homepage_top_fifth">
      <div class="homepage_top_fifth_left">
        <div class="homepage_top_fifth_left_title">
          <span>会员页访问(日)</span>
        </div>
        <div id="vip_echarts"></div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/reset.scss";
import {
  getClientNumber,
  getDetailsPageNumber,
  getOrderNumber,
  getTradeNumber
} from "@/api/homepage/index";
import { users } from "@/api/setting/personal";
// import Communication from '@/components/communication'
export default {
  data() {
    return {
      seeType: 1, //选择的查看方式
      seeOptions: [
        {
          type: 1,
          value: "按天查看"
        },
        {
          type: 2,
          value: "按月查看"
        },
        {
          type: 3,
          value: "按年查看"
        }
      ],
      day: [],
      month: [],
      yearStart: "",
      yearEnd: "",
      registerNumber: 0,
      registerArrary: [],
      registerArraryX: [],
      registerArraryY: [],
      detailsNumber: 0,
      detailsArrary: [],
      detailsArraryX: [],
      detailsArraryY: [],
      vipNumber: 0,
      vipArrary: [],
      vipArraryX: [],
      vipArraryY: [],
      orderNumber: 0,
      orderArrary: [],
      orderArraryX: [],
      orderArraryY: [],
      tradeNumber: 0,
      tradeArrary: [],
      tradeArraryX: [],
      tradeArraryY: [],
      //
      typeclub: ["管理员", "部门主管", "普通职员"],
      userid: "",
      types: "",
      //展开收起
      drawer: false,
      brandFold: -1,
      activeindex: -1,
      table: false,
      name: "",
      revenue: 0,
      photoList: [
        "https://static-shanghai.hanku.net.cn/jqy_wx/my/1@2x.png",
        "https://static-shanghai.hanku.net.cn/jqy_wx/my/2@2x.png",
        "https://static-shanghai.hanku.net.cn/jqy_wx/my/3@2x.png",
        "https://static-shanghai.hanku.net.cn/jqy_wx/my/4@2x.png"
      ],
    };
  },
  created() {
    const todays = new Date();
    //一个月之前的时间的毫秒数
    const fiveAgo = new Date(new Date().getTime() - 29 * 24 * 60 * 60 * 1000);
    // 开始格式化时间
    const month =
      (todays.getMonth() + 1).toString().length === 1
        ? "0" + (todays.getMonth() + 1)
        : todays.getMonth() + 1;
    const day =
      todays.getDate().toString().length === 1
        ? "0" + todays.getDate()

        : todays.getDate();
    //上个月的月份
    const fivemonth =
      (fiveAgo.getMonth() + 1).toString().length === 1
        ? "0" + (fiveAgo.getMonth() + 1)
        : fiveAgo.getMonth() + 1;
    //上个月的星期几
    const fiveday =
      fiveAgo.getDate().toString().length === 1
        ? "0" + fiveAgo.getDate()
        : fiveAgo.getDate();
    // 计算后得到的具体日期 
    const today = todays.getFullYear() + "-" + month + "-" + day; //今天的日期
    const fiveAgoToday =
      fiveAgo.getFullYear() + "-" + fivemonth + "-" + fiveday; //30天前的日期
    // 今日新增用户
    getClientNumber({
      period: 1,//这里是周期的意思
      startDate: fiveAgoToday,//一个月之前
      endDate: today
    }).then(res => {
      console.log("xinzengyonghu", res.data.data);
      // 最后一天的数据为今天（此时此刻）注册的人数
      this.registerNumber = res.data.data[res.data.data.length - 1].numbers
     
      var xArray = [];
      var yArray = [];
      res.data.data.map(item => {
        xArray.push(item.daily);
        yArray.push(item.numbers);
      });
      this.registerArraryX = xArray;
      this.registerArraryY = yArray;
      this.drawChart2();
    });
    // 今日详情页访问
    getDetailsPageNumber({
      type: 1,
      period: 1,
      startDate: fiveAgoToday,
      endDate: today
    }).then(res => {
      console.log("详情页访问", res);
      this.detailsNumber = res.data.data[0]
        ? res.data.data[res.data.data.length - 1].views
        : 0;
      var xArray = [];
      var yArray = [];
      res.data.data.map(item => {
        xArray.push(item.daily);
        yArray.push(item.views);
      });
      this.detailsArraryX = xArray;
      this.detailsArraryY = yArray;
      this.drawChart3();
    });
    // 今日会员页访问
    getDetailsPageNumber({
      type: 2,
      period: 1,
      startDate: fiveAgoToday,
      endDate: today
    }).then(res => {
      this.vipNumber = res.data.data[0]
        ? res.data.data[res.data.data.length - 1].views
        : 0;
      console.log("会员页访问", this.vipNumber);
      console.log("会员页访问", res.data.data);
      var xArray = [];
      var yArray = [];
      res.data.data.map(item => {
        xArray.push(item.daily);
        yArray.push(item.views);
      });
      this.vipArraryX = xArray;
      this.vipArraryY = yArray;
      this.drawChart();
    });
    // 今日订单数量
    getOrderNumber({
      period: 1,
      startDate: fiveAgoToday,
      endDate: today
    }).then(res => {
      console.log("订单数量", res);
      this.orderNumber = res.data.data[0]
        ? res.data.data[res.data.data.length - 1].numbers
        : 0;
      var xArray = [];
      var yArray = [];
      res.data.data.map(item => {
        xArray.push(item.daily);
        yArray.push(item.numbers);
      });
      this.orderArraryX = xArray;
      this.orderArraryY = yArray;
      this.drawChart4();
    });
    // 今日流水
    getTradeNumber({
      period: 1,
      startDate: fiveAgoToday,
      endDate: today
    }).then(res => {
      this.tradeNumber = res.data.data[0]
        ? res.data.data[res.data.data.length - 1].amount
        : 0;
      console.log("流水", res);
      var xArray = [];
      var yArray = [];
      res.data.data.map(item => {
        xArray.push(item.daily);
        yArray.push(item.amount);
      });
      this.tradeArraryX = xArray;
      this.tradeArraryY = yArray;
      console.log(this.tradeArraryX, this.tradeArraryY);
      this.drawChart5();
    });
  },
  watch: {
    day() {
      console.log(this.day);
      this.getechartsData(1, this.day[0], this.day[1]);
    },
    month() {
      console.log(this.month);
      this.getechartsData(2, this.month[0], this.month[1]);
    },
    yearEnd() {
      if (!this.yearStart) {
        this.yearEnd = "";
        this.$message.error("请先选择开始年份");
      } else {
        console.log(this.yearStart, this.yearEnd);
        this.getechartsData(3, this.yearStart, this.yearEnd);
      }
    }
  },
  methods: {
    // 获取5个图表的数据
    getechartsData(type, start, end) {
      // 获取注册量图表数据
      getClientNumber({
        period: type,
        startDate: start,
        endDate: end
      }).then(res => {
        this.registerArrary = res.data.data;
        var xArray = [];
        var yArray = [];
        res.data.data.map(item => {
          xArray.push(item.daily);
          yArray.push(item.numbers);
        });
        this.registerArraryX = xArray;
        this.registerArraryY = yArray;
        this.drawChart2();
      });
      // 详情页访问图表数据
      getDetailsPageNumber({
        type: 1,
        period: type,
        startDate: start,
        endDate: end
      }).then(res => {
        this.detailsArrary = res.data.data;
        var xArray = [];
        var yArray = [];
        res.data.data.map(item => {
          xArray.push(item.daily);
          yArray.push(item.views);
        });
        this.detailsArraryX = xArray;
        this.detailsArraryY = yArray;
        this.drawChart3();
      });
      //会员访问图表数据
      getDetailsPageNumber({
        type: 2,
        period: type,
        startDate: start,
        endDate: end
      }).then(res => {
        this.vipArrary = res.data.data;
        var xArray = [];
        var yArray = [];
        res.data.data.map(item => {
          xArray.push(item.daily);
          yArray.push(item.views);
        });
        this.vipArraryX = xArray;
        this.vipArraryY = yArray;
        this.drawChart();
      });
      // 订单数量图表数据
      getOrderNumber({
        period: type,
        startDate: start,
        endDate: end
      }).then(res => {
        this.orderArrary = res.data.data;
        var xArray = [];
        var yArray = [];
        res.data.data.map(item => {
          xArray.push(item.daily);
          yArray.push(item.numbers);
        });
        this.orderArraryX = xArray;
        this.orderArraryY = yArray;
        this.drawChart4();
      });
      // 交易额数据
      getTradeNumber({
        period: type,
        startDate: start,
        endDate: end
      }).then(res => {
        this.tradeArrary = res.data.data;
        var xArray = [];
        var yArray = [];
        res.data.data.map(item => {
          xArray.push(item.daily);
          yArray.push(item.numbers);
        });
        this.tradeArraryX = xArray;
        this.tradeArraryY = yArray;
        this.drawChart5();
      });
    },
    // 第一个echarts 柱状图
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(
        document.getElementById("vip_echarts")
      );
      // 指定图表的配置项和数据
      const option = {
        xAxis: {
          // type: "category",
          data: this.vipArraryX
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.vipArraryY,
            type: "line"
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    // 第一个echarts 折线图
    drawChart2() {
      // 基于准备好的dom，初始化echarts实例
      const myChart2 = this.$echarts.init(
        document.getElementById("register_echarts")
      );
      // 指定图表的配置项和数据
      const option = {
        xAxis: {
          type: "category",
          data: this.registerArraryX
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.registerArraryY,
            type: "line"
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart2.setOption(option);
    },
    // 第三个echarts 柱状图
    drawChart3() {
      // 基于准备好的dom，初始化echarts实例
      const myChart3 = this.$echarts.init(
        document.getElementById("details_echarts")
      );
      // 指定图表的配置项和数据
      const option = {
        color: ["#3398DB"],
        xAxis: {
          type: "category",
          data: this.detailsArraryX
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.detailsArraryY,
            type: "line"
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart3.setOption(option);
    },
    // 第四个echarts 柱状图
    drawChart4() {
      // 基于准备好的dom，初始化echarts实例
      const myChart4 = this.$echarts.init(
        document.getElementById("order_echarts")
      );
      // 指定图表的配置项和数据
      const option = {
        color: ["#3398DB"],
        xAxis: {
          type: "category",
          data: this.orderArraryX
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.orderArraryY,
            type: "line"
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart4.setOption(option);
    },
    // 第五个echarts 折线图
    drawChart5() {
      // 基于准备好的dom，初始化echarts实例
      const myChart5 = this.$echarts.init(
        document.getElementById("trade_echarts")
      );
      // 使用刚指定的配置项和数据显示图表。
      const option = {
        color: ["#3398DB"],
        xAxis: {
          type: "category",
          data: this.tradeArraryX
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.tradeArraryY,
            type: "line"
          }
        ]
      };
      myChart5.setOption(option);
    },
    getScroll(event) {}
  },
  updated() {},
  mounted() {
    this.userid = localStorage.getItem("tokenId");
    const data = {
      id: this.userid
    };
    users(data).then(res => {
      this.name = res.data.data.username;
      console.log(this.name);
    });
  },
  computed: {},
  filters: {}
};
</script>
<style lang="scss">
@function px($px) {
  $rem: 144;
  @return ($px/ $rem) + rem;
}
.homepage {
  margin: 24px;
  height: 100%;
  overflow: auto;
  .choiceSeeType {
    display: flex;
    margin-top: 30px;
    align-items: center;
    .choiceSeeType_text {
      margin-right: 20px;
    }
    .choiceSeeType_input {
      margin-right: 30px;
    }
  }
  // 1
  .homepage_top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 96px;
    .homepage_top_left {
      width: px(588);
      height: 96px;
      background: linear-gradient(
        rgba(0, 151, 254, 1) 0%,
        rgba(86, 189, 248, 1) 100%
      );
      box-shadow: 0px -2px 10px 0px rgba(49, 137, 245, 0.04);
      border-radius: 4px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      position: relative;
      .homepage_circle {
        position: absolute;
        left: 0;
        top: 0;
        width: px(588);
        height: 96px;
      }
      .homepage_top_left_img_box {
        margin-left: px(24);
        img {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 1px solid rgba(241, 248, 255, 1);
        }
      }
      .homepage_top_left_name {
        margin-left: px(-275);
        :nth-child(1) {
          font-size: 16px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
        }
        :nth-child(2) {
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 16px;
          margin-top: 8px;
        }
      }
      .homepage_top_left_background {
        width: 48px;
        height: 48px;
        background: url(".././../assets/image/home_icon_left.png") no-repeat;
        margin-right: px(24);
      }
    }
    .homepage_top_right {
      width: px(588);
      height: 96px;
      background: linear-gradient(
        rgba(255, 155, 27, 1) 0%,
        rgba(255, 192, 111, 1) 100%
      );
      box-shadow: 0px -2px 10px 0px rgba(49, 137, 245, 0.04);
      border-radius: 4px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      position: relative;
      .homepage_circle {
        position: absolute;
        left: 0;
        top: 0;
        width: px(588);
        height: 96px;
      }
      .totalRevenue {
        margin-left: px(24);
        font-size: 16px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 20px;
      }
      .money {
        margin-left: px(-180);
        :nth-child(1) {
          font-weight: bold;
          font-size: 40px;
          color: rgba(255, 255, 255, 1);
        }
        :nth-child(2) {
          margin-left: px(8);
          font-size: 14px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }
      .homepage_top_right_background {
        width: 48px;
        height: 48px;
        background: url(".././../assets/image/home_icon_right.png") no-repeat;
        margin-right: px(24);
      }
    }
  }
  // 2
  .homepage_top_second {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    li {
      margin-top: 24px;
      width: px(282);
      height: 132px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px -2px 10px 0px rgba(49, 137, 245, 0.04);
      border-radius: 4px;
      .common_number {
        margin-top: 32px;
        margin-left: px(24);
        :nth-child(1) {
          font-weight: bold;
          font-size: 40px;
          color: rgba(27, 41, 58, 1);
          line-height: 40px;
        }
        :nth-child(2) {
          margin-left: px(8);
          font-size: 14px;
          font-weight: 400;
          color: rgba(27, 41, 58, 1);
          line-height: 18px;
        }
      }
      .common_bottom {
        margin-top: 16px;
        margin-left: px(24);
        font-size: 14px;
        font-weight: 400;
        color: rgba(111, 124, 141, 1);
        line-height: 20px;
      }
    }
    .homepage_top_second_li2 {
      .gathering {
        margin-top: 16px;
        margin-left: px(24);
        :nth-child(1) {
          font-size: 14px;
          font-weight: 400;
          color: rgba(111, 124, 141, 1);
          line-height: 20px;
        }
        :nth-child(2) {
          margin-left: px(8);
          display: inline-block;
          text-align: right;
          width: px(24);
          height: 20px;
          background: rgba(241, 248, 255, 1);
          border-radius: 2px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(0, 151, 254, 1);
          line-height: 20px;
        }
        :nth-child(3) {
          display: inline-block;
          text-align: left;
          width: px(24);
          height: 20px;
          background: rgba(241, 248, 255, 1);
          border-radius: 2px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(0, 151, 254, 1);
          line-height: 20px;
        }
      }
    }
  }
  // 3
  .homepage_top_third {
    padding-top: 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .homepage_top_third_left {
      width: px(741);
      height: 556px;
      // border: 1px solid red;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px -2px 10px 0px rgba(49, 137, 245, 0.04);
      border-radius: 4px;
      .homepage_top_third_left_statistics_title {
        position: relative;
        margin-top: 24px;
        margin-left: px(24);
        :nth-child(1) {
          display: inline-block;
          margin-left: px(8);
          font-size: 16px;
          font-weight: 500;
          color: rgba(51, 57, 63, 1);
          line-height: 16px;
        }
      }
      .homepage_top_third_left_statistics_title::after {
        content: "";
        height: 18px;
        border-right: 2px solid #0097fe;
        position: absolute;
        left: 0;
        top: 0px;
      }
      .homepage_top_third_left_search {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 24px;
        margin-left: px(24);
        width: px(692);
        height: 56px;
        background: rgba(241, 248, 255, 1);
        border-radius: 4px;
        .homepage_top_third_left_search_time {
          width: px(195);
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          // border: 1px solid red;
          .select {
            margin-left: px(24);
            font-size: 14px;
            font-weight: 400;
            color: rgba(111, 124, 141, 1);
            line-height: 56px;
          }
          .block {
            width: px(79);
            // input{
            //
            // }
            i {
              margin-top: -3px;
            }
            input {
              width: px(135);
              height: 32px;
              background: rgba(255, 255, 255, 1);
              border-radius: 4px;
              border: 1px solid rgba(228, 235, 241, 1);
              text-align: center;
              padding: 0;
            }
          }
        }
        .seach_button {
          margin-right: px(48);
          margin-top: 12px;
          height: 32px;
          button {
            width: px(80);
            height: 32px !important;
            background: rgba(0, 151, 254, 1);
            border-radius: 4px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 8px;
          }
        }
      }
      #homepage_top_third_left_echarts {
        margin-top: 24px;
        margin-left: px(24);
        width: px(692);
        height: 392px;
        canvas {
          width: px(700) !important;
          height: 392px;
        }
      }
    }
    .homepage_top_third_right {
      margin-left: px(24);
      height: 100%;
      overflow: auto;
      .homepage_top_third_right_announcement {
        // ul父元素
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px -2px 10px 0px rgba(49, 137, 245, 0.04);
        border-radius: 4px;
        width: px(435);
        height: 560px;
        overflow: scroll;
        // border: 1px solid red;
        .homepage_top_third_right_announcement_title {
          padding-top: 24px;
          margin-left: px(24);
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          // 新闻顶部
          .homepage_top_third_right_announcement_title_left {
            position: relative;
            :nth-child(1) {
              margin-left: px(8);
              font-size: 16px;
              font-weight: 500;
              color: rgba(51, 57, 63, 1);
              line-height: 16px;
            }
          }
          .homepage_top_third_right_announcement_title_left::after {
            content: "";
            height: 18px;
            border-right: 2px solid #0097fe;
            position: absolute;
            left: 0;
            top: 0px;
          }
          .homepage_top_third_right_announcement_title_right {
            margin-right: px(24);
            font-size: 12px;
            font-weight: 400;
            color: rgba(111, 124, 141, 1);
            line-height: 16px;
            cursor: pointer;
          }
        }
        // 新闻ul
        .homepage_top_third_right_announcement_article {
          margin-top: 24px;
          margin-left: px(24);
          display: flex;
          flex-direction: column;
          height: 100%;
          li {
            width: px(387);
            height: 48px;
            background: rgba(241, 248, 255, 1);
            border-radius: 4px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 16px;
            a {
              width: px(233);
              height: 48px;
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(51, 57, 63, 1);
              line-height: 20px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 14px;
              font-weight: 400;
              color: rgba(51, 57, 63, 1);
              line-height: 48px;
              margin-left: px(16);
            }
            p {
              margin-top: 15px;
              margin-right: px(16);
              font-size: 14px;
              font-weight: 400;
              color: rgba(51, 57, 63, 1);
            }
          }
          .ins {
            text-align: center;
            line-height: 30px;
          }
        }
      }

      .homepage_top_third_right_announcement::-webkit-scrollbar {
        width: 6px !important;
        height: 6px !important;
      }
      .homepage_top_third_right_announcement::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(243, 245, 248, 1);
        border-radius: 10px;
        background-color: #f5f5f5;
      }
      /*定义滑块，内阴影及圆角*/
      .homepage_top_third_right_announcement::-webkit-scrollbar-thumb {
        height: 10px;
        border-radius: 10px;
        background-color: rgba(197, 205, 213, 1);
      }
      // 右边会计服务评分排行榜
      .homepage_top_third_right_ranking {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px -2px 10px 0px rgba(49, 137, 245, 0.04);
        border-radius: 4px;
        margin-top: 24px;
        width: px(435);
        height: 266px;
        .homepage_top_third_right_ranking_title {
          padding-top: 24px;
          margin-left: px(24);
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .homepage_top_third_right_ranking_title_left {
            position: relative;
            :nth-child(1) {
              margin-left: px(8);
              font-size: 16px;
              font-weight: 500;
              color: rgba(51, 57, 63, 1);
              line-height: 16px;
            }
          }
          .homepage_top_third_right_ranking_title_left::after {
            content: "";
            height: 18px;
            border-right: 2px solid #0097fe;
            position: absolute;
            left: 0;
            top: 0px;
          }
          .homepage_top_third_right_ranking_title_right {
            margin-right: px(24);
            font-size: 12px;
            font-weight: 400;
            color: rgba(111, 124, 141, 1);
            line-height: 16px;
            cursor: pointer;
          }
        }
        .homepage_top_third_right_ranking_article {
          margin-top: 24px;
          margin-left: px(24);
          display: flex;
          flex-direction: column;
          height: 200px;
          li {
            width: px(387);
            height: 48px;
            background: rgba(241, 248, 255, 1);
            border-radius: 4px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .top_number {
              width: 24px;
              height: 24px;
              margin-left: 16px;
            }
            .portrait {
              width: 32px;
              height: 32px;
              border: 1px solid red;
              // border:1px solid rgba(241,248,255,1);
            }
            .ranking_name {
              font-size: 14px;
              font-weight: 500;
              color: rgba(51, 57, 63, 1);
            }
            :nth-child(4) {
              font-size: 14px;
              font-weight: 400;
              color: rgba(111, 124, 141, 1);
              line-height: 20px;
            }
            .star {
              width: px(54);
              height: 20px;
              background: rgba(255, 215, 206, 1);
              border-radius: 2px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 16px;
              img {
                width: 12px;
                height: 12px;
                margin-right: px(4);
              }
              span {
                font-size: 14px;
                font-weight: 500;
                color: rgba(255, 115, 112, 1);
              }
            }
          }
          .homepage_top_third_right_ranking_article_li2 {
            margin-top: 16px;
          }
          .homepage_top_third_right_ranking_article_li3 {
            margin-top: 16px;
          }
        }
      }
    }
  }
  // 4
  .homepage_top_fourth {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 24px;
    .homepage_top_fourth_left {
      width: px(588);
      height: 572px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px -2px 10px 0px rgba(49, 137, 245, 0.04);
      border-radius: 4px;
      .homepage_top_fourth_left_title {
        position: relative;
        margin-top: 24px;
        margin-left: px(24);
        font-size: 16px;
        font-weight: 500;
        color: rgba(51, 57, 63, 1);
        line-height: 16px;
        span {
          margin-left: px(8);
        }
      }
      .homepage_top_fourth_left_title::after {
        content: "";
        height: 18px;
        border-right: 2px solid #0097fe;
        position: absolute;
        left: 0;
        top: 0px;
      }
      .homepage_top_fourth_left_ul {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        li {
          margin-top: 24px;
          margin-left: px(24);
          margin-right: px(24);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: px(164);
          height: 72px;
          background: rgba(241, 248, 255, 1);
          border-radius: 4px;
          :nth-child(1) {
            font-size: 24px;
            font-weight: bold;
            color: rgba(51, 57, 63, 1);
            line-height: 24px;
          }
          :nth-child(2) {
            font-size: 14px;
            font-weight: 400;
            color: rgba(111, 124, 141, 1);
            line-height: 14px;
            margin-top: 12px;
          }
        }
      }
      #register_echarts {
        margin-top: 24px;
        margin-left: 24px;
        width: px(540);
        height: 520px;
        canvas {
          width: px(540) !important;
          height: 520px;
        }
      }
    }
    .homepage_top_fourth_right {
      width: px(588);
      height: 572px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px -2px 10px 0px rgba(49, 137, 245, 0.04);
      border-radius: 4px;
      .homepage_top_fourth_left_title {
        position: relative;
        margin-top: 24px;
        margin-left: px(24);
        font-size: 16px;
        font-weight: 500;
        color: rgba(51, 57, 63, 1);
        line-height: 16px;
        span {
          margin-left: px(8);
        }
      }
      .homepage_top_fourth_left_title::after {
        content: "";
        height: 18px;
        border-right: 2px solid #0097fe;
        position: absolute;
        left: 0;
        top: 0px;
      }
      #details_echarts {
        margin-top: 24px;
        margin-left: 24px;
        width: px(540);
        height: 520px;
        canvas {
          width: px(540) !important;
          height: 520px;
        }
      }
    }
  }
  // 5
  .homepage_top_fifth {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 24px;
    .homepage_top_fifth_left {
      width: px(588);
      height: 572px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px -2px 10px 0px rgba(49, 137, 245, 0.04);
      border-radius: 4px;
      .homepage_top_fifth_left_title {
        position: relative;
        margin-top: 24px;
        margin-left: px(24);
        font-size: 16px;
        font-weight: 500;
        color: rgba(51, 57, 63, 1);
        line-height: 16px;
        span {
          margin-left: px(8);
        }
      }
      .homepage_top_fifth_left_title::after {
        content: "";
        height: 18px;
        border-right: 2px solid #0097fe;
        position: absolute;
        left: 0;
        top: 0px;
      }
      #order_echarts {
        margin-top: 24px;
        margin-left: 24px;
        width: px(540);
        height: 520px;
        canvas {
          width: px(540) !important;
          height: 406px;
        }
      }
      #vip_echarts {
        margin-top: 24px;
        margin-left: 24px;
        width: px(540);
        height: 520px;
        canvas {
          width: px(540) !important;
          height: 406px;
        }
      }
    }
    .homepage_top_fifth_right {
      width: px(588);
      height: 572px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px -2px 10px 0px rgba(49, 137, 245, 0.04);
      border-radius: 4px;
      .homepage_top_fifth_left_title {
        position: relative;
        margin-top: 24px;
        margin-left: px(24);
        font-size: 16px;
        font-weight: 500;
        color: rgba(51, 57, 63, 1);
        line-height: 16px;
        span {
          margin-left: px(8);
        }
      }
      .homepage_top_fifth_left_title::after {
        content: "";
        height: 18px;
        border-right: 2px solid #0097fe;
        position: absolute;
        left: 0;
        top: 0px;
      }
      #trade_echarts {
        margin-top: 24px;
        margin-left: 24px;
        width: px(540);
        height: 520px;
        canvas {
          width: px(540) !important;
          height: 406px;
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
    height: px(630);
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
</style>