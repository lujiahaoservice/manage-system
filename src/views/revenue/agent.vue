<template>
  <div class="re_agent">
    <div class="btns_search_box">
      <div class="btns">
        <el-button type="primary" class="search" @click="willAddAgent">新增合伙人配置</el-button>
      </div>
      <span style="margin-left:200px;">按时间查询:</span>
      <div class="feedback">
        <el-date-picker
          v-model="agent_time"
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
    </div>
    <div class="content_form">
      <el-table
        :header-cell-style= "{background:'rgba(228,238,249,1)',color:'#33393F'}"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <!-- <el-table-column
          type="selection">
        </el-table-column> -->
        <el-table-column
          prop="feeName"
          align="center"
          label="合伙人名称">
        </el-table-column>
        <el-table-column
          prop="city"
          align="center"
          label="代理区域">
        </el-table-column>
        <el-table-column
          prop="memberFee"
          align="center"
          label="代理费用(元)">
          <template slot-scope="scope">
            {{(scope.row.memberFee/100).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="platformPumping"
          align="center"
          label="平台抽成(%)">
        </el-table-column>
        <el-table-column
          align="center"
          prop="agentPumping"
          label="合伙人抽成(%)">
        </el-table-column>
        <el-table-column
          fixed="right"
          width="220"
          align="center"
          label="操作">
            <template slot-scope="scope">
            <div style="display:flex;align-items: center;justify-content:center;cursor: pointer;">
              <el-button v-if="scope.row.zipCode != 99" @click.native.prevent="willdelete(scope.$index, tableData)" type="danger" size="mini">
                删除
              </el-button> 
              <el-button @click.native.prevent="change(scope.$index, tableData)" type="primary" size="mini">
                修改
              </el-button> 
              <el-button @click.native.prevent="seeVip(scope.$index, tableData)" type="primary" size="mini">
                查看会员
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
      title="合伙人收费配置"
      :visible.sync="addAgentModal"
      :close-on-click-modal = "false"
      width="20%"
      left>
      <div class="vip_main">
        <div class="vip_main_item" style="margin-top:0;">
          <div class="vip_main_item_text">
            合伙人名称
          </div>
          <div class="vip_main_item_input">
            <el-input placeholder="请输入合伙人名称" size="mini" v-model="agent.feeName"></el-input>
          </div>
        </div>
        <div class="vip_main_item" v-if="handleType === 1">
          <div class="vip_main_item_text">
            代理区域
          </div>
          <div class="vip_main_item_input">
            <CityPicker v-on:getCityTo="getCity"></cityPicker>
          </div>
        </div>
        <div v-if="handleType === 2" class="vip_main_item">
          <div class="vip_main_item_text">
            代理区域
          </div>
          <div class="vip_main_item_input">
            <el-input disabled placeholder="城市名称" size="mini" v-model="agent.city"></el-input>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">
            代理费用(元)
          </div>
          <div class="vip_main_item_input">
             <el-input-number v-model="agent.memberFee" :min="0" label="请输入代理费用" size="mini"></el-input-number>
          </div>
        </div>
        <!-- <div class="vip_main_item">
          <div class="vip_main_item_text">
            会员费用抽成(%)
          </div>
          <div class="vip_main_item_input">
             <el-input-number v-model="agent.memberFeePercentage" :min="0" :max="100" label="请输入代理费用" size="mini"></el-input-number>
          </div>
        </div> -->
        <div class="vip_main_item">
          <div class="vip_main_item_text">
            平台抽成(%)
          </div>
          <div class="vip_main_item_input">
             <el-input-number v-model="agent.platformPumping" :min="0" :max="100" @change="platBlur" label="请输入代理费用" size="mini"></el-input-number>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">
            合伙人抽成(%)
          </div>
          <div class="vip_main_item_input">
             <el-input-number v-model="agent.agentPumping" :min="0" :max="100" @change="agentBlur" label="请输入代理费用" size="mini"></el-input-number>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addAgentModal = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import NoData from '@/components/no-data'
import CityPicker from '@/components/cityPicker'
import { agentConfigurationList, vipConfigurationAdd, vipConfigurationUpload, vipConfigurationDelete } from '@/api/revenue'
// import { download } from '@/plugins/download'
export default {
  components: {
    NoData,
    CityPicker
  },
  data() {
    return {
      handleType: 1, //1添加  2修改
      addAgentModal: false,
      agent: {
        feeName: '',
        memberFee: '',
        platformPumping: '',
        agentPumping: '',
        zipCode: '',
        city: '',
        memberFeePercentage: ''
      },
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      agent_time: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    // 平台抽成输入完成
    platBlur() {
      this.agent.agentPumping = 100 - this.agent.platformPumping
    },
    // 合伙人抽成输入完成
    agentBlur() {
      this.agent.platformPumping = 100 - this.agent.agentPumping
    },
    // 查看会员
    seeVip(index, table) {
      this.$emit('seeVip', table[index].zipCode)
    },
    // 删除
    willdelete(index, table) {
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
    // 准备修改
    change(index, table) {
      this.handleType = 2
      this.agent = {
        feeConfigureId: table[index].feeConfigureId,
        feeName: table[index].feeName,
        memberFee: (table[index].memberFee) / 100,
        platformPumping: table[index].platformPumping,
        agentPumping: table[index].agentPumping,
        zipCode: table[index].zipCode,
        city: table[index].city,
        memberFeePercentage: table[index].memberFeePercentage
      }
      this.addAgentModal = true
    },
    // 保存
    save() {
      if (!this.agent.feeName) {
        this.$message.error('请输入合伙人名称')
        return
      }
      if (!this.agent.memberFee && this.agent.memberFee !== 0) {
        this.$message.error('请输入合伙人费')
        return
      }
      if (!this.agent.memberFeePercentage & this.agent.memberFeePercentage !== 0) {
        this.$message.error('请输入会员费用抽成')
        return
      }
      if (!this.agent.zipCode) {
        this.$message.error('未获取到正确的城市编码，请稍后重试')
        return
      }
      const data = {
        type: 1,
        feeName: this.agent.feeName,
        memberFee: this.agent.memberFee * 100,
        platformPumping: this.agent.platformPumping,
        agentPumping: this.agent.agentPumping,
        zipCode: this.agent.zipCode,
        city: this.agent.city,
        memberFeePercentage: this.memberFeePercentage
      }
      if (this.handleType === 2) {
        data.feeConfigureId = this.agent.feeConfigureId
      }
      // 添加
      if (this.handleType === 1) {
        vipConfigurationAdd(data).then(res => {
          if (res.status === 200) {
            console.log('添加合伙人', res)
            this.$message.success('添加成功')
            this.initData()
            this.addAgentModal = false
          }
        })
      }

      // 修改
      if (this.handleType === 2) {
        vipConfigurationUpload(data).then(res => {
          if (res.status === 200) {
            console.log('修改合伙人', res)
            this.$message.success('修改成功')
            this.initData()
            this.addAgentModal = false
          }
        })
      }
     
    },
    // 获得城市名字并获得区号
    getCity(data) {
      const that = this
      console.log('最终得到的城市', data.city)
      console.log('最终得到的省', data.pro)
      this.agent.city = data.city
      const city = data.city
      var xhr = new XMLHttpRequest()
      xhr.open('GET', 'https://restapi.amap.com/v3/config/district?keywords=' + city + '&subdistrict=0&key=d1c69d525cab4e37c7b426aa3a97eda6', true)
      xhr.send()
      xhr.onreadystatechange = function() {
        // 这步为判断服务器是否正确响应
        if (xhr.readyState === 4 && xhr.status === 200) {
          that.agent.zipCode = JSON.parse(xhr.responseText).districts[0].citycode
          console.log(that.agent.zipCode)
          console.log(JSON.parse(xhr.responseText).districts[0])
        } 

      }
    },
    // 点击新建
    willAddAgent() {
      this.handleType = 1
      this.addAgentModal = true
      this.agent = {
        feeName: '',
        memberFee: '',
        platformPumping: '',
        agentPumping: '',
        zipCode: '',
        city: ''
      }
    },
    initData(startTime, endTime) {
      const data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        type: 1,
        startTime: startTime || this.agent_time[0],
        endTime: endTime || this.agent_time[1]
      }
      agentConfigurationList(data).then(res => {
        if (res.status === 200) {
          console.log('合伙人列表', res)
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
  .re_agent{
    .btns_search_box{
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 16px;
      // 导出
      .btns{
        margin-top: 0;
        margin-bottom: 0;
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
        margin-left: 20px;
      }
    }
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

