<template>
  <div class="orderManage">
    <!-- 商机概况 -->
    <!-- 商机列表 -->
    <div class="business_content">
        <div class="content_tit">
              <span>订单管理</span>
        </div>
        <div class="table_tabs">
          <div class="tabs_position">
            <div :class="['tab', 'tab1', tab_active === '2' ? 'active_tab' : '']" @click="tabActive(3)">进行中</div>
            <div :class="['tab', 'tab1', tab_active === '3' ? 'active_tab' : '']" @click="tabActive(4)">待验收</div>
            <div :class="['tab', 'tab4', tab_active === '4' ? 'active_tab' : '']" @click="tabActive(5)">已完成</div>
            <div :class="['tab', 'tab4', tab_active === '9' ? 'active_tab' : '']" @click="tabActive(10)">已评论</div>
          </div>
        </div>
        <div class="feedback">
          <el-date-picker
            v-model="orderManage_time"
            type="daterange"
            :clearable="false"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
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
            style="width: 100%">
            <el-table-column
              prop="username"
              align="center"
              label="下单用户名">
            </el-table-column>
            <el-table-column
              align="center"
              prop="executor"
              label="执行者名">
            </el-table-column>
            <el-table-column
              width="220"
              align="center"
              label="下单时间及完成时间">
              <template slot-scope="scope">
                <span style="color:#6F7C8D">{{'下单时间:' + scope.row.created}}<br></span>
                <span style="color:#6F7C8D" v-if="scope.row.completeTime">{{'完成时间:' + scope.row.completeTime}}</span>
              </template>
            </el-table-column>
            <el-table-column
              width="220"
              align="center"
              label="时间记录">
              <template slot-scope="scope">
                <span v-if="scope.row.step.steps[0].desc" style="color:#6F7C8D">{{scope.row.step.steps[0].title + ':'+ scope.row.step.steps[0].desc}}<br></span>
                <span v-if="scope.row.step.steps[1].desc" style="color:#6F7C8D">{{scope.row.step.steps[1].title + ':'+ scope.row.step.steps[1].desc}}<br></span>
                <span v-if="scope.row.step.steps[2].desc" style="color:#6F7C8D">{{scope.row.step.steps[2].title + ':'+ scope.row.step.steps[2].desc}}<br></span>
                <span v-if="scope.row.step.steps[3].desc" style="color:#6F7C8D">{{scope.row.step.steps[3].title + ':'+ scope.row.step.steps[3].desc}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="actualAmount"
              align="center"
              label="接单金额(元)">
              <template slot-scope="scope">
                {{(scope.row.money/100).toFixed(2)}}
              </template>
            </el-table-column>
            <el-table-column
              prop="categoryName"
              align="center"
              label="订单类型">
            </el-table-column>
            <el-table-column
              fixed="right"
              align="center"
              width="180"
              label="操作">
                <template slot-scope="scope">
                  <el-button v-if="tab_active === '2'" @click.native.prevent="willCancel(scope.$index, tableData)" type="danger" size="mini">
                    取消订单
                  </el-button>
                  <el-button  @click.native.prevent="see(scope.$index, tableData)" type="primary" size="small">
                    详情
                  </el-button>
                  <el-button v-if="tab_active === '9'" @click.native.prevent="commentDetails(scope.$index, tableData)" type="primary" size="mini">
                    评论详情
                  </el-button>
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
            :current-page ="pageNum"
            @current-change="changePage"
            :total="total">
          </el-pagination>
        </div>
        <el-dialog
          title="评论详情"
          :visible.sync="commentModal"
          :close-on-click-modal = "false"
          width="50%"
          left>
          <div class="vip_main">
            <div class="vip_main_item" style="margin-top:0;">
              <div class="vip_main_item_text">
                发布者评分
              </div>
              <div class="vip_main_item_input">
                <el-rate disabled v-model="commentDesc.posterNumber"></el-rate>
              </div>
            </div>
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                发布者评价
              </div>
              <div class="vip_main_item_input">
                <el-input disabled type="textarea"  placeholder="请输入任务描述" size="mini" v-model="commentDesc.posterDesc" style="width: 400px;"></el-input>
              </div>
            </div>
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                接单者评分
              </div>
              <div class="vip_main_item_input">
                <el-rate disabled v-model="commentDesc.receiverNumber"></el-rate>
              </div>
            </div>
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                接单者评价
              </div>
              <div class="vip_main_item_input">
                <el-input disabled type="textarea"  placeholder="请输入任务描述" size="mini" v-model="commentDesc.receiverDesc" style="width: 400px;"></el-input>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <!-- <el-button @click="commentModal = false">取 消</el-button> -->
            <el-button type="primary" @click="commentModal = false">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="取消订单"
          :visible.sync="cancelOrderModal"
          :close-on-click-modal = "false"
          width="30%"
          left>
          <div class="vip_main">
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                取消原因
              </div>
              <div class="vip_main_item_input">
                <el-input class="textarea_imput"  type="textarea"  placeholder="请输入任务描述" size="mini" v-model="cancel.cancelDesc"></el-input>
              </div>
            </div>
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                扣除发布者赏金（元）
              </div>
              <div class="vip_main_item_input">
                <el-input-number  v-model="cancel.executorCancelAmount" :min="0" label="请输入任务赏金" size="mini"></el-input-number>
              </div>
            </div>
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                扣除接单者信用分
              </div>
              <div class="vip_main_item_input">
                <el-input-number  v-model="cancel.cancelDeductCredit" :min="0" :max="12" label="请输入任务赏金" size="mini"></el-input-number>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <!-- <el-button @click="commentModal = false">取 消</el-button> -->
            <el-button type="primary" @click="willDeiete">提 交</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="任务"
          :visible.sync="orderModal"
          :close-on-click-modal = "false"
          width="40%"
          left>
          <div class="vip_main">
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                发布人姓名
              </div>
              <div class="vip_main_item_inputs">
                <el-input
                  placeholder="发布人姓名"
                  v-model="seeItem.username"
                  :disabled="true">
                </el-input>
              </div>
            </div>
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                发布人头像
              </div>
              <div class="vip_main_item_inputs">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="seeItem.userPhoto"
                  >
                </el-image>
              </div>
            </div>
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                类目名称
              </div>
              <div class="vip_main_item_inputs">
                <el-input
                  placeholder="类目名称"
                  v-model="seeItem.categoryName"
                  :disabled="true">
                </el-input>
              </div>
            </div>
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                任务赏金
              </div>
              <div class="vip_main_item_inputs">
                <el-input
                  placeholder="任务赏金"
                  v-model="seeItem.money"
                  :disabled="true">
                </el-input>
              </div>
            </div>
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                支付订单号
              </div>
              <div class="vip_main_item_inputs">
                <el-input
                  placeholder="支付订单号"
                  v-model="seeItem.orderNum"
                  :disabled="true">
                </el-input>
              </div>
            </div>
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                支付流水号
              </div>
              <div class="vip_main_item_inputs">
                <el-input
                  placeholder="支付流水号"
                  v-model="seeItem.serialNum"
                  :disabled="true">
                </el-input>
              </div>
            </div>
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                退款订单号
              </div>
              <div class="vip_main_item_inputs">
                <el-input
                  placeholder="退款订单号"
                  v-model="seeItem.refundOrderNum"
                  :disabled="true">
                </el-input>
              </div>
            </div>
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                退款流水号
              </div>
              <div class="vip_main_item_inputs">
                <el-input
                  placeholder="退款流水号"
                  v-model="seeItem.refundSerialNum"
                  :disabled="true">
                </el-input>
              </div>
            </div>
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                标题
              </div>
              <div class="vip_main_item_inputs">
                <el-input
                  placeholder="标题"
                  v-model="seeItem.title"
                  :disabled="true">
                </el-input>
              </div>
            </div>
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                任务详情
              </div>
              <div class="vip_main_item_inputs">
                <el-input
                  placeholder="任务详情"
                  v-model="seeItem.detail"
                  :disabled="true">
                </el-input>
              </div>
            </div>
            <!-- <div class="vip_main_item">
              <div class="vip_main_item_text">
                任务图片
              </div>
              <div class="vip_main_item_inputs" v-for="(item) in seeItem.images" :key="item">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="item"
                  >
                </el-image>
              </div>
            </div> -->
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                发布详细地址
              </div>
              <div class="vip_main_item_inputs">
                <el-input
                  placeholder="发布详细地址"
                  v-model="seeItem.publishPlace"
                  :disabled="true">
                </el-input>
              </div>
            </div>
            <div class="vip_main_item">
              <div class="vip_main_item_text1">
                完成地点
              </div>
              <div class="vip_main_item_input1">
                <el-input
                  placeholder="省"
                  v-model="seeItem.province"
                  :disabled="true">
                </el-input>
              </div>
              <div class="vip_main_item_input1">
                <el-input
                  placeholder="市"
                  v-model="seeItem.city"
                  :disabled="true">
                </el-input>
              </div>
              <div class="vip_main_item_input1">
                <el-input
                  placeholder="区"
                  v-model="seeItem.district"
                  :disabled="true">
                </el-input>
              </div>
            </div>
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                完成地点详细地址
              </div>
              <div class="vip_main_item_inputs">
                <el-input
                  placeholder="完成地点详细地址"
                  v-model="seeItem.completePlace"
                  :disabled="true">
                </el-input>
              </div>
            </div>
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                完成时间
              </div>
              <div class="vip_main_item_inputs">
                <el-input
                  placeholder="完成时间"
                  v-model="seeItem.completeTime"
                  :disabled="true">
                </el-input>
              </div>
            </div>
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                发布者联系方式
              </div>
              <div class="vip_main_item_inputs">
                <el-input
                  placeholder="发布者联系方式"
                  v-model="seeItem.proPhone"
                  :disabled="true">
                </el-input>
              </div>
            </div>
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                完成联系方式
              </div>
              <div class="vip_main_item_inputs">
                <el-input
                  placeholder="完成联系方式"
                  v-model="seeItem.comPhone"
                  :disabled="true">
                </el-input>
              </div>
            </div>
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                审核人名
              </div>
              <div class="vip_main_item_inputs">
                <el-input
                  placeholder="审核人名"
                  v-model="seeItem.auditor"
                  :disabled="true">
                </el-input>
              </div>
            </div>
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                执行者名
              </div>
              <div class="vip_main_item_inputs">
                <el-input
                  placeholder="执行者名"
                  v-model="seeItem.executor"
                  :disabled="true">
                </el-input>
              </div>
            </div>
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                接单时间
              </div>
              <div class="vip_main_item_inputs">
                <el-input
                  placeholder="接单时间"
                  v-model="seeItem.executed"
                  :disabled="true">
                </el-input>
              </div>
            </div>
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                执行者联系方式
              </div>
              <div class="vip_main_item_inputs">
                <el-input
                  placeholder="执行者联系方式"
                  v-model="seeItem.executorPhone"
                  :disabled="true">
                </el-input>
              </div>
            </div>
            <div class="vip_main_item">
              <div class="vip_main_item_text">
                执行者收益
              </div>
              <div class="vip_main_item_inputs">
                <el-input
                  placeholder="执行者收益"
                  v-model="seeItem.executorIncome"
                  :disabled="true">
                </el-input>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="orderModal = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
</template>
<script>
import { orderList, getComment, cancelOrder, checkCancelOrder } from '@/api/order'
import NoData from '@/components/no-data'
// import { download } from '@/plugins/download'
export default {
  components: {
    NoData
  },
  data() {
    return {
      orderModal: false,
      seeItem: {

      }, //查看详情
      commentDesc: {
        posterNumber: 0,
        posterDesc: '',
        receiverNumber: 0,
        receiverDesc: ''
      },
      cancel: {
        taskId: '',
        cancelDesc: '',
        cancelerIdentity: 3,
        executorCancelAmount: '',
        cancelDeductCredit: ''
      },
      status: 3,
      cancelOrderModal: false,
      commentModal: false,
      input: '',
      tab_active: '2',
      value: '',
      value1: '',
      value2: '',
      drawer: false,
      indexFlag: '',
      tableData: [],
      selectVal: '',
      total: 0,
      pageNum: 1,
      pageSize: 8,
      getIt: 0,
      orderManage_time: ['', '']
    }
  },
  watch: {
    // tab_active: {
    //   handler(val) {
    //     this.initData()
    //   }
    // }
  },
  created() {
    const todays = new Date()
    const fiveAgo = new Date((new Date()).getTime() - 29 * 24 * 60 * 60 * 1000)
    const month = (todays.getMonth() + 1).toString().length === 1 ? '0' + (todays.getMonth() + 1) : (todays.getMonth() + 1)
    const day = todays.getDate().toString().length === 1 ? '0' + todays.getDate() : todays.getDate()
    const fivemonth = (fiveAgo.getMonth() + 1).toString().length === 1 ? '0' + (fiveAgo.getMonth() + 1) : (fiveAgo.getMonth() + 1)
    const fiveday = fiveAgo.getDate().toString().length === 1 ? '0' + fiveAgo.getDate() : fiveAgo.getDate()
    const today = todays.getFullYear() + '-' + month + '-' + day //今天的日期
    const fiveAgoToday = fiveAgo.getFullYear() + '-' + fivemonth + '-' + fiveday //5天前的日期
    this.orderManage_time = [fiveAgoToday, today]
    this.initData(3)
  },
  methods: {
    // 获取评论详情
    getComment(id) {
      getComment({ 
        orderId: id
      }).then(res => {
        if (res.status === 200) {
          res.data.data.records.map(item => {
            if (item.commentatorIdentity === 2) {
              this.commentDesc.posterNumber = item.stars
              this.commentDesc.posterDesc = item.details
            } 
            if (item.commentatorIdentity === 1) {
              this.commentDesc.receiverNumber = item.stars
              this.commentDesc.receiverDesc = item.details
            } 
          })
        }
      })
    },
    // 进行中 取消订单
    willCancel(index, table) {
      console.log(table[index])
      this.cancel = {
        taskId: '',
        cancelDesc: '',
        cancelerIdentity: 3,
        executorCancelAmount: '',
        cancelDeductCredit: ''
      }
      console.log(table[index].taskId)
      this.cancel.taskId = table[index].taskId
      this.cancelOrderModal = true
    },
    // 进行中 取消订单
    willDeiete() {
      this.$confirm('此操作将取消订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          taskId: this.cancel.taskId,
          cancelDesc: this.cancel.cancelDesc,
          cancelerIdentity: 3,
          executorCancelAmount: this.cancel.executorCancelAmount,
          cancelDeductCredit: this.cancel.cancelDeductCredit
        }
        cancelOrder(data).then(res => {
          if (res.status === 200) {
            const decondData = {
              cancelStatus: 7,
              taskId: this.cancel.taskId
            }
            checkCancelOrder(decondData).then(res => {
              if (res.status === 200) {
                this.cancelOrderModal = false
                this.$message.success('订单取消成功')
                this.initData()
              }
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })        
      })
    },
    // 查看评论详情
    commentDetails(index, table) {
      console.log(table[index].orderId)
      this.commentModal = true
      this.getComment(table[index].orderId)
    },
    // 切换tab
    tabActive(type) {
      this.tab_active = (type - 1).toString()
      this.pageNum = 1
      this.status = type
      this.initData(type)
    },
    // 获取列表
    initData(status, startTime, endTime) {
      const data = {
        orderDesc: 'created',
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        status: status || this.status,
        startTime: startTime || this.orderManage_time[0],
        endTime: endTime || this.orderManage_time[1]
      }
      orderList(data).then(res => {
        if (res.status === 200) {
          console.log('最初返回的数据',res.data)
          res.data.data.records.map(item => {
            
            item.step = JSON.parse(item.step)
            
            // if (item.step.steps) {
              // console.log('1',item.step.steps)
            item.step.steps = JSON.parse(item.step.steps)
            // }
            // console.log('2',item.step.steps)
            
            // if (item.step.steps) {
            //   item.step.steps.map((it, index) => {
            //     if (index === 0) {
            //       it.title = '审核时间'
            //     }
            //     if (index === 1) {
            //       it.title = '接单时间'
            //     }
            //     if (index === 2) {
            //       it.title = '提交时间'
            //     }
            //     if (index === 3) {
            //       it.title = '通过时间'
            //     }
            //     console.log(it)
            //   })
            // }
            // console.log(item.step)
          })
          this.tableData = res.data.data.records
          console.log(this.tableData)
          this.total = res.data.data.total
        }
      })
    },
    changePage(e) {
      this.pageNum = e
      this.initData()
    },
    enterTime(e) {
      this.initData(3, e[0], e[1])
    },
    see(index, table) {
      this.seeItem = table[index]
      this.orderModal = true
      // console.log(this.seeItem)
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
    // recordOpen(index) {
    //   this.drawer = true
    //   if (index === '1') {
    //     this.indexFlag = '1'
    //   } else if (index === '2') {
    //     this.indexFlag = '2'
    //   }
    // },
    // 审核
    // putConfirm(data) {
    //   confirm(data).then(res => {
    //     this.$message({
    //       type: 'success',
    //       message: '操作成功'
    //     })
    //     this.initData()
    //   })
    // },
    // confirmIt(e) {
    //   const data = {
    //     id: e.id,
    //     bAccept: true
    //   }
    //   this.putConfirm(data)
    // },
    // cancelIt(e) {
    //   const data = {
    //     id: e.id,
    //     bAccept: false
    //   }
    //   this.putConfirm(data)
    // } 
  }
}
</script> 

<style lang="scss">
@function px($px){
  $rem: 144;
  @return ($px/ $rem) + rem;
}
.orderManage{
  margin:24px px(24);
  margin-bottom:0;
  // 内容部分
  .business_content{
    position: relative;
    box-sizing: border-box;
    width:px(1200);
    background: #fff;
    margin-top:24px;
    padding:24px px(24);
    padding-bottom: 0;
    // tab
  .table_tabs{
    position: relative;
    margin-top: 22px;
    height: 40px;
    margin-bottom: 26px;
    padding-left: px(7);
    border-bottom: 1px solid #E4EEF9;
    .tabs_position{
      position: absolute;
      // bottom: -1px;
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

.textarea_imput{
  width: px(308)
}
.vip_main_item_inputs{
  display: flex;
  align-items: center;
  width: 300px;
}
.vip_main{
  height: 300px;
  overflow-y: scroll;
}
.vip_main_item_text1{
  width: 96px;
}
.vip_main_item_input1{
  width: 100px;
}
</style>
