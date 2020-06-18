<template>
    <div class="channel">
        <div class="channel_title">
            <div class="line"></div>
            <p>渠道设置</p>
        </div>
        <div class="channel_btn">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addChannel">新增渠道商</el-button>
            <div class="btn_right">
                <el-input placeholder="搜索" v-model="serch" suffix-icon="el-icon-search"></el-input> <el-button type="primary" @click="inquire">查询</el-button>
            </div>
        </div>
        <div class="channel_tab">
            <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#E4EEF9'}">
            <!-- <el-table-column prop="category" label="渠道商类别" align="center"></el-table-column> -->
            <el-table-column prop="principal" label="渠道商名称" align="center"></el-table-column>
            <el-table-column prop="contactPerson" label="联系人" align="center"></el-table-column>
            <el-table-column prop="moblie" label="联系方式" align="center"></el-table-column>
            <el-table-column prop="name" label="渠道负责人" align="center"></el-table-column>
            <el-table-column label="产品状态" align="center">
              <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
                @change="swich(scope.$index, scope.row)"
                >
              </el-switch>
            </template>
            </el-table-column>
            <!-- <el-table-column prop="visualrange" label="可见范围" align="center"></el-table-column> -->
            <el-table-column prop="createPerson" label="创建人" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <span @click="handleEdit(scope.$index, scope.row)" style="color:#0097FE;cursor:pointer;"><i class="el-icon-search"></i></span>
                </template>
            </el-table-column>
            </el-table>
            <NoData v-if="tableData.length === 0" :noDataPadding="''" :noDataHeight="'83%'"></NoData>
        </div>
        <div class="channel_bottom">
            <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
            >
            </el-pagination>
        </div>
        <el-drawer
        :title="names"
        :visible.sync="newly">
        <div class="drawe_pad">
          <div class="select">
            <!-- <div class="select-content1">
              <p>产品类目</p>
              <el-select v-model="newlyVal" placeholder="请选择产品类目">
                <el-option
                  v-for="item in productCategorys"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div> -->
            <div class="select-content1">
              <p style="width:110px">渠道商名称</p>
              <!-- <el-select v-model="productName" placeholder="请选择产品名称" :disabled='disableds'>
                <el-option
                  v-for="item in productNames"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option> -->
                <el-input placeholder="请输入渠道商名称" v-model="principal" :disabled="disableds"></el-input>
              <!-- </el-select> -->
            </div>
            <div class="select-content1">
              <p style="width:110px;">联系人</p>
              <el-input placeholder="请输入联系人" v-model="contactPerson" :disabled="disableds"></el-input>
            </div>
          </div>
          <!-- <div class="select">
            <div class="select-content1">
              <p>渠道名称</p>
              <el-input placeholder="请输入渠道商类别"></el-input>
            </div>
            <div class="select-content1">
              <p>联系人</p>
                <el-input placeholder="请输入渠道商类别"></el-input>
            </div>
          </div> -->
          <div class="select">
            <div class="select-content1">
              <p>手机号</p>
              <el-input placeholder="请输入手机号" v-model="moblie" :disabled="disableds"></el-input>
            </div>
            <div class="select-content1">
              <p>邮箱</p>
                <el-input placeholder="请输入邮箱" v-model="email" :disabled="disableds"></el-input>
            </div>
          </div>
          <div class="select">
            <div class="select-content1">
              <p>渠道负责人</p>
              <el-input placeholder="请输入渠道负责人" v-model="name" :disabled="disableds"></el-input>
            </div>
            <div class="select-content1">
              <p>可见范围</p>
              <el-select v-model="productName" placeholder="请选择产品名称" @change="product" :disabled="disableds">
                <el-option
                  v-for="item in productNames"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="productOverview1">
            <p>备注说明</p>
            <textarea class="inpt" placeholder="请输入备注说明" v-model="remark" :disabled="disableds"></textarea>
          </div>
          <div class="newlybottom" v-if="dis">
            <el-button style="margin-left:48px;" @click="savesub">提交</el-button>
            <el-button @click="closecancel">取消</el-button>
          </div>
          <div class="newlybottom" v-if="!dis">
            <el-button style="margin-left:48px;" type="primary" @click="amend" v-if="!save">修改内容</el-button>
            <el-button style="margin-left:48px;" @click="submit" v-if="save">保存</el-button>
            <el-button @click="closesave" v-if="save">取消</el-button>
          </div>
        </div>
      </el-drawer>
    </div>
</template>
 
<script>
import '@/assets/css/reset.scss'
import NoData from '@/components/no-data/'
import { getChannellist, changechannelstatus, addChanel, changechannel } from '@/api/setting/channel'
export default {
  components: {
    NoData
  },
  data() {
    return {
      total: 0,
      save: false,
      dis: true,
      disableds: true,
      // 产品类目
      newlyVal: '',
      // 搜索
      serch: '',
      tableData: [],
      productName: '',
      productNames: [{
        value: '0',
        label: '公开'
      }, {
        value: '1',
        label: '私有'
      }],
      names: '',
      //显示隐藏
      newly: false,
      //备注说明
      remark: '',
      // 当前页数
      pageNum: 1,
      // 渠道名称
      principal: '',
      // 联系人
      contactPerson: '',
      // 手机号
      moblie: '',
      // 邮箱
      email: '',
      // 负责人
      name: '',
      // 公开or私有
      range: '',
      // 当前选择的id
      ceid: ''
    }
  },
  methods: {
    // 查询
    inquire() {
      const data = {
        name: this.serch,
        pageNum: this.pageNum,
        pageSize: 10
      }
      getChannellist(data).then((res) => {
        this.tableData = res.data.data.records
      })
    },
    // 可见范围选中的值
    product(value) {
      this.range = value
    },
    // 获取table列表
    init() {
      const data = {
        name: '',
        pageNum: this.pageNum,
        pageSize: 10
      }
      getChannellist(data).then((res) => {
        this.tableData = res.data.data.records
        this.total = res.data.data.pages * 10
      })
    },
    // 是否要启用状态
    swich(index, row) {
      const data = {
        id: row.id
      }
      changechannelstatus(data).then((res) => {
      })
    },
    closecancel() {
      this.newly = false
    },
    savesub() {
      if (this.moblie === '' || !(/^[1][3,4,5,7,8][0-9]{9}$/).test(this.moblie)) {
        this.$message({
          showClose: true,
          message: '请输入正确手机号',
          type: 'error'
        })
        return false
      } else if (this.email === '' || !(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/).test(this.email)) {
        this.$message({
          showClose: true,
          message: '请输入正确邮箱',
          type: 'error'
        })
        return false
      } else {
        this.newly = false
        const data = {
          contactPerson: this.contactPerson,
          email: this.email,
          moblie: this.moblie,
          name: this.principal,
          principal: this.name,
          remark: this.remark,
          visibleRange: this.range
        }
        addChanel(data).then((res) => {
          this.init()
        })
      }
    }, 
    // 当前分页
    handleCurrentChange(val) {
      this.pageNum = val
    },
    //   增加
    addChannel() {
      this.newly = true
      this.dis = true
      this.disableds = false
      this.names = '新增渠道商'
    },
    // 详情
    handleEdit(index, row) {
      this.newly = true
      this.dis = false
      this.disableds = true
      this.names = '渠道商详情'
      this.principal = row.principal
      this.contactPerson = row.contactPerson
      this.moblie = row.moblie
      this.name = row.name
      this.email = row.email
      this.remark = row.remark
      this.productName = (row.visibleRange).toString()
      this.ceid = row.id
    },
    // 修改内容
    amend() {
      this.save = true
      this.disableds = false
      this.dis = false
    },
    // 修改的保存
    submit() {
      if (this.moblie === '' || !(/^[1][3,4,5,7,8][0-9]{9}$/).test(this.moblie)) {
        this.$message({
          showClose: true,
          message: '请输入正确手机号',
          type: 'error'
        })
        return false
      } else if (this.email === '' || !(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/).test(this.email)) {
        this.$message({
          showClose: true,
          message: '请输入正确邮箱',
          type: 'error'
        })
        return false
      } else {
        this.newly = false
        this.dis = true
        this.save = false
        const data = {
          contactPerson: this.contactPerson,
          email: this.email,
          id: this.ceid,
          moblie: this.moblie,
          name: this.principal,
          principal: this.name,
          remark: this.remark,
          visibleRange: this.range
        }
        changechannel(data).then((res) => {
          this.init()
        })
      }
    },
    // 修改的取消
    closesave() {
      this.save = false
      this.dis = true
      this.newly = false
    }
  },
  created() {
    this.init()
  }
}
</script>
 
<style lang="scss">
@function px($px){
    $rem: 144;
    @return ($px/ $rem) + rem;
}
.channel{
    width:px(1200);
    height:px(630);
    background:#fff;
    box-shadow:0px -2px 10px 0px rgba(49,137,245,0.04);
    border-radius:4px;
    margin:px(24) 0 0 px(24);
    padding:px(24) px(24) 0 px(24);
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
    .channel_btn{
        width:100%;
        height:px(38);
        display: flex;
        justify-content: space-between;
        margin-top:px(32);
        align-items: center;
        .btn_right{
            width:px(350);
            height:px(38);
            display:flex;
            justify-content: space-between;
            align-items: center;
            input{
                width:px(240);
                background:#E4EBF1;
                border-radius:4px;
                border:1px solid rgba(228,235,241,1);
            }
            .el-input{
                width:px(240);
                border-radius:4px;
            }
        }
    }
    .channel_tab{
        width:100%;
        height:px(410);
        overflow: scroll;
        margin-top:24px; 
        span{
          color:#0097FE;
          padding: 0 10px;
          cursor: pointer;
        }
    }
    .channel_bottom{
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
    .select-content input{
      background:none;
    }
}
  .el-drawer{
    width: px(960)!important;
    .el-drawer__header{
      width:px(960)!important;
      height:56px;
      background:rgba(241,248,255,1);
      border-radius:4px 0px 0px 0px;
      padding-bottom: 20px;
      padding-left: 24px !important;
      span{
        font-size:18px;
        font-weight:600;
        color:rgba(51,57,63,1);
      }
      i::after{
        content: 'X 关闭';
        color: #fff;
        font-size:14px;
        line-height:56px;
        width:92px;
        height:56px;
        background:rgba(117,144,162,1);
        position: absolute;
        right: 0;
        top: 0px;
      }
    }
  }

  .drawe_pad{
    padding-left: 40px;
    .select{
      width:px(752);
      height:38px;
      display: flex;
      justify-content: space-between;
      margin-bottom:px(32);
      margin-top: px(16);
      .select-content1{
        width:px(350);
        height:38px;
        display: flex;
        justify-content: flex-start;
        p{
            width: px(110);
            font-size:14px;
            font-weight:500;
            color:rgba(51,57,63,1);
            line-height:38px;
            text-align: right;
        }
        input{
            width:px(264);
            height:38px;
            border-radius:3px;
            border:1px solid rgba(197,205,213,1);
            margin-left:24px;
        }
        .el-input__inner{
            width:px(264);
            height:38px;
        }
        .el-input{
            width:px(264);
            height:38px;
        }
    }
    }
    .productpice{
      width:px(538);
      height:38px;
      margin-top:32px;
      display: flex;
      justify-content: flex-start;
      p{
        font-size:14px;
        font-weight:500;
        color:rgba(51,57,63,1);
        line-height:38px;
      }
      .p1{
        margin-left:12px;
      }
      input{
        width:192px;
        height:38px;
        border-radius:4px;
        border:1px solid rgba(197,205,213,1);
        margin-left: 12px;
      }
      .el-input{
        width:192px;
        height:38px;
      }
    }
    .radio{
      width:px(180);
      height:18px;
      margin-top:42px;
      display: flex;
      justify-content: flex-start;
      p{
        font-size:14px;
        font-weight:500;
        color:rgba(51,57,63,1);
        line-height:18px;
      }
    }
    .productOverview1{
      width:px(752);
      height:136px;
      margin-top:42px;
      display: flex;
      justify-content: flex-start;
      margin-top:px(20);
      p{
      width:px(80);
      font-size:14px;
      font-weight:500;
      color:rgba(51,57,63,1);
      line-height:38px;
      text-align: right;
      }
      .inpt{
      width:px(672);
      height:136px;
      border-radius:4px;
      border:1px solid rgba(197,205,213,1);
      margin-left:24px;
      padding:8px 0 0 16px;
      }
    }
    .newlybottom{
      width:px(960);
      height:88px;
      background:#F1F8FF;
      position:absolute;
      left:0;
      bottom: 0;
      padding:24px 0;
      .el-button:hover, .el-button:focus{
        color:#fff;
        background:#409EFF;
      }
      .el-button{
        width:100px;
        height:40px;
      }
    }
  }

 
</style>