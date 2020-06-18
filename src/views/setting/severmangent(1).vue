<template>
  <div class="sever_mangent">
    <div class="channel_title">
      <div class="line"></div>
      <p>服务商管理</p>
    </div> 
    <div class="tabs">
      <el-tabs v-model="activeName" type="card" @tab-click="tabchange">
        <el-tab-pane label="服务公司信息" name="first">
          <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#E4EEF9'}">
            <el-table-column prop="companyName" label="服务公司名称" align="center"></el-table-column>
            <el-table-column prop="simpleName" label="简称" align="center"></el-table-column>
            <el-table-column prop="cods" label="统一社会信用代码" align="center"></el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center">
              <template slot-scope="scope">
                <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button> -->
                <el-button type="text" icon="el-icon-edit" @click="compiletab(scope.row)">编辑</el-button>
                <el-button type="text" icon="el-icon-delete" @click="deletetab(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <div style="width:100%;height:100%;" v-if="!show">
          <NoData v-if="tableData.length === 0" :noDataPadding="''" :noDataHeight="'83%'"></NoData>
        </div>
        <el-tab-pane label="收款账号信息" name="second">
          <el-table :data="sofftcontent" style="width: 100%" :header-cell-style="{background:'#E4EEF9'}">
            <el-table-column prop="companyName" label="收款公司名称" align="center"></el-table-column>
            <el-table-column label="账户类型" align="center">
              <template slot-scope="scope">
                  {{userType(scope.row.type).text}}
              </template>
            </el-table-column>
            <el-table-column prop="name" label="账户名" align="center"></el-table-column>
            <el-table-column prop="incomeNo" label="收款账号" align="center"></el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center">
              <template slot-scope="scope">
                <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button> -->
                <el-button type="text" icon="el-icon-edit" @click="soffttab(scope.row)">编辑</el-button>
                <el-button type="text" icon="el-icon-delete" @click="sofftdel(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <div style="width:100%;height:100%;" v-if="show">
          <NoData v-if="sofftcontent.length === 0" :noDataPadding="''" :noDataHeight="'83%'"></NoData>
        </div>
      </el-tabs>
      <el-button v-if="show" icon="el-icon-plus" type="primary" class="btn" @click="accountNumber">添加收款账号</el-button>
      <el-button v-if="!show" icon="el-icon-plus" type="primary" class="btn" @click="corporation">新增收款公司信息</el-button>
    </div>
    <!-- 公司 -->
    <div class="bottom" v-if="!show">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="pagechange"
        >
      </el-pagination>
    </div>
    <!-- 服务商 -->
    <div class="bottom" v-if="show">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totals"
        @current-change="pagechanges"
        >
      </el-pagination>
    </div>
    <div class="pub">
      <!-- 修改公司信息 -->
      <el-dialog title="修改服务公司信息" :visible.sync="corporateinformation" :close-on-click-modal = "false">
        <el-form :model="companyfrom" :rules="companyrules" ref="companyfrom">
          <el-form-item label="服务公司名称" prop="companyName">
            <el-input v-model="companyfrom.companyName" placeholder="请输入服务公司名称"></el-input>
          </el-form-item>
          <el-form-item label="公司简称" prop="simpleName">
            <el-input v-model="companyfrom.simpleName" placeholder="请输入公司简称"></el-input>
          </el-form-item>
          <el-form-item label="统一社会信用代码" prop="cods">
            <el-input v-model="companyfrom.cods" placeholder="请输入统一社会信用代码"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" v-if="shows">
          <el-button type="primary" @click="seavecompany('companyfrom')">保 存</el-button>
          <el-button @click="closecompany('companyfrom')">取 消</el-button>
        </div>
        <div slot="footer" class="dialog-footer" v-if="!shows">
          <el-button type="primary" @click="confirmcompany('companyfrom')">确 定</el-button>
          <el-button @click="closecompany('companyfrom')">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 修改账户信息 -->
      <el-dialog title="修改收款账号" :visible.sync="sofftchange" :close-on-click-modal = "false">
        <el-form :model="sofftform" :rules="sofftrules" ref="sofftform">
          <el-form-item label="收款公司名称" prop="companys">
            <el-select v-model="sofftform.companys" placeholder="请选择收款公司名称" @change="getsofftcompany">
              <el-option
                v-for="item in companyoptions"
                :key="item.id"
                :label="item.companyName"
                :value="item.id"
                :props="sofftdefault">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收款公司名称" prop="accounttype">
            <el-select v-model="sofftform.accounttype" placeholder="请选择账户类型" @change="getaccounttype">
              <el-option
                v-for="item in accounttypes"
                :key="item.id"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账户名" prop="accountname">
            <el-input v-model="sofftform.accountname" placeholder="请输入账户名"></el-input>
          </el-form-item>
          <el-form-item label="收款账号" prop="shroffaccount">
            <el-input v-model="sofftform.shroffaccount" placeholder="请输入收款账号"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" v-if="sofftshow">
          <el-button type="primary" @click="savesofft('sofftform')">保 存</el-button>
          <el-button @click="closesofft('sofftform')">取 消</el-button>
        </div>
        <div slot="footer" class="dialog-footer" v-if="!sofftshow">
          <el-button type="primary" @click="confirmsofft('sofftform')">确 定</el-button>
          <el-button @click="closesofft('sofftform')">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import '@/assets/css/reset.scss'
import NoData from '@/components/no-data/'
import { 
  getcompanylist, 
  changecompany, 
  addcompany, 
  delcompany, 
  geypagecompany, 
  getUserpagelist,
  delserveUser,
  updateserveUser,
  addserveuser } from '@/api/setting/severmangent'
export default {
  components: {
    NoData
  },
  data() {
    return {
      total: 100,
      totals: 100,
      sofftshow: false,
      sofftchange: false,
      show: false,
      tableData: [],
      activeName: 'first',
      sofftcontent: [],
      // 公司信息
      corporateinformation: false,
      pageNum: 1,
      pageNums: 1,
      companyfrom: {
        companyName: '',
        simpleName: '',
        cods: '',
        id: ''
      },
      // 公司弹框规则
      companyrules: {
        companyName: [
          { required: true, message: '请输入服务公司名字', trigger: 'blur' }
        ],
        simpleName: [
          { required: true, message: '请输入公司简称', trigger: 'blur' }
        ],
        cods: [
          { required: true, message: '请输入信用代码', trigger: 'blur' }
        ]
      },
      // 收款账户from
      sofftform: {
        companys: '',
        accounttype: '',
        accountname: '',
        shroffaccount: '',
        id: ''
      },
      // 收款账户规则
      sofftrules: {
        companys: [
          { required: true, message: '请选择收款公司名称', trigger: 'change' }
        ],
        accounttype: [
          { required: true, message: '请选择账户类型', trigger: 'change' }
        ],
        accountname: [
          { required: true, message: '请输入账户名', trigger: 'blur' }
        ],
        shroffaccount: [
          { required: true, message: '请输入收款账号', trigger: 'blur' }
        ]
      },
      shows: true,
      companyoptions: [],
      accounttypes: [{
        value: 1,
        label: '银行账户'
      }, {
        value: 2,
        label: '支付宝账户'
      }, {
        value: 3,
        label: '微信账户'
      }, {
        value: 4,
        label: '现金收入'
      }],
      sofftdefault: {
        value: 'id',
        label: 'companyName'
      },
      sofftselect: {
        name: '',
        id: '',
        types: ''
      }
    }
  },
  methods: {
    // 请求公司的table
    initcompany() {
      const data = {
        pageNum: this.pageNum,
        pageSize: 10
      }
      geypagecompany(data).then((res) => {
        this.tableData = res.data.data.records
        this.total = res.data.data.pages * 10
      })
    },
    // 服务账户的table
    initsofft() {
      const data = {
        pageNum: this.pageNums,
        pageSize: 10
      }
      getUserpagelist(data).then((res) => {
        this.sofftcontent = res.data.data.records
        this.totals = res.data.data.pages * 10
      })
    },
    // tabs切换
    tabchange(tab) {
      if (tab.index === '0') {
        this.show = false
      } else {
        this.show = true
        this.initsofft()
      }
    },
    // 公司编辑
    compiletab(row) {
      this.shows = true
      this.corporateinformation = true
      this.companyfrom.companyName = row.companyName
      this.companyfrom.simpleName = row.simpleName
      this.companyfrom.cods = row.cods
      this.companyfrom.id = row.id
    },
    // 编辑公司保存
    seavecompany(companyfrom) {
      this.$refs[companyfrom].validate((valid) => {
        if (valid) {
          const data = {
            cods: this.companyfrom.cods,
            companyName: this.companyfrom.companyName,
            id: this.companyfrom.id,
            simpleName: this.companyfrom.simpleName
          }
          changecompany(data).then((res) => {
            this.initcompany()
          })
          this.corporateinformation = false
        } else {
          return false
        }
      })
    },
    // 公司删除
    deletetab(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          ids: row.id
        }
        delcompany(data).then((res) => {
          this.initcompany()
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })          
      })
    },
    // 新增收款账号
    accountNumber() {
      this.sofftshow = false
      this.sofftchange = true
      this.sofftform.companys = ''
      this.sofftform.accounttype = ''
      this.sofftform.accountname = ''
      this.sofftform.shroffaccount = ''
      const data = {
        pageNum: 1,
        pageSize: 50
      }
      getcompanylist(data).then((res) => {
        this.companyoptions = res.data.data
      })
    },
    // 新增账号确定
    confirmsofft(sofftform) {
      this.$refs[sofftform].validate((valid) => {
        if (valid) {
          const data = {
            companyId: this.sofftselect.id,
            companyName: this.sofftselect.name,
            incomeNo: this.sofftform.shroffaccount,
            name: this.sofftform.accountname,
            type: this.sofftselect.types
          }
          addserveuser(data).then((res) => {
            this.initsofft()
          })
          this.sofftchange = false
        } else {
          return false
        }
      })
    },
    // 新增公司
    corporation() {
      this.companyfrom.companyName = ''
      this.companyfrom.simpleName = ''
      this.companyfrom.cods = ''
      this.companyfrom.id = ''
      this.corporateinformation = true
      this.shows = false
    },
    // 新增公司确定
    confirmcompany(companyfrom) {
      this.$refs[companyfrom].validate((valid) => {
        if (valid) {
          const data = {
            cods: this.companyfrom.cods,
            companyName: this.companyfrom.companyName,
            id: this.companyfrom.id,
            simpleName: this.companyfrom.simpleName
          }
          addcompany(data).then((res) => {
            this.initcompany()
          })
          this.corporateinformation = false
        } else {
          return false
        }
      })
    },
    // 账户编辑
    soffttab(row) {
      
      this.sofftform.companys = row.companyName
      this.sofftform.accounttype = row.type
      this.sofftform.accountname = row.name
      this.sofftform.shroffaccount = row.incomeNo
      this.sofftform.id = row.id
      this.sofftshow = true
      this.sofftchange = true
      const data = {
        pageNum: 1,
        pageSize: 50
      }
      getcompanylist(data).then((res) => {
        this.companyoptions = res.data.data
      })
    },
    // 账户删除
    sofftdel(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          ids: row.id
        }
        delserveUser(data).then((res) => {
          this.initsofft()
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })          
      })
    },
    // 账户保存
    savesofft(sofftform) {
      this.$refs[sofftform].validate((valid) => {
        if (valid) {
          const data = {
            companyId: this.sofftselect.id,
            companyName: this.sofftselect.name,
            id: this.sofftform.id,
            incomeNo: this.sofftform.shroffaccount,
            name: this.sofftform.accountname,
            type: this.sofftselect.types
          }
          updateserveUser(data).then((res) => {
            this.initsofft()
          })
          this.sofftchange = false
        } else {
          return false
        }
      })  
    },
    // 账户取消
    closesofft(sofftform) {
      this.$refs[sofftform].resetFields()
      this.sofftchange = false
    },
    // 分页
    pagechange(val) {
      this.pageNum = val
      const data = {
        pageNum: val,
        pageSize: 10
      }
      geypagecompany(data).then((res) => {
        this.tableData = res.data.data.records
        this.pages = res.data.data.pages * 10
      })
    },
    // 服务商分页
    pagechanges(val) {
      this.pageNums = val
      const data = {
        pageNum: val,
        pageSize: 10
      }
      getUserpagelist(data).then((res) => {
        this.sofftcontent = res.data.data.records
      })
    },
    // 公司取消
    closecompany(companyfrom) {
      this.$refs[companyfrom].resetFields()
      this.corporateinformation = false
    },
    // 公司的对应选择
    getsofftcompany(value) {
      let obj = {}
      obj = this.companyoptions.find((item) => {
        return item.id === value
      })
      this.sofftselect.name = obj.companyName
      this.sofftselect.id = value
    },
    // 支付方式的对应选择
    getaccounttype(value) {
      this.sofftselect.types = value
    },
    // 根据判断显示字段
    userType(type) {
      const obj = {}
      if (type === 1) {
        obj.text = '银行账户'
      } else if (type === 2) {
        obj.text = '支付宝账户'
      } else if (type === 3) {
        obj.text = '微信账户'
      } else {
        obj.text = '现金收入'
      }
      return obj
    }
  },
  created() {
    this.initcompany()
  }
}
</script>

<style lang="scss">
@function px($px){
  $rem: 144;
  @return ($px/ $rem) + rem;
}
.sever_mangent{
  width:px(1200);
  height:px(630);
  background:#fff;
  box-shadow:0px -2px 10px 0px rgba(49,137,245,0.04);
  border-radius:4px;
  margin:px(24) 0 0 px(24);
  padding:px(24) px(24) 0 px(24);
  position: relative;
  .channel_title{
    width:100%;
    height:px(18);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .line{
      width:2px;
      height:18px;
      background:#0097FE;
    }
    p{
      font-size:16px;
      font-weight:500;
      color:rgba(51,57,63,1);
      padding-left:px(8);
    }
  }
  .tabs{
    margin-top:px(32);
    .btn{
      position: absolute;
      top:px(70);
      right:px(24);
    }
    .el-tabs__content{
      width:100%;
      height:px(450);
      overflow: scroll;
    }
  }
  .bottom{
    width:px(1200);
    height:px(86);
    box-shadow:0px -2px 10px 0px rgba(49,137,245,0.04);
    border-radius:0px 0px 4px 4px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-left:px(-24);
    position: relative;
    background:#fff;
  }
  .pub{
    .el-dialog{
      width: px(432);
      .el-dialog__header{
        background:#F1F8FF;
      }
      .el-dialog__footer{
        background:#F1F8FF;
      }
      .el-select{
        width: 100%;
      }
    }
  }
}
</style>
