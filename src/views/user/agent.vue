<template>
  <div class="agent">
    <div class="btns_search_box">
      <div class="btns">
        <el-button type="primary" class="search" @click="willAddAgent">新增合伙人</el-button>
      </div>
      <div class="feedback">
        <el-input v-model="searchInput" placeholder="请输入用户名/手机号码/账号" style="width:400px;"></el-input>
        <el-button type="primary" style="margin-left:20px;" @click="searchUser">查询</el-button>
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
          prop="username"
          align="center"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="mobile"
          align="center"
          label="联系方式">
        </el-table-column>
        <el-table-column
          align="center"
          prop="areaName"
          label="代理城市">
        </el-table-column>
        <el-table-column
          prop="dueTime"
          align="center"
          label="过期时间">
        </el-table-column>
        <el-table-column
          prop="agentFee"
          align="center"
          label="代理费(元)">
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          label="操作">
            <template slot-scope="scope">
            <div style="display:flex;align-items: center;justify-content:center;cursor: pointer;">
              <el-button @click.native.prevent="see(scope.$index, tableData)" type="warning" size="small">
                详情
              </el-button> 
              <el-button @click.native.prevent="agentRemove(scope.$index, tableData)" type="danger" size="small">
                删除
              </el-button> 
            </div>
          </template>
        </el-table-column>
      </el-table>
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
      title="合伙人详情"
      :close-on-click-modal = "false"
      :visible.sync="agentModal"
      width="40%"
      style="height:600px"
      >
      <div class="vip_main">
        <div class="vip_main_item" style="margin-top:0;">
          <div class="vip_main_item_text">
            合伙人名
          </div>
          <div class="vip_main_item_input">
            <el-input :disabled="handleType !== 1" placeholder="请输入用户名" size="mini" v-model="itemDate.username"></el-input>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">
            合伙人账号
          </div>
          <div class="vip_main_item_input">
            <el-input :disabled="handleType !== 1" placeholder="请输入账号" size="mini" v-model="itemDate.account"></el-input>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">
            合伙人账号密码
          </div>
          <div class="vip_main_item_input">
            <el-input type="password" :disabled="handleType === 2" placeholder="请输入密码" size="mini" v-model="pw1"></el-input>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">
            合伙人账号密码确认
          </div>
          <div class="vip_main_item_input">
            <el-input type="password" :disabled="handleType === 2" placeholder="请输入密码" size="mini" v-model="pw2"></el-input>
          </div>
        </div>
        <div class="vip_main_item" v-if="handleType !== 1">
          <div class="vip_main_item_text">
            代理地区
          </div>
          <div class="vip_main_item_input">
            <el-input disabled placeholder="请输入用户名" size="mini" v-model="itemDate.areaName"></el-input>
          </div>
        </div>
        <div class="vip_main_item"  v-if="handleType === 1">
          <div class="vip_main_item_text">
            代理地区
          </div>
          <div class="vip_main_item_input">
            <CityPicker v-on:getCityTo="getCity"></cityPicker>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">
            联系方式
          </div>
          <div class="vip_main_item_input">
            <el-input type="number" :disabled="this.handleType === 2" placeholder="请输入联系方式" size="mini" v-model="itemDate.mobile"></el-input>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">
            到期时间
          </div>
          <div class="vip_main_item_input">
            <el-date-picker
              :disabled="handleType === 2"
              v-model="itemDate.dueTime"
              value-format = 'yyyy-MM-dd HH:mm:ss'
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">
            缴费金额(元)
          </div>
          <div class="vip_main_item_input">
             <el-input-number :disabled="handleType === 2" v-model="itemDate.agentFee" :min="0" label="请输入金额" size="mini"></el-input-number>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">
            合同
          </div>
          <div class="vip_main_item_input">
             <el-upload
              action="https://yongqin-usework.frp.hanku.net.cn/common/upload"
              :headers="headers"
              :disabled="handleType === 2"
              list-type="picture-card"
              :limit="4"
              :file-list="fileList"
              :on-success="upLoadSuccess"
              :on-exceed="exceed"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </div>
      </div> 
      <span slot="footer" class="dialog-footer">
        <el-button @click="agentModal = false">取 消</el-button>
        <el-button v-if="handleType !== 2 " type="primary" @click="save">提 交</el-button>
        <el-button v-if="handleType === 2 " type="primary" @click="()=>{handleType = 3;$message.info('您可以修改合伙人信息了')}">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import NoData from '@/components/no-data'
import { agentList, agentUpdata, agentAdd, agentRemove } from '@/api/user'
import CityPicker from '@/components/cityPicker'
// import { download } from '@/plugins/download'
export default {
  components: {
    NoData,
    CityPicker
  },
  data() {
    return {
      searchInput: '',
      pw1: '',
      pw2: '',
      handleType: 1, //handleType: 1, //1添加 2查看 3修改
      imageList: [],
      fileList: [],
      headers: {
        Authorization: '',
        tokenId: ''
      },
      itemDate: {
        username: '',
        account: '',
        mobile: '',
        dueTime: '',
        agentFee: '',
        areaCode: '',
        areaMergerName: '',
        areaName: '',
        password: '' //新加的密码
      },
      agentModal: false,
      input: '',
      tab_active: '0',
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
      dialogVisible: false,
      dialogImageUrl: '',
      agent_time: []
    }
  },
  watch: {
    agentModal() {
      if (this.agentModal === false) {
        this.fileList = []
      }
    }
  },
  created() {
    this.headers.Authorization = localStorage.getItem('yqToken')
    this.headers.tokenId = localStorage.getItem('tokenId')
    this.initData()
  },
  methods: {
    // 查询
    searchUser() {
      this.initData()
    },
    // 获得城市名字并获得区号
    getCity(data) {
      const that = this
      this.itemDate.areaName = data.city
      this.itemDate.areaMergerName = data.pro + data.city
      const city = data.city
      var xhr = new XMLHttpRequest()
      xhr.open('GET', 'https://restapi.amap.com/v3/config/district?keywords=' + city + '&subdistrict=0&key=d1c69d525cab4e37c7b426aa3a97eda6', true)
      xhr.send()
      xhr.onreadystatechange = function() {
        // 这步为判断服务器是否正确响应
        if (xhr.readyState === 4 && xhr.status === 200) {
          that.itemDate.areaCode = JSON.parse(xhr.responseText).districts[0].citycode
          console.log(JSON.parse(xhr.responseText).districts[0])
        }
      }
    },
    // 新增合伙人
    willAddAgent() {
      this.handleType = 1
      this.agentModal = true
      this.imageList = []
      this.fileList = []
      this.itemDate = {
        account: '',
        username: '',
        mobile: '',
        agentId: '',
        dueTime: '',
        agentFee: '',
        areaCode: '',
        areaMergerName: '',
        areaName: '',
        password: '' //新加的密码
      }
    },
    // 修改完成提交
    save() {
      if (!this.itemDate.username) {
        this.$message.error('请输入合伙人名')
        return
      }
      if (!this.itemDate.mobile) {
        this.$message.error('请输入合伙人手机号')
        return
      }
      if (!this.itemDate.dueTime) {
        this.$message.error('请输入到期时间')
        return
      }
      if (!this.itemDate.agentFee) {
        this.$message.error('请输入合伙人费用')
        return
      }
      if (!this.itemDate.account) {
        this.$message.error('请输入合伙人账号')
        return
      }
      if (!this.pw1) {
        this.$message.error('请输入合伙人账号密码')
        return
      }
      if (this.pw1 !== this.pw2) {
        this.$message.error('两次密码不一致')
        return
      }
      this.$confirm('此操作将修改合伙人信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          account: this.itemDate.account,
          username: this.itemDate.username,
          acount: this.itemDate.acount,
          password: this.pw1,
          agentId: this.itemDate.agentId,
          mobile: this.itemDate.mobile,
          dueTime: this.itemDate.dueTime,
          agentFee: this.itemDate.agentFee * 100,
          contractImg: JSON.stringify(this.imageList)
        }
        if (this.handleType === 3) {
          agentUpdata(data).then(res => {
            if (res.status === 200) {
              this.$message.success('操作成功')
              this.agentModal = false
              this.initData()
            }
          })
        } else if (this.handleType === 1) {
          data.areaCode = this.itemDate.areaCode
          data.areaMergerName = this.itemDate.areaMergerName
          data.areaName = this.itemDate.areaName
          agentAdd(data).then(res => {
            console.log(res)
            if (res.status === 200) {
              this.$message.success('操作成功')
              this.agentModal = false
              this.initData()
            }
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })        
      })
    },
    // 获取列表
    initData() {
      const data = {
        keyWords: this.searchInput,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }
      agentList(data).then(res => {
        if (res.status === 200) {
          res.data.data.records.forEach((elms) => { //修改数据除100
            elms.agentFee = (elms.agentFee / 100).toFixed(2)
          })
          this.tableData = res.data.data.records
          console.log('shuju',this.tableData)
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
    },
    // 文件上传成功
    upLoadSuccess(file, fileList) {
      console.log('file', file, 'fileList', fileList)
      var a = this.imageList
      a.push(file.data)
      this.imageList = a
      console.log('上传完成', file.data, this.imageList)
    },
    // 文件超出
    exceed(file, fileList) {
      console.log('file', file, 'fileList', fileList)
      this.$message.error('最多上传4张图片')
    },
    // 文件删除
    handleRemove(file, fileList) {
      console.log('file', file, 'fileList', fileList)
      var imgList = []
      fileList.map(item => {
        imgList.push(item.response.data) 
      })
      this.imageList = imgList
    },
    // 导出
    // exportList() {
    //   const data = {
    //     type: this.tab_active
    //   }
    //   exportList(data).then(res => {
    //     download(res.data.data.url, res.data.data.fileName)
    //   })
    // },
    // 查看详情
    see(index, table) {
      this.fileList = []
      this.handleType = 2
      this.itemDate = table[index]
      this.imageList = JSON.parse(table[index].contractImg)
      var imgList = [] 
      JSON.parse(table[index].contractImg).map(item => {
        imgList.push({
          url: item
        })
      })
      this.fileList = imgList
      this.agentModal = true
    },
    // 代理商删除
    agentRemove(index, table) {
      this.$confirm('此操作将删除合伙人信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          ids: String(table[index].agentId)
        }
        agentRemove(data).then(res => {
          if (res.status === 200) {
            this.$message.success('操作成功')
            this.initData()
          } else {
            this.$message.error('操作失败')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })        
      })
    }
  }
}
</script>
<style lang="scss">
.agent{
  .el-dialog__body{
    height: 700px;
  }
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
      margin-top: 10px;
      margin-left: 220px;
    }
  }
}
</style>
