<template>
  <div class="userMoney">
    <!-- 商机概况 -->
    <!-- 商机列表 -->
    <div class="business_content">
      <div>
        <div class="content_tit">
          <div class="business_top">
            <div class="tit_left">
              <div class="tit_lable"></div>
              <span>用户收入明细</span>
            </div>
          </div>
        </div>
        <div class="seeType">
          <div class="seeType_text" >
            选择具体日期:
          </div>
          <el-date-picker
            style="width:250px;"
            v-model="incomeDate"
            value-format="yyyy-MM-dd"
            type="daterange"
            v-if="seeType === 1"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <div class="btns" style="margin-left:50px;">
            <el-button type="primary" @click="exportList" size="mini">导出</el-button>
          </div>
        </div>
        <!-- 表格列表 -->
        <div class="content_form">
          <el-table
            :header-cell-style= "{background:'rgba(228,238,249,1)',color:'#33393F'}"
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
              prop="clientUserName"
              align="center"
              label="用户名">
            </el-table-column>
            <el-table-column
              prop="clientUserId"
              align="center"
              label="用户ID">
            </el-table-column>
            <el-table-column
              align="center"
              label="类型">
              <template slot-scope="scope">
                <span v-if="scope.row.type==1" style="color:#6F7C8D">提现</span>
                <span v-if="scope.row.type==2" style="color:#0097FE">任务赏金</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="金额(元)">
               <template slot-scope="scope">
                 {{(scope.row.amount/100).toFixed(2)}}
              </template>
            </el-table-column>
            <el-table-column
              prop="created"
              align="center"
              label="时间">
            </el-table-column>
          </el-table>
          <NoData v-if="tableData.length === 0" :noDataPadding="''" style="margin:50px 0;"></NoData>
        </div>
        <div class="pagination">
          <div></div>
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            @current-change="changePage"
            :total="total">
          </el-pagination>
        </div>
        <div class="choiceSeeType">
          <div class="choiceSeeType_text">
            统计图数据 :
          </div>
          <div class="choiceSeeType_input">
            <el-select v-model="seeType" placeholder="请选择查看方式">
              <el-option
                v-for="item in seeOptions"
                :key="item.type"
                :label="item.value"
                :value="item.type">
              </el-option>
            </el-select>
          </div>
          <div class="choiceSeeType_text" v-if="seeType === 1">
            请选择具体日期:
          </div>
          <div class="choiceSeeType_input" v-if="seeType === 1">
            <el-date-picker
              v-model="day"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="choiceSeeType_text" v-if="seeType === 2">
            请选择具体月份:
          </div>
          <div class="choiceSeeType_input" v-if="seeType === 2">
            <el-date-picker
              v-model="month"
              type="monthrange"
              format="yyyy-MM"
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="开始月份"
              end-placeholder="结束月份">
            </el-date-picker>
          </div>
          <div class="choiceSeeType_text" v-if="seeType === 3">
            请选择开始年份:
          </div>
          <div class="choiceSeeType_input" v-if="seeType === 3">
            <el-date-picker
              v-model="yearStart"
              type="year"
              value-format="yyyy-MM-dd"
              range-separator="-"
              placeholder="开始年份">
            </el-date-picker>
          </div>
          <div class="choiceSeeType_text" v-if="seeType === 3">
            请选择结束年份:
          </div>
          <div class="choiceSeeType_input" v-if="seeType === 3">
            <el-date-picker
              v-model="yearEnd"
              type="year"
              format="yyyy"
              value-format="yyyy-MM-dd"
              range-separator="-"
              placeholder="结束年份">
            </el-date-picker>
          </div>
        </div>
        <div class="homepage_top_fourth_left">
          <div class="homepage_top_fourth_left_title">
            <span>用户收入</span>
          </div>
          <!-- 注册量折线图 -->
          <div id="homepage_top_fourth_left_echarts"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { clientIncome, clientForm } from '@/api/finance'
import { userExport, downloadFile } from '@/api/export'
import { download } from '@/plugins/download'
import NoData from '@/components/no-data'
export default {
  name2: 'homepage_top_fourth_left_echarts', //第二个 折线图
  components: {
    NoData
  },
  data() {
    return {
      formArraryX: [],
      formArraryY: [],
      incomeDate: ['', ''], //收支明细时间范围
      day: [],
      month: [],
      yearStart: '',
      yearEnd: '',
      seeType: 1, //选择的查看方式
      seeOptions: [
        {
          type: 1,
          value: '按天查看'
        },
        {
          type: 2,
          value: '按月查看'
        },
        {
          type: 3,
          value: '按年查看'
        }
      ],
      input: '',
      tab_active: '0',
      value: '',
      value1: '',
      value2: '',
      drawer: false,
      indexFlag: '',
      tableData: [],
      selectVal: '',
      total: 0,
      pageNum: 1,
      pageSize: 10,
      getIt: 0,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    }
  },
  watch: {
    incomeDate() {
      this.initData()
    },
    seeType() {
      if ((this.seeType) === 1 && (this.day[1])) {
        this.getechartsData(1, this.day[0], this.day[1])
      }
      if ((this.seeType) === 2 && (this.month[1])) {
        this.getechartsData(2, this.month[0], this.month[1])
      }
      if ((this.seeType) === 3 && (this.yearEnd)) {
        this.getechartsData(3, this.yearStart, this.yearEnd)
      }
    },
    day() {
      console.log(this.day)
      this.getechartsData(1, this.day[0], this.day[1])
    },
    month() {
      console.log(this.month)
      this.getechartsData(2, this.month[0], this.month[1])
    },
    yearEnd() {
      if (!this.yearStart) {
        this.yearEnd = ''
        this.$message.error('请先选择开始年份')
      } else {
        console.log(this.yearStart, this.yearEnd)
        this.getechartsData(3, this.yearStart, this.yearEnd)
      }
    }
  },
  created() {
    this.initData()
    const todays = new Date()
    const fiveAgo = new Date((new Date()).getTime() - 4 * 24 * 60 * 60 * 1000)
    const month = (todays.getMonth() + 1).toString().length === 1 ? '0' + (todays.getMonth() + 1) : (todays.getMonth() + 1)
    const day = todays.getDate().toString().length === 1 ? '0' + todays.getDate() : todays.getDate()
    const fivemonth = (fiveAgo.getMonth() + 1).toString().length === 1 ? '0' + (fiveAgo.getMonth() + 1) : (fiveAgo.getMonth() + 1)
    const fiveday = fiveAgo.getDate().toString().length === 1 ? '0' + fiveAgo.getDate() : fiveAgo.getDate()
    const today = todays.getFullYear() + '-' + month + '-' + day //今天的日期
    const fiveAgoToday = fiveAgo.getFullYear() + '-' + fivemonth + '-' + fiveday //5天前的日期
    this.incomeDate = [fiveAgoToday, today]
    // 今日新增用户
    this.getechartsData(1, fiveAgoToday, today)
  },
  methods: {
    // 导出
    exportList() {
      const data = {
        payment: 1,
        startDate: this.incomeDate[0],
        endDate: this.incomeDate[1]
      }
      userExport(data).then(res => {
        if (res.data.data.data) {
          console.log(res.data.data.data)
          const data1 = {
            fileName: res.data.data.data
          }
          downloadFile(data1).then(res => {
            console.log(res)
            download(res.request.responseURL, '用户收入明细')
          })
        } else {
          this.$message.error('请求失败')
        }
      })
    },
    // 画折线图
    drawChart2() {
      // 基于准备好的dom，初始化echarts实例
      const myChart2 = this.$echarts.init(document.getElementById('homepage_top_fourth_left_echarts'))
      // 指定图表的配置项和数据
      const option = {
        color: ['#3398DB'],
        xAxis: {
          type: 'category',
          data: this.formArraryX
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.formArraryY,
          type: 'line'
        }]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart2.setOption(option)
    },
    // 获取报表数据
    getechartsData(period, startDate, endDate) {
      clientForm({
        period: period,
        startDate: startDate,
        endDate: endDate
      }).then(res => {
        console.log('报表篇', res)
        var xArray = []
        var yArray = []
        res.data.data.map(item => {
          xArray.push(item.daily)
          yArray.push(item.amount)
        })
        this.formArraryX = xArray
        this.formArraryY = yArray
        var that = this
        const timer = setTimeout(function() {
          that.drawChart2()
          clearTimeout(timer)
        }, 500)
      })
    },
    initData() {
      const data = {
        orderDesc: 'created',
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        payment: 1,
        startDate: this.incomeDate[0],
        endDate: this.incomeDate[1]
      }
      clientIncome(data).then(res => {
        if (res.status === 200) {
          this.tableData = res.data.data.records
          this.total = res.data.data.total
        }
      })
    },
    changePage(e) {
      this.pageNum = e
      this.initData()
    }
    // 导出
    // exportList() {
    //   const data = {
    //     type: this.tab_active
    //   }
    //   exportList(data).then(res => {
    //     download(res.data.data.url, res.data.data.fileName)
    //   })
    // },
    // drawclose(e) {
    //   this.drawer = e
    // },
    // deleteRow(index, rows) {
    //   this.getIt = rows[index].id
    //   this.recordOpen('2')
    // },
    /**
     * 打开详情或者申请开票
     */
  //   recordOpen(index) {
  //     this.drawer = true
  //     if (index === '1') {
  //       this.indexFlag = '1'
  //     } else if (index === '2') {
  //       this.indexFlag = '2'
  //     }
  //   },
  //   // 审核
  //   putConfirm(data) {
  //     confirm(data).then(res => {
  //       this.$message({
  //         type: 'success',
  //         message: '操作成功'
  //       })
  //       this.initData()
  //     })
  //   },
  //   confirmIt(e) {
  //     const data = {
  //       id: e.id,
  //       bAccept: true
  //     }
  //     this.putConfirm(data)
  //   },
  //   cancelIt(e) {
  //     const data = {
  //       id: e.id,
  //       bAccept: false
  //     }
  //     this.putConfirm(data)
  //   } 
  }
}
</script> 

<style lang="scss">
@function px($px){
  $rem: 144;
  @return ($px/ $rem) + rem;
}
.userMoney{
  margin:24px px(24);
  margin-bottom:0;
  background-color: #f6f6f6;
  .homepage_top_fourth_left{
    margin-top: 50px;
    padding-top: 1px;                                                                                                                                                                                                                                         
    background:rgba(255,255,255,1);
    box-shadow:0px -2px 10px 0px rgba(49,137,245,0.04);
    border-radius:4px;
    .homepage_top_fourth_left_title{
      position: relative;
      margin-top: 24px;
      margin-left: px(24);
      font-size:16px;
      font-weight:500;
      color:rgba(51,57,63,1);
      line-height:16px;
      span{
        margin-left: px(8);
      }
    }
    .homepage_top_fourth_left_title::after{
      content: '';
      height: 18px;
      border-right: 2px solid #0097FE;
      position: absolute;
      left: 0;
      top: 0px;
    }
    .homepage_top_fourth_left_ul{
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      li{
        margin-top: 24px;
        margin-left: px(24);
        margin-right: px(24);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width:px(164);
        height:72px;
        background:rgba(241,248,255,1);
        border-radius:4px;
        :nth-child(1){
          font-size:24px;
          font-weight:bold;
          color:rgba(51,57,63,1);
          line-height:24px;
        }
        :nth-child(2){
          font-size:14px;
          font-weight:400;
          color:rgba(111,124,141,1);
          line-height:14px;
          margin-top: 12px;
        }
      }
    }
    #homepage_top_fourth_left_echarts{
      margin-top: 24px;
      margin-left: 24px;
      margin-bottom: 50px;
      width: px(840);
      height: 420px;
      canvas{
        width: px(1000) !important;
        height: 620px;
      }
    }
  }
  .choiceSeeType{
    display: flex;
    margin-top: 30px;
    align-items: center;
    .choiceSeeType_text{
      margin-right: 20px;
    }
    .choiceSeeType_input{
      margin-right: 30px;
    }
  }
  .seeType{
    display: flex;
    margin-top: 80px;
    align-items: center;
    .seeType_text{
      font-size: 16px;
      color: #333;
      margin-right: 20px;
    }
  }
  .btns{
    display: flex;
    justify-content: flex-end;
  }
  .plat_top{
    display: flex;
    justify-content:flex-start;
    align-items: center;
    .plat_money_all{
      margin-top: 24px;
      margin-right: 25px;
      width:px(282);
      height:132px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 10px 10px rgba(49,137,245,0.04);
      border-radius:4px;
      padding: 25px;
      .plat_money_all_number{
        font-weight:bold;
        font-size:40px;
        color:rgba(27,41,58,1);
        line-height:40px;
        span{
          font-weight:normal;
          font-size:20px;
          color:rgb(38, 50, 65);
          line-height:20px;
        }
      }
      .plat_money_all_text{
        font-size: 22px;
        line-height: 50px;
        .plat_withdrawal{

        }
      }
      .plat_agent_number{
        display: flex;
        margin-top: 20px;
        align-items: center;
        .plat_agent_number_text{
          font-size:25px;
          color:rgb(38, 50, 65);
          margin-right: 20px;
        }
        .plat_agent_number_number{
          font-size:25px;
          color:rgb(38, 50, 65);
          span{
            font-size: 16px;
          }
        }
      }
    }
  }
  // 内容部分
  .business_content{
    position: relative;
    box-sizing: border-box;
    width:px(1200);
    background: #fff;
    margin-top:24px;
    padding:24px px(24);
    padding-bottom: 0;
    .content_tit{
      display: flex;
      justify-content:space-between;
      .el-input__inner{
        width: 100%!important;
      }
      .business_top{
        width:100%;
        line-height: 1em;
        overflow: hidden;
        .tit_left{
          display: flex;
          .tit_lable{
            width:2px;
            height:18px;
            background:rgba(49,137,245,1);
            margin-right:px(8);
          }
          span{
            font-size: 16px;
            line-height: 17px;
          }
        }
      }
    }
    //search
  .select_search{
    display: flex;
    align-items: center;
    position: absolute;
    width: 96.5%;
    top: 69px;
    .el-button{
      height: 32px;
      padding: 0 16px;
      margin-left: 16px;
    }
    .el_button1{
      margin-left: 0;
    }
    .el_button2{
      background: #fff;
      color: #2078E5;
    }
    .el_button3{
      width: 80px;
      padding: 0 26px;
    }
    .select_box{
      display: flex;
      margin-left: px(50);
    }
    .el-input__inner{
      width: 264px;
      height: 38px;
    }
    .el-select-dropdown{
      width: 264px!important;
    }
  }
    // tab
  .table_tabs{
    position: relative;
    display: flex;
    margin-top: 20px;
    height: 40px;
    margin-bottom: 16px;
    padding-left: px(7);
    border-bottom: 1px solid #E4EEF9;
    .tabs_position{
      position: absolute;
      bottom: -1px;
      display: flex;
    }
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
      cursor: pointer;
      color: #6F7C8D;
    }
    .active_tab{
      background:rgba(255,255,255,1);
      color:rgba(0,151,254,1);
      border-bottom: #fff;
    }
  }
    // 列表表格
  .content_form{
      overflow: auto;
      position: relative;
      margin-top: 30px;
      .el-tooltip{
        display:flex;
        align-items: center;
        img{
          width:14px;
          height:14px;
        }
        .xiangqinbox{
          width:60px;
          height:32px;
          background:rgba(255,255,255,1);
          box-shadow:0px 4px 12px 0px rgba(49,137,245,0.24);
          border-radius:3px;
          margin-top:10px;
          z-index: 111;
          position: absolute;
          right:px(55);
          display: none;
        }
        &:hover .xiangqinbox{
          display:block;
        }
      }
    }
    .content_form_delete_page{
      position: fixed;
      bottom: 24px;
      width: px(1200);
      background: #fff;
      padding: 32px 24px 32px 24px;
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      z-index: 2;
      border-top: 1px solid rgba(228,238,249,1);
      .content_form_delete{
        button{
          height: 32px;
          width: 88px;
          line-height: px(7);
          border:1px solid rgba(32,129,229,1);
          background: #fff;
          span{
            margin-left: px(-4);
          }
        }
      }
    }
  }
  .pagination {
    height:86px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    right:px(24);
    background: #fff;
    z-index: 2;
    padding:0 px(24);
    border-top: 1px solid rgba(228,238,249,1);
    .remove{
      width:88px;
      height:32px;
      display: flex;
      justify-content: center;
      border-radius:4px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      border:1px solid rgba(32,129,229,1);
      span{
        line-height: 5px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(32,120,229,1);
      }
    }
  }
  .content_form::-webkit-scrollbar {
    width: 6px!important;
  }
  .content_form::-webkit-scrollbar-track{
    box-shadow: inset 0 0 6px rgba(243,245,248,1);
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  /*定义滑块，内阴影及圆角*/
  .content_form::-webkit-scrollbar-thumb{
    height: 10px;
    border-radius: 10px;
    background-color: rgba(173,181,192,1);
  }
  .el-table__body-wrapper::-webkit-scrollbar {
    width: 6px!important;
    height: 6px!important;
  }
  .el-table__body-wrapper::-webkit-scrollbar-track{
    box-shadow: inset 0 0 6px rgba(243,245,248,1);
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  /*定义滑块，内阴影及圆角*/
  .el-table__body-wrapper::-webkit-scrollbar-thumb{
    height: 10px;
    border-radius: 10px;
    background-color: rgba(173,181,192,1);
  }
}
</style>
