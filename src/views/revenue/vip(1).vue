<template>
  <div class="re_vip">
    <div class="btns">
      <el-button type="primary"  size="mini" @click="add">新增会员</el-button>
    </div>
    <div class="content_form">
      <el-table
        :header-cell-style= "{background:'rgba(228,238,249,1)',color:'#33393F'}"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop="feeName"
          align="center"
          label="收费名称">
        </el-table-column>
        <el-table-column
          prop="memberFee"
          align="center"
          label="会员费用(元)">
        </el-table-column>
        <el-table-column
          prop="memberFeePercentage"
          align="center"
          label="会员费用抽成(%)">
          <template slot-scope="scope">
            {{ scope.row.platformPumping + scope.row.agentPumping }}
          </template>
        </el-table-column>
        <el-table-column
          prop="platformPumping"
          align="center"
          label="平台抽成(%)">
        </el-table-column>
        <el-table-column
          prop="agentPumping"
          align="center"
          label="合伙人抽成(%)">
        </el-table-column>
        <el-table-column
          prop="taskAmount"
          align="center"
          label="接单最高金额(元)">
        </el-table-column>
        <el-table-column
          prop="priorityTime"
          align="center"
          label="延时查看最新任务(分钟)">
        </el-table-column>
        <el-table-column
          prop="membershipDay"
          align="center"
          label="会员天数(天)">
        </el-table-column>
        <el-table-column
          prop="receiptNumber"
          align="center"
          label="每日接单数">
        </el-table-column>
        <el-table-column
          prop="maximumNumber"
          align="center"
          label="最高接单数">
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          label="操作">
            <template slot-scope="scope">
            <div style="display:flex;align-items: center;justify-content:center;cursor: pointer;">
              <el-button @click.native.prevent="changeRow(scope.$index, tableData)" type="primary" size="small">
                修改
              </el-button> 
              <el-button @click.native.prevent="willdeleteRow(scope.$index, tableData)" type="danger" size="small">
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
    <el-dialog
      title="会员收费配置"
      :visible.sync="addVipModal"
      :close-on-click-modal = "false"
      width="20%"
      left>
      <div class="vip_main">
        <div class="vip_main_item" style="margin-top:0;">
          <div class="vip_main_item_text">
            收费名称
          </div>
          <div class="vip_main_item_input">
            <el-input x placeholder="请输入收费名称" size="mini" v-model="vip.feeName"></el-input>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">
            会员费用(元)
          </div>
          <div class="vip_main_item_input">
             <el-input-number v-model="vip.memberFee" :min="0" label="请输入费用" size="mini"></el-input-number>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">
            延时查看最新任务(分钟)
          </div>
          <div class="vip_main_item_input">
             <el-input-number v-model="vip.priorityTime" :min="0" :max="60" label="请输入延迟查看时间" size="mini"></el-input-number>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">
            会员天数(天)
          </div>
          <div class="vip_main_item_input">
             <el-input-number v-model="vip.membershipDay" :min="0" label="请输入会员天数" size="mini"></el-input-number>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">
            最高接单金额(元)
          </div>
          <div class="vip_main_item_input">
            <el-input-number v-model="vip.taskAmount" :min="0"  label="请输入最高接单金额" size="mini"></el-input-number>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">
            每日接单数
          </div>
          <div class="vip_main_item_input">
            <el-input-number v-model="vip.receiptNumber" :min="0"  label="请输入每日接单数" size="mini"></el-input-number>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">
            最高接单数
          </div>
          <div class="vip_main_item_input">
            <el-input-number v-model="vip.maximumNumber" :min="0"  label="请输入每日接单数" size="mini"></el-input-number>
          </div>
        </div>
      </div>
      <div class="vip_main_item">
        <div class="vip_main_item_text">
          平台抽成(%)
        </div>
        <div class="vip_main_item_input">
            <el-input-number v-model="vip.platformPumping" :min="0" :max="100" label="请输入平台抽成" size="mini"></el-input-number>
        </div>
      </div>
      <div class="vip_main_item">
        <div class="vip_main_item_text">
          合伙人抽成(%)
        </div>
        <div class="vip_main_item_input">
            <el-input-number v-model="vip.agentPumping" :min="0" :max="100" label="请输入合伙人抽成" size="mini"></el-input-number>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVipModal = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import NoData from '@/components/no-data'
import { vipConfigurationList, vipConfigurationUpload, vipConfigurationDelete, vipConfigurationAdd } from '@/api/revenue'
// import { download } from '@/plugins/download'
export default {
  components: {
    NoData
  },
  props: {
    zipCode: String
  },
  data() {
    return {
      isAdd: false,
      vip: {
        priorityTime: '',
        membershipDay: '',
        feeName: '',
        memberFee: '',
        memberFeePercentage: '',
        taskAmount: '',
        receiptNumber: '', //次数
        maximumNumber: '',
        agentPumping: '',
        platformPumping: ''
      },
      addVipModal: false,
      tableData: [],
      pageSize: 8,
      pageNum: 1,
      total: 0
    }
  },
  watch: {
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 删除
    willdeleteRow(index, table) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        vipConfigurationDelete({
          ids: table[index].feeConfigureId
        }).then((res) => {
          if (res.status === 200) {
            this.$message.success('删除成功')
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
    // 保存
    save() {
      if (!this.vip.feeName) {
        this.$message.error('您还没有输入收费名称')
        return
      }
      if (!this.vip.memberFee && this.vip.memberFee !== 0) {
        this.$message.error('您还没有输入会员费用')
        return
      }
      if (!this.vip.priorityTime && this.vip.priorityTime !== 0) {
        this.$message.error('您还没有输入延迟查看时间')
        return
      }
      if (!this.vip.membershipDay && this.vip.membershipDay !== 0) {
        this.$message.error('您还没有输入会员天数')
        return
      }
      if (!this.vip.taskAmount && this.vip.taskAmount !== 0) {
        this.$message.error('您还没有输入最高接单金额')
        return
      }
      if (!this.vip.receiptNumber && this.vip.receiptNumber !== 0) {
        this.$message.error('您还没有输入每日接单数')
        return
      }
      if (!this.vip.maximumNumber && this.vip.maximumNumber !== 0) {
        this.$message.error('您还没有输入最高接单数')
        return
      }
      if (!this.vip.agentPumping && this.vip.agentPumping !== 0) {
        this.$message.error('您还没有输入合伙人抽成')
        return
      }
      if (!this.vip.platformPumping && this.vip.platformPumping !== 0) {
        this.$message.error('您还没有输入平台抽成')
        return
      }
     
      const data = {
        type: 0,
        feeConfigureId: this.vip.feeConfigureId,
        feeName: this.vip.feeName,
        memberFee: Number(this.vip.memberFee) * 100,
        memberFeePercentage: Number(this.vip.platformPumping + this.vip.agentPumping),
        platformPumping: Number(this.vip.platformPumping),
        taskAmount: Number(this.vip.taskAmount) * 100,
        receiptNumber: Number(this.vip.receiptNumber), //次数
        maximumNumber: Number(this.vip.maximumNumber),
        priorityTime: Number(this.vip.priorityTime),
        membershipDay: Number(this.vip.membershipDay),
        agentPumping: Number(this.vip.agentPumping)
      }
      if (this.isAdd) {  
        data.zipCode = this.zipCode
        //添加
        vipConfigurationAdd(data).then(res => {
          if (res.status === 200) {
            this.$message.success('添加成功')
            this.initData()
            this.addVipModal = false
          } else {
            this.$message.error('添加失败，请稍后重试')
          }
        })
      } else {
        //修改
        vipConfigurationUpload(data).then(res => {
          if (res.status === 200) {
            this.$message.success('修改成功')
            this.initData()
            this.addVipModal = false
          } else {
            this.$message.error('修改失败，请稍后重试')
          }
        })
      }
    },
    // 新增
    add() {
      this.vip = {
        feeName: '',
        memberFee: '',
        memberFeePercentage: '',
        platformPumping: '',
        taskAmount: '',
        receiptNumber: '', //次数
        maximumNumber: '',
        priorityTime: '',
        membershipDay: '',
        agentPumping: ''
      }
      this.isAdd = true
      this.addVipModal = true
    },
    // 修改
    changeRow(index, tableData) {
      this.vip = tableData[index]
      console.log(this.vip)
      this.addVipModal = true
      this.isAdd = false
    },
    // 获得vip配置列表
    initData() {
      const data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        type: 0,
        zipCode: this.zipCode
      }
      vipConfigurationList(data).then(res => {
        if (res.status === 200) {
          res.data.data.records.map(item => {
            item.memberFee = (item.memberFee / 100).toFixed(2)
            item.taskAmount = (item.taskAmount / 100).toFixed(2)
          })
          this.tableData = res.data.data.records
          this.total = res.data.data.total
        }
      })
    },
    changePage(e) {
      this.pageNum = e
      this.initData()
    }
  }
}
</script>
<style lang="scss" scoped>
  .re_vip{
    .vip_main_item{
      display: flex;
      margin-top: 30px;
      align-items: center;
      .vip_main_item_text{
        margin-right: 25px;
        width: 100px;
      }
    }
  }
</style>

