<template>
  <div class="clientInformation">
    <div class="clientInformation_back clientInformation_common">
      <img src="../../../assets/image/sendBack.png" alt="">
      <p @click="open3">资料退回</p>
    </div>
    <!-- 资料退回 -->
    <!-- <el-dialog 
      title="收货地址"
      :visible.sync="dialogFormVisible" 
      append-to-body
      class="clientinformation_back_dialog">
      <el-form :model="backform">
        <el-form-item label="请选择需要退回的资料：" label-width="180px">
        <el-select 
          v-model="backform.name" 
          placeholder="请选择需要退回的资料："
          @change="chooseBackform">
          <el-option
            v-for="(item) in backformOptions"
            :key="item.id"
            :value="item.name"
            :lable="item.name">
          </el-option>
        </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog> -->
    <div class="clientInformation_upload clientInformation_common">
      <img src="../../../assets/image/upload.png" alt="">
      <p @click="innerVisible = true">资料上传</p>
    </div>
    <!-- 资料上传 -->
    <el-dialog
      title="上传资料"
      :close-on-click-modal = "false"
      :visible.sync="innerVisible"
      append-to-body
      class="clientinformation_upload_dialog">
      <div class="clientinformation_upload_form">
        <el-form :model="ruleForm1" :rules="ruleForm1rules" ref="ruleForm1">
          <el-form-item label="资料名称" prop="dataName">
            <el-input v-model="ruleForm1.dataName" placeholder="请输入上传资料名称"></el-input>
          </el-form-item>
          <div class="addingMaterial">
            <!-- <img src="../../../assets/image/uploadFiles.png" alt=""> -->
            <el-upload
              action="https://api-web.jianqiyun.net/common/profile_upload"
              list-type="picture-card"
              :headers="headers"
              :limit="1"
              name="files"
              :file-list="ruleForm1.profile"
              :disabled="detail === '2' ? true : false"
              :on-exceed="handleExceed"
              :on-success="loadsuccess">
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </el-form>
      </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm(ruleForm1)">确 定</el-button>
          <el-button @click="innerVisible = false">取 消</el-button>
        </span>
    </el-dialog>
    <div class="clientInformation_request clientInformation_common">
      <img src="../../../assets/image/request.png" alt="">
      <p @click="dialogVisible = true">资料请求</p>
    </div>
    <!-- 索要资料 -->
    <el-dialog
      title="索要资料"
      :visible.sync="dialogVisible"
      :close-on-click-modal = "false"
      :before-close="handleClose"
      :append-to-body="true"
      class="clientinformation_download_dialog">
      <div class="clientinformation_download_form">
        <el-form :model="ruleForm" :rules="ruleFormrules" ref="ruleForm">
          <el-form-item label="索要材料" prop="askMaterials">
            <el-input v-model="ruleForm.askMaterials" placeholder="请输入索要材料名称"></el-input>
          </el-form-item>
          <el-form-item label="索要说明" prop="instructions" class="instructions">
            <el-input v-model="ruleForm.instructions" placeholder="请输入索要说明"></el-input>
          </el-form-item>
          <el-form-item label="资料索要方式" prop="send" class="send">
            <el-radio-group v-model="ruleForm.send" @change="sureSend">
              <el-radio label="寄送"></el-radio>
              <el-radio label="文件上传"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="收件人" prop="recipients" class="recipients">
            <el-input v-model="ruleForm.recipients" placeholder="请输入收件人姓名" :disabled="iptDisabled"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="contactPhone" class="contactPhone">
            <el-input v-model="ruleForm.contactPhone" placeholder="请输入联系电话" :disabled="iptDisabled" type="number"></el-input>
          </el-form-item>
          <el-form-item label="收件地址" prop="contactAddress" class="contactAddress">
            <el-input v-model="ruleForm.contactAddress" placeholder="请输入收件地址" :disabled="iptDisabled"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="demand">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { dataUploadApi, demandApi } from '@/api/client'
export default {
  props: {
    detail: {
      type: String
    },
    customerId2: {
      type: Number
    }
  },
  components: {
  },
  data() {
    var recipients = (rule, value, callback) => {     
      if ((this.ruleForm.send === '寄送' || !this.ruleForm.send) && value === '') {
        callback(new Error('请输入收件人姓名'))
      } else {
        callback()
      }
    }
    const regex = /^[1]([3-9])[0-9]{9}$/
    var contactPhone = (rule, value, callback) => {
      if (regex.test(value) || this.ruleForm.send === '文件上传') {
        callback()
      } else {
        callback(new Error('请输入正确的手机号'))
      }
    }
    var contactAddress = (rule, value, callback) => {
      if ((this.ruleForm.send === '寄送' || !this.ruleForm.send) && value === '') {
        callback(new Error('请输入收货地址'))
      } else {
        callback()
      }
    }
    return {
      iptDisabled: true,
      backform: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      headers: {
        'Authriozation': localStorage.getItem('jqyToken'),
        'tokenId': localStorage.getItem('tokenId')
      },
      // backformOptions: [{
      //   value: '',
      //   label: ''
      // }], //请选择资料退回
      ruleForm1: {
        dataName: '',
        profile: []
      },
      ruleForm1rules: {
        dataName: [
          { required: true, message: '请输入上传材料', trigger: 'blur' }
        ]
      },
      ruleForm: {
        askMaterials: '',
        instructions: '',
        send: '',
        recipients: '',
        contactPhone: '',
        contactAddress: ''
      },
      ruleFormrules: {
        askMaterials: [
          { required: true, message: '请输入索要材料', trigger: 'blur' }
        ],
        instructions: [
          { required: true, message: '请输入索要说明', trigger: 'blur' }
        ],
        send: [
          { required: true, message: '请选择是否需要寄送', trigger: 'change' }
        ],
        recipients: [
          { validator: recipients, required: true, trigger: 'blur' }
        ],
        contactPhone: [
          { validator: contactPhone, required: true, trigger: 'blur' }
        ],
        contactAddress: [
          { validator: contactAddress, required: true, trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      innerVisible: false,
      dialogFormVisible: false,
      url: '',
      fileType: ''
    }
  },
  created() {
    
  },
  mounted() {
    
  },
  watch: {
    detail: {
      handler(val) {
        if (val === '2') {
          const obj = JSON.parse(JSON.stringify(this.getIt))
          this.personMobile = obj.phone
          obj.binvoicing = obj.binvoicing.toString()
          if (obj.binvoicing === '是') {
            obj.binvoicing = '1'
          } else {
            obj.binvoicing = '0'
          }
          obj.profile = [{
            name: 'img', 
            url: obj.profile
          }]
          this.ruleForm1 = obj
          
        }
      }
    }
  },
  methods: {
    // 资料上传
    handleExceed(files, fileList) {
      this.$message.warning('当前限制选择 1 个文件并且不能超过30MB')
    },
    loadsuccess(response) {
      
      // this.$message.success('资料选择成功请确定')
      //  //文件url 类型 名字
      this.url = JSON.stringify(response.data)
      // this.fileType = files.data.fileType
    },
    submitForm(ruleForm1) {
      this.$refs.ruleForm1.validate((valid) => {
        if (valid) {
          const data = {
            profileName: this.ruleForm1.dataName,
            url: this.url,
            customerId: this.customerId2
          }
          dataUploadApi(data).then(res => {
            
            if (res.data.code === '200') {
              this.$emit('loadAgain')
              this.$message({
                type: 'success',
                message: '资料上传成功!'
              })
              this.init()
              this.innerVisible = false
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '资料上传失败'
          })
          
          return false
        }
      })
    },
    init() {
      this.ruleForm = {
        askMaterials: '',
        instructions: '',
        send: '',
        recipients: '',
        contactPhone: '',
        contactAddress: ''
      }
      this.ruleForm1 = {
        profile: [],
        dataName: ''
      }
    },
    demand(ruleForm) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.ruleForm.send === '寄送' ? this.ruleForm.send = 1 : this.ruleForm.send = 0
          const data = {
            customerId: this.customerId2,
            bforDelivered: this.ruleForm.send,
            physicalAddress: this.ruleForm.contactAddress,
            physicalConsignee: this.ruleForm.recipients,
            physicalPhone: this.ruleForm.contactPhone,
            profileDescription: this.ruleForm.instructions,
            profileName: this.ruleForm.askMaterials
          }
          demandApi(data).then(res => {
            
            if (res.data.code === '200') {
              this.$message({
                type: 'success',
                message: '索要资料成功!'
              })
              this.init()
              this.dialogVisible = false
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '请把资料填写完整/正确填写'
          })
          
          return false
        }
      })
    },
    open3() {
      this.$message({
        showClose: true,
        message: '此功能暂未开放',
        type: 'warning'
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    sureSend(e) {
      
      if (e === '寄送') {
        this.iptDisabled = false
      } else {
        this.ruleForm.recipients = ''
        this.ruleForm.contactPhone = ''
        this.ruleForm.contactAddress = ''
        this.iptDisabled = true
      }
    }
  }
}
</script>

<style lang="scss">
  @function px($px){
    $rem: 144;
    @return ($px/ $rem) + rem;
  }
  .clientInformation{
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    height: 80px;
    .clientInformation_common{
        display:flex;
        align-items: center;
        justify-content: center;
        width: px(319);
        img{
            width: 12px;
            height: 12px;
        }
        p{
            margin-left: px(4);
            cursor: pointer;
        }
    }
    .clientInformation_back{
        position: relative;
    }
    .clientInformation_back::after{
        content: '';
        height:30px;
        background:rgba(173,181,192,1);
        border-right: 1px solid rgba(173,181,192,1);
        position: absolute;
        right: 0;
        top: px(20);
    }
    .clientInformation_upload{
        position: relative;
    }
    .clientInformation_upload::after{
        content: '';
        height:30px;
        background:rgba(173,181,192,1);
        border-right: 1px solid rgba(173,181,192,1);
        position: absolute;
        right: 0;
        top: px(20);
    }
  }
//   资料退回弹出框
.clientinformation_back_dialog{
  .el-dialog{
    width:px(464);
    height:300px;
    background:rgba(255,255,255,1);
    border-radius:5px;
  }
  .el-dialog__header{
    background:rgba(241,248,255,1);
  }
  .el-dialog__body{
    .el-form{
      padding-left: px(5);
      .el-form-item__label{
        width: px(100);
        margin-left: px(15);
      }
      .el-input{
        margin-top: 55px;
        margin-left: px(-123);
        width:px(368);
        height:38px;
      }
      .el-form-item__error{
        margin-left: px(110)
      }
    }
  }
  .el-dialog__footer{
    // width:px(840);
    height:68px;
    background:rgba(241,248,255,1);
    border-radius:4px 0px 5px 4px;
    // margin-top: 48px;
    button{
      width:100px;
      height:32px;
      margin-top: px(7);
      line-height: px(5)
    }
    .el-button--default{
      margin-right: px(48);
      margin-left: px(25)
    }
  }
}
// 索要资料弹出框
.clientinformation_download_dialog{
  .el-dialog{
    width:px(464);
    // height:587px;
    background:rgba(255,255,255,1);
    border-radius:5px;
  }
  .el-dialog__header{
    background:rgba(241,248,255,1);
  }
  .el-dialog__body{
    .el-form{
      padding-top: px(25);
      .el-form-item__label{
        width: px(100);
        margin-right: px(24);
      }
      .el-input{
        width:px(264);
        height:38px;
      }
      .el-form-item__error{
        margin-left: px(110)
      }
    }
  }
  .el-dialog__footer{
    // width:px(840);
    height:68px;
    background:rgba(241,248,255,1);
    border-radius:4px 0px 5px 4px;
    // margin-top: 48px;
    button{
      width:100px;
      height:32px;
      margin-top: px(7);
      line-height: px(5)
    }
    .el-button--default{
      margin-right: px(48);
      margin-left: px(25)
    }
  }
}
// 上传资料弹出框
.clientinformation_upload_dialog{
  .el-dialog{
    width:px(464);
    height:354px;
    background:rgba(255,255,255,1);
    border-radius:5px;
  }
  .el-dialog__header{
    background:rgba(241,248,255,1);
  }
  .el-dialog__body{
    padding-bottom: 0;
    .el-form{
      padding-top: px(25);
      .el-form-item__label{
        width: px(100);
        margin-right: px(24);
      }
      .el-input{
        width:px(264);
        height:38px;
      }
      .el-form-item__error{
        margin-left: px(110)
      }
      .addingMaterial{
        padding-left: px(125);
        padding-top: 10px;
        margin-bottom: 33px;
        .el-upload {
          height: 64px;
          width: 64px;
          .el-icon-plus{
            display: block;
            margin-top: 17px;
          }
        }
        .el-upload-list__item{
          height: 64px;
          width: 64px;
        }
      }
    }
  }
  .el-dialog__footer{
    height:68px;
    background:rgba(241,248,255,1);
    border-radius:4px 0px 5px 4px;
    button{
      width:100px;
      height:32px;
      margin-top: px(7);
      line-height: px(5)
    }
    .el-button--default{
      margin-right: px(48);
      margin-left: px(25)
    }
  }
}
</style>