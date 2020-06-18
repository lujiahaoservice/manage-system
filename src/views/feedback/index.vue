<template>
  <div class="feedbackManage">
    <!-- 商机概况 -->
    <!-- 商机列表 -->
    <div class="business_content">
        <div class="table_tabs">
          <div class="tabs_position">
            <div :class="['tab', 'tab1',  'active_tab']" >所有反馈</div>
          </div>
        </div>
        <div class="feedback">
          <el-date-picker
            v-model="feedback_time"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="enterTime"
            format="yyyy-MM-dd"
            :clearable="false"
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
              align="center"
              label="反馈类型">
              <template slot-scope="scope">
                <span v-if="scope.row.feedbackType==1" style="color:#6F7C8D">功能异常</span>
                <span v-if="scope.row.feedbackType==2" style="color:#0097FE">产品建议</span>
                <span v-if="scope.row.feedbackType==3" style="color:#FF836B">其他</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="created"
              width="180"
              align="center"
              label="时间">
            </el-table-column>
            <el-table-column
              prop="content"
              align="center"
              label="内容">
            </el-table-column>
            <el-table-column
              fixed="right"
              align="center"
              label="操作">
              <template slot-scope="scope">
                <div style="cursor: pointer;">
                  <el-button @click.native.prevent="willDelete(scope.$index, tableData)" type="danger" size="small">
                    删除
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
      
    </div>
  </div>
</template>

<script>
import { feedbackList, feedbackRemove } from '@/api/feedback'
import NoData from '@/components/no-data'
// import { download } from '@/plugins/download'
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
      pageSize: 5,
      feedback_time: []
    }
  },
  watch: {
    tab_active: {
      handler(val) {
        this.initData()
      }
    }
  },
  created() {
    // 获取任务列表
    const todays = new Date()
    const fiveAgo = new Date((new Date()).getTime() - 29 * 24 * 60 * 60 * 1000)
    const month = (todays.getMonth() + 1).toString().length === 1 ? '0' + (todays.getMonth() + 1) : (todays.getMonth() + 1)
    const day = todays.getDate().toString().length === 1 ? '0' + todays.getDate() : todays.getDate()
    const fivemonth = (fiveAgo.getMonth() + 1).toString().length === 1 ? '0' + (fiveAgo.getMonth() + 1) : (fiveAgo.getMonth() + 1)
    const fiveday = fiveAgo.getDate().toString().length === 1 ? '0' + fiveAgo.getDate() : fiveAgo.getDate()
    const today = todays.getFullYear() + '-' + month + '-' + day //今天的日期
    const fiveAgoToday = fiveAgo.getFullYear() + '-' + fivemonth + '-' + fiveday //30天前的日期
    this.feedback_time = [fiveAgoToday, today]
    this.initData()
  },
  methods: {
    // 删除任务
    willDelete(index, table) {
      this.$confirm('是否添加任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var data = {
          ids: table[index].feedbackId
        }
        feedbackRemove(data).then((res) => {
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
        startTime: startTime || this.feedback_time[0],
        endTime: endTime || this.feedback_time[1]
      }
      feedbackList(data).then(res => {
        if (res.status === 200) {
          this.tableData = res.data.data.records
          this.total = res.data.data.total
          console.log('意见反馈', this.tableData)
        }
      })
    },
    changePage(e) {
      console.log('yeshu',e)
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
.feedbackManage{
  margin:10px px(24);
  margin-bottom:0;
  // 内容部分
  .business_content{
    position: relative;
    width:px(1200);
    background: #fff;
    margin-top:10px;
    padding:24px px(24);
    padding-bottom: 0;
    // tab
  .table_tabs{
    position: relative;
    margin-top: 10px;
    height: 40px;
    margin-bottom: 16px;
    padding-left: px(7);
    border-bottom: 1px solid #E4EEF9;
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
  // 搜索日期
  .feedback{
    margin-bottom: 16px;
    margin-left: 7px;
  }
    // 列表表格
  .content_form{
      height: px(429);
      overflow: auto;
      position: relative;
    }
  }
  .pagination {
    height:86px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    right:px(24);
    background: #fff;
    padding:0 px(24);
  }
}
</style>
