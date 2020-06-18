<template>
 <div class="management">
    <div class="management_left" >
      <el-tree
        ref="tree"
        :data="treeData"
        node-key="id"
        :props="treeProps"
        :render-content="renderContent"
        :default-expanded-keys="defaultExpand"
        @node-click="handleNodeClick">
        </el-tree>
    </div>
    <div class="management_right">
      <div class="btn">
        <el-button type="primary" @click="addCategory" icon="el-icon-circle-plus-outline">添加子类目</el-button>
        <el-input style=
        "width:250px;
        margin-left:50px;
        margin-right:20px;"
        size="mini" 
        placeholder="请输入子类目名称查询" 
        v-model="search"></el-input>
        <el-button type="primary" size="mini" @click="searchs">查询</el-button>
      </div>
      <div class="tab">
        <!-- tooltip-effect="dark" -->
        <el-table 
        ref="multipleTable" 
        :data="tableData"  
        style="width: 100%" 
        @selection-change="handleSelectionChange" 
        :header-cell-style="{background:'#E4EEF9'}">
          <!-- <el-table-column type="selection" align="center"></el-table-column> -->
          <el-table-column label="子类目名称">
            <template slot-scope="scope" align="center">{{ scope.row.name }}</template>
            </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
              <el-button
                size="mini"
                v-if="scope.row.activation === 0"
                type="primary"
                @click="active(scope.$index, scope.row, 1)">激活</el-button>
              <el-button
                v-if="scope.row.activation === 1"
                size="mini"
                type="danger"
                @click="active(scope.$index, scope.row, 0)">取消激活</el-button>
              <el-button
                size="mini"
                v-if="scope.row.weight === 0"
                type="primary"
                @click="weight(scope.$index, scope.row, 1)">置顶</el-button>
              <el-button
                v-if="scope.row.weight === 1"
                size="mini"
                type="danger"
                @click="weight(scope.$index, scope.row, 0)">取消置顶</el-button>
            </template>
          </el-table-column>
        </el-table>
        <NoData v-if="tableData.length === 0" :noDataPadding="''" :noDataHeight="'83%'"></NoData>
      </div>
      <div class="tab_bottom" v-if="!searchFlag">
        <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button> -->
        <!-- <el-button @click="toggleSelection()">取消选择</el-button> -->
        <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="pageNum"
        @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
      <div class="tab_bottom" v-if="searchFlag">
        <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button> -->
        <!-- <el-button @click="toggleSelection()">取消选择</el-button> -->
        <el-pagination
        background
        layout="prev, pager, next"
        :total="total1"
        @current-change="handleCurrentChange1"
        >
        </el-pagination>
      </div>
      <!-- 编辑修改框 -->
      <el-dialog title="修改单个子类目" :close-on-click-modal = "false" :visible.sync="dialogFormVisible" center>
        <el-form :model="form">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="secondEdit.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeone">取 消</el-button>
          <el-button type="primary" @click="confirmone">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog
        :close-on-click-modal = "false"
        title="添加子类目"
        :visible.sync="task"
        width="30%">
        <!-- <el-input placeholder="请设置子类目名称" style="margin-top:20px;" type="text" v-for="(item,i) of items" v-model="items[i]" :key="i"></el-input> v-model="adds[i]" v-for="(item,i) of adds" :key="i" -->
        <div class="materials" v-for="(item,i) of adds" :key="i">
          <div class="materials_top">
            <el-input placeholder="请输入子类目名称" v-model="willName"></el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="Categorycancels">取 消</el-button>
          <el-button type="primary" @click="Categoryconfirms">确 定</el-button>
        </span>
      </el-dialog>
    </div>
 </div>
</template>

<script>
import '@/assets/css/reset.scss'
import NoData from '@/components/no-data/'
import {
  // postSecondarycategory,
  // postAddtasksubclasses,
  postCategory,
  putcategory,
  delCategory,
  getCategories,
  getSecondsCategories,
  getSecondsCategories2
} from '@/api/getCategories'
export default {
  components: {
    NoData
  },
  data() {
    return {
      searchFlag: false,
      search: '',
      pageNum: 1,
      pageSize: 10,
      willName: '',
      // 页数
      total: 0,
      total1: 0,
      // p判断跳出哪个添加子目录
      more: '',
      scendid: '',
      task: false,
      form: {
        // 类目名称
        name: '',
        id: ''
      },
      // input的数组
      items: [{
        name: '',
        secondaryId: '',
        type: ''
      }],
      adds: [{
        material: '',
        materials: [],
        secondaryId: ''
      }],
      formLabelWidth: '80px',
      // 添加子类目的显示以及隐藏
      dialogVisible1: false,
      // 修改单个子目录的显示以及隐藏
      dialogFormVisible: false,
      defaultExpand: [-1],
      tree_key: 0,
      // 节点内容
      treeData: [{
        id: -1,
        name: '产品类目',
        isEdit: false,
        children: []
      }],
      // table标题
      title: '',
      // table内容
      tableData: [],
      multipleSelection: [],
      nodeclick: '',
      treeProps: {
        label: 'name',
        children: 'children'
      },
      pagnum: 1,
      types: '',
      categoryId: '',
      secondEdit: {

      }
    }
  },
  created() {
    this.init()
  },
  watch: {
    search() {
      if (this.search === '') {
        this.searchFlag = false
      }
    }
  },
  methods: {
    // 激活操作
    active(index, row, type) {
      console.log(row)
      this.$confirm('确认操作？').then(_ => {
        const data = {
          categoryId: row.categoryId,
          activation: type
        }
        putcategory(data).then((res) => {
          if (res.data.code === '200') {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.getSecond()
          } else {
            this.$message.error('操作失败请稍后重试')
          }
        })
      })
    },
    // 置顶操作
    weight(index, row, type) {
      console.log(row)
      this.$confirm('确认操作？').then(_ => {
        const data = {
          categoryId: row.categoryId,
          weight: type
        }
        putcategory(data).then((res) => {
          if (res.data.code === '200') {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.getSecond()
          } else {
            this.$message.error('操作失败请稍后重试')
          }
        })
      })
    },
    // 获得一级类目
    init() {
      getCategories().then((res) => {
        this.treeData[0].children = res.data.data
        this.total = res.data.data.pages * 10
        console.log('yijimulu',res.data.data)
      })
    },
    // 获得二级类目
    getSecond() {
      const data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        categoryId: this.categoryId
      }
      getSecondsCategories(data).then(res => {
        console.log(res)
        this.tableData = res.data.data.records
        this.total = res.data.data.total
      })
    },
    searchs() {
      this.searchFlag = true
      const data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        keyWords: this.search
      }
      getSecondsCategories2(data).then(res => {
        console.log(res)
        this.tableData = res.data.data.records
        this.total1 = res.data.data.total
      })
    },
    // 转parse
    utype(type) {
      return JSON.parse(type)
    },
    // init() {
    //   const dat = {
    //     secondaryId: this.scendid,
    //     pageNum: this.pagnum,
    //     pageSize: 10
    //   }
    //   getCategories(dat).then((res) => {
    //     this.tableData = res.data.data.records
    //     this.total = res.data.data.pages * 10
    //   })
    // },
    // 添加材料
    // 当前选择的节点
    handleNodeClick(data) {
      this.search = ''
      this.pageNum = 1
      if (data.categoryId) {
        this.categoryId = data.categoryId
        this.getSecond()
      }
      if (!data.categoryId) {
        this.categoryId = ''
      }
    },
    // 添加子类目
    addCategory() {
      if (this.categoryId === '') {
        this.$message({
          showClose: true,
          type: 'error',
          message: '请选择一级类目'
        })
        return
      } else {
        this.task = true
      }
    },
    // 添加子类目的input框
    onAdd() {
      this.items.push({ name: '', secondaryId: this.scendid, type: this.more })
    },
    // 添加子类目的附加材料
    onAdd1() {
      this.adds.push({
        type: this.more,
        material: '',
        materials: [],
        secondaryId: this.scendid
      })
    },
    // 添加字类目取消
    Categorycancel() {
      this.dialogVisible1 = false
      // 选取输入的值

      this.items = [{ name: '', secondaryId: this.scendid }]
    },
    // 附加材料
    Categorycancels() {
      this.task = false
      this.willName = ''
    },
    // 添加子类目确认
    Categoryconfirm() {
      if (!this.willName) {
        this.$message.error('您还没有输入类目名')
        return
      }
      if (!this.categoryId) {
        this.$message.error('您还没有选择一级类目')
        return
      }
      const data = {
        parentId: this.categoryId,
        name: this.willName
      }
      postCategory(data).then(res => {
        if (res.data.code === '200') {
          this.$message.success('添加成功')
          this.getSecond()
        } else {
          this.$message.error('添加成功')
        }
      })
    },
    // 附加材料
    Categoryconfirms() {
      if (!this.willName) {
        this.$message.error('您还没有输入类目名')
        return
      }
      if (!this.categoryId) {
        this.$message.error('您还没有选择二级类目')
        return
      }
      const data = {
        parentId: this.categoryId,
        name: this.willName
      }
      postCategory(data).then(res => {
        if (res.data.code === '200') {
          this.$message.success('添加成功')
          this.getSecond()
          this.task = false
          this.willName = ''
        } else {
          this.$message.error('添加成功')
        }
      })
    },
    // 当前的分页
    handleCurrentChange(val) {
      this.pageNum = val
      this.getSecond()
    },
    // 当前的分页
    handleCurrentChange1(val) {
      this.pageNum = val
      console.log(val)
      this.searchs()
    },
  
    // 是否要启用状态
    // swich(index, row) {
    //   const data = {
    //     id: row.id
    //   }
    //   putCategorstatus(data).then((res) => {
    //     this.init()
    //   })
    // },
    // table中的修改
    handleEdit(index, row) {
      this.dialogFormVisible = true
      this.secondEdit = {
        name: row.name,
        id: row.categoryId
      }
    },
    confirmone() {
      const data = {
        name: this.secondEdit.name,
        categoryId: this.secondEdit.id
      }
      putcategory(data).then((res) => {
        if (res.data.code === '200') {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.getSecond()
        } else {
          this.$message.error('操作失败请稍后重试')
        }
      })
      this.dialogFormVisible = false
    },
    closeone() {
      this.dialogFormVisible = false
      this.secondEdit.name = ''
    },
    // table中的删除
    handleDelete(index, row) {
      this.$confirm('确认删除？').then(_ => {
        const data = {
          ids: row.categoryId
        }
        delCategory(data).then((res) => {
          if (res.data.code === '200') {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getSecond()
          } else {
            this.$message.error('操作失败请稍后重试')
          }
        })
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 节点添加
    append(data, event) {
      this.$prompt('', '添加子类目', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\S{1,12}$/,
        inputErrorMessage: '请输入小于12位字符的子类目'
      }).then(({ value }) => {
        const dats = {
          name: value
        }
        postCategory(dats).then((res) => {
          if (res.data.code === '200') {
            this.$message({
              type: 'success',
              message: value + '添加成功'
            })
            this.init()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    // 节点删除
    remove(node, data) {
      console.log(data)
      this.$confirm('此操作将永久删除, 是否继续?', '节点删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data1 = {
          ids: data.categoryId
        }
        delCategory(data1).then((res) => {
          if (res.data.code === '200') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          this.tableData = []
          this.init()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 节点修改
    nodeEdit(ev, store, data) {
      const _data = data
      console.log(data)
      _data.isEdit = true
      this.$prompt('', '节点修改', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\S{1,12}$/,
        inputErrorMessage: '输入小于12的字符',
        inputValue: _data.name
      }).then(({ value }) => {
        const _va = value
        const dta = {
          categoryId: _data.categoryId,
          name: _va
        }
        putcategory(dta).then((res) => {
          if (res.data.code === '200') {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          }
          this.tableData = []
          this.init()
          // this.handleNodeClick(this.treeData[(this.types * -1) - 1])
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        })
      })
    },
    // 激活或者取消激活
    activeP(node, data, type) {
      console.log(data)
      this.$confirm('确认操作？').then(_ => {
        const data1 = {
          categoryId: data.categoryId,
          activation: type
        }
        putcategory(data1).then((res) => {
          if (res.data.code === '200') {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.init()
          } else {
            this.$message.error('操作失败请稍后重试')
          }
        })
      })
    },
    // 
    weightP(node, data, type) {
      console.log(data)
      this.$confirm('确认操作？').then(_ => {
        const data1 = {
          categoryId: data.categoryId,
          weight: type
        }
        putcategory(data1).then((res) => {
          if (res.data.code === '200') {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.init()
          } else {
            this.$message.error('操作失败请稍后重试')
          }
        })
      })
    },
    // 渲染到节点后面的操作
    renderContent(h, { node, data, store }) {
      return (
        <div class='custom-tree-node'>
          <div>{node.label}</div>
          <div>
            {node.label === '产品类目'
              ? <div style=
              'display:flex;justify-content:space-between;' 
              on-click={ () => this.append(data)}>
              <img src='https://static-shanghai.hanku.net.cn/jqy_system/setting/add.png' 
              style='width:15px;height:15px;margin-top:8px;margin-right:2px;' />
              <el-button size='small' type='text'>一级类目</el-button></div>
              : <div>
                <el-button size='mini' type='text' on-click={ () => this.activeP(node, data, 1) }>{data.activation === 0 ? '激活' : ''}</el-button>
                <el-button size='mini' type='text' on-click={ () => this.activeP(node, data, 0)}>{data.activation === 1 ? '取消激活' : ''}</el-button>
                <el-button size='mini' type='text' on-click={ () => this.weightP(node, data, 1) }>{data.weight === 0 ? '置顶' : ''}</el-button>
                <el-button size='mini' type='text' on-click={ () => this.weightP(node, data, 0)}>{data.weight === 1 ? '取消置顶' : ''}</el-button>
                <el-button size='mini' type='text' on-click={ () => this.remove(node, data) }><i class='el-icon-delete'></i></el-button>
                <el-button size='mini' type='text' on-click={ (ev) => this.nodeEdit(ev, store, data)}><i class='el-icon-edit'></i></el-button>
              </div>
            }
          </div>
        </div>)
    }
  }
}
</script>

<style lang="scss" >
 @function px($px){
    $rem: 144;
    @return ($px/ $rem) + rem;
  }
  .management{
      width:px(1200);
      height:px(630);
      background:#fff;
      margin:px(24) 0 0 px(24);
      box-shadow:0px 10px 10px 0px rgba(49,137,245,0.04);
      border-radius:12px;
      display: flex;
      justify-content: space-between;
      .management_left{
          display: flex;
          justify-content: flex-start;
          width:px(350)!important;
          height:100%;
          box-shadow:4px 0px 10px 0px rgba(49,137,245,0.04);
          border-radius:4px 0px 0px 4px;
          overflow: scroll;
          .el-tree{
              background:none;
              input{
                border:none;
              }
          }
          .el-tree-node__content{
              width:px(504);
              height:px(48);
              margin: auto;
              .custom-tree-node{
                  width:px(304);
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  font-size:16px;
                  span>span>i{
                    font-size:14px;
                  }
              }
          }
          .el-tree-node__content:hover{
              background-color: #EFF6FD;
          }
          .el-tree-node:focus>.el-tree-node__content{
              background-color:#EFF6FD;
          }
      }
      .management_right{
          width:px(748);
          height:100%;
          padding: 0px 24px 0 24px;
          .title{
            height:18px;
            display: flex;
            align-items: center;
            .line{
              width:px(2);
              height:18px;
              background:#0097FE;
            }
            span{
              font-size:16px;
              font-weight:500;
              color:rgba(51,57,63,1);
              line-height: 18px;
              padding-left:px(8);
            }
          }
          .btn{
            margin-top: px(32);
          }
          .tab{
            width:100%;
            margin-top:px(24);
            height:px(420);
            overflow: scroll;
            .btt{
              width:px(52);
              display: flex;
              justify-content: space-between;
              align-items: center;
              i{
                color:#0097FE;
              }
            }
          }
          .tab_bottom{
            width:100%;
            height:px(86);
            display: flex;
            justify-content: flex-end;
            align-items: center;
            box-shadow:0px -2px 10px 0px rgba(49,137,245,0.04);
            // margin-left: px(-36);
            position: relative;
            background:#fff;
          }
          .el-dialog__header {
            background:#F1F8FF;
            font-size:18px;
            font-weight:600;
            color:#33393F;
          }
          .el-dialog__body{
            max-height:300px;
            overflow: scroll;
            .btn_add{
              width:100%;
              height:40px;
              margin-top:px(20);
              color:rgba(0,151,254,1);
              background:#fff;
              border:1px solid rgba(0,151,254,1);
              border-radius:4px;
            }
          }
          .el-dialog__footer {
            background:#F1F8FF;
          }
        .materials{
          width:px(336);
          margin: auto;
          .materials_top{
            width:100%;
          }
          .materials_content{
            width:100%;
            margin-top:32px;
            display: flex;
            justify-content: flex-start;
            .el-input{
              width:px(220);
            }
            input{
              width:px(220);
            }
            .el-button{
              width:px(92);
              margin-left:px(24);
              height:px(32);
            }
          }
          .materials_footer{
            width:100%;
            margin-top:16px;
            .el-tag.el-tag--warning{
              margin:px(5) 0 0 px(8)
            }
          }
        }
      }
  }
</style>
