<template>
 <div class="servingProduct">
    <div class="sever_title">
        <div class="line"></div>
        <p>服务产品</p>
    </div>
    <div class="product">
        <div class="product_left">
            <div class="left_content">
                <p>产品类目：</p>
                <el-input placeholder="请输入产品类目" v-model="productcategory"></el-input>
            </div>
            <div class="left_content">
                <p>产品名称：</p>
                <el-input placeholder="请输入产品名称" v-model="productname"></el-input>
            </div>
            <div class="left_content">
                <p>产品状态：</p>
                <el-input placeholder="请输入产品状态" v-model="productstatus"></el-input>
            </div>
        </div>
        <div class="product_right">
            <el-button type="primary" plain style="width:80px;height:32px;line-height:8px;" @click="slect">查询</el-button>
            <el-button type="primary" plain style="width:80px;height:32px;line-height:8px;" @click="rest">重置</el-button>
        </div>
    </div>
    <div class="addcategory">
        <el-button type="primary" @click="addCategory" icon="el-icon-circle-plus-outline">新增产品</el-button>
    </div>  
    <div class="tab">
        <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#E4EEF9'}">
            <el-table-column prop="categoryName" label="产品类目" align="center"></el-table-column>
            <el-table-column prop="name" label="产品名称" align="center"></el-table-column>
            <el-table-column label="产品状态" align="center">
              <template slot-scope="scope">
              <el-switch
                v-model="scope.row.shelves"
                :active-value="1"
                :inactive-value="0"
                @change="swich(scope.$index, scope.row)"
                >
              </el-switch>
            </template>
            </el-table-column>
            <el-table-column label="产品价格￥" align="center">
              <template slot-scope="scope">
                {{ ((scope.row.price) / 100).toFixed(2) }}
              </template>
            </el-table-column>
            <el-table-column label="产品计价单位" align="center">
              <template slot-scope="scope">
                {{ scope.row.type === 1 ? '次' : '年' }}
              </template>
            </el-table-column>
            <el-table-column prop="created" label="创建日期" align="center"></el-table-column>
            <el-table-column prop="overview" label="产品概况" align="center" :show-overflow-tooltip="true"></el-table-column>e
            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <span @click="handleEdit(scope.$index, scope.row)">详情</span>
                    <span @click="handleDelete(scope.$index, scope.row)">删除</span>
                </template>
            </el-table-column>
        </el-table>
        <NoData v-if="tableData.length === 0" :noDataPadding="''" :noDataHeight="'83%'"></NoData> 
    </div>
    <div class="server_bottom">
        <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
        >
        </el-pagination>
    </div>
    <div class="pop-up">
      <!-- 新增产品 -->
      <el-drawer
        :title="names"
        :visible.sync="newly"
        :before-close="setclose">
        <div class="serving_top">
          <div class="select">
            <div class="select-content" style="margin-right:64px;">
              <p>产品类目</p>
              <el-select v-model="newlyVal" placeholder="请选择产品类目" :disabled='disableds' :props="defaults" @change="categorychange" ref="cate">
                <el-option
                  v-for="item in productCategorys"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="select-content">
              <p>产品名称</p>
              <el-select v-model="productName" placeholder="请选择产品名称" :disabled='disableds' :props="defaults" @change="changename" ref="ntem">
                <el-option
                  v-for="item in productNames"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="productpice">
            <p>产品价格</p> 
            <el-input v-model="lowPice" style="margin-left:12px;" placeholder="请输入产品价格" :disabled='disableds'></el-input> 
            <p style="margin-left:24px;">(元)</p>
          </div>
          <div class="radio">
            <p>是否上架</p>
            <el-radio-group v-model="radio">
              <el-radio :label="1" style="margin-left:24px;margin-top:2px;" :disabled='disableds'>是</el-radio>
              <el-radio :label="0" style="margin-left:-10px;margin-top:2px;" :disabled='disableds'>否</el-radio>
            </el-radio-group>
          </div>
          <div class="productOverview">
            <p>产品概述</p>
            <textarea class="inpt" placeholder="请输入产品概述" v-model="productOverview" :disabled='disableds'></textarea>
          </div>
          <div class="newlybottom" v-if="compile">
            <el-button style="margin-left:48px;" @click="savesub">提交</el-button>
            <el-button @click="closecancel" >取消</el-button>
          </div>
          <div class="newlybottom" v-if="!compile">
            <el-button type="primary" style="margin-left:48px;" v-if="!content" @click="comcontent">编辑内容</el-button>
            <el-button style="margin-left:48px;" @click="save" v-if="content">保存</el-button>
            <el-button @click="closecancel" v-if="content">取消</el-button>
          </div>
        </div>
      </el-drawer>
    </div>
 </div>
</template>
 
<script>
import '@/assets/css/reset.scss'
import NoData from '@/components/no-data/'
import { getSecondarycategory } from '@/api/setting/management'
import { getproductlist, getproductdetial, addproduct, delproduct, putproductupdate, putstatus, getcategory } from '@/api/setting/servingProduct'
export default {
  components: {
    NoData
  },
  data() {
    return {
      // 总条数
      total: 0,
      content: false,
      compile: true,
      disableds: false,
      names: '',
      productOverview: '',
      radio: 1,
      // 产品类目
      productcategory: '',
      // 产品名称
      productname: '',
      // 产品状态
      productstatus: '',
      // 子类目数组
      items: [''],
      // 显示隐藏   
      dialogVisible1: false,
      dialogFormVisible: false,
      form: {
        // 类目名称
        name: '',
        // 创建人
        person: '',
        // 时间
        time: ''
      },
      // 新增产品隐藏显示
      newly: false,
      formLabelWidth: '80px',
      tableData: [],
      newlyVal: '',
      productCategorys: [],
      productName: '',
      productNames: [],
      lowPice: '',
      highPice: '',
      categoryid: '',
      defaults: {
        value: 'id',
        label: 'name'
      },
      pageNum: 1,
      ductcategory: {
        id: '',
        name: ''
      },
      goryname: {
        id: '',
        name: ''
      },
      proid: ''
    }
  },
  methods: {
    init() {
      const data = {
        pageNum: this.pageNum,
        pageSize: 10
      }
      getproductlist(data).then((res) => {
        this.tableData = res.data.data.records
        this.total = res.data.data.pages * 10
      })
    },
    closecancel() {
      this.newly = false
      this.newlyVal = ''
      this.productName = ''
      this.lowPice = ''
      this.radio = ''
      this.productOverview = ''
    },
    savesub() {
      this.newly = false
      const data = {
        categoryId: this.ductcategory.id,
        categoryName: this.ductcategory.name,
        Id: this.goryname.id,
        name: this.goryname.name,
        price: (this.lowPice) * 100,
        shelves: this.radio,
        overview: this.productOverview
      }
      addproduct(data).then((res) => {
        
        this.init()
      })
    },
    save() {
      this.newly = false
      const data = {
        categoryId: this.ductcategory.id,
        categoryName: this.ductcategory.name,
        id: this.proid,
        name: this.goryname.name,
        price: (this.lowPice) * 100,
        shelves: this.radio,
        overview: this.productOverview
      }
      putproductupdate(data).then((res) => {
        
        this.init()
      })
      this.newlyVal = ''
      this.productName = ''
      this.lowPice = ''
      this.radio = ''
      this.productOverview = ''
    },
    //   查询
    slect() {
      if (this.productcategory !== '' || this.productname !== '' || this.productstatus !== '') {
        const data = {
          category: this.productcategory,
          name: this.productname,
          shelves: this.productstatus,
          pageNum: this.pageNum,
          pageSize: 10
        }
        getproductlist(data).then((res) => {
          
          this.tableData = res.data.data.records
        })
      } else {
        this.$message({
          message: '请至少输入一个',
          type: 'warning'
        })
      }
    },
    // c重置
    rest() {
      this.productcategory = ''
      this.productname = ''
      this.productstatus = ''
      this.init()
    },
    // 添加产品
    addCategory() {
      this.newly = true
      this.names = '新增产品'
      this.disableds = false
      const data = {
        type: -1
      }
      getSecondarycategory(data).then((res) => {
        this.productCategorys = res.data.data
      })
    },
    // 产品类目的选择
    categorychange(value) {
      let obj = {}
      obj = this.productCategorys.find((item) => {
        return item.id === value
      })
      this.ductcategory.name = obj.name
      this.ductcategory.id = value
      const data = {
        secondaryId: value
      }
      getcategory(data).then((res) => {
        this.productNames = res.data.data
      })
    },
    // 产品名称的选择
    changename(value) {
      let obj = {}
      obj = this.productNames.find((item) => {
        return item.id === value
      })
      this.goryname.name = obj.name
      this.goryname.id = value
    },
    //关闭框
    setclose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.newly = false
          this.newlyVal = ''
          this.productName = ''
          this.lowPice = ''
          this.radio = ''
          this.productOverview = ''
        })
        .catch(_ => {})
    },
    // 当前的分页
    handleCurrentChange(val) {
      this.pageNum = val
      this.init()
    },
    // table中的修改
    handleEdit(index, row) {
      this.proid = row.id
      this.disableds = true
      this.newly = true 
      this.names = '产品详情'
      this.compile = false
      this.content = false
      const data = {
        type: -1
      }
      getSecondarycategory(data).then((res) => {
        this.productCategorys = res.data.data
      })
      const dat = {
        id: row.id
      }
      // 
      getproductdetial(dat).then((res) => {
        this.newlyVal = res.data.data.categoryName
        this.productName = res.data.data.name
        this.lowPice = ((res.data.data.price) / 100).toFixed(2)
        this.radio = res.data.data.shelves
        this.productOverview = res.data.data.overview
      })
      this.init()
    },
    // table中的删除
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          ids: row.id
        }
        delproduct(data).then((res) => {
          this.init()
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
    // 是否要启用状态
    swich(index, row) {
      const data = {
        id: row.id
      }
      putstatus(data).then(res => {
        if (res.data.data === false) {
          this.$message.error('该产品为系统默认产品，不可修改哦~')
        }
        this.init()
      })
    },
    // 编辑内容
    comcontent() {
      this.content = true
      this.disableds = false
      this.radio = 1
    }
  },
  created() {
    this.init()
  }
}
</script>
 
<style lang="scss" >
 @function px($px){
    $rem: 144;
    @return ($px/ $rem) + rem;
  }
    .servingProduct{
      width:px(1200);
      height:px(630);
      background:#fff;
      box-shadow:0px -2px 10px 0px rgba(49,137,245,0.04);
      border-radius:4px;
      margin:px(24) 0 0 px(24); 
      padding:px(24);
      .sever_title{
        width:100%;
        height:18px;
        display: flex;
        justify-content: flex-start;
        .line{
          width:2px;
          height:18px;
          background:#0097FE;
        }
        p{
          font-size:16px;
          font-weight:500;
          color:rgba(51,57,63,1);
          line-height:18px;
          margin-left:8px;
        }
      }
      .product{
        width:100%;
        height:32px;
        margin-top:32px;
        display: flex;
        justify-content: space-between;
        .product_left{
          height:32px;
          display: flex;
          justify-content: space-between;
          .left_content{
            height:32px;
            display: flex;
            justify-content: flex-start;
            margin-right:px(32);
            p{
              font-size:14px;
              font-weight:400;
              color:rgba(111,124,141,1);
              line-height:32px;
            }
            .el-input{
              width:px(192);
              height:32px;
            }
            .el-input__inner{
              width:px(192);
              height:32px;
              background: #F6F8FB;
            } 
          }
        }
        .product_right{
          width:px(184);
          height:32px;

        }
      }
      .addcategory{
        width:100%;
        height:32px;
        margin-top:24px;
      }
      .tab{
        width:100%;
        height:px(400);
        overflow: scroll;
        margin-top:24px;
        span{
          color:#0097FE;
          padding: 0 10px;
          cursor: pointer;
        }
        .el-table td{
          cursor: pointer;
        }
      }
      .server_bottom{
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
    .serving_top{
      .select{
        height:38px;
        display: flex;
        margin-bottom:px(32);
        margin-top: px(16);
        padding-left:48px;
        .select-content{
          width:px(344);
          height:38px;
          display: flex;
          justify-content: flex-start;
          p{
            font-size:14px;
            font-weight:500;
            color:rgba(51,57,63,1);
            line-height:38px;
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
        padding-left:48px;
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
        // width:px(180);
        height:18px;
        margin-top:42px;
        display: flex;
        justify-content: flex-start;
        padding-left:48px;
        p{
          font-size:14px;
          font-weight:500;
          color:rgba(51,57,63,1);
          line-height:18px;
        }
      }
      .productOverview{
        width:px(752);
        height:136px;
        margin-top:42px;
        display: flex;
        justify-content: flex-start;
        padding-left:48px;
        p{
          width:80px;
          font-size:14px;
          font-weight:500;
          color:rgba(51,57,63,1);
          line-height:38px;
        }
        .inpt{
          width:px(672);
          height:136px;
          border-radius:4px;
          border:1px solid rgba(197,205,213,1);
          margin-left:12px;
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