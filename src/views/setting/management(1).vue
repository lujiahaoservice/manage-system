<template>
 <div class="management">
    <div class="management_left" >
      <el-tree
        ref="tree"
        :key="tree_key"
        :data="treeData"
        node-key="id"
        :props="treeProps"
        :render-content="renderContent"
        :default-expanded-keys="defaultExpand"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick">
        </el-tree>
    </div>
    <div class="management_right">
      <div class="title">
        <div class="line"></div>
        <span>{{title}}</span>
      </div>
      <div class="btn">
      <el-button type="primary" @click="addCategory" icon="el-icon-circle-plus-outline">添加子类目</el-button>
      </div>
      <div class="tab">
        <!-- tooltip-effect="dark" -->
        <el-table ref="multipleTable" :data="tableData"  style="width: 100%" @selection-change="handleSelectionChange" :header-cell-style="{background:'#E4EEF9'}">
          <!-- <el-table-column type="selection" align="center"></el-table-column> -->
          <el-table-column label="子类目名称"><template slot-scope="scope" align="center">{{ scope.row.name }}</template></el-table-column>
          <el-table-column label="启用状态">
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
          <el-table-column prop="userName" label="创建人" align="center"></el-table-column>
          <el-table-column prop="created" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="materials" label="所需材料" align="center" :show-overflow-tooltip="true" v-if="more === -4 ? true : false">
            <template slot-scope="scope">
              <el-tag
                v-for="(tag, i) in utype(scope.row.materials)"
                :key="i"
                size="mini"
                type="">
                {{tag}}
              </el-tag>
            </template>
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
            </template>
          </el-table-column>
        </el-table>
        <NoData v-if="tableData.length === 0" :noDataPadding="''" :noDataHeight="'83%'"></NoData>
      </div>
      <div class="tab_bottom">
        <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button> -->
        <!-- <el-button @click="toggleSelection()">取消选择</el-button> -->
        <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      <!-- 编辑修改框 -->
      <el-dialog title="修改单个子类目" :close-on-click-modal = "false" :visible.sync="dialogFormVisible" center>
        <el-form :model="form">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeone">取 消</el-button>
          <el-button type="primary" @click="confirmone">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加子类目 -->
      <el-dialog
        title="添加子类目"
        :close-on-click-modal = "false"
        :visible.sync="dialogVisible1"
        width="30%"
        center>
        <el-input placeholder="请设置子类目名称" style="margin-top:20px;" type="text" v-for="(item,i) of items" v-model="items[i].name" :key="i"></el-input>
        <el-button class="btn_add" icon="el-icon-plus" @click="onAdd">继续添加</el-button>
        <span slot="footer" class="dialog-footer">
          <el-button @click="Categorycancel">取 消</el-button>
          <el-button type="primary" @click="Categoryconfirm">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 任务环节添加子类目 -->

      <el-dialog
        title="添加子类目"
        :close-on-click-modal = "false"
        :visible.sync="task"
        width="30%">
        <!-- <el-input placeholder="请设置子类目名称" style="margin-top:20px;" type="text" v-for="(item,i) of items" v-model="items[i]" :key="i"></el-input> v-model="adds[i]" v-for="(item,i) of adds" :key="i" -->
        <div class="materials" v-for="(item,i) of adds" :key="i">
          <div class="materials_top">
            <el-input placeholder="请输入子类目名称" v-model="adds[i].name"></el-input>
          </div>
          <div class="materials_content">
          <el-input
            class="input-new-tag"
            v-model='adds[i].material'
            ref="saveTagInput"
            size="small"
            placeholder="请输入所需材料"
          ></el-input>
          <el-button type="primary" @click="handleInputConfirm">添加</el-button>
          </div>
          <div class="materials_footer">
            <el-tag
            :key="j"
            v-for="(tag, j) in adds[i].materials"
            closable
            :disable-transitions="false"
            @close="closematerials(tag)"
            type="warning">
            {{tag}}
            </el-tag>
          </div>
        </div>
        <el-button class="btn_add" icon="el-icon-plus" @click="onAdd1">继续添加</el-button>
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
  postSecondarycategory,
  postAddtasksubclasses,
  postCategories,
  getCategories,
  getSecondarycategory,
  delSecondarycategory,
  delCategories,
  putsecondary,
  putCategorstatus,
  putCategories
} from '@/api/setting/management'
let id = 800
export default {
  components: {
    NoData
  },
  data() {
    return {
      // 页数
      total: 0,
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
      defaultExpand: [],
      tree_key: 0,
      // 节点内容
      treeData: [{
        id: -1,
        name: '产品类目',
        isEdit: false,
        children: []
      },
      {
        id: -2,
        name: '支出类目',
        isEdit: false,
        children: []
      },
      {
        id: -3,
        name: '开票内容类目',
        isEdit: false,
        children: []
      },
      {
        id: -4,
        name: '任务环节类目',
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
      types: ''
    }
  },
  methods: {
    // 转parse
    utype(type) {
      return JSON.parse(type)
    },
    init() {
      const dat = {
        secondaryId: this.scendid,
        pageNum: this.pagnum,
        pageSize: 10
      }
      getCategories(dat).then((res) => {
        this.tableData = res.data.data.records
        this.total = res.data.data.pages * 10
      })
    },
    // 添加材料
    handleInputConfirm() {
      for (let i = 0; i < this.adds.length; i++) {
        if (this.adds[i].material) {
          this.adds[i].materials.push(this.adds[i].material)
        }
        this.adds[i].material = ''
      }
    },
    // 删除材料
    closematerials(tag) {
      for (let i = 0; i < this.adds.length; i++) {
        this.adds[i].materials.splice(this.adds[i].materials.indexOf(tag), 1)
      }
    },
    // 当前选择的节点
    handleNodeClick(data) {
      this.more = data.type
      if (data.id === -1 || data.id === -2 || data.id === -3 || data.id === -4) {
        this.types = data.id
      } else {
        this.scendid = data.id
        this.title = data.name
        const dat = {
          secondaryId: data.id,
          pageNum: this.pagnum,
          pageSize: 10
        }
        getCategories(dat).then((res) => {
          this.tableData = res.data.data.records
          this.total = res.data.data.pages * 10
        })
      }
      const _data = data
      if (this.types === -1 || this.types === -2 || this.types === -3 || this.types === -4) {
        const dta = {
          type: this.types
        }
        getSecondarycategory(dta).then((res) => {
          _data.children = res.data.data
        })
      }
    },
    // 添加子类目
    addCategory() {
      if (this.scendid === '') {
        this.$message({
          showClose: true,
          type: 'error',
          message: '请选择二级类目'
        })
        return
      } else {
        if (this.more === -4) {
          this.task = true
          this.adds[0].type = this.more
          this.adds[0].secondaryId = this.scendid
        } else {
          this.items[0].secondaryId = this.scendid
          this.items[0].type = this.more
          this.dialogVisible1 = true
        }
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
      this.adds = [{ type: '', material: '', materials: [], secondaryId: this.scendid }]
    },
    // 添加子类目确认
    Categoryconfirm() {

      this.dialogVisible1 = false
      const dots = this.items
      postCategories(dots).then((res) => {

        this.init()
      })
      this.items = [{ name: '', secondaryId: this.scendid }]
    },
    // 附加材料
    Categoryconfirms() {
      this.adds.forEach((item) => {
        item.materials = JSON.stringify(item.materials)
        if (item.name) {
          const dots = this.adds
          postAddtasksubclasses(dots).then((res) => {
            this.init()
          })
          this.task = false
        } else {
          this.$message.error('请输入子类目名字')
        }
        this.adds = [{ type: '', material: '', materials: [], secondaryId: this.scendid }]
      })

    },
    // 当前的分页
    handleCurrentChange(val) {

      this.pagnum = val
      this.init()
    },
    // 当前选择节点
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    // 是否要启用状态
    swich(index, row) {
      const data = {
        id: row.id
      }
      putCategorstatus(data).then((res) => {
        this.init()
      })
    },
    // table中的修改
    handleEdit(index, row) {
      this.dialogFormVisible = true
      this.form.name = row.name
      this.form.person = row.userName
      this.form.time = row.created
      this.form.id = row.id

    },
    confirmone() {
      const data = {
        name: this.form.name,
        id: this.form.id
      }
      putCategories(data).then((res) => {

        this.init()
      })
      this.dialogFormVisible = false
    },
    closeone() {
      this.dialogFormVisible = false
    },
    // table中的删除
    handleDelete(index, row) {
      this.$confirm('确认删除？')
        .then(_ => {
          const data = {
            ids: row.id
          }
          delCategories(data).then((res) => {
            this.init()
          })
        })
        .catch(_ => {})

    },
    // 取消选择
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach(row => {
    //       this.$refs.multipleTable.toggleRowSelection(row)
    //     })
    //   } else {
    //     this.$refs.multipleTable.clearSelection()
    //   }
    // },
    // 是否全部选择
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 节点添加
    append(data, event) {
      event.stopPropagation()
      const _data = data
      this.$prompt('', '添加子类目', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\S{1,12}$/,
        inputErrorMessage: '请输入小于12位字符的子类目'
      }).then(({ value }) => {
        const newChild = { id: id++, name: value, isEdit: false, children: [] }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        // data.children.push(newChild)
        const dats = {
          name: newChild.name,
          type: data.id
        }
        postSecondarycategory(dats).then((res) => {
          if (res.data.code === '200') {
            this.$message({
              type: 'success',
              message: value + '添加成功'
            })
          }
          this.handleNodeClick(_data)
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
      const _data = data
      // const parent = node.parent
      // const children = parent.data.children || parent.data
      // const index = children.findIndex(d => d.id === data.id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '节点删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const tad = {
          id: _data.id
        }
        delSecondarycategory(tad).then((res) => {
          if (res.data.code === '200') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          this.handleNodeClick(this.treeData[(this.types * -1) - 1])
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
          id: _data.id,
          name: _va
        }
        putsecondary(dta).then((res) => {
          if (res.data.code === '200') {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          }
          this.handleNodeClick(this.treeData[(this.types * -1) - 1])
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        })
      })
    },
    // 渲染到节点后面的操作
    renderContent(h, { node, data, store }) {
      return (
        <div class='custom-tree-node'>
          <div>{node.label}</div>
          <div>
            {node.label === '产品类目' || node.label === '支出类目' || node.label === '开票内容类目' || node.label === '任务环节类目' || node.label === '渠道类目'
              ? <div style='display:flex;justify-content:space-between;' on-click={ (event) => this.append(data, event)}><img src='https://static-shanghai.hanku.net.cn/jqy_system/setting/add.png' style='width:12px;height:12px;margin-top:8px;margin-right:2px;' /><el-button size='mini' type='text'>二级类目</el-button></div>
              : <div>
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
      box-shadow:0px -2px 10px 0px rgba(49,137,245,0.04);
      border-radius:4px;
      display: flex;
      justify-content: space-between;
      .management_left{
          width:px(252);
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
              width:px(204);
              height:px(48);
              margin: auto;
              .custom-tree-node{
                  width:px(204);
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  font-size:14px;
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
          width:px(948);
          height:100%;
          padding: 24px 24px 0 24px;
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
            width:px(948);
            height:px(86);
            display: flex;
            justify-content: flex-end;
            align-items: center;
            box-shadow:0px -2px 10px 0px rgba(49,137,245,0.04);
            margin-left: px(-16);
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
