<template>
  <div class="taskManage">
    <div class="business_content">
        <div class="content_tit">
          <div class="business_top">
            <div class="tit_left">
              <div class="tit_lable"></div>
              <span>任务管理</span>
            </div>
          </div>
        </div>
        <div class="select_search">
          <div class="left_btn">
            <el-button class="el_button1" type="primary" @click="addTaskModal = true">新增任务</el-button>
          </div>
        </div>
        <div class="table_tabs">
          <div class="tabs_position">
            <div :class="['tab', 'tab1', tab_active === '0' ? 'active_tab' : '']" @click="changeTab('0')">待审核</div>
            <div :class="['tab', 'tab1', tab_active === '1' ? 'active_tab' : '']" @click="changeTab('1')">已审核</div>
            <div :class="['tab', 'tab1', tab_active === '7' ? 'active_tab' : '']" @click="changeTab('7')">已取消</div>
          </div>
        </div>
        <div class="feedback">
          <el-date-picker
            v-model="taskManage_time"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            @change="enterTime"
            :clearable="false"
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
              prop="username"
              align="center"
              label="用户名">
            </el-table-column>
            <el-table-column
              prop="title"
              align="center"
              label="任务名">
            </el-table-column>
            <el-table-column
              prop="orderNum"
              align="center"
              label="订单号">
            </el-table-column>
            <el-table-column
              prop="proPhone"
              align="center"
              label="联系方式">
            </el-table-column>
            <el-table-column
              prop="categoryName"
              align="center"
              label="任务类型">
            </el-table-column>
            <el-table-column
              align="center"
              label="发布地点">
              <template slot-scope="scope">
                {{scope.row.province + scope.row.city + scope.row.district + scope.row.publishPlace}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="完成地点">
              <template slot-scope="scope">
                {{scope.row.completeProvince + scope.row.completeCity + scope.row.completeDistrict + scope.row.completePlace}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="created"
              label="发布时间">
            </el-table-column>
            <el-table-column
              align="center"
              prop="completeTime"
              label="完成时间">
            </el-table-column>
            <el-table-column
              v-if="tab_active==='1'"
              align="center"
              prop="reviewTime"
              label="审核通过时间">
            </el-table-column>
            <el-table-column
              prop="money"
              align="center"
              label="任务赏金(元)">
              <!-- <template slot-scope="scope">
                <div style="display:flex;align-items: center;justify-content:center;cursor: pointer;">
                 {{(scope.row.money/100).toFixed(2)}}
                </div> 
              </template> -->
            </el-table-column>
            <el-table-column
              v-if="tab_active === '7'"
              align="center"
              prop="cancelDesc"
              label="取消原因">
            </el-table-column>
            <el-table-column
              fixed="right"
              align="center"
              width="450"
              v-if="tab_active !== '7'"
              label="操作">
                <template slot-scope="scope" v-if="tab_active !== '7'">
                  <div style="display:flex;align-items: center;justify-content:center;cursor: pointer;">
                    <el-button v-if="scope.row.taskLock === 0" @click.native.prevent="taskLock(scope.$index, tableData, 1)" type="danger" size="small">
                      锁定
                    </el-button> 
                    <el-button v-if="scope.row.taskLock === 1" @click.native.prevent="taskLock(scope.$index, tableData, 0)" type="primary" size="small">
                      解锁
                    </el-button> 
                    <el-button @click.native.prevent="willpointer(scope.$index, tableData)" type="primary" size="small">
                      指定
                    </el-button> 
                    <el-button  @click.native.prevent="cancel(scope.$index, tableData)" type="danger" size="small">
                      取消任务
                    </el-button> 
                    <el-button v-if="scope.row.status === 0" @click.native.prevent="taskExamine(scope.$index, tableData, 1)" type="success" size="small">
                      通过
                    </el-button> 
                    <el-button v-if="scope.row.status === 0" @click.native.prevent="dontPass(scope.$index, tableData, 2)" type="danger" size="small">
                      不通过
                    </el-button> 
                    <el-button @click.native.prevent="taskDetails(scope.$index, tableData)" type="primary" size="small">
                      详情
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
            :current-page="pageNum"
            @current-change="changePage"
            :total="total">
          </el-pagination>
        </div>
      </div>
    <el-dialog
      title="任务"
      :visible.sync="addTaskModal"
      :close-on-click-modal = "false"
      width="40%"
      left>
      <div class="vip_main">
        <div class="vip_main_item" style="margin-top:0;" v-if="handleType === 1">
          <div class="vip_main_item_text">
            任务选项
          </div>
          <div class="vip_main_item_input">
            <el-cascader
              :props="defaultPramas"
              v-model="categoryName"
              :options="taskOptions"
              @change="handleChange">
            </el-cascader>
          </div>
        </div>
        <div class="vip_main_item" style="margin-top:0;" v-if="handleType !== 1">
          <div class="vip_main_item_text">
            任务选项
          </div>
          <div class="vip_main_item_input">
            <el-input :disabled="handleType !== 1"   placeholder="请输入任务描述" size="mini" v-model="task.categoryName" style="width: 400px;"></el-input>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">
            任务标题
          </div>
          <div class="vip_main_item_input">
            <el-input :disabled="handleType === 2" placeholder="请输入任务标题" size="mini" v-model="task.title"></el-input>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">
            任务描述
          </div>
          <div class="vip_main_item_input">
            <el-input :disabled="handleType === 2" type="textarea"  placeholder="请输入任务描述" size="mini" v-model="task.detail" style="width: 400px;"></el-input>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">
            上传图片
          </div>
          <div class="vip_main_item_input">
            <el-upload
              action="https://ad-api.yqyes.com/common/upload"
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
        <div class="vip_main_item">
          <div class="vip_main_item_text">
            任务赏金(元)
          </div>
          <div class="vip_main_item_input">
            <el-input-number :disabled="handleType === 2" v-model="task.money" :min="0" label="请输入任务赏金" size="mini"></el-input-number>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">
            完成时间
          </div>
          <div class="vip_main_item_input">
            <el-date-picker
              :disabled="handleType === 2"
              v-model="task.completeTime"
              value-format = 'yyyy-MM-dd HH:mm:ss'
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">
            发布地址
          </div>
          <div class="vip_main_item_input" >
            <el-input @input="searchPlace(1)" :disabled="handleType === 2" placeholder="请输入地址" size="mini" v-model="task.publishPlace" style="min-width:400px;"></el-input>
            <!-- <ul class="placeChoice" v-if="getpublishPlace[0]">
              <li v-for="(item,index) in getpublishPlace" :key="index" @click="choicePlace(1, item)">
                {{item.address}}
              </li>
            </ul> -->
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">
            联系电话
          </div>
          <div class="vip_main_item_input">
            <el-input :disabled="handleType === 2" type="number" placeholder="请输入电话" size="mini" v-model="task.proPhone"></el-input>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">
            完成地址
          </div>
          <div class="vip_main_item_input" style="position:relative;">
            <el-input @input="searchPlace(2)" :disabled="handleType === 2" placeholder="请输入地址" size="mini" v-model="task.completePlace" style="min-width:400px;"></el-input>
            <ul class="placeChoice" v-if="getcompletePlace[0]">
              <li v-for="(item,index) in getcompletePlace" :key="index" @click="choicePlace(2, item)">
                {{item.address}}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addTaskModal = false">取 消</el-button>
        <el-button type="primary" @click="save" v-if="handleType !== 2">确 定</el-button>
        <el-button type="primary" @click="taskWillChange" v-if="handleType === 2">修 改</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="点击支付"
      :visible.sync="payModal"
      width="20%"
      :close-on-click-modal = "false"
      left>
      <div class="pay">
        <div v-html="res"></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="payModal = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :close-on-click-modal = "false"
      title="任务指定"
      :visible.sync="pointerModal"
      width="40%"
      left>
      <div class="vip_main">
        <div class="vip_main_item" style="margin-top:0;">
          <div class="vip_main_item_text">
            任务指定
          </div>
          <div class="vip_main_item_input">
            <el-input type="number" placeholder="请输入指定人手机号" size="mini" v-model="pointerMobile"></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pointerModal = false">取 消</el-button>
        <el-button v-if="handleType !== 2 " type="primary" @click="pointer">提 交</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="拒绝通过"
      :visible.sync="dontPassModal"
      width="40%"
      :close-on-click-modal = "false"
      left>
      <div class="vip_main">
        <div class="vip_main_item" style="margin-top:0;">
          <div class="vip_main_item_text">
            拒绝理由
          </div>
          <div class="vip_main_item_input">
            <el-input type="textarea" placeholder="请输入理由" size="mini" v-model="dontpassdetail"></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dontPassModal = false">取 消</el-button>
        <el-button v-if="handleType !== 2 " type="primary" @click="dontPassSave">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import { taskList, categoryList, taskUpdata, taskAdd, taskExamine, taskCancel, taskPointer, taskUpdataBody } from '@/api/task'
import NoData from '@/components/no-data'
// import { download } from '@/plugins/download'
export default {
  components: {
    NoData
  },  
  data() {
    return {
      dontPassModal: false,
      dontpassdetail: '',
      pointerId: '',
      pointerModal: false,
      pointerMobile: '',
      payModal: false,
      res: '',
      categoryName: [],
      place: '',
      getpublishPlace: [],
      getcompletePlace: [],
      defaultPramas: {
        children: 'cl',
        label: 'name',
        value: 'name'
      },
      taskOptions: [
      ],
      headers: {
        Authorization: '',
        tokenId: ''
      },
      handleType: 1, //1添加 2查看 3修改
      imageList: [],
      fileList: [],
      task: {
        // 发布
        city: '',
        province: '',
        district: '',
        lat: '', //发布纬度
        lng: '', //发布经度
        publishPlace: '',
        // 完成
        completeCity: '',
        completeProvince: '',
        completeDistrict: '',
        completeLat: '', 
        completeLng: '',
        completePlace: '',

        cityCode: '',
        images: '',
        detail: '',
        title: '',
        categoryName: '', //二级类目
        pcategoryName: '', //父类目
        completeTime: '',
        money: '',
        proPhone: '',
        publishType: 2 //平台发布
      },
      options: [],
      // 
      taskType: '',
      taskName: '',
      taskDesc: '',
      reward: '',
      finishTime: '',
      // 
      status: 0, //0待审核  1审核通过
      addTaskModal: false,
      tab_active: '0',
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      dialogVisible: false,
      dialogImageUrl: '',
      taskManage_time: [],
      dontpassId: ''
    }
  },
  watch: {
    addTaskModal() {
      if (this.addTaskModal === false) {
        this.fileList = []
      }
    }
  },
  created() {
    // 获取任务列表
    this.initData()

    // 获得类目列表
    this.getCategoryList()

    // 获取 token 和  tokenId
    this.headers.Authorization = localStorage.getItem('yqToken')
    this.headers.tokenId = localStorage.getItem('tokenId')
  },
  methods: {
    dontPassSave() {
      this.$confirm('是否进行该操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          taskId: this.dontpassId,
          status: 2,
          reason: this.dontpassdetail
        }
        taskExamine(data).then(res => {
          if (res.status === 200) {
            this.$message.success('操作成功')
            this.initData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })        
      })
    },
    // 不通过任务
    dontPass(index, table) {
      this.dontpassdetail = ''
      this.dontPassModal = true
      this.dontpassId = table[index].taskId
    },
    //任务指定
    willpointer(index, table) {
      this.pointerId = table[index].taskId
      this.pointerModal = true
      this.pointerMobile = ''
    },
    pointer() {
      const data = {
        taskId: this.pointerId,
        executorPhone: this.pointerMobile
      }
      taskPointer(data).then(res => {
        if (res.status === 200) {
          this.$message.success('操作成功')
          this.pointerModal = false
          this.initData()
        }
      })
    },
    //取消任务
    cancel(index, table) {
      this.$confirm('是否添加任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          taskId: table[index].taskId
        }
        taskCancel(data).then(res => {
          if (res.status === 200) {
            this.$message.success('操作成功')
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
    //解锁与锁定
    taskLock(index, table, taskLock) {
      this.$confirm('是否进行该操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          taskId: table[index].taskId,
          taskLock: taskLock
        }
        taskUpdata(data).then(res => {
          if (res.status === 200) {
            this.$message.success('操作成功')
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
    // 任务审核
    taskExamine(index, table, status) {
      this.$confirm('是否进行该操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          taskId: table[index].taskId,
          status: status
        }
        taskExamine(data).then(res => {
          if (res.status === 200) {
            this.$message.success('操作成功')
            this.initData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })        
      })
    },
    // 取消
    pass(index, table, status) {
      const data = {
        taskId: table[index].taskId,
        status: status
      }
      taskUpdata(data).then(res => {
        if (res.status === 200) {
          this.$message.success('操作成功')
          this.initData()
        }
      })
    },
    // 改变tab
    changeTab(type) {
      this.tableData.length = 0
      this.tab_active = type
      this.status = Number(type)
      this.pageNum = 1
      if (type === '0') {
        this.taskManage_time = []
      } else {
        const todays = new Date()
        const fiveAgo = new Date((new Date()).getTime() - 29 * 24 * 60 * 60 * 1000)
        const month = (todays.getMonth() + 1).toString().length === 1 ? '0' + (todays.getMonth() + 1) : (todays.getMonth() + 1)
        const day = todays.getDate().toString().length === 1 ? '0' + todays.getDate() : todays.getDate()
        const fivemonth = (fiveAgo.getMonth() + 1).toString().length === 1 ? '0' + (fiveAgo.getMonth() + 1) : (fiveAgo.getMonth() + 1)
        const fiveday = fiveAgo.getDate().toString().length === 1 ? '0' + fiveAgo.getDate() : fiveAgo.getDate()
        const today = todays.getFullYear() + '-' + month + '-' + day //今天的日期
        const fiveAgoToday = fiveAgo.getFullYear() + '-' + fivemonth + '-' + fiveday //30天前的日期
        // 获取任务列表
        this.taskManage_time = [fiveAgoToday, today]
      }
      this.initData()
    },
    // 删除任务
    willDelete(index, table) {
      this.$confirm('是否添加任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // taskRemove(data).then((res) => {
        //   if (res.status === 200) {
        //     console.log(res)
        //   } else {
        //     this.$message.error('删除失败，请稍后重试')
        //   }
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })        
      })
    },
    // 选择完成具体地址
    choicePlace(type, item) {
      if (type === 2) {
        var arr = item.location.split(',')
        this.task.completeLng = arr[0] //经度
        this.task.completeLat = arr[1] //
        this.task.completePlace = item.address
        this.task.completeCity = item.cityname
        this.task.completeProvince = item.pname
        this.task.completeDistrict = item.adname
        this.getcompletePlace = []
      }
      // 选择发布地址
      if (type === 1) {
        console.log(item)
        var arr1 = item.location.split(',')
        this.task.lng = arr1[0] //经度
        this.task.lat = arr1[1] //
        this.task.publishPlace = item.address
        this.task.city = item.cityname
        this.task.province = item.pname
        this.task.district = item.adname
        this.task.cityCode = item.citycode
        this.getpublishPlace = []
      }
    },
    // 搜索定位
    searchPlace(type) {
      console.log('定住',this.task.completePlace)
      if (timer) {
        return
      }
      var address = ''
      if (type === 1) {
        address = this.task.publishPlace
      }
      if (type === 2) {
        address = this.task.completePlace
      }
      var that = this
      var timer = setTimeout(() => {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', 'https://restapi.amap.com/v3/place/text?keywords=' + address + '&offset=8&key=d17f6f30883e2e3deb4227a3ac46d2d2&extensions=all', true)
        xhr.send()
        xhr.onreadystatechange = function() {
          // 这步为判断服务器是否正确响应
          if (xhr.readyState === 4 && xhr.status === 200) {
            clearTimeout(timer)
            if (type === 2) {
              that.getcompletePlace = JSON.parse(xhr.responseText).pois
            }
            if (type === 1) {
              that.getpublishPlace = JSON.parse(xhr.responseText).pois
            }
            console.log(JSON.parse(xhr.responseText))
          }
        }
      }, 500)
    },
    // 级联选择
    handleChange(value) {
      console.log(value)
    },
    initData(startTime, endTime) {
      const data = {
        orderDesc: 'created',
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        status: this.status,
        startTime: startTime || this.taskManage_time[0],
        endTime: endTime || this.taskManage_time[1]
      }
      taskList(data).then(res => {
        if (res.status === 200) {
          console.log('任务列表', res)
          res.data.data.records.map(item => {
            item.money = (item.money / 100).toFixed(2)
          })
          this.tableData = res.data.data.records
          this.total = res.data.data.total
        }
      })
    },
    // 获取类目
    getCategoryList() {
      categoryList().then(res => {
        if (res.status === 200) {
          this.taskOptions = res.data.data
        }
      })
    },
    changePage(e) {
      this.pageNum = e
      this.initData()
    },
    enterTime(e) {
      console.log(this.orderManage_time)
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
    // 查看详情
    taskDetails(index, table) {
      this.task = table[index]
      this.task.publishPlace = this.task.city + this.task.district + this.task.publishPlace
      this.categoryName[1] = table[index].categoryName
      this.categoryName[0] = table[index].pcategoryName
      console.log(table[index])
      this.imageList = JSON.parse(table[index].images)
      var imgList = [] 
      JSON.parse(table[index].images).map(item => {
        imgList.push({
          url: item
        })
      })
      this.fileList = imgList
      this.handleType = 2
      this.addTaskModal = true
    },
    // 准备修改
    taskWillChange() {
      this.$message.info('您现在可以进行修改')
      this.handleType = 3
    },
    // 保存
    save() {
      const data = {
        images: JSON.stringify(this.imageList),
        detail: this.task.detail,
        title: this.task.title,
        completeTime: this.task.completeTime,
        money: this.task.money * 100,
        proPhone: this.task.proPhone,

        city: this.task.city,
        province: this.task.province,
        district: this.task.district,
        lat: this.task.lat, //发布纬度
        lng: this.task.lng, //发布经度
        publishPlace: this.task.publishPlace,
        cityCode: this.task.cityCode,
        // 完成
        completeCity: this.task.completeCity,
        completeProvince: this.task.completeProvince,
        completeDistrict: this.task.completeDistrict,
        completeLat: this.task.completeLat, 
        completeLng: this.task.completeLng,
        completePlace: this.task.completePlace
      }
      data.categoryName = this.categoryName[1]
      data.pcategoryName = this.categoryName[0]
      if (!data.cityCode) {
        this.$message.error('搜索定位失败，无法获得区号')
        return
      }
      if (!data.categoryName) {
        this.$message.error('您还没有选择任务类别')
        return
      }
      if (!data.money && data.money !== 0) {
        this.$message.error('您还没有输入赏金金额')
        return
      }
      if (!data.proPhone) {
        this.$message.error('您还没有输入联系方式')
        return
      }
      if (!data.completeTime) {
        this.$message.error('您还没有输入完成时间')
        return
      }
      // 进行修改
      if (this.handleType === 3) {
        data.taskId = this.task.taskId
        taskUpdataBody(data).then(res => {
          if (res.status === 200) {
            this.$message.success('修改成功')
            this.addTaskModal = false
            this.initData()
          }
        })
      }
      // 进行添加
      if (this.handleType === 1) {
        this.$confirm('是否添加任务?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          taskAdd(data).then((res) => {
            if (res.status === 200) {
              this.res = res.data
              this.addTaskModal = false
              this.payModal = true
              console.log('返回', res.data)
            } else {
              this.$message.error('删除失败，请稍后重试')
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })        
        })
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
.taskManage{
  .pay{
    display:flex;
    justify-content:center;
    input{
      display:block!important;
    }
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
    margin-top: 79px;
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
   // 搜索
  .feedback{
    display: flex;
    flex-direction: row;
    margin-bottom: 16px;
    margin-left: 7px;
  }
    // 列表表格
  .content_form{
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
}
</style>
