<template>
  <div class="agentWithdrawal">
    <!-- 商机概况 -->
    <!-- 商机列表 -->
    <div class="business_content">
      <div>
        <div class="content_tit">
          <div class="business_top">
            <div class="tit_left">
              <div class="tit_lable"></div>
              <span>接单者取消订单</span>
            </div>
          </div>
        </div>
        <div class="table_tabs">
          <div class="tabs_position">
            <div :class="['tab', 'tab1', tab_active === '6' ? 'active_tab' : '']" @click="changeTab('6')">待审核</div>
            <div :class="['tab', 'tab1', tab_active === '7' ? 'active_tab' : '']" @click="changeTab('7')">审核通过</div>
            <div :class="['tab', 'tab1', tab_active === '8' ? 'active_tab' : '']" @click="changeTab('8')">审核未通过</div>
          </div>
        </div>
        <div class="feedback">
          <el-date-picker
            v-model="receiverCancel_time"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :clearable="false"
            format="yyyy-MM-dd"
            @change="enterTime"
            value-format="yyyy-MM-dd">
          </el-date-picker>
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
              prop="username"
              align="center"
              label="用户名">
            </el-table-column>
            <el-table-column
              prop="created"
              align="center"
              width="180"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="cancelDesc"
              align="center"
              label="退款原因">
            </el-table-column>
            <el-table-column
              align="center"
              label="支付方式">
              <template slot-scope="scope">
                <span v-if="scope.row.payType===1" style="color:#6F7C8D">支付宝</span>
                <span v-if="scope.row.payType===2" style="color:#0097FE">微信</span>
                <span v-if="scope.row.payType===3" style="color:#0097FE">银行卡</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="赏金金额(元)">
              <template slot-scope="scope">
                <div style="display:flex;align-items: center;justify-content:center;cursor: pointer;">
                 {{(scope.row.money/100).toFixed(2)}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="tab_active === '6'"
              fixed="right"
              width="450"
              align="center"
              label="操作">
                <template slot-scope="scope">
                <div style="display:flex;align-items: center;justify-content:center;cursor: pointer;">
                  <el-button v-if="scope.row.status === 6" @click.native.prevent="passIt(scope.$index, tableData)" type="primary" size="small">
                    通过
                  </el-button>
                  <el-button v-if="scope.row.status === 6" @click.native.prevent="pass(scope.$index, tableData, 8)" type="danger" size="small">
                    不通过
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <NoData v-if="tableData.length === 0" :noDataPadding="''"></NoData>
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
        <el-dialog
          title="取消订单"
          :visible.sync="cancelOrderModal"
          :close-on-click-modal = "false"
          width="30%"
          left>
          <div class="vip_main">
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                扣除接单者信用分
              </div>
              <div class="vip_main_item_input">
                <el-input-number  v-model="credit" :min="0" label="请输入扣除分数" size="mini"></el-input-number>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelOrderModal = false">取 消</el-button>
            <el-button type="primary" @click="submit">提 交</el-button>
          </span>
        </el-dialog>
        <!-- 审核不通过弹窗 -->
        <el-dialog
          title="审核不通过提示窗"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
          class="noPass">
          <el-form :model="noPassForm" :rules="noPassRules" ref="noPassForm" label-width="60px" class="noPassForm">
            <el-form-item label="理由" prop="reason" class="reason">
              <el-input type="textarea" v-model="noPassForm.reason" placeholder="请填写审核不通过理由" :rows="7"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('noPassForm')">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { posterCancelList, posterCancelExmain } from '@/api/exmain'
import NoData from '@/components/no-data'
// import { download } from '@/plugins/download'
export default {
  components: {
    NoData
  },  
  data() {
    return {
      cancelOrderModal: false,
      // 
      credit: 0,
      status: 6, //6待审 7已通过 8未通过
      tab_active: '6',
      total: 0,
      pageNum: 1,
      pageSize: 8,
      tableData: [],
      receiverCancel_time: [],
      dialogVisible: false, //审核不通过弹窗
      noPassForm: {
        reason: ''
      },
      noPassRules: {
        reason: [
          { required: true, message: '请填写审核不通过理由', trigger: 'blur' }
        ]
      },
      noPasstable: '',
      noPasstype: '',
      noPassIndex: ''
    }
  },
  watch: {
  },
  created() {
    // 获取任务列表
    this.initData()
  },
  methods: {
    submit() {
      if (!this.credit && this.credit !== 0) {
        this.$message.error('请输入扣除分数')
        return
      }
      const data = {
        taskId: this.item.taskId,
        cancelStatus: 7,
        cancelDeductCredit: this.credit
      }
      posterCancelExmain(data).then(res => {
        if (res.status === 200) {
          this.$message.success('操作成功')
          this.credit = 0
          this.cancelOrderModal = false
          this.initData()
        }
      })
    },
    // 
    passIt(index, table) {
      this.item = table[index]
      this.cancelOrderModal = true
    },
    // 审核通过或不通过
    // pass(index, table, type) {
    //   this.$confirm('操作后无法恢复！请谨慎操作，是否确认审核操作', '', {
    //     cancelButtonText: '取消',
    //     confirmButtonText: '确定',
    //     type: 'warning'
    //   }).then(() => {
    //     const data = {
    //       taskId: table[index].taskId,
    //       cancelStatus: type
    //     }
    //     posterCancelExmain(data).then(res => {
    //       if (res.status === 200) {
    //         this.$message.success('操作成功')
    //         this.initData()
    //       }
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })          
    //   })
    // },
    // 审核通过或不通过
    pass(index, table, type) {
      this.dialogVisible = true
      this.noPassIndex = index
      this.noPasstable = table
      this.noPasstype = type
    },
    submitForm(noPassForm) {
      this.$refs[noPassForm].validate((valid) => {
        if (valid) {
          console.log(this.noPassForm.reason)
          console.log(this.noPasstable[this.noPassIndex].taskId)
          const data = {
            taskId: this.noPasstable[this.noPassIndex].taskId,
            cancelStatus: this.noPasstype,
            orderReason: this.noPassForm.reason
          } 
          posterCancelExmain(data).then(res => {
            if (res.status === 200) {
              this.$message.success('操作成功')
              this.initData()
            }
          })
          this.dialogVisible = false
          console.log('提交成功')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 改变tab
    changeTab(type) {
      this.tab_active = type
      this.status = Number(type)
      this.pageNum = 1
      if (type === '6') {
        this.receiverCancel_time = []
      } else {
        const todays = new Date()
        const fiveAgo = new Date((new Date()).getTime() - 29 * 24 * 60 * 60 * 1000)
        const month = (todays.getMonth() + 1).toString().length === 1 ? '0' + (todays.getMonth() + 1) : (todays.getMonth() + 1)
        const day = todays.getDate().toString().length === 1 ? '0' + todays.getDate() : todays.getDate()
        const fivemonth = (fiveAgo.getMonth() + 1).toString().length === 1 ? '0' + (fiveAgo.getMonth() + 1) : (fiveAgo.getMonth() + 1)
        const fiveday = fiveAgo.getDate().toString().length === 1 ? '0' + fiveAgo.getDate() : fiveAgo.getDate()
        const today = todays.getFullYear() + '-' + month + '-' + day //今天的日期
        const fiveAgoToday = fiveAgo.getFullYear() + '-' + fivemonth + '-' + fiveday //30天前的日期
        this.receiverCancel_time = [fiveAgoToday, today]
      }
      this.initData()
    },
    initData(startTime, endTime) {
      const data = {
        orderDesc: 'updated',
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        status: this.status,
        cancelerIdentity: 2,
        startTime: startTime || this.receiverCancel_time[0],
        endTime: endTime || this.receiverCancel_time[1]
      }
      posterCancelList(data).then(res => {
        if (res.status === 200) {
          console.log(res)
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
@function px($px){
  $rem: 144;
  @return ($px/ $rem) + rem;
}
.agentWithdrawal{
  margin:24px px(24);
  margin-bottom:0;
  .vip_main_item{
      display: flex;
      margin-top: 30px;
      align-items: center;
      .vip_main_item_text{
        margin-right: 25px;
        width: 70px;
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
    // 审核不通过弹窗
    .noPass{
      .el-dialog__header{
        padding-top: 15px;
        background-color: rgb(245,108,108);
        span{
          color: #fff;
        }
        .el-dialog__close{
          color: #fff;
        }
      }
      .el-dialog__body{
        .noPassForm{
          .reason{
            .el-textarea__inner{
              width: 290px;
              resize: none;
            }
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
    margin-top: 79px;
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
     // 搜索
  .feedback{
    display: flex;
    flex-direction: row;
    margin-bottom: 16px;
    margin-left: 7px;
  }
    // 列表表格
  .content_form{
      height: px(429);
      overflow: auto;
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
