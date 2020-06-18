<template>
 <div class="personal">
     <div class="personaltitle">
         <div class="line"></div>
         <p>个人信息</p>
     </div>
     <div class="personalcontent">
         <!-- 姓名 性别 -->
        <div class="top">
            <div class="case_warp">
                <p v-if="nameyx">请输入姓名!</p>
                <p v-if="!nameyx"></p>
                <div class="case">
                    <p><span>*</span>姓名</p>
                    <el-input v-model="name" placeholder="请输入姓名"></el-input>
                </div>
            </div>
            <div class="case_warp">
                <p></p>
                <div class="case">
                    <p style="padding-left:50px;"><span>*</span>性别</p>
                    <div>
                      <el-radio-group v-model="radio">
                        <el-radio :label="0">男</el-radio>
                        <el-radio :label="1">女</el-radio>
                      </el-radio-group>
                    </div>
                </div>
            </div>
        </div>
        <!-- 手机号 邮箱 -->
        <div class="top">
            <div class="case_warp">
                <p v-if="phoneyx">请输入正确手机号!</p>
                <p v-if="!phoneyx"></p>
                <div class="case">
                    <p><span>*</span>手机号码</p>
                    <el-input v-model="phone" placeholder="请输入常用手机号码" maxlength="11"></el-input>
                </div>
            </div>
            <div class="case_warp">
                <p v-if="emailyx">请输入正确邮箱!</p>
                <p v-if="!emailyx"></p>
                <div class="case">
                    <p><span>*</span>邮箱地址</p>
                    <el-input v-model="email" placeholder="请输入邮箱地址"></el-input>
                </div>
            </div>
        </div>
        <!-- 用户名登录密码 -->
        <div class="top1">
            <div class="case_warp">
                <div class="case">
                    <p>用户名</p>
                    <div class="p"><p>{{account}}</p></div>
                </div>
            </div>
            <div class="case_warp">
                <div class="case">
                    <p>登录密码</p>
                    <div class="p"><p>*************</p></div>
                </div>
            </div>
        </div>
        <!-- 部门 角色 -->
        <div class="top1">
            <div class="case_warp">
                <div class="case">
                    <p>部门</p>
                    <div class="p"><p>{{deptName}}</p></div>
                </div>
            </div>
            <div class="case_warp">
                <div class="case">
                    <p>角色</p>
                    <div class="p"><p>{{duty}}</p></div>
                </div>
            </div>
        </div>
     </div>
     <div class="personaoperation">
         <el-button @click="save">保存</el-button>
         <el-button @click="modificationPassword">修改密码</el-button>
         <!-- <el-button>取消</el-button> -->
     </div>
     <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :close-on-click-modal = "false">
        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="旧密码" :label-width="formLabelWidth" prop="oldpassword">
            <el-input v-model="form.oldpassword" autocomplete="off" placeholder="请输入旧密码" type="password"  show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth" prop="newpassword">
            <el-input v-model="form.newpassword" autocomplete="off" placeholder="请输入新密码" type="password"  show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" :label-width="formLabelWidth" prop="confirm">
            <el-input v-model="form.confirm" autocomplete="off" placeholder="请再次输入新密码" type="password"  show-password></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm('form')">确 定</el-button>
        </div>
    </el-dialog>
 </div>
</template>
 
<script>
import '@/assets/css/reset.scss'
import { userUptade, users } from '@/api/setting/personal'
export default {
  data() {
    const confirmvalidation = (rule, value, callback) => {
      if (this.form.newpassword !== value) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    } 
    return {
      account: '',
      deptName: '',
      duty: '',
      userid: '',
      nameyx: false,
      name: '',
      phoneyx: false,
      phone: '',
      emailyx: false,
      email: '',
      radio: 0,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        oldpassword: '',
        newpassword: '',
        confirm: ''
      },
      rules: {
        oldpassword: [{
          required: true,
          message: '请输入旧密码', 
          trigger: 'blur' 
        }, {
          min: 6,
          max: 18,  
          message: '请输入长度6-18的密码',
          trigger: 'blur'
        }],
        newpassword: [{
          required: true,
          message: '请输入新密码',
          trigger: 'blur'
        }, {
          min: 6,
          max: 18,
          message: '请输入长度6-18的密码',
          trigger: 'blur'
        }],
        confirm: [{
          required: true,
          message: '请再次输入新密码',
          trigger: 'blur'
        }, {
          validator: confirmvalidation
        }]
      }
    }
  },
  methods: {
    init() {
      const data = {
        id: this.userid
      }
      users(data).then((res) => {
        this.account = res.data.data.account
        this.deptName = res.data.data.deptName
        this.duty = res.data.data.duty
        this.name = res.data.data.name
        this.sex = res.data.data.sex
        this.phone = res.data.data.mobile
        this.email = res.data.data.email
      })
    },
    save() {
      if (this.name === '') {
        this.nameyx = true
        return false
      } else if (this.phone === '' || !(/^1[3456789]\d{9}$/.test(this.phone))) {
        this.nameyx = false 
        this.phoneyx = true
        return false
      } else if (this.email === '' || !(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.email))) {
        this.phoneyx = false
        this.emailyx = true
        return false
      } else {
        this.emailyx = false
        //  发送异步请求
        const data = {
          name: this.name,
          sex: this.radio,
          mobile: this.phone,
          email: this.email,
          id: this.userid
        }
        userUptade(data).then((res) => {
          this.init()
        })
        this.name = ''
        this.phone = ''
        this.email = ''
      }
    },
    modificationPassword() {
      this.dialogFormVisible = true
    },
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          const data = {
            name: this.name,
            sex: this.radio,
            mobile: this.phone,
            email: this.email,
            id: this.userid
          }
          userUptade(data).then((res) => {
            this.init()
          })
          this.dialogFormVisible = false
        } else {
          
          return false
        }
      })
    },
    cancel() {
      this.dialogFormVisible = false
    }
  },
  created() {
    this.userid = localStorage.getItem('tokenId')
    this.init()
  }
}
</script>
 
<style lang="scss" >
  @function px($px){
    $rem: 144;
    @return ($px/ $rem) + rem;
  }
  .personal{
    width:px(1200);
    height:px(630);
    background:#fff;
    position:relative;
    top:24px;
    left:24px;
    box-shadow:0px -2px 10px 0px rgba(49,137,245,0.04);
    border-radius:4px;
    padding:24px 24px 0 24px;
    .personaltitle{
        width:100%;
        height:18px;
        display:flex;
        justify-content: flex-start;
        .line{
          width:2px;
          height:18px;
          background:rgba(0,151,254,1);
        }
        p{
          font-size:16px;
          font-weight:500;
          color:rgba(51,57,63,1);
          line-height:18px;
          padding-left:8px;
        }
    }
    .personalcontent{
        width:100%;
        height:305px;
        .top{
            width:px(700);
            height:60px;
            margin-top:32px;
            display: flex;
            justify-content: space-between;
            .case_warp{
              width:px(376);
              height:60px;
              p{
                width:100%;
                height:20px;
                text-align: right;
                color:#0097FE;
                font-size:14px;
              }
              .case{
                width:px(376);
                height:38px;
                display: flex;
                justify-content: flex-start;
                .el-radio{
                  margin-top:12px;
                }
                p{
                  width:px(112);
                  text-align: right;
                  color:#6F7C8D;
                  font-size: 14px;
                  font-weight:500;
                  line-height: 38px;
                  margin-right:24px;
                  span{
                    color: red;
                    padding-right: 8px;
                  }
                }
                .p{
                    width:100%;
                    height:38px;
                    p{
                      text-align: left;
                      color: #33393F;
                    }
                }
              }
            }
        }
        .top1{
            width:px(700);
            height:30px;
            display: flex;
            justify-content: space-between;
            margin-top:20px;
            .case_warp{
              width:px(376);
              height:30px;
              .case{
                width:px(376);
                height:38px;
                display: flex;
                justify-content: flex-start;
                .el-radio{
                  margin-top:12px;
                }
                p{
                  width:px(112);
                  text-align: right;
                  color:#6F7C8D;
                  font-size: 14px;
                  font-weight:500;
                  line-height: 38px;
                  margin-right:24px;
                  span{
                    color: red;
                    padding-right: 8px;
                  }
                }
                .p{
                  p{
                    text-align: left;
                    color: #33393F;
                  }
                }
              }
            }
        }
    }
    .personaoperation{
        padding:24px 0 0 24px;
        .el-button{
            color:#409EFF;
            border-color:#409EFF;
        }
        .el-button:hover, .el-button:focus{
            color:#fff;
            background:#409EFF;
          }
    }
    .el-dialog{
        width:px(432);
        height:362px;
    }
    .el-input{
        width:px(256);
        height:38px;
    }
  }
</style>