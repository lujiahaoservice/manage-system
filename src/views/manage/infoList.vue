<template>
  <div class="infoList">
    <div class="feedback">
      <el-date-picker
        v-model="infoList_time"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy-MM-dd"
        :clearable="false"
        @change="enterTime"
        value-format="yyyy-MM-dd">
      </el-date-picker>
    </div>
    <div class="content_form" style="margin-top:30px;">
      <el-table
        :header-cell-style= "{background:'rgba(228,238,249,1)',color:'#33393F'}"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop="title"
          align="center"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="content"
          align="center"
          label="内容">
        </el-table-column>
        <el-table-column
          align="center"
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="cid"
          label="cid">
        </el-table-column>
        <el-table-column
          align="center"
          prop="created"
          width="180"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="status"
          align="center"
          width="108"
          label="推送方式">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 0" style="color:#6F7C8D">个推</span>
            <span v-if="scope.row.type === 1" style="color:#0097FE">群推</span>
          </template>
        </el-table-column>
      </el-table>
      <NoData v-if="tableData.length === 0" :noDataPadding="''" style="margin-top:100px;margin-bottom:100px;"></NoData>
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
  </div>
</template>
<script>
import NoData from '@/components/no-data'
import { getList, messageDelete } from '@/api/message'
export default {
  components: {
    NoData
  },
  data() {
    return {
      tab_active: '0',
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      infoList_time: []
    }
  },
  watch: {
  },
  created() {
    const todays = new Date()
    const fiveAgo = new Date((new Date()).getTime() - 29 * 24 * 60 * 60 * 1000)
    const month = (todays.getMonth() + 1).toString().length === 1 ? '0' + (todays.getMonth() + 1) : (todays.getMonth() + 1)
    const day = todays.getDate().toString().length === 1 ? '0' + todays.getDate() : todays.getDate()
    const fivemonth = (fiveAgo.getMonth() + 1).toString().length === 1 ? '0' + (fiveAgo.getMonth() + 1) : (fiveAgo.getMonth() + 1)
    const fiveday = fiveAgo.getDate().toString().length === 1 ? '0' + fiveAgo.getDate() : fiveAgo.getDate()
    const today = todays.getFullYear() + '-' + month + '-' + day //今天的日期
    const fiveAgoToday = fiveAgo.getFullYear() + '-' + fivemonth + '-' + fiveday //30天前的日期
    this.infoList_time = [fiveAgoToday, today]
    this.initData()
  },
  methods: {
    // 删除
    deleteRow(index, table) {
      this.$confirm('是否添加任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var data = {
          phone: table[index].phone
        }
        messageDelete(data).then((res) => {
          if (res.status === 200) {
            this.$message.success('删除失败，请稍后重试')
            this.initData()
          } else {
            this.$message.error('删除失败，请稍后重试')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })        
      })
    },
    initData(startTime, endTime) {
      const data = {
        orderDesc: 'created',
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        startTime: startTime || this.infoList_time[0],
        endTime: endTime || this.infoList_time[1]
      }
      getList(data).then(res => {
        if (res.status === 200) {
          this.tableData = res.data.data.records
          this.total = res.data.data.total
        }
      })
    },
    changePage(e) {
      this.pageNum = e
      this.initData()
    },
    enterTime(e) {
      console.log('e', e)
      this.initData(e[0], e[1])
    }
  }
}
</script>
<style lang="scss">
  .infoList{
  margin:24px px(24);
  margin-bottom:0;
   // 搜索
  .feedback{
    display: flex;
    flex-direction: row;
    margin-left: 7px;
    margin-top:32px;
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
    margin-top: 30px;
    margin-bottom: 30px;
    justify-content: flex-start;
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
      margin-top: 20px;
      margin-bottom: 50px;
      position: relative;
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
