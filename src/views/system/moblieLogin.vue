<template>
  <div class="moblieLogin">
    <div class="btns_search_box">
      <div class="btns">
        <el-button type="primary" @click="exportList" class="search">导出</el-button>
      </div>
      <div class="feedback">
        <el-date-picker
          v-model="moblieLogin_time"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :clearable="false"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
    </div>
    <div class="content_form">
      <el-table
        :header-cell-style= "{background:'rgba(228,238,249,1)',color:'#33393F'}"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop="userName"
          align="center"
          label="用户账号">
        </el-table-column>
        <el-table-column
          prop="loginInfoId"
          align="center"
          label="访问ID">
        </el-table-column>
        <el-table-column
          align="center"
          prop="loginLocation"
          label="登录地点">
        </el-table-column>
        <el-table-column
          prop="ipaddr"
          align="center"
          label="IP地址">
        </el-table-column>
        <el-table-column
          prop="msg"
          align="center"
          label="提示消息">
        </el-table-column>
        <el-table-column
          prop="browser"
          align="center"
          label="浏览器类型">
        </el-table-column>
        <el-table-column
          prop="created"
          width="180"
          align="center"
          label="创建时间">
        </el-table-column>
        <!-- <el-table-column
          fixed="right"
          align="center"
          label="操作">
            <template slot-scope="scope">
            <div style="display:flex;align-items: center;justify-content:center;cursor: pointer;">
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="danger" size="mini">
                删除
              </el-button>
            </div>
          </template>
        </el-table-column> -->
      </el-table>
      <NoData v-if="tableData.length === 0" :noDataPadding="''" style="margin-top:100px;"></NoData>
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
import { getRecords, removeRecord } from '@/api/record'
import { loginExport, downloadFile } from '@/api/export'
import { download } from '@/plugins/download'
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
      moblieLogin_time: ['', '']
    }
  },
  watch: {
    tab_active: {
      handler(val) {
        this.initData()
      }
    },
    moblieLogin_time() {
      this.initData()
    }
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
    // 获取任务列表
    this.moblieLogin_time = [fiveAgoToday, today]
    this.initData()
  },
  methods: {
    exportList() {
      const data = {
        type: 1,
        startDate: this.moblieLogin_time[0],
        endDate: this.moblieLogin_time[1]
      }
      loginExport(data).then(res => {
        if (res.data.data) {
          const data1 = {
            fileName: res.data.data
          }
          downloadFile(data1).then(res => {
            console.log(res)
            download(res.request.responseURL, '移动端登录')
          })
        } else {
          this.$message.error('请求失败')
        }
      })
    },
    deleteRow(index, table) {
      this.$confirm('是否添加任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          ids: table[index].loginInfoId
        }
        removeRecord(data).then(res => {
          if (res.status === 200) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.initData()
          } else {
            this.$message({
              message: '操作失败',
              type: 'error'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })        
      })
    },
    initData() {
      const data = {
        orderDesc: 'created',
        startTime: this.moblieLogin_time[0],
        endTime: this.moblieLogin_time[1],
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        type: 1
      }
      getRecords(data).then(res => {
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
    // recordOpen(index) {
    //   this.drawer = true
    //   if (index === '1') {
    //     this.indexFlag = '1'
    //   } else if (index === '2') {
    //     this.indexFlag = '2'
    //   }
    // },
    // // 审核
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
.moblieLogin{
  .btns_search_box{
    display: flex;
    flex-direction: row;
    align-items: center;
    // 导出
    .btns{
      margin-top: 0;
      .search{
        height: 32px;
        margin: 2px 10px 0 10px;
        line-height: 6px;
      }
    }
    // 搜索
    .feedback{
      display: flex;
      flex-direction: row;
      margin-left: 220px;
    }
  }
}
</style>

