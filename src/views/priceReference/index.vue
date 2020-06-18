<template>
  <div class="pricereference">
    <!-- 商机概况 -->
    <!-- 商机列表 -->
    <div class="business_content">
      <div>
        <div class="content_tit">
          <div class="business_top">
            <div class="tit_left">
              <div class="tit_lable"></div>
              <span>价格参考管理</span>
            </div>
          </div>
        </div>
        <!-- 任务查找 -->
        <div class="price_find">
          <el-button type="primary" @click="adds">增加</el-button>
        </div>  
        <div class="table_tabs">
          <div class="tabs_position">
            <div :class="['tab', 'tab1', tab_active === '0' ? 'active_tab' : '']" @click="tab_active = '0'">所有价格参考</div>
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
            format="yyyy-MM-dd"
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
              prop="name"
              align="center"
              label="名称">
            </el-table-column>
            <el-table-column
              prop="created"
              align="center"
              width="180"
              label="时间">
            </el-table-column>
            <el-table-column
              prop="detail"
              width="500"
              align="center"
              label="详情">
            </el-table-column>
            <el-table-column
              prop="prompt"
              align="center"
              label="提示">
            </el-table-column>
            <el-table-column
              prop="price"
              align="center"
              label="最低参考价">
            </el-table-column> 
            <el-table-column
              prop="servicePhone"
              align="center"
              label="服务商联系方式">
            </el-table-column>
            <el-table-column
              prop="serviceProvider"
              align="center"
              label="服务商">
            </el-table-column>
            <el-table-column
              fixed="right"
              width="150"
              align="center"
              label="操作">
                <template slot-scope="scope">
                <div style="display:flex;align-items: center;justify-content:center;cursor: pointer;">
                  <el-button @click.native.prevent="willDelete(scope.$index, scope.row)" type="danger" size="small">
                    删除
                  </el-button>
                   <el-button @click.native.prevent="change(scope.$index, tableData)" type="primary" size="small">
                    修改
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
    <!-- 弹出框 -->
    <el-dialog title="新增数据" :visible.sync="dialogFormVisible" :close-on-click-modal = "false">
      <el-form :model="form">
        <!-- 名称 -->
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width:400px;"></el-input>
        </el-form-item>
        <!-- 提示 -->
        <el-form-item label="提示" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="form.prompt" style="width:400px;"></el-input>
        </el-form-item>
        <!-- 最低参考价 -->
        <el-form-item label="最低参考价(元)" :label-width="formLabelWidth">
          <el-input-number type="number" :min="0" autocomplete="off" v-model="form.price" style="width:400px;"></el-input-number>
        </el-form-item>
        <!-- 服务商联系方式 -->
        <el-form-item label="服务商联系方式" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="form.servicePhone" style="width:400px;"></el-input>
        </el-form-item>
        <!-- 服务商 -->
        <el-form-item label="服务商" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="form.serviceProvider" style="width:400px;"></el-input>
        </el-form-item>
        <!-- 来源 -->
        <el-form-item label="来源" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="form.source" style="width:400px;"></el-input>
        </el-form-item>
        <!-- 详情 -->
        <el-form-item label="详情" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.detail" style="width:400px;" :rows="7"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import NoData from '@/components/no-data'
// import { download } from '@/plugins/download'
import { priceList, pricedel, priceadd, priceupdate } from '@/api/priceReference'
export default {
  components: {
    NoData
  },  
  data() {
    return {
      handleType: 1, //1添加  2修改
      orderManage_time: ['', ''],
      tab_active: '0',
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      find: '',
      dialogFormVisible: false,
      form: {
        name: '',
        created: '',
        detail: '',
        prompt: '价格仅供参考，以实际为准。',
        price: '',
        servicePhone: '',
        source: '',
        serviceProvider: ''
      },
      formLabelWidth: '120px'
    }
  },
  watch: {
    tab_active: {
      handler(val) {
        this.initData()
      }
    },
    orderManage_time() {
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
    const fiveAgoToday = fiveAgo.getFullYear() + '-' + fivemonth + '-' + fiveday //5天前的日期
    // 获取任务列表
    this.orderManage_time = [fiveAgoToday, today]
    this.initData()
  },
  methods: {
    // 删除任务
    willDelete(index, row) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          ids: row.proposedPriceId
        }
        pricedel(data).then((res) => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.initData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })        
      })
    },
    adds() {
      this.dialogFormVisible = true 
      this.handleType = 1
      this.form = {
        name: '',
        created: '',
        detail: '',
        prompt: '价格仅供参考，以实际为准。',
        price: '',
        servicePhone: '',
        serviceProvider: ''
      }
    },
    // 增加任务
    add() {
      if (!this.form.name) {
        this.$message.error('您还没有输入名称')
        return
      }
      if (!this.form.detail) {
        this.$message.error('您还没有输入详情')
        return
      }
      if (!this.form.price) {
        this.$message.error('您还没有输入价格')
        return
      }
      if (!this.form.source) {
        this.$message.error('您还没有输入来源')
        return
      }
      const data = {
        name: this.form.name,
        detail: this.form.detail,
        prompt: this.form.prompt,
        price: this.form.price * 100,
        servicePhone: this.form.servicePhone,
        source: this.form.source,
        serviceProvider: this.form.serviceProvider
      }
      if (this.handleType === 1) {
        priceadd(data).then((res) => {
          console.log(res)
          if (res.status === 200) {
            this.dialogFormVisible = false
            this.initData()
            this.form.name = ''
            this.form.created = ''
            this.form.detail = ''
            this.form.prompt = ''
            this.form.price = ''
            this.form.servicePhone = ''
            this.form.serviceProvider = ''
            this.form.source = ''
          }
        })
      } else if (this.handleType === 2) {
        data.proposedPriceId = this.form.proposedPriceId
        priceupdate(data).then(res => {
          if (res.status === 200) {
            this.$message.success('修改成功')
            this.dialogFormVisible = false
            this.initData()
            this.form = {
              name: '',
              created: '',
              detail: '',
              prompt: '',
              price: '',
              servicePhone: '',
              serviceProvider: '',
              source: ''
            }
          } else {
            this.$message.error('修改失败')
          }
        })
      }
      
    },
    // 修改任务
    change(index, table) {
      this.form = table[index]
      this.dialogFormVisible = true
      this.handleType = 2
    },
    // 查找任务
    search() {

    },
    initData() {
      const data = {
        orderDesc: 'created',
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        startTime: this.orderManage_time[0],
        endTime: this.orderManage_time[1]
      }
      priceList(data).then((res) => {
        if (res.status === 200) {
          this.tableData = res.data.data.records
          this.total = res.data.data.total
          this.tableData.forEach(element => {
            element.price = (element.price / 100).toFixed(2)
          })
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

<style lang="scss">
@function px($px){
  $rem: 144;
  @return ($px/ $rem) + rem;
}
.pricereference{
  .feedback{
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .placeChoice{
    width: 300px;
    z-index: 500;
    position: absolute;
    padding: 15px;
    border: 1px solid #999;
    border-radius: 8px;
    background: #fff;
    li{
      margin-bottom: 10px;
      cursor: pointer;
    }
  }
  input{
    min-width: 100px;
    background-color:#fff!important;
    color:#333!important;
  }
  textarea{
    background-color:#fff!important;
    color:#333!important;
  }
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
    // find
    .price_find{
      display: flex;
      justify-content: flex-start;
      margin-top: 10px;
      width:px(600);
      .el-input{
        width: px(300);
        margin-right: px(30);
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
    margin-top: 30px;
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
  .el-dialog__body{
    display: flex;
    justify-content: center;
  }
}
</style>

