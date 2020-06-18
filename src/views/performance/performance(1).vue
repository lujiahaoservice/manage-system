<template> 
  <div class="performance_content">
    <!-- 概况总览 -->
    <div class="overview">
      <div class="overview_content">
        <!-- 上面的时间选择 -->
        <div class="overview_content_top">
          <div class="line_blue">
            <div class="line_"></div>
            <span>概况总览</span>
          </div>
          <div class="select_time">
            <span>选择时间：</span>
            <el-date-picker
              v-model="yearTime"
              type="year"
              format = "yyyy"
              :editable = 'false'
              :clearable = 'false'
              placeholder="选择年">
            </el-date-picker>
            <span> : </span>
            <el-date-picker
              v-model="monthTime"
              type="month"
              format = "MM"
              :editable = 'false' 
              :clearable = 'false'
              placeholder="选择月">
            </el-date-picker>
          </div>
        </div>
        <!-- 3个list -->
        <div class="type_three">
          <div class="wrp_item">
            <p class="p1">提成基数</p>
            <p class="p2">
              <span>2660</span>元
            </p>
            <p class="p3">提成比例为20%</p>
          </div>
          <div class="wrp_item echarts_flex">
            <div class="rig_echarts">
              <p class="p1">销售数量</p>
              <p class="p2">
                <span>35</span>
              </p>
            </div>
            <div id="echarts_yuan" class="echarts_yuan">

            </div>
          </div>
          <div class="wrp_item">
            <p class="p1">提成总额</p>
            <p class="p2">
              <span>287332.99</span>元
            </p>
            <p class="p3">仅计算已收款部分的提成</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 已销售产品表格 -->
    <div class="ProductsSold">
      <div class="ProductsSold_head">
        <div class="ProductsSold_one">已销售产品：<span>35个</span></div>
        <div class="ProductsSold_two">提成基数：<span>23475893.00 元</span></div>
      </div>
      <div class="hidden_ob">
        <el-table
          :data="tableSoldData"
          style="width: 100%">
          <el-table-column
            prop="serialNumber"
            label="#"
            width="120">
          </el-table-column>
          <el-table-column
            prop="productType"
            label="产品类型"
            width="150">
          </el-table-column>
          <el-table-column
            prop="salesVolume"
            label="销售数量"
            width="180">
          </el-table-column>
          <el-table-column
            prop="salesReceivable"
            label="销售应收额（元）"
            width="180">
          </el-table-column>
          <el-table-column
            prop="royaltyBase"
            label="提成基数（元）"
            width="180">
          </el-table-column>
          <el-table-column
            prop="commissionRatio"
            label="提成比例"
            width="180">
          </el-table-column>
          <el-table-column
            prop="actualCommission"
            label="实际提成(元)">
          </el-table-column>
        </el-table>
        <NoData v-if="tableSoldData.length === 0" :noDataPadding="''"></NoData>
      </div>
    </div>
    <!-- 销售成功产品详情 -->
    <div class="ProductsSold ProductsSoldDetail">
      <div class="head_tit">
        <div class="line_"></div>
        <span>销售成功产品详情</span>
      </div>
      <!-- 下面第一个表格 -->
      <div class="ProductsSold_head">
        <div class="ProductsSold_one">代理记账：<span>35个</span></div>
        <div class="ProductsSold_two">提成基数：<span>23475893.00 元</span></div>
      </div>
      <div class="hidden_ob">
        <el-table
          :data="tableSoldData"
          style="width: 100%;">
          <el-table-column
            prop="serialNumber"
            label="#"
            width="120">
          </el-table-column>
          <el-table-column
            prop="productType"
            label="产品类型"
            width="150">
          </el-table-column>
          <el-table-column
            prop="salesVolume"
            label="销售数量"
            width="180">
          </el-table-column>
          <el-table-column
            prop="salesReceivable"
            label="销售应收额（元）"
            width="180">
          </el-table-column>
          <el-table-column
            prop="royaltyBase"
            label="提成基数（元）"
            width="180">
          </el-table-column>
          <el-table-column
            prop="commissionRatio"
            label="提成比例"
            width="180">
          </el-table-column>
          <el-table-column
            prop="actualCommission"
            label="实际提成(元)">
          </el-table-column>
        </el-table>
        <NoData v-if="tableSoldData.length === 0" :noDataPadding="''"></NoData>
      </div>
      <!-- 下面第二个表格 -->
      <div class="ProductsSold_head" style="margin-top: 48px">
        <div class="ProductsSold_one">代理记账：<span>35个</span></div>
        <div class="ProductsSold_two">提成基数：<span>23475893.00 元</span></div>
      </div>
      <div class="hidden_ob">
        <el-table
          :data="tableSoldData"
          style="width: 100%">
          <el-table-column
            prop="serialNumber"
            label="#"
            width="120">
          </el-table-column>
          <el-table-column
            prop="productType"
            label="产品类型"
            width="150">
          </el-table-column>
          <el-table-column
            prop="salesVolume"
            label="销售数量"
            width="180">
          </el-table-column>
          <el-table-column
            prop="salesReceivable"
            label="销售应收额（元）"
            width="180">
          </el-table-column>
          <el-table-column
            prop="royaltyBase"
            label="提成基数（元）"
            width="180">
          </el-table-column>
          <el-table-column
            prop="commissionRatio"
            label="提成比例"
            width="180">
          </el-table-column>
          <el-table-column
            prop="actualCommission"
            label="实际提成(元)">
          </el-table-column>
        </el-table>
        <NoData v-if="tableSoldData.length === 0" :noDataPadding="''"></NoData>
      </div>
    </div>
  </div>
</template>

<script>
import NoData from '@/components/no-data'

export default {
  components: {
    NoData
  },
  data() {
    return {
      yearTime: '', //年份时间
      monthTime: '', //月份时间
      echartsMsg: {
        title: {
          x: 'center'//x轴方向对齐方式
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '销售数量',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 35, name: '员工版', itemStyle: { color: '#579AF3' }}
            ]
          }
        ]
      },
      tableSoldData: [
        {
          serialNumber: '1', // #
          productType: '财务服务', //产品类型
          salesVolume: '156', // 销售数量
          salesReceivable: '235680', // 销售应收额（元）
          royaltyBase: '0.00', // 提成基数（元）
          commissionRatio: '20%', // 提成比例  
          actualCommission: '680080.00' //实际提成(元） 
        }, {
          serialNumber: '2', // #
          productType: '财务服务', //产品类型
          salesVolume: '156', // 销售数量
          salesReceivable: '235680', // 销售应收额（元）
          royaltyBase: '0.00', // 提成基数（元）
          commissionRatio: '20%', // 提成比例  
          actualCommission: '680080.00' //实际提成(元） 
        }, {
          serialNumber: '3', // #
          productType: '财务服务', //产品类型
          salesVolume: '156', // 销售数量
          salesReceivable: '235680', // 销售应收额（元）
          royaltyBase: '0.00', // 提成基数（元）
          commissionRatio: '20%', // 提成比例  
          actualCommission: '680080.00' //实际提成(元） 
        }, {
          serialNumber: '4', // #
          productType: '财务服务', //产品类型
          salesVolume: '156', // 销售数量
          salesReceivable: '235680', // 销售应收额（元）
          royaltyBase: '0.00', // 提成基数（元）
          commissionRatio: '20%', // 提成比例  
          actualCommission: '680080.00' //实际提成(元） 
        }, {
          serialNumber: '5', // #
          productType: '财务服务', //产品类型
          salesVolume: '156', // 销售数量
          salesReceivable: '235680', // 销售应收额（元）
          royaltyBase: '0.00', // 提成基数（元）
          commissionRatio: '20%', // 提成比例  
          actualCommission: '680080.00' //实际提成(元） 
        }, {
          serialNumber: '6', // #
          productType: '财务服务', //产品类型
          salesVolume: '156', // 销售数量
          salesReceivable: '235680', // 销售应收额（元）
          royaltyBase: '0.00', // 提成基数（元）
          commissionRatio: '20%', // 提成比例  
          actualCommission: '680080.00' //实际提成(元） 
        }, {
          serialNumber: '7', // #
          productType: '财务服务', //产品类型
          salesVolume: '156', // 销售数量
          salesReceivable: '235680', // 销售应收额（元）
          royaltyBase: '0.00', // 提成基数（元）
          commissionRatio: '20%', // 提成比例  
          actualCommission: '680080.00' //实际提成(元） 
        }, {
          serialNumber: '8', // #
          productType: '财务服务', //产品类型
          salesVolume: '156', // 销售数量
          salesReceivable: '235680', // 销售应收额（元）
          royaltyBase: '0.00', // 提成基数（元）
          commissionRatio: '20%', // 提成比例  
          actualCommission: '680080.00' //实际提成(元） 
        }
      ]
    }
  },
  methods: {
    //echats折线图
    initData() {
      const myChart = this.$echarts.init(document.getElementById('echarts_yuan'))
      myChart.setOption(this.echartsMsg)
      window.onresize = function() {
        myChart.resize()
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initData()
    })
  }
}
</script>

<style lang="scss">
  @function px($px){
    $rem: 144;
    @return ($px/ $rem) + rem;
  }
  .performance_content{
    padding: 24px px(24);
    box-sizing: border-box;
    width: 100%;
    .overview{
      width: 100%;
      height: 234px;
      background: #fff;
      box-shadow:0px -2px 10px 0px rgba(49,137,245,0.04);
      border-radius:4px;
      padding: 24px px(24);
      box-sizing: border-box;
      margin-bottom: 24px;
      .overview_content{
        width: 100%;
        height: 100%;
        .overview_content_top{
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          margin-bottom: 10px;
          .line_blue{
            >.line_{
              height: 18px;
              width: 2px;
              background: #0097FE;
              display: inline-block;
              margin-right: 8px;
            }
            >span{
              font-size:16px;
              font-family:PingFangSC-Medium,PingFang SC;
              color:rgba(51,57,63,1);
              font-weight:400;
              line-height: 1em;
              position: relative;
              top: -3px;
            }
          }
        }
        .select_time{
          position: relative;
          top: -7px;
          span{
            font-size:14px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(111,124,141,1);
          }
        }
        
        .el-date-editor.el-input{
          width: px(97);
          .el-input__inner {
            height: 32px;
            padding: 0 0 0 px(12);
            font-size: 14px;
            color: #6F7C8D;
            &::placeholder{
              font-size: 14px;
            }
          }
        }
        .el-input__prefix{
          display: none;
        }
        .type_three{
          height: 144px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          .wrp_item{
            width: px(372);
            height: 100%;
            background:rgba(241,248,255,1);
            border-radius:4px;
            padding: 24px 0 0 px(24);
            box-sizing: border-box;
            .p1{
              font-size:14px;
              font-family:PingFangSC-Medium,PingFang SC;
              font-weight:500;
              color:rgba(51,57,63,1);
              margin-bottom: 14px;
            }
            .p2{
              font-size:14px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(27,41,58,1);
              margin-bottom: 10px;
              >span{
                font-size:40px;
                font-family:Arial-BoldMT,Arial;
                font-weight:normal;
                color:rgba(51,57,63,1);
                margin-right: px(8);
              }
            }
            .p3{
              font-size:14px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(111,124,141,1);
            }
            
          }
          .echarts_flex{
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            padding-top: 0;
            .rig_echarts{
              padding-top: 24px;
            }
            .echarts_yuan{
              flex: 1;
            }
          }
        }
      }
    }
    .ProductsSold{
      padding: 24px px(24);
      height: 392px;
      width: 100%;
      background:rgba(255,255,255,1);
      box-shadow:0px -2px 10px 0px rgba(49,137,245,0.04);
      border-radius:4px;
      margin-bottom: 24px;
      .ProductsSold_head{
        height: 32px;
        display: flex;
        margin-bottom: 24px;
        .ProductsSold_one,.ProductsSold_two{
          height: 32px;
          padding: 0 px(16);
          margin-right: px(24);
          background: #F1F8FF;
          line-height: 32px;
          font-size:14px;
          font-family:PingFangSC-Regular,PingFang SC;
          color:rgba(51,57,63,1);
          span{
            color:#0097FE;
          }
        }
      }
      .hidden_ob{
        height: 288px;
        overflow-y: scroll;
        .el-table{
          color: #6F7C8D;
          thead{
            tr{
              background: #E4EEF9;
              th{
                background: transparent;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:rgba(51,57,63,1);
              }
            }
          }
        }
      }
    }
    .ProductsSoldDetail{
      height: auto;
      margin-bottom: 0;
      .head_tit{
        margin-bottom: 20px;
        .line_{
          height: 18px;
          width: 2px;
          background: #0097FE;
          display: inline-block;
          margin-right: 8px;
        }
        span{
          font-size:16px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(51,57,63,1);
          line-height: 1em;
          position: relative;
          top: -3px;
        }
      }
    }
    
  .hidden_ob::-webkit-scrollbar {
    width: 6px!important;
    height: 6px!important;
  }
  .hidden_ob::-webkit-scrollbar-track{
    box-shadow: inset 0 0 6px rgba(243,245,248,1);
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  /*定义滑块，内阴影及圆角*/
  .hidden_ob::-webkit-scrollbar-thumb{
    height: 10px;
    border-radius: 10px;
    background-color: rgba(173,181,192,1);
  }
  }
</style>