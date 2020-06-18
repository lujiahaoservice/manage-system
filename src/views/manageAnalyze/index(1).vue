<template> 
  <div class="manageanalyze">
    <!-- 头部 -->
    <header>
      <div class="header_tit">
        <div class="line"></div>
        <span>经营数据分析</span>
      </div>
      <!-- 头部下面盒子 -->
      <div class="header_mine">
        <div class="header_boxs" v-for="(item,index) in headerLists" :key ="index">
          <p>{{item.headerTit}}</p>
          <p>{{item.price}}</p>
          <p>{{item.headerNum}}</p>
        </div>
      </div>
    </header>

    <!-- 内容部分 -->
    <div class="manageAnalyz_content">
      <!-- 内容头部 -->
      <div class="manageAnalyz_content_top">
        <el-row class="manageAnalyz_buttons">
          <el-button type="primary">导出</el-button>
        </el-row>
      </div>

      <!-- 表格列表 -->
      <div class="content_table">
        <el-table
          :header-cell-style= "{background:'rgba(228,238,249,1)',color:'#33393F'}"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="50">
          </el-table-column>
          <el-table-column
            prop="customerCompany"
            label="客户公司"
            width="152">
          </el-table-column>
          <el-table-column
            prop="productName"
            label="产品名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="customerID"
            label="客户ID"
            width="120">
          </el-table-column>
          <el-table-column
            prop="businesLeader"
            label="业务负责人"
            width="120">
          </el-table-column>
          <el-table-column
            prop="department"
            label="所属部门"
            width="120">
          </el-table-column>
          <el-table-column
            prop="billTime"
            label="签单时间"
            width="148">
          </el-table-column>
          <el-table-column
            prop="orderType"
            label="订单类型"
            width="120">
          </el-table-column>
          <el-table-column
            prop="serviceAmount"
            label="服务金额"
            width="120">
          </el-table-column>
          <el-table-column
            prop=" officialReceipts"
            label="实收"
            width="120">
          </el-table-column>
          <el-table-column
            prop="expenditure"
            label="支出"
            width="120">
          </el-table-column>
          <el-table-column
            prop="effectiveIncome"
            label="有效收入"
            width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="80">
            <div class="detail_warpper">
              <img src="https://static-shanghai.hanku.net.cn/searchfor.png" alt="" class="detail_img">
              <div class="detail">详情</div>
            </div>
          </el-table-column>
        </el-table>
      </div>

      <!-- 删除和分页 -->
      <div class="manageAnalyz_table_delete_page">
        <div class="manageAnalyz_table_delete">
          <el-button plain>批量删除</el-button>
        </div>
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      //头部主体内容数据
      headerLists: [{
        headerTit: '本月待收',
        price: '266.00',
        headerNum: '待收总额：0.00'
      }, {
        headerTit: '本月实收',
        price: '266.00',
        headerNum: '本年实收：0.00'
      }, {
        headerTit: '本月支出',
        price: '266.00',
        headerNum: '本年实收：0.00'
      }, {
        headerTit: '本月毛利润',
        price: '266.00',
        headerNum: '本年毛利：0.00'
      }, {
        headerTit: '本月签单额',
        price: '266.00',
        headerNum: '本年签单额：0.00'
      }, {
        headerTit: '本月新增',
        price: '266.00',
        headerNum: '累计客户数：0.00'
      }],
      tableData: [{
        customerCompany: '杭州那个啥科技有限公司',
        productName: '代理记账',
        customerID: '789787960',
        businesLeader: '苏源',
        department: '业务部',
        billTime: '2019-11-11',
        orderType: '新签',
        serviceAmount: '4900.00',
        officialReceipts: '4900.00',
        expenditure: '1900.00',
        effectiveIncome: '3000.00'
      }, {
        customerCompany: '杭州那个啥科技有限公司',
        productName: '代理记账',
        customerID: '789787960',
        businesLeader: '苏源',
        department: '业务部',
        billTime: '2019-11-11',
        orderType: '新签',
        serviceAmount: '4900.00',
        officialReceipts: '4900.00',
        expenditure: '1900.00',
        effectiveIncome: '3000.00'
      }, {
        customerCompany: '杭州那个啥科技有限公司',
        productName: '代理记账',
        customerID: '789787960',
        businesLeader: '苏源',
        department: '业务部',
        billTime: '2019-11-11',
        orderType: '新签',
        serviceAmount: '4900.00',
        officialReceipts: '4900.00',
        expenditure: '1900.00',
        effectiveIncome: '3000.00'
      }, {
        customerCompany: '杭州那个啥科技有限公司',
        productName: '代理记账',
        customerID: '789787960',
        businesLeader: '苏源',
        department: '业务部',
        billTime: '2019-11-11',
        orderType: '新签',
        serviceAmount: '4900.00',
        officialReceipts: '4900.00',
        expenditure: '1900.00',
        effectiveIncome: '3000.00'
      }, {
        customerCompany: '杭州那个啥科技有限公司',
        productName: '代理记账',
        customerID: '789787960',
        businesLeader: '苏源',
        department: '业务部',
        billTime: '2019-11-11',
        orderType: '新签',
        serviceAmount: '4900.00',
        officialReceipts: '4900.00',
        expenditure: '1900.00',
        effectiveIncome: '3000.00'
      }, {
        customerCompany: '杭州那个啥科技有限公司',
        productName: '代理记账',
        customerID: '789787960',
        businesLeader: '苏源',
        department: '业务部',
        billTime: '2019-11-11',
        orderType: '新签',
        serviceAmount: '4900.00',
        officialReceipts: '4900.00',
        expenditure: '1900.00',
        effectiveIncome: '3000.00'
      }, {
        customerCompany: '杭州那个啥科技有限公司',
        productName: '代理记账',
        customerID: '789787960',
        businesLeader: '苏源',
        department: '业务部',
        billTime: '2019-11-11',
        orderType: '新签',
        serviceAmount: '4900.00',
        officialReceipts: '4900.00',
        expenditure: '1900.00',
        effectiveIncome: '3000.00'
      }, {
        customerCompany: '杭州那个啥科技有限公司',
        productName: '代理记账',
        customerID: '789787960',
        businesLeader: '苏源',
        department: '业务部',
        billTime: '2019-11-11',
        orderType: '新签',
        serviceAmount: '4900.00',
        officialReceipts: '4900.00',
        expenditure: '1900.00',
        effectiveIncome: '3000.00'
      }, {
        customerCompany: '杭州那个啥科技有限公司',
        productName: '代理记账',
        customerID: '789787960',
        businesLeader: '苏源',
        department: '业务部',
        billTime: '2019-11-11',
        orderType: '新签',
        serviceAmount: '4900.00',
        officialReceipts: '4900.00',
        expenditure: '1900.00',
        effectiveIncome: '3000.00'
      }, {
        customerCompany: '杭州那个啥科技有限公司',
        productName: '代理记账',
        customerID: '789787960',
        businesLeader: '苏源',
        department: '业务部',
        billTime: '2019-11-11',
        orderType: '新签',
        serviceAmount: '4900.00',
        officialReceipts: '4900.00',
        expenditure: '1900.00',
        effectiveIncome: '3000.00'
      }, {
        customerCompany: '杭州那个啥科技有限公司',
        productName: '代理记账',
        customerID: '789787960',
        businesLeader: '苏源',
        department: '业务部',
        billTime: '2019-11-11',
        orderType: '新签',
        serviceAmount: '4900.00',
        officialReceipts: '4900.00',
        expenditure: '1900.00',
        effectiveIncome: '3000.00'
      }]
    }
  }
}
</script>

<style lang="scss">
  @function px($px){
    $rem: 144;
    @return ($px/ $rem) + rem;
  }
  .manageanalyze{
    margin: 24px px(24);
    //上面部分
    header{
      width:px(1200);
      height:218px;
      background: #fff;
      padding: 24px px(24);
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
      //头部主体盒子
      .header_mine{
        height:128px;
        width:100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .header_boxs{
          height:128px;
          width:px(177);
          background:rgba(241,248,255,1);
          border-radius:4px;
          padding: 24px px(24) 24px;
          p:nth-child(1){
            font-size:14px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(51,57,63,1);
            line-height:20px;
            margin-bottom: 8px;
          }
          p:nth-child(2){
            font-size:24px;
            font-family:Arial-BoldMT,Arial;
            font-weight:normal;
            color:rgba(51,57,63,1);
            line-height:24px;
            margin-bottom:16px;
          }
          p:nth-child(3){
            font-size:12px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(111,124,141,1);
            line-height:12px;
          }
        }
        div:nth-child(2),div:nth-child(4),div:nth-child(5) {
          p:nth-child(2){
            color:rgba(0,151,254,1);
          }
        }
        div:nth-child(3) p:nth-child(2){
          color:rgba(255,131,107,1);
        }
      }
    }

    //内容部分
    .manageAnalyz_content{
      width:px(1200);
      height:584px;
      background: #fff;
      margin-top:23px;
      padding: 24px px(24);
      padding-bottom: 0;
      //内容部分头部
      .manageAnalyz_content_top{
        height:56px;
        .manageAnalyz_buttons{
          button{
            width:px(88);
            height:32px;
            background:rgba(0,151,254,1);
            border-radius:4px;
            line-height: 8px;
            span{
              font-size:14px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(255,255,255,1);
            }
          }
        }
      }

      //表格列表
      .content_table{
        height:387px;
        width:100%;
        overflow: auto;
        // background: pink;
        .detail_warpper{
          width:px(68);
          height:57px;
          padding:17px px(41) 36px px(14);
          img{
            width:15px;
            height:15px;
          }
          .detail{
            width:px(60);
            height:32px;
            background:rgba(255,255,255,1);
            box-shadow:0px 4px 12px 0px rgba(49,137,245,0.24);
            border-radius:3px;
            position: absolute;
            left:px(8);
            text-align: center;
            line-height: 32px;
            z-index: 111;
            font-size:14px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(51,57,63,1);
            display: none;
          }
          &:hover .detail{
            display:block;
          }          
        }
      }

    //删除和分页
    .manageAnalyz_table_delete_page{
      background: #fff;
      padding: 32px 0 46px 0;
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      z-index: 100;
      border-top: 1px solid rgba(228,238,249,1);
      .is-background{
        padding-right:0;
        .btn-next{
          margin-right:0;
        }
      }
      .manageAnalyz_table_delete{
        button{
          height: 32px;
          width: 88px;
          line-height: px(7);
          border:1px solid rgba(32,129,229,1);
          background: #fff;
          span{
            margin-left: px(-4);
            color:rgba(32,129,229,1);
          }
        }
      }
    }
  }
}
.content_table::-webkit-scrollbar {
  width: 10px!important;
}
.content_table::-webkit-scrollbar-track{
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}
/*定义滑块，内阴影及圆角*/
.content_table::-webkit-scrollbar-thumb{
  height: 10px;
  border-radius: 10px;
  background-color: #555;
}
</style>