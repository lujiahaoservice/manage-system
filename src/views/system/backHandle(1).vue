<template>
  <div class="backHandle">
    <div class="btns_search_box">
      <div class="btns">
        <el-button type="primary" @click="exportList" class="search">导出</el-button>
      </div>
      <div class="feedback">
        <el-date-picker
          v-model="backHandle_time"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          :clearable="false"
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
          prop="operName"
          align="center"
          label="操作人员">
        </el-table-column>
        <el-table-column
          prop="operLocation"
          align="center"
          label="操作地点">
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="操作状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===0" style="color:#6F7C8D">正常</span>
            <span v-if="scope.row.status===1" style="color:#FF836B">异常</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="operIp"
          align="center"
          label="主机地址">
        </el-table-column>
        <el-table-column
          align="center"
          label="业务类型">
          <template slot-scope="scope">
            <span v-if="scope.row.businessType===0" style="color:#6F7C8D">其他</span>
            <span v-if="scope.row.businessType===1" style="color:#0097FE">新增</span>
            <span v-if="scope.row.businessType===2" style="color:#6F7C8D">修改</span>
            <span v-if="scope.row.businessType===3" style="color:#FF836B">删除</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          align="center"
          label="模块标题">
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
               <el-popconfirm
                v-if="scope.row.status === 1"
                confirmButtonText='通过'
                cancelButtonText='不通过'
                icon="el-icon-info"
                iconColor="red"
                title="请确认是否审核通过"
                @onConfirm="confirmIt(scope.row)"
                @onCancel="cancelIt(scope.row)"
              >
                <el-button class="no_padding" slot="reference" style="width:16px;height:16px;border:none;padding:0;padding-bottom:4px;margin-right: 10px;margin-bottom: 5px;">
                  <img style="width:16px;height:16px;" src="@/assets/image/confirm.png" alt="">
                </el-button>
              </el-popconfirm> 
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="danger" size="mini">
                删除
              </el-button> 
            </div>
          </template>
        </el-table-column>-->
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
import { backHandleRecords, removeHandleRecord } from '@/api/record'
import { backhandleExport, downloadFile } from '@/api/export'
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
      backHandle_time: ['', '']
    }
  },
  watch: {
    tab_active: {
      handler(val) {
        this.initData()
      }
    },
    backHandle_time() {
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
    this.backHandle_time = [fiveAgoToday, today]
    this.initData()
  },
  methods: {
    exportList() {
      const data = {
        startTime: this.backHandle_time[0],
        endTime: this.backHandle_time[1]
      }
      backhandleExport(data).then(res => {
        if (res.data.data) {
          console.log(res)
          const data1 = {
            fileName: res.data.data
          }
          downloadFile(data1).then(res => {
            console.log(res)
            download(res.request.responseURL, '操作记录')
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
          ids: table[index].operId
        }
        removeHandleRecord(data).then(res => {
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
    initData(startTime, endTime) {
      const data = {
        orderDesc: 'created',
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        startTime: startTime || this.backHandle_time[0],
        endTime: endTime || this.backHandle_time[1]
      }
      backHandleRecords(data).then(res => {
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
.backHandle{
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

