<template> 
  <div class="performance_rebates_content">
    <div class="overview">
      <div class="overview_content">
        <!-- 上面的时间选择 -->
        <div class="overview_content_top">
          <div class="line_blue">
            <div class="line_"></div>
            <span>概况总览</span>
          </div>
          <div class="select_time">
            <div class="sel">数据导出</div>
            <el-date-picker
              v-model="monthTime"
              type="month"
              :editable = 'false' 
              :clearable = 'false'
              placeholder="选择月份">
            </el-date-picker>
          </div>
        </div>
        <!-- 3个list -->
        <div class="type_three">
          <div class="wrp_item">
            <p class="p1 p1_else"><span>当月实际提成金额</span><span class="span_">根据客户实际回款计算</span></p>
            <p class="p2">
              <span>59830.09</span>元
            </p>
          </div>
          <div class="wrp_item">
            <p class="p1">当月提成基数</p>
            <p class="p2">
              <span>59878.09</span>元
            </p>
          </div>
          <div class="wrp_item">
            <p class="p1">返佣笔数</p>
            <p class="p2">
              <span>120</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="ProductsSold ProductsSoldDetail">
      <div class="head_tit">
        <div class="line_"></div>
        <span>销售成功产品详情</span>
      </div>
      <!-- 下面第一个表格 -->
      <!-- <div class="ProductsSold_head">
        <div class="ProductsSold_one">代理记账：<span>35个</span></div>
        <div class="ProductsSold_two">提成基数：<span>23475893.00 元</span></div>
      </div> -->
      <div class="hidden_over">
        <el-table
          :data="tableSoldData"
          style="width: 100%">
          <el-table-column
            prop="sourceOrder"
            label="本单来源"
            width="180">
          </el-table-column>
          <el-table-column
            prop="clientsName"
            label="客户名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="productName"
            label="产品名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="orderType"
            label="订单类型"
            width="180">
          </el-table-column>
          <el-table-column
            prop="signatories"
            label="签单人"
            width="180">
          </el-table-column>
          <el-table-column
            prop="signatoriesDepartment"
            label="签单人部门"
            width="180">
          </el-table-column>
          <el-table-column
            prop="contractAmount"
            label="合同金额（元)"
            width="180">
          </el-table-column>
          <!--  -->
          <el-table-column
            prop="totalPaid"
            label="总实收（元）)"
            width="180">
          </el-table-column>
          <el-table-column
            prop="totalExpenditure"
            label="总支出（元）)"
            width="180">
          </el-table-column>
          <el-table-column
            prop="royaltyBase"
            label="提成基数（元)"
            width="180">
          </el-table-column>
          <el-table-column
            prop="commissionRatio"
            label="提成比例"
            width="180">
          </el-table-column>
          <el-table-column
            prop="actualCommission"
            fixed="right"
            label="实际提成（元)"
            width="180">
          </el-table-column>
        </el-table>
        <NoData v-if="tableSoldData.length === 0" :noDataPadding="''" :noDataHeight="'83%'"></NoData> 
      </div>
    </div>
      <!-- 下面的分页器 -->
      <div class="bot_par">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="100">
        </el-pagination>
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
      monthTime: '',
      tableSoldData: [
        {
          sourceOrder: '百度', //本单来源
          clientsName: '杭州那个啥公司', //客户名称
          productName: '小规模代理记账', //产品名称
          orderType: '续签', //订单类型
          signatories: '苏源', //签单人
          signatoriesDepartment: '会计部', //签单人部门
          contractAmount: '7200.00', //合同金额（元）
          totalPaid: '680080.00', //总实收（元）
          totalExpenditure: '680080.00', //总支出（元） 
          royaltyBase: '680080.00', //提成基数（元）
          commissionRatio: '20%', //提成比例
          actualCommission: '680080.00' //实际提成（元）
        }, {
          sourceOrder: '百度', //本单来源
          clientsName: '杭州那个啥公司', //客户名称
          productName: '小规模代理记账', //产品名称
          orderType: '续签', //订单类型
          signatories: '苏源', //签单人
          signatoriesDepartment: '会计部', //签单人部门
          contractAmount: '7200.00', //合同金额（元）
          totalPaid: '680080.00', //总实收（元）
          totalExpenditure: '680080.00', //总支出（元） 
          royaltyBase: '680080.00', //提成基数（元）
          commissionRatio: '20%', //提成比例
          actualCommission: '680080.00' //实际提成（元）
        }, {
          sourceOrder: '百度', //本单来源
          clientsName: '杭州那个啥公司', //客户名称
          productName: '小规模代理记账', //产品名称
          orderType: '续签', //订单类型
          signatories: '苏源', //签单人
          signatoriesDepartment: '会计部', //签单人部门
          contractAmount: '7200.00', //合同金额（元）
          totalPaid: '680080.00', //总实收（元）
          totalExpenditure: '680080.00', //总支出（元） 
          royaltyBase: '680080.00', //提成基数（元）
          commissionRatio: '20%', //提成比例
          actualCommission: '680080.00' //实际提成（元）
        }, {
          sourceOrder: '百度', //本单来源
          clientsName: '杭州那个啥公司', //客户名称
          productName: '小规模代理记账', //产品名称
          orderType: '续签', //订单类型
          signatories: '苏源', //签单人
          signatoriesDepartment: '会计部', //签单人部门
          contractAmount: '7200.00', //合同金额（元）
          totalPaid: '680080.00', //总实收（元）
          totalExpenditure: '680080.00', //总支出（元） 
          royaltyBase: '680080.00', //提成基数（元）
          commissionRatio: '20%', //提成比例
          actualCommission: '680080.00' //实际提成（元）
        }, {
          sourceOrder: '百度', //本单来源
          clientsName: '杭州那个啥公司', //客户名称
          productName: '小规模代理记账', //产品名称
          orderType: '续签', //订单类型
          signatories: '苏源', //签单人
          signatoriesDepartment: '会计部', //签单人部门
          contractAmount: '7200.00', //合同金额（元）
          totalPaid: '680080.00', //总实收（元）
          totalExpenditure: '680080.00', //总支出（元） 
          royaltyBase: '680080.00', //提成基数（元）
          commissionRatio: '20%', //提成比例
          actualCommission: '680080.00' //实际提成（元）
        }, {
          sourceOrder: '百度', //本单来源
          clientsName: '杭州那个啥公司', //客户名称
          productName: '小规模代理记账', //产品名称
          orderType: '续签', //订单类型
          signatories: '苏源', //签单人
          signatoriesDepartment: '会计部', //签单人部门
          contractAmount: '7200.00', //合同金额（元）
          totalPaid: '680080.00', //总实收（元）
          totalExpenditure: '680080.00', //总支出（元） 
          royaltyBase: '680080.00', //提成基数（元）
          commissionRatio: '20%', //提成比例
          actualCommission: '680080.00' //实际提成（元）
        }, {
          sourceOrder: '百度', //本单来源
          clientsName: '杭州那个啥公司', //客户名称
          productName: '小规模代理记账', //产品名称
          orderType: '续签', //订单类型
          signatories: '苏源', //签单人
          signatoriesDepartment: '会计部', //签单人部门
          contractAmount: '7200.00', //合同金额（元）
          totalPaid: '680080.00', //总实收（元）
          totalExpenditure: '680080.00', //总支出（元） 
          royaltyBase: '680080.00', //提成基数（元）
          commissionRatio: '20%', //提成比例
          actualCommission: '680080.00' //实际提成（元）
        }, {
          sourceOrder: '百度', //本单来源
          clientsName: '杭州那个啥公司', //客户名称
          productName: '小规模代理记账', //产品名称
          orderType: '续签', //订单类型
          signatories: '苏源', //签单人
          signatoriesDepartment: '会计部', //签单人部门
          contractAmount: '7200.00', //合同金额（元）
          totalPaid: '680080.00', //总实收（元）
          totalExpenditure: '680080.00', //总支出（元） 
          royaltyBase: '680080.00', //提成基数（元）
          commissionRatio: '20%', //提成比例
          actualCommission: '680080.00' //实际提成（元）
        }, {
          sourceOrder: '百度', //本单来源
          clientsName: '杭州那个啥公司', //客户名称
          productName: '小规模代理记账', //产品名称
          orderType: '续签', //订单类型
          signatories: '苏源', //签单人
          signatoriesDepartment: '会计部', //签单人部门
          contractAmount: '7200.00', //合同金额（元）
          totalPaid: '680080.00', //总实收（元）
          totalExpenditure: '680080.00', //总支出（元） 
          royaltyBase: '680080.00', //提成基数（元）
          commissionRatio: '20%', //提成比例
          actualCommission: '680080.00' //实际提成（元）
        }, {
          sourceOrder: '百度', //本单来源
          clientsName: '杭州那个啥公司', //客户名称
          productName: '小规模代理记账', //产品名称
          orderType: '续签', //订单类型
          signatories: '苏源', //签单人
          signatoriesDepartment: '会计部', //签单人部门
          contractAmount: '7200.00', //合同金额（元）
          totalPaid: '680080.00', //总实收（元）
          totalExpenditure: '680080.00', //总支出（元） 
          royaltyBase: '680080.00', //提成基数（元）
          commissionRatio: '20%', //提成比例
          actualCommission: '680080.00' //实际提成（元）
        }, {
          sourceOrder: '百度', //本单来源
          clientsName: '杭州那个啥公司', //客户名称
          productName: '小规模代理记账', //产品名称
          orderType: '续签', //订单类型
          signatories: '苏源', //签单人
          signatoriesDepartment: '会计部', //签单人部门
          contractAmount: '7200.00', //合同金额（元）
          totalPaid: '680080.00', //总实收（元）
          totalExpenditure: '680080.00', //总支出（元） 
          royaltyBase: '680080.00', //提成基数（元）
          commissionRatio: '20%', //提成比例
          actualCommission: '680080.00' //实际提成（元）
        }, {
          sourceOrder: '百度', //本单来源
          clientsName: '杭州那个啥公司', //客户名称
          productName: '小规模代理记账', //产品名称
          orderType: '续签', //订单类型
          signatories: '苏源', //签单人
          signatoriesDepartment: '会计部', //签单人部门
          contractAmount: '7200.00', //合同金额（元）
          totalPaid: '680080.00', //总实收（元）
          totalExpenditure: '680080.00', //总支出（元） 
          royaltyBase: '680080.00', //提成基数（元）
          commissionRatio: '20%', //提成比例
          actualCommission: '680080.00' //实际提成（元）
        }, {
          sourceOrder: '百度', //本单来源
          clientsName: '杭州那个啥公司', //客户名称
          productName: '小规模代理记账', //产品名称
          orderType: '续签', //订单类型
          signatories: '苏源', //签单人
          signatoriesDepartment: '会计部', //签单人部门
          contractAmount: '7200.00', //合同金额（元）
          totalPaid: '680080.00', //总实收（元）
          totalExpenditure: '680080.00', //总支出（元） 
          royaltyBase: '680080.00', //提成基数（元）
          commissionRatio: '20%', //提成比例
          actualCommission: '680080.00' //实际提成（元）
        }, {
          sourceOrder: '百度', //本单来源
          clientsName: '杭州那个啥公司', //客户名称
          productName: '小规模代理记账', //产品名称
          orderType: '续签', //订单类型
          signatories: '苏源', //签单人
          signatoriesDepartment: '会计部', //签单人部门
          contractAmount: '7200.00', //合同金额（元）
          totalPaid: '680080.00', //总实收（元）
          totalExpenditure: '680080.00', //总支出（元） 
          royaltyBase: '680080.00', //提成基数（元）
          commissionRatio: '20%', //提成比例
          actualCommission: '680080.00' //实际提成（元）
        }, {
          sourceOrder: '百度', //本单来源
          clientsName: '杭州那个啥公司', //客户名称
          productName: '小规模代理记账', //产品名称
          orderType: '续签', //订单类型
          signatories: '苏源', //签单人
          signatoriesDepartment: '会计部', //签单人部门
          contractAmount: '7200.00', //合同金额（元）
          totalPaid: '680080.00', //总实收（元）
          totalExpenditure: '680080.00', //总支出（元） 
          royaltyBase: '680080.00', //提成基数（元）
          commissionRatio: '20%', //提成比例
          actualCommission: '680080.00' //实际提成（元）
        }
      ]
    }
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1)
    }
  }
}
</script>

<style lang="scss">
  @function px($px){
    $rem: 144;
    @return ($px/ $rem) + rem;
  }
  
  .performance_rebates_content{
    padding: 24px px(24);
    box-sizing: border-box;
    width: 100%;
    
    .overview{
      width: 100%;
      height: 224px;
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
          margin-bottom: 20px;
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
          height: 32px;
          top: -7px;
          line-height: 32px;
          .sel{
            width:88px;
            height: 100%;
            font-size:14px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:#fff;
            background:rgba(0,151,254,1);
            border-radius:4px;
            display: inline-block;
            text-align: center;
          }
        }
        .el-date-editor.el-input{
          width: px(192);
          margin-left: px(24);
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
          height: 124px;
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
              margin-bottom: 16px;
            }
            .p1_else{
              display: flex;
              justify-content: space-between;
              width: 100%;
              padding-right: px(24);
              >.span_{
                display: inline-block;
                font-size:14px;
                font-family:PingFangSC-Regular,PingFang SC;
                color:rgba(111,124,141,1);
              }
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
                color:#33393F;
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
      padding: 24px px(24) 0 px(24);
      height: px(348);
      width: 100%;
      background:rgba(255,255,255,1);
      box-shadow:0px -2px 10px 0px rgba(49,137,245,0.04);
      border-radius:4px;
      margin-bottom: 24px;
      box-sizing: border-box;
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
      .hidden_over{
        height: px(288);
        overflow: auto;
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
      margin-bottom: 0;
      height: auto;
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
    .bot_par{
      height: 86px;
      width: 100%;
      background: #fff;
      display: flex;
      justify-content:flex-end;
      padding-right: px(19);
      box-sizing: border-box;
      align-items: center;
      box-shadow:0px -2px 10px 0px rgba(49,137,245,0.04);
      border-radius:0px 0px 4px 4px;
      .el-pagination{
        padding: 0;
        .btn-next{
          margin: 0 px(5)
        }
      }
    }
  }
  .hidden_over::-webkit-scrollbar {
    width: 6px!important;
    height: 6px!important;
  }
  .hidden_over::-webkit-scrollbar-track{
    box-shadow: inset 0 0 6px rgba(243,245,248,1);
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  /*定义滑块，内阴影及圆角*/
  .hidden_over::-webkit-scrollbar-thumb{
    width: 10px;
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
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: rgba(173,181,192,1);
  }
</style>