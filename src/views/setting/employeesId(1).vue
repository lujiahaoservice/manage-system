<template>
    <div>
    <div class="employeesId" v-if="!exmin">
        <div class="employeesIdLeft">
            <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="组织架构" name="first">
                <el-input placeholder="搜索" v-model="filterText" suffix-icon="el-icon-search"></el-input>
                <el-tree 
                class="filter-tree" 
                :data="framework" 
                :props="defaultProps" 
                :expand-on-click-node="false"
                :filter-node-method="filterNode" 
                :render-content="renderContent"
                @node-click="handleNodeClick"
                ref="tree">
                </el-tree>
            </el-tab-pane>
            <el-tab-pane label="角色管理" name="second">
                <el-input placeholder="搜索" v-model="filterRol" suffix-icon="el-icon-search"></el-input>
                <el-tree 
                class="filter-tree" 
                :data="framerol" 
                :props="defaultRol" 
                :expand-on-click-node="false"
                :filter-node-method="filterNode" 
                :render-content="renderContentrol"
                @node-click="handrolClick"
                ref="treerol">
                </el-tree>
            </el-tab-pane>
        </el-tabs>
        </div>
        <div class="employeesIdRight">
            <div class="employtitle">
                <div class="tot">
                    <div class="line"></div>
                    <p>{{title}}</p>
                </div>
                <div class="inpt" v-if="organization">
                    <el-input placeholder="搜索" v-model="search"><i slot="suffix" class="el-icon-search search" @click="searchs"></i></el-input>
                    <el-button @click="ChangeDepartment">修改部门名称</el-button>
                    <el-button @click="addSubdivision">添加子部门</el-button>
                </div>
                <div class="inpt inpt1" v-if="!organization">
                  <el-button @click="Modifyname">修改角色名称</el-button>
                  <el-button @click="addingRoles">添加角色</el-button>
                </div>
            </div>
            <div class="employbtn" v-if="organization">
                <el-button type="primary" @click="addMembers">添加成员</el-button>
                <!-- <el-button type="primary" @click="changeClub">更换部门</el-button> -->
                <el-button type="primary" @click="dimission">离职</el-button>
            </div>
            <div class="employbtn employbtn1" v-if="!organization">
                <el-button type="primary" @click="authority">功能权限</el-button>
                <el-button type="primary" @click="currentPersonnel">当前人员</el-button>
                <!-- <el-button type="primary" @click="changeClubrol" v-if="rolshow">更换部门</el-button> -->
                <el-button type="primary" @click="dimissionrol" v-if="rolshow">离职</el-button>
            </div>
            <div class="employtab">
                <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :header-cell-style="{background:'#E4EEF9'}">
                    <el-table-column type="selection" align="center"></el-table-column>
                    <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
                    <!-- <el-table-column prop="power" label="角色权限" :show-overflow-tooltip="true" align="center"></el-table-column> -->
                    <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
                    <el-table-column prop="duty" label="职务" align="center"></el-table-column>
                    <el-table-column prop="account" label="登录账号" align="center" :show-overflow-tooltip="true"></el-table-column>
                     <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <NoData v-if="tableData.length === 0" :noDataPadding="''" :noDataHeight="'83%'"></NoData>
            </div>
            <div class="employbottom">
                <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                @current-change="handleCurrentChange"
                v-if="tables === '0' ? true : false"
                >
                </el-pagination>
            </div>
        </div>
        <!-- 弹框 -->
        <div class="pub_top">
          <!-- 更换部门 -->
          <el-dialog title="更换部门" :visible.sync="replaceDepartment" :close-on-click-modal = "false">
              <p><span style="color:red;">*</span>更换部门</p>
              <el-cascader
                ref="csastree"
                v-model="ment.id"
                :options="framework"
                placeholder="请选择要更换的部门"
                :props="defaultregion"
                @change="replaceDepartments"
                clearable
                style="margin-left:10px;">
              </el-cascader>
            <div slot="footer" class="dialog-footer">
              <el-button type="paimary" @click="confirmClubrol" v-if="!organization">确 定</el-button>
              <el-button type="primary" @click="confirmClub" v-if="organization">确 定</el-button>
              <el-button @click="closeClub">取 消</el-button>
            </div>
          </el-dialog>
        </div>
        <div class="pub_top1">
          <!-- 添加角色 -->
          <el-dialog
            title="添加角色"
            :close-on-click-modal = "false"
            :visible.sync="adrol"
            width="30%">
            <el-form :model="adrols" :rules="adrolrus" ref="adrols">
              <div class="content">
                <el-form-item label="名称" prop="appellative">
                  <el-input v-model="adrols.appellative" placeholder="请输入姓名"></el-input>
                </el-form-item>
              </div>
              <div class="content">
                <el-form-item label="分配权限">
                  <el-tree
                    :data="powerdata"
                    show-checkbox
                    default-expand-all
                    node-key="id"
                    ref="treepower"
                    highlight-current
                    :props="defaultpower"
                    prop="power"
                    >
                  </el-tree>
                </el-form-item>
              </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="adrolcancel('adrols')">取 消</el-button>
              <el-button type="primary" @click="adrolconfirm('adrols')">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 功能权限 -->
          <el-dialog title="功能权限" :close-on-click-modal = "false" :visible.sync="Authority">
            <div class="content">
              <el-form>
                <el-form-item label="功能权限" prop="appellative">
                  <el-tree
                  :data="datapower"
                  show-checkbox
                  default-expand-all
                  node-key="id"
                  ref="treepowers"
                  highlight-current
                  :default-checked-keys="checkkeys"
                  :props="defaultProps">
                  </el-tree>
                </el-form-item>
              </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="powerclose">取 消</el-button>
              <el-button type="primary" @click="powerconfirm" >确 定</el-button>
            </div>
          </el-dialog>
        </div>
    </div>
    <!-- 员工账号查看 -->
    <div class="examine" v-if="exmin">
      <div class="title">
        <div class="line"></div>
        <p>{{minetitle}}</p>
      </div>
      <div class="from_rest">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <div class="input_set">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="部门" prop="region" v-if="!showuser">
              <el-cascader
              ref="region"
              v-model="ruleForm.region"
              :options="framework"
              placeholder="请选择部门"
              @change="regionChange"
              :props="defaultregion"
              clearable>
              </el-cascader>
            </el-form-item>
            <el-form-item label="部门" v-if="showuser">
              <el-input v-model="regn" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="登录账号" v-if="showuser">
              <el-input v-model="account" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="登录账号" prop="user" v-if="!showuser">
              <div class="intt">
              <el-input v-model="accountPrefix" :disabled="true" class="dafault"></el-input>@<el-input class="inptseclet" v-model="ruleForm.user" placeholder="建议姓名拼音小写" ></el-input>
              </div>
            </el-form-item>
          </div>
          <div class="input_set">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="ruleForm.sex">
                <el-radio label='0'>男</el-radio>
                <el-radio label='1'>女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="身份" prop="identity">
              <el-radio-group v-model="ruleForm.identity">
                <el-radio label='3'>普通职员</el-radio>
                <el-radio label='2'>部门主管</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password" placeholder="请输入密码" type="password" autocomplete="new-password" @focus="changfouse"></el-input>
            </el-form-item>
          </div>
          <div class="input_set">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="ruleForm.phone" placeholder="请输入手机号" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址" prop="email">
              <el-input v-model="ruleForm.email" placeholder="请输入邮箱地址"></el-input>
            </el-form-item>
            <el-form-item label="职务" prop="duty">
              <el-input v-model="ruleForm.duty" placeholder="请输入职务"></el-input>
            </el-form-item>
          </div>
          <div class="input_set">
          <el-form-item label="分配角色权限" prop="role_based" label-width="120px">
              <el-cascader
                v-model="ruleForm.role_based"
                :options="role_based"
                :props="inpower"
                clearable
                placeholder="请选择角色权限"
                @change="roleChange"
                >
              </el-cascader>
            </el-form-item>
          </div>
          </el-form>
      </div>
      <div class="examine_fotter">
        <el-button v-if="changesave" type="primary" @click="submitForm('ruleForm')" style="margin-left:24px;">提交</el-button>
        <el-button v-if="!changesave" type="primary" @click="saveForm('ruleForm')" style="margin-left:24px;">保存</el-button>
        <el-button plain @click="resetForm('ruleForm')">取消</el-button>
      </div>
    </div>
  </div>
</template>
 
<script>
import '@/assets/css/reset.scss'
import NoData from '@/components/no-data/'
import { 
  addrole,
  getRolelist,
  delRoleremove,
  putRole,
  getroleId,
  getDepttree,
  postDeptadd,
  putDeptupdate,
  delDeptremove,
  getMenutree,
  getUserpage,
  getByid,
  postAdduser,
  putUserupdate,
  deldimission,
  getPowerid,
  getMenuroleid,
  putRolename
} from '@/api/setting/employeesId'
import { users } from '@/api/setting/personal'
import md5 from 'js-md5'
export default {
  components: {
    NoData
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    filterRol(val) {
      this.$refs.treerol.filter(val)
    }
  },
  data() {
    const phonedation = (rule, value, callback) => {
      if (!(/^1[3456789]\d{9}$/.test(value))) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const emaildation = (rule, value, callback) => {
      if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value))) {
        callback(new Error('请输入正确的邮箱'))
      } else {
        callback()
      }
    }
    const userdation = (rule, value, callback) => {
      if (!(/^[0-9a-zA-Z]+$/).test(value)) {
        callback(new Error('请输入字母或者数字'))
      } else {
        callback()
      }
    }
    return {
      total: 0,
      checkkeys: [],
      datapower: [],
      Authority: false,
      changement: [],
      paserd: 0,
      changesave: true,
      regiondepartment: '',
      pageNum: 1,
      adrol: false,
      rolshow: false,
      multipleSelection: [],
      organization: true,
      props: { multiple: true },
      account: '',
      accountPrefix: '',
      adrols: {
        appellative: '',
        power: ''
      },
      ruleForm: {
        name: '',
        region: [],
        user: '',
        sex: '',
        identity: '',
        password: '',
        role_based: '',
        phone: '',
        email: '',
        duty: '',
        id: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        identity: [
          { required: true, message: '请选择身份', trigger: 'change' }
        ],
        role_based: [
          { required: true, message: '请选择角色权限', trigger: 'change' }
        ],
        user: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 6, max: 20, message: '请输入6-20位字符串', trigger: 'blur' },
          { validator: userdation }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '请输入6-18位密码', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: phonedation }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: emaildation }
        ],
        duty: [
          { required: true, message: '请输入职务', trigger: 'blur' }
        ]
      },
      adrolrus: {
        appellative: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        power: [
          { required: true }
        ]
      },
      showuser: true,
      exmin: false,
      minetitle: '员工详情',
      // 更换部门弹框显示隐藏
      replaceDepartment: false,
      // 角色添加
      adtol: false,
      search: '',
      title: '',
      activeName: 'first',
      filterText: '',
      filterRol: '',
      poserchange: [],
      powerdata: [],
      // 第一层级页面渲染时请求vuex 获取第一层级的label
      framework: [{
        id: 0,
        name: '',
        children: []
      }],
      framerol: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      defaultRol: {
        children: 'children',
        label: 'roleName'
      },
      defaultregion: {
        value: 'id',
        label: 'name'
      },
      defaultpower: {
        children: 'children',
        label: 'name'
      },
      inpower: {
        value: 'id',
        label: 'roleName',
        multiple: true
      },
      tableData: [],
      role_based: [],
      rolid: '',
      departmentid: '',
      regn: '',
      ment: {
        id: '',
        name: ''
      },
      uniqueValue: '',
      userid: '',
      tables: '0'
    }
  },
  methods: {
    // 获取公司的名字
    conpend() {
      const data = {
        id: this.userid
      }
      users(data).then((res) => { 
        this.framework[0].name = res.data.data.companyName
        const index = (res.data.data.account).indexOf('@')
        this.accountPrefix = (res.data.data.account).substring(0, index)
      })
    },
    init() {
      getDepttree().then((res) => {
        this.framework[0].children = res.data.data
      })
    },
    // 选择的权利
    getCheckedKeys() {
      this.poserchange = this.$refs.treepower.getCheckedKeys()
    },
    // 角色添加
    addingRoles() {
      // if (this.rolid === '') {
      //   this.$message({
      //     showClose: true,
      //     message: '请先选择角色',
      //     type: 'error'
      //   })
      //   return
      // } else {
      this.adrol = true
      getMenutree().then((res) => {
        this.powerdata = res.data.data
      })
      // }
    },
    // 角色添加确定
    adrolconfirm(adrol) {
      this.getCheckedKeys()
      if (this.poserchange.length !== 0) {
        this.$refs[adrol].validate((valid) => {
          if (valid) {
            this.adrol = false
            const data = {
              roleName: this.adrols.appellative,
              menuIds: this.poserchange
            }
            addrole(data).then((res) => {
              getRolelist().then((res) => {
                this.framerol = res.data.data
              })
            })
          } else {
            return false
          }
        })
      } else {
        return false
      }
    },
    // 角色添加取消
    adrolcancel(adrol) {
      this.$refs[adrol].resetFields()
      this.adrol = false
    },
    // 角色功能权限
    authority() {
      // 执行功能权限
      if (this.rolid === '') {
        this.$message({
          showClose: true,
          message: '请先选择角色',
          type: 'error'
        })
        return
      } else {
        this.Authority = true
        const dta = {
          roleId: this.rolid
        }
        getMenutree().then((res) => {
          this.datapower = res.data.data
        })
        getMenuroleid(dta).then((res) => {
          this.checkkeys = res.data.data
        })
      }
    },
    // 功能确定
    powerconfirm() {
      this.Authority = false
      const data = {
        id: this.rolid,
        menuIds: (this.$refs.treepowers.getCheckedKeys()).concat(this.$refs.treepowers.getHalfCheckedKeys())
      }
      putRolename(data).then((res) => {
      })
    },
    // 功能取消
    powerclose() {
      this.Authority = false
    },
    // 当前人员
    currentPersonnel() {
      if (this.multipleSelection.length === 0 || this.multipleSelection.length > 1) {
        this.$message({
          showClose: true,
          message: '请勾选一名人员',
          type: 'error'
        })
        return
      } else {
        this.rolshow = true
      }
    },
    // 角色离职
    dimissionrol() {
      if (this.multipleSelection.length === 0 || this.multipleSelection.length > 1) {
        this.$message({
          showClose: true,
          message: '请先勾选人员',
          type: 'error'
        })
        return
      } else {
        this.$confirm('离职后该账号无法登陆或恢复！请谨慎操作，是否确认离职', '', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          const data = {
            ids: this.multipleSelection[0].id
          }
          deldimission(data).then((res) => {
            if (res.data.code === '200') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          })
          const dat = {
            id: this.rolid
          }
          getPowerid(dat).then((res) => {
            this.tableData = res.data.data
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })          
        })
      }
    },
    // 部门离职
    dimission() {
      if (this.multipleSelection.length === 0 || this.multipleSelection.length > 1) {
        this.$message({
          showClose: true,
          message: '请先勾选人员',
          type: 'error'
        })
        return
      } else {
        this.$confirm('离职后该账号无法登陆或恢复！请谨慎操作，是否确认离职', '', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          const data = {
            ids: this.multipleSelection[0].id
          }
          deldimission(data).then((res) => {
            if (res.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              const dta = {
                pageNum: this.pageNum,
                pageSize: 10,
                deptId: this.departmentid
              }
              getUserpage(dta).then((res) => {
                this.tableData = res.data.data.records
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })          
        })
      }
    },
    // 查看里面的部门选择
    regionChange(value) {
      this.regiondepartment = this.$refs['region'].getCheckedNodes()[0].label
      this.ruleForm.region = value
    },
    // 查看里面的角色选择
    roleChange(value) {
    },
    // 提交添加成员
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            account: this.accountPrefix + '@' + this.ruleForm.user,
            deptId: (this.ruleForm.region).pop(),
            deptName: this.regiondepartment,
            duty: this.ruleForm.duty,
            email: this.ruleForm.email,
            mobile: this.ruleForm.phone,
            name: this.ruleForm.name,
            password: md5(this.ruleForm.password),
            roleIds: (this.ruleForm.role_based).join().split(','),
            sex: this.ruleForm.sex,
            type: this.ruleForm.identity
          }
          postAdduser(data).then((res) => {
            
          })
          this.ruleForm.user = ''
          this.ruleForm.region = ''
          this.regiondepartment = ''
          this.ruleForm.duty = ''
          this.ruleForm.email = ''
          this.ruleForm.phone = ''
          this.ruleForm.name = ''
          this.ruleForm.password = ''
          this.ruleForm.role_based = ''
          this.ruleForm.sex = ''
          this.ruleForm.identity = ''
          this.exmin = false
        } else {
          return false
        }
      })
    },
    // 判断用户是否点击密码框
    changfouse(e) {
      this.ruleForm.password = ''
      this.paserd = 1
      
      
    },
    // 保存修改
    saveForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.paserd === 0) {
            const data = {
              account: this.accountPrefix + this.ruleForm.user,
              deptId: (this.ruleForm.region).pop(),
              deptName: this.regiondepartment,
              duty: this.ruleForm.duty,
              email: this.ruleForm.email,
              mobile: this.ruleForm.phone,
              name: this.ruleForm.name,
              password: '',
              roleIds: (this.ruleForm.role_based).join().split(','),
              sex: this.ruleForm.sex,
              type: this.ruleForm.identity,
              id: this.ruleForm.id
            }
            putUserupdate(data).then((res) => {
              
            })
          } else {
            const data = {
              account: this.accountPrefix + this.ruleForm.user,
              deptId: (this.ruleForm.region).pop(),
              deptName: this.regiondepartment,
              duty: this.ruleForm.duty,
              email: this.ruleForm.email,
              mobile: this.ruleForm.phone,
              name: this.ruleForm.name,
              password: md5(this.ruleForm.password),
              roleIds: (this.ruleForm.role_based).join().split(','),
              sex: this.ruleForm.sex,
              type: this.ruleForm.identity,
              id: this.ruleForm.id
            }
            putUserupdate(data).then((res) => {
              
            })
          }
          this.exmin = false
        } else {
          return false
        }
      })
    },
    // 取消
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.exmin = false
    },
    // 更换部门按钮
    changeClub() {
      if (this.multipleSelection.length === 0 || this.multipleSelection.length > 1) {
        this.$message({
          showClose: true,
          message: '请勾选一名人员',
          type: 'error'
        })
        return
      } else {
        this.replaceDepartment = true
      }
    },
    // 角色更换部门的按钮
    changeClubrol() {
      if (this.multipleSelection.length === 0 || this.multipleSelection.length > 1) {
        this.$message({
          showClose: true,
          message: '请勾选一名人员',
          type: 'error'
        })
        return
      } else {
        this.replaceDepartment = true
      }
    },
    // 更换部门的确定
    confirmClub() {
      this.replaceDepartment = false
      const data = {
        id: this.multipleSelection[0].id,
        deptId: (this.ment.id).pop(),
        deptName: this.ment.name
      }
      putUserupdate(data).then((res) => {
        const dat = {
          pageNum: this.pageNum,
          pageSize: 10,
          deptId: this.departmentid
        }
        getUserpage(dat).then((res) => {
          this.tableData = res.data.data.records
        })
      })
    },
    // 角色更换部门的确定
    confirmClubrol() {
      this.replaceDepartment = false
    },
    // 更换部门的取消
    closeClub() {
      this.replaceDepartment = false
    },
    // 是否全部选择
    handleSelectionChange(val) {
      
      this.multipleSelection = val
      if (val.length === 0) {
        this.rolshow = false
      } else {
        return
      }
    },
    //详情查看
    handleEdit(index, row) {
      this.changesave = false
      this.minetitle = '员工详情'
      this.exmin = true
      this.showuser = true
      
      this.ruleForm.id = row.id
      getRolelist().then((res) => {
        
        this.role_based = res.data.data
      })
      const data = {
        id: row.id
      }
      getroleId(data).then((res) => {
        
        this.ruleForm.role_based = res.data.data
      })
      getByid(data).then((res) => {
        
        this.ruleForm.name = res.data.data.name
        this.regn = res.data.data.deptName
        this.ruleForm.sex = (res.data.data.sex).toString()
        this.ruleForm.identity = (res.data.data.type).toString()
        this.ruleForm.duty = res.data.data.duty
        this.ruleForm.phone = res.data.data.mobile
        this.ruleForm.email = res.data.data.email
        this.account = res.data.data.account
        this.ruleForm.password = '*******'
      })
    },
    // 添加成员
    addMembers() {
      this.changesave = true
      this.minetitle = '添加成员'
      this.exmin = true
      this.showuser = false
      getRolelist().then((res) => {
        this.role_based = res.data.data
      })
    },
    // 当前的分页
    handleCurrentChange(val) {
      this.pageNum = val
      const dat = {
        pageNum: this.pageNum,
        pageSize: 10,
        deptId: this.departmentid
      }
      getUserpage(dat).then((res) => {
        this.tableData = res.data.data.records
        this.total = res.data.data.pages * 10
      })
    },
    //   搜索
    searchs() {
      // this.search
      const data = {
        pageNum: this.pageNum,
        pageSize: 10,
        keywords: this.search
      }
      getUserpage(data).then((res) => {
        this.tableData = res.data.data.records
      })
    },
    // 当前选择的节点
    handleNodeClick(data) {
      const _data = data
      if (_data.id !== 0) {
        this.title = _data.name
      }
      this.departmentid = _data.id
      const dat = {
        pageNum: this.pageNum,
        pageSize: 10,
        deptId: _data.id
      }
      getUserpage(dat).then((res) => {
        this.tableData = res.data.data.records
        this.total = res.data.data.pages * 10
      })
    },
    // 当前选择节点
    handrolClick(data) {
      const _data = data
      this.title = _data.roleName
      this.rolid = _data.id
      const dat = {
        id: _data.id
      }
      getPowerid(dat).then((res) => {
        this.tableData = res.data.data
      })
    },
    // 当前更换部门选择的节点
    replaceDepartments(value) {
      // data.label
      // this.ment.id = data.id
      // this.ment.name = data.name
      // )
      this.ment.name = this.$refs['csastree'].getCheckedNodes()[0].label
      this.ment.id = value
    },
    // 组织架构当前点击的对象
    handleClick(tab, event) {
      this.tables = tab.index
      if (tab.index === '1') {
        this.organization = false
        getRolelist().then((res) => {
          this.framerol = res.data.data
        })
        this.title = ''
      } else {
        this.organization = true
        this.title = ''
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 部门节点修改
    nodeEdit(ev, store, data) {
      const _data = data
      this.$prompt('', '节点修改', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\S{1,12}$/,
        inputErrorMessage: '请输入小于12位字符的部门',
        inputValue: data.label
      }).then(({ value }) => {
        // data.label = value
        const data = {
          id: _data.id,
          name: value
        }
        putDeptupdate(data).then((res) => {
          if (res.data.code === '200') {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          }
          this.init()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        })       
      })
    },
    // 修改部门名称按钮
    ChangeDepartment() {
      if (this.departmentid === 0 || this.departmentid === '') {
        this.$message({
          showClose: true,
          message: '公司名称不可修改，请选择部门',
          type: 'error'
        })
        return  
      } else {
        this.$prompt('', '节点修改', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\S{1,12}$/,
          inputErrorMessage: '请输入小于12位字符的部门',
          inputValue: this.title
        }).then(({ value }) => {
          // data.label = value
          const data = {
            id: this.departmentid,
            name: value
          }
          putDeptupdate(data).then((res) => {
            if (res.data.code === '200') {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            }
            this.init()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          })       
        })
      }
    },
    // 角色节点修改
    rolnodeEdit(ev, store, data) {
      const _data = data
      this.$prompt('', '节点修改', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\S{1,12}$/,
        inputErrorMessage: '请输入小于12位字符的角色',
        inputValue: _data.roleName
      }).then(({ value }) => {
        // data.label = value
        const data = {
          id: _data.id,
          name: value
        }
        putRole(data).then((res) => {
          if (res.data.code === '200') {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          }
          getRolelist().then((res) => {
            this.framerol = res.data.data
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        })       
      })
    },
    // 修改角色名称
    Modifyname() {
      if (this.rolid === '') {
        this.$message({
          showClose: true,
          message: '请先选择角色',
          type: 'error'
        })
        return
      } else {
        this.$prompt('', '节点修改', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\S{1,12}$/,
          inputErrorMessage: '请输入小于12位字符的角色',
          inputValue: this.title
        }).then(({ value }) => {
          // data.label = value
          const data = {
            id: this.rolid,
            name: value
          }
          putRole(data).then((res) => {
            if (res.data.code === '200') {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            }
            getRolelist().then((res) => {
              this.framerol = res.data.data
            })
          })
          this.rolid = ''
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          })       
        })
      }
    },
    // 部门节点删除
    remove(node, data) {
      const _data = data
      // 
      // const parent = node.parent
      // const children = parent.data.children || parent.data
      // const index = children.findIndex(d => d.id === data.id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '删除节点', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          ids: _data.id
        }
        delDeptremove(data).then((res) => {
          if (res.data.code === '200') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          this.init()
        })
        // children.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })          
      })
    },
    // 角色节点删除
    rolremove(node, data) {
      const _data = data
      // 
      // const parent = node.parent
      // const children = parent.data.children || parent.data
      // const index = children.findIndex(d => d.id === data.id)
      this.$confirm('请确认是否删除该角色', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // children.splice(index, 1)
        const data = {
          ids: _data.id
        }
        delRoleremove(data).then((res) => {
          if (res.data.code === '200') {
            getRolelist().then((res) => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.framerol = res.data.data
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
    // 部门节点添加
    append(data) {
      
      const _data = data
      this.$prompt('', '添加子部门', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\S{1,12}$/,
        inputErrorMessage: '请输入小于12位字符的部门'
      }).then(({ value }) => {
        // const newChild = { id: id++, label: value, isEdit: false, children: [] }
        // if (!data.children) {
        //   this.$set(data, 'children', [])
        // }
        // data.children.push(newChild)
        const data = {
          parentId: _data.id,
          name: value
        }
        postDeptadd(data).then((res) => {
          if (res.data.code === '200') {
            this.$message({
              type: 'success',
              message: value + '添加成功'
            })
          }
          this.init()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })       
      })
    },
    // 添加子部门
    addSubdivision() {
      if (this.departmentid === '') {
        this.$message({
          showClose: true,
          message: '请选择公司或者部门',
          type: 'error'
        })
        return
      } else {
        this.$prompt('', '添加子部门', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\S{1,12}$/,
          inputErrorMessage: '请输入小于12位字符的部门'
        }).then(({ value }) => {
          const data = {
            parentId: this.departmentid,
            name: value
          }
          postDeptadd(data).then((res) => {
            if (res.data.code === '200') {
              this.$message({
                type: 'success',
                message: value + '添加成功'
              })
            }
            this.init()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })       
        })
      }
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class='custom-tree-node'>
          <span>{node.label}</span>
          <span>
            {node.data.id === 0 ? '' : <el-button size='mini' type='text'style='margin-left:4px;' icon='el-icon-edit' on-click={ (ev) => this.nodeEdit(ev, store, data)}></el-button>}
            {node.data.id === 0 ? '' : <el-button size='mini' type='text' style='margin-left:4px;' icon='el-icon-delete' on-click={ () => this.remove(node, data) }></el-button>}
            <el-button size='mini' type='text' style='margin-left:4px;' on-click={ () => this.append(data) } icon='el-icon-plus'></el-button> 
          </span>
        </span>)
    },
    renderContentrol(h, { node, data, store }) {
      return (
        <span class='custom-tree-node'>
          <span>{node.label}</span>
          <span>
            <el-button size='mini' type='text' style='margin-left:4px;' icon='el-icon-edit' on-click={ (ev) => this.rolnodeEdit(ev, store, data)}></el-button>
            <el-button size='mini' type='text' style='margin-left:4px;' icon='el-icon-delete' on-click={ () => this.rolremove(node, data) }></el-button>
          </span>
        </span>
      )
    }
  },
  created() {
    // 从vuex里面获取公司的名字
    this.init()
    this.userid = localStorage.getItem('tokenId')
    this.conpend()
  }
}
</script>
 
<style lang="scss" >
    @function px($px){
      $rem: 144;
      @return ($px/ $rem) + rem;
    }
    .employeesId{
        width:px(1200);
        height:px(630);
        background:#fff;
        box-shadow:0px -2px 10px 0px rgba(49,137,245,0.04);
        border-radius:4px;
        display: flex;
        justify-content: space-between;
        margin:px(24) 0 0 px(24);
        .employeesIdLeft{
            width:px(252);
            height:100%;
            background:rgba(255,255,255,1);
            box-shadow:4px 0px 10px 0px rgba(49,137,245,0.04);
            border-radius:4px 0px 0px 4px;
            padding:14px 24px 0;
            .el-tabs__nav-wrap::after{
                background:none;
            }
            .el-tabs__nav-scroll{
                display: flex;
                justify-content: center;
            }
            .el-tabs__content{
                input{
                    background:#E4EBF1;
                    border:1px solid rgba(228,235,241,1);
                }
                .el-tree{
                    margin-top:10px;
                    .el-tree-node__content:hover{
                        background-color: #EFF6FD;
                        color:#0097FE;
                    }
                    .el-tree-node:focus>.el-tree-node__content{
                        background-color:#EFF6FD;
                        color:#0097FE;
                    }
                }
            }
        }
        .employeesIdRight{
            width:px(948);
            height:100%;
            padding:px(24) px(24) 0;
            .employtitle{
                width:100%;
                height:32px;
                display: flex;
                justify-content: space-between;
                .tot{
                    width:px(200);
                    height:18px;
                    display: flex;
                    justify-content: flex-start;
                    .line{
                        width:2px;
                        height:18px;
                        background:#0097FE;
                    }
                    p{
                        padding-left:8px;
                        font-size:16px;
                        font-weight:500;
                        color:rgba(51,57,63,1);
                        line-height:18px;
                    }
                }
                .inpt{
                    width:px(604);
                    height:38px;
                    display: flex;
                    justify-content: space-between;
                    input{
                        width:px(240);
                        height:38px;
                        background:#E4EBF1;
                        border-radius:4px;
                    }
                    .search{
                        cursor: pointer;
                    }
                    .el-input{
                        width:px(240);
                        height:38px;
                        line-height: 38px;
                        background:#E4EBF1;
                        border-radius:4px;
                    }
                    .el-button{
                        width:px(166);
                        color:#409EFF;
                        border-color:#409EFF;
                    }
                    .el-button:hover, .el-button:focus{
                        color:#fff;
                        background:#409EFF;
                    }
                }
                .inpt1{
                  display: flex;
                  justify-content: flex-end;
                }
            }
            .employbtn{
                width:px(312);
                height:38px;
                margin-top:18px;
                display:flex;
                justify-content: flex-start;
                .el-button{
                    width:px(88);
                }
            }
            .employbtn1{
              width:100%;
              display: flex;
              justify-content: flex-start;
            }
            .employtab{
                width: 100%;
                height: px(436);
                margin-top:24px;
                overflow: scroll;
            }
            .employbottom{
                width:px(948);
                height:px(86);
                box-shadow:0px -2px 10px 0px rgba(49,137,245,0.04);
                border-radius:0px 0px 4px 4px;
                position: relative;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                margin-left:px(-24);
                background:#fff;
            }
        }
        .pub_top{
          .el-dialog{
            width:20%;
          }
          .el-dialog__header{
            font-size:18px;
            font-weight:600;
            color:rgba(51,57,63,1);
            background:#F1F8FF;
          }
          .el-dialog__body{
            display: flex;
            justify-content: center;
            overflow: scroll;
            p{
              font-size:14px;
              font-weight:500;
              color:rgba(111,124,141,1);
              line-height: 30px;
            }
          }
          .el-dialog__footer{
            background:#F1F8FF;
          }
        }
        .pub_top1{
          .el-dialog__header{
            font-size:18px;
            font-weight:600;
            color:rgba(51,57,63,1);
            background:#F1F8FF;
          }
          .el-dialog__body{
            display: flex;
            justify-content: center;
            .content{
              .el-form-item__label{
                display: flex;
                align-items: center;
                justify-content: flex-end;
              }
              .el-form-item__content{
                width:px(262);
              }
            }
          }
          .el-form-item{
            display: flex;
            justify-content: flex-start;
            .el-form-item__label{
              width:px(60);
              font-size:14px;
              color:#6F7C8D;
              padding:0;
            }
            .el-input{
              width:px(256);
              margin-left:px(12);
            }
            input{
              width:px(256);
              margin-left:px(12);
            }
          }
          .el-dialog__footer{
            background:#F1F8FF;
          }
          .el-form-item__content{
            width:100%;
          }
        }
    }
    .examine{
      width:px(1200);
      height:px(630);
      background:#fff;
      box-shadow:0px -2px 10px 0px rgba(49,137,245,0.04);
      border-radius:4px;
      padding:px(24);
      margin:px(24) 0 0 px(24);
      .title{
          height:18px;
          display: flex;
          justify-content: flex-start;
          .line{
              width:2px;
              height:18px;
              background:#0097FE;
          }
          p{
              padding-left:8px;
              font-size:16px;
              font-weight:500;
              color:rgba(51,57,63,1);
              line-height:18px;
          }
      }
      .from_rest{
        padding-top:px(33);
        width:100%;
        height:px(500);
        .input_set{
          display: flex;
          justify-content: space-between;
          margin-bottom:50px;
          .el-input{
            width:px(256);
          }
          input{
            width:px(256);
          }
          .intt{
            width:px(256);
            .dafault{
              width:px(80);
              .el-input{
                width:px(80);
              }
              input{
                width:px(80);
              }
            }
            .inptseclet{
              width:px(160);
              .el-input{
                width:px(160);
              }
              input{
                width:px(160);
              }
            }
          }
        }
      }
      .examine_fotter{
        width:px(1200);
        height:px(92);
        background:rgba(255,255,255,1);
        box-shadow:0px -2px 10px 0px rgba(49,137,245,0.04);
        border-radius:4px;
        margin-left:px(-24);
        display: flex;
        align-items: center;
      }
    }

</style>