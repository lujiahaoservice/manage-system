<template>
  <div class="client">
    <!-- 表格上面的头部 -->
    <div class="client_header">
      <div class="client_header1">
        <span class="profiling">客户概况</span>
      </div>
      <div class="client_header2">
        <div class="client_header2_left">
          <el-row class="client_header2_left_buttons">
            <el-button type="primary" @click="newCustomerButton">新建客户</el-button>
            <!-- <el-button plain class="blue_border" @click="open">导出客户</el-button> -->
            <!-- <el-button plain class="blue_border" @click="importBusiness=true">导入客户</el-button> -->
            <!-- 导入客户 -->
            <!-- <section class="import_mask" v-show="importBusiness">
              <div class="import_innerbox">
                <div class="import_header">
                  <span>批量导入</span>
                  <div class="close" @click="importClose">
                      <img src="https://static-shanghai.hanku.net.cn/guanbi%402x.png" alt="">
                      <span>关闭</span>
                  </div>
                </div>
                <div class="import_content">
                  <div class="uploading_box1">
                    <img src="https://static-shanghai.hanku.net.cn/1.png" alt="">
                    <span>请按照数据模板的格式准备要导入的数据:</span><br/>
                    <div class="unload_module">
                      <a href>下载数据模板</a>
                    </div>
                  </div>
                  <div class="uploading_box2">
                    <img src="https://static-shanghai.hanku.net.cn/2.png" alt="">
                    <span>请选择需要导入的文件:</span><br/>
                    <div class="unload_module">
                      <p>. 支持文件格式：<span>xls.xlsx.xec</span></p>
                      <p>. 支持文件大小：<span>10mb</span>以内</p>
                      <p>. 一次至多导入<span>500条</span>客户商机</p>
                    </div>
                  </div>
                  <div class="uploading_box3">
                    <img src="https://static-shanghai.hanku.net.cn/3.png" alt="">
                    <span>请选择数据重复时的操作方式:</span><br/>
                    <div class="unload_module">
                      <el-radio v-model="radio" label="1">覆盖</el-radio>
                      <el-radio v-model="radio" label="2">不导入</el-radio>
                    </div>
                  </div>
                  <div class="uploading_box4">
                    <el-upload
                      action="aaa"
                      class="upload-demo">
                      <el-button size="small" type="primary">+ 选择上传文件</el-button>
                    </el-upload>
                  </div>
                </div>
              </div>
            </section> -->
            <!-- 确认关闭 -->
            <!-- <section class="confirmClose" v-show="importcloseFlag">
              <div class="confirm_innerbox">
                <p>是否关闭当前导入客户</p>
                <div class="btns">
                  <el-button>取消</el-button>
                  <el-button @click="configClose">确认</el-button>
                </div>
              </div>
            </section> -->
          </el-row>
          <!-- 新增客户 -->
            <el-drawer 
              class="newCustomer"
              title="新增客户"
              :visible.sync="drawer"
              :direction="direction"
              :before-close="handleClose"
              size='960'
              >
              <div class="newCustomer_box">
                <p class="newCustomer_title">
                  <span class="profiling">客户概况</span>
                </p>
                <!-- 新增客户表单 -->
                <div class="newCustomer_form">
                  <!-- 表单 -->
                  <el-form ref="newCustomerform" :rules="rules" :model="newCustomerform">
                    <!-- 1 -->
                    <div class="newCustomer_form_id">
                      <p>客户 ID</p>
                      <div class="clientname">
                        <span>{{newCustomerform.uuid.replace(/\-/g, '')}}</span>
                      </div>
                    </div>
                    <!-- 2 -->
                    <div class="newCustomer_form_input_company newCustomer_form_input_display">
                      <el-form-item 
                      prop="company"
                      label="客户公司">
                        <el-input v-model="newCustomerform.company" placeholder="请输入公司名称"></el-input>
                      </el-form-item>
                      <el-form-item 
                      prop="contact"
                      label="联系人">
                        <el-input v-model="newCustomerform.contact" placeholder="请输入联系人姓名"></el-input>
                      </el-form-item>
                    </div>
                    <!-- 3 -->
                    <div class="newCustomer_form_input_display">
                      <el-form-item 
                      prop="phone"
                      label="联系电话">
                        <el-input type="number" v-model.number="newCustomerform.phone" placeholder="请输入常用联系号码"></el-input>
                      </el-form-item>
                      <el-form-item
                      prop="uscc"
                      label="社会组织信用代码"
                      class="newCustomer_form_uscc">
                        <el-input v-model="newCustomerform.uscc" placeholder="请输入社会组织信用代码"></el-input>
                      </el-form-item>
                    </div>
                    <!-- 4 -->
                    <div class="newCustomer_form_input_newCustomerDate">
                      <el-form-item 
                        prop="newCustomerDate"
                        label="请选择客户记账周期"
                        class="newCustomer_form_newCustomerDate">
                          <div class="newCustomertime">
                            <el-date-picker
                              v-model="newCustomerform.newCustomerDate"
                              type="monthrange"
                              range-separator="至"
                              start-placeholder="请选择年/月"
                              end-placeholder="请选择年/月"
                              value-format="yyyy-MM-dd">
                            </el-date-picker>
                          </div>
                      </el-form-item>
                    </div>
                    <!-- 5 -->
                    <div class="newCustomer_form_level">
                      <div class="newCustomer_form_level_left">
                        <el-form-item 
                          prop="level"
                          label="客户等级">
                          <el-select 
                          v-model="newCustomerform.level" 
                          placeholder="请选择客户等级">
                            <el-option label="普通客户" value="1"></el-option>
                            <el-option label="重要客户" value="2"></el-option>
                            <el-option label="优质客户" value="3"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div class="newCustomer_form_level_right">
                      </div>
                    </div>
                    <!-- 6 -->
                    <div>
                      <el-form-item
                      prop="clientSource"
                      label="客户来源"
                      class="newCustomer_form_clientSource">
                        <el-select
                        v-model="newCustomerform.clientSource"
                        @change="clientSource"
                        placeholder="请选择客户来源">
                          <el-option label="渠道" value="1"></el-option>
                        </el-select>
                        <el-select v-model="newCustomerform.clientSource2" placeholder="请选择客户来源" style="margin-left:24px" @change="opichange">
                          <el-option
                            v-for="(item) in clientSourceOptions"
                            :key="item.id"
                            :value="item.name"
                            :lable="item.name"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <!-- 7 -->
                    <div class="newCustomer_form_input_display">
                    <el-form-item label="分配会计" prop="chooseAccount">
                      <el-cascader
                       v-model="newCustomerform.chooseAccount"
                        :options="huanjieDepartment"
                        :props="{ expandTrigger: 'hover', value: 'id',label: 'name' }"
                        :show-all-levels="false"
                        ref="newnameEl2"
                        @change="DepartmentChange"
                        placeholder="请选择部门"
                        >
                        <template slot-scope="{ node, data }" >
                          <span>{{ data.name }}</span>
                          <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                        </template>
                      </el-cascader>
                      <el-select 
                      v-model="dataTransfer.newCurrentPrincipal" 
                      clearable 
                      placeholder="请选择会计"
                      @change="principalChange"
                      style="margin-left:30px"
                      >
                        <el-option
                          v-for="item in huanjiePerson"
                          :key="item.value"
                          :label="item.name"
                          :value="item.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    </div>
                    <!-- 8 -->
                    <div>
                      <el-form-item 
                      prop="taxPayType"
                      label="纳税类型">
                        <el-select
                        v-model="newCustomerform.taxPayType" 
                        placeholder="请选择纳税类型">
                          <el-option label="一般纳税人" value="1"></el-option>
                          <el-option label="小规模纳税人" value="2"></el-option>
                          <el-option label="个体工商户" value="3"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <!-- 8 -->
                    <div class="newCustomer_form_input_display">
                      <el-form-item 
                      prop="taxReportType"
                      label="报税类型">
                        <el-select
                        v-model="newCustomerform.taxReportType" 
                        placeholder="请选择报税类型">
                          <el-option label="季报" value="1"></el-option>
                          <el-option label="月报" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item 
                      prop="bzeroDeclare"
                      label="是否零申报">
                        <el-select
                          v-model="newCustomerform.bzeroDeclare" 
                          placeholder="请选择是否零申报"
                          @change="bzeroDeclare">
                          <el-option label="是" value="1"></el-option>
                          <el-option label="否" value="0"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <!-- 9 -->
                    <div class="newCustomer_form_input_display">
                      <el-form-item
                      label="客户标签">
                        <el-input v-model="newCustomerform.tag" placeholder="请输入客户标签"></el-input>
                      </el-form-item>
                      <el-form-item
                      prop="serviceAmount"
                        label="服务金额">
                        <el-input 
                          type= "number"
                          v-model="newCustomerform.serviceAmount"
                          @input="oninput"
                          placeholder="请输入服务金额/元">
                        </el-input>
                      </el-form-item>
                    </div>
                    <el-form-item 
                      prop="newCustomerform"
                      label="主营业务"
                      class="newCustomer_form_textarea">
                      <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" v-model="newCustomerform.mainBusiness " placeholder="请输入主营业务"></el-input>
                    </el-form-item>
                    <el-form-item 
                      prop="remarks"
                      label="备注说明"
                      class="newCustomer_form_textarea">
                      <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" v-model="newCustomerform.remarks" placeholder="请输入备注说明"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <el-row class="newCustomer_buttons">
                  <div>
                    <el-button type="primary" @click="newCustomer_submit('newCustomerform')" :disabled="isDisable">保存</el-button>
                    <el-button plain @click="drawer = false">取消</el-button>
                  </div>
                </el-row>
              </div>
            </el-drawer>
          <!-- 新增客户 end-->
        </div>
        <!-- <div class="client_header2_right">
          <div class="demo-input-suffix client_header2_right_search1">
            <el-input
              placeholder="搜索"
              suffix-icon="el-icon-search"
              >
            </el-input>
          </div>
          <el-button type="primary" class="client_header2_right_search2">查询</el-button>
        </div> -->
      </div>
    </div>
    <!-- 客户概况表格 -->
    <div class="client_form">
      <el-table
        ref="ProfilingTable"
        :data="ProfilingtableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{background:'rgba(228,238,249,1)', color:'#33393F'}"
        >
        <!-- @select="s_handleSelectionChange" -->
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          prop="company"
          label="企业名称">
        </el-table-column>
        <el-table-column
          prop="taxPayType"
          label="纳税类型">
          <template slot-scope="scope">
            <div v-if="scope.row.taxPayType==1">
              一般纳税人
            </div>
            <div v-if="scope.row.taxPayType==2">
              小规模纳税人
            </div>
            <div v-if="scope.row.taxPayType==3">
              个体工商户
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="contact"
          label="联系人">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系方式">
        </el-table-column>
        <el-table-column
          prop="accountantName"
          label="会计负责人">
        </el-table-column>
        <el-table-column
          prop="level"
          label="客户等级">
          <template slot-scope="scope">
            <div v-if="scope.row.level==1">
              普通客户
            </div>
            <div v-if="scope.row.level==2">
              重要客户
            </div>
            <div v-if="scope.row.level==3">
              优质客户
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="mainBusiness"
          label="主营业务">
        </el-table-column>
        <el-table-column
          prop="status"
          label="客户状态">
          <template slot-scope="scope">
            <div v-if="scope.row.status==1">
              代帐中
            </div>
            <div v-if="scope.row.status==2">
              暂挂
            </div>
            <div v-if="scope.row.status==3">
              终止 
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="tag"
          label="客户喜好">
        </el-table-column>
        <!-- 点击详情 -->
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick_details(scope.row), otherDrawer = true" type="text" size="small">
              <i 
              class="el-icon-search">
              </i>
              <div class="detailbox" :style="{textAline:'center',lineHeight:'32px'}">详情</div>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <NoData v-if="ProfilingtableData.length === 0" :noDataPadding="''"></NoData>
    </div>
    <!-- 删除和分页 -->
    <div class="client_form_delete_page">
      <!-- <div class="client_form_delete">
        <el-button plain @click="batchDel">批量删除</el-button>
      </div> -->
      <div class="client_form_page">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="gopage"
          :page-size="pageSize"
          :total="ptotal">
        </el-pagination>
      </div>
    </div>
    <!-- 点击出现详情弹出框 -->
    <el-drawer
      title="客户详情"
      :visible.sync="otherDrawer"
      :direction="direction"
      :before-close="handleClose"
      class="customerDetails"
      size='960'>
        <el-form :model="form">
          <el-tabs v-model="activeName" @tab-click="changetab">
            <!-- 信息 -->
            <el-tab-pane label="信息" name="first">
              <!-- 总 -->
              <div class="customerDetails_steps_box">
                <div class="customerDetails_steps">
                    <!-- 上 -->
                    <div class="customerDetails_time_scroll">
                      <div class="customerDetails_time">
                        <span v-for="item in detailsStepData" :key="item.id">
                          {{ item.taxDate.replace('-', '年').slice(0, -12) + '月' }}
                        </span>
                      </div>
                    </div>
                  <el-steps :active="stepIndex" align-center>
                    <!-- 下 -->
                    <!-- 已完成1 -->
                    <el-step v-for="item in detailsStepData" :key="item.id">
                      <template slot="icon" v-if="item.status === 1">
                        <div class="icon_else" >
                          <img src="@/assets/image/unfinish.png" alt="" style="width:40px; height:40px">
                        </div>
                      </template>
                      <template slot="icon" v-if="item.status === 2">
                        <div class="icon_else" >
                          <img src="@/assets/image/doing.png" alt="" style="width:40px; height:40px">
                        </div>
                      </template>
                      <template slot="icon" v-if="item.status === 3">
                        <div class="icon_else" style="">
                          <img src="@/assets/image/finish.png" alt="" style="width:40px; height:40px">
                        </div>
                      </template>
                      <template slot="title">
                        {{item.status === 1 ? '未开始' : item.accountantName}}
                      </template>
                      <template slot="description" v-if="item.status === 3">
                        <p>{{item.updated}}</p>
                      </template>
                      <template slot="description" class="steps_checkButtom">
                        <button v-if="item.status === 3" class="customerDetails_steps_button1" @click="checkButton(item)">查看</button>
                        <button v-if="item.status === 2" class="customerDetails_steps_button" @click="startBook(item)">开始记账</button>
                      </template>
                    </el-step>
                  </el-steps>
                </div>
              </div>
              <div class="bg_gray"></div>
              <!-- 信息表单 -->
              <div class="message_box">
                <div class="message_title_box">
                  <span class="message_title">基础信息</span>
                  <p class="message_title_box2">
                    <span class="message_title2">费用到期时间</span>
                    <span class="message_title3">{{ detailsInvalidDate }}</span>
                    <el-button type="primary" class="message_addbutton" @click="centerDialogVisible = true">添加代账期</el-button>
                  </p>
                </div>
                <!-- 记账查看弹出框1 -->
                <el-dialog
                  title="记账查看"
                  :close-on-click-modal = "false"
                  :visible.sync="innerVisible"
                  append-to-body
                  class="customerDetails_steps_button1_dialog">
                  <div class="message_box2">
                    <!-- 1 -->
                    <div class="message_customer_status message_common">
                      <span>当前报税期：</span>
                      <span style="background:rgba(241,248,255,1); border-radius:2px; text-align: center">{{ checkBook.taxDate ? checkBook.taxDate.replace('-', '年').slice(0, -12) + '月' : '' }}</span>
                    </div>
                    <!-- 2 -->
                    <div class="message_company message_common">
                      <span>纳税类型：</span>
                        <template>
                          <div v-if="checkTaxPayType==1">
                            一般纳税人
                          </div>
                          <div v-if="checkTaxPayType==2">
                            小规模纳税人
                          </div>
                          <div v-if="checkTaxPayType==3">
                            个体工商户
                          </div>
                        </template>
                    </div>
                    <!-- 3 -->
                    <div class="message_phone message_common">
                      <span>增值税(元)：</span>
                      <span>{{ checkValueAddedTax }}</span>
                    </div>
                    <!-- 4 -->
                    <div class="message_customerSource message_common">
                      <span>企业所得税(元)：</span>
                      <span>{{ checkCorporateIncomeTax }}</span>
                    </div>
                    <!-- 5 -->
                    <div class="message_dutiable message_common">
                      <span>个人所得税(元)：</span>
                      <span>{{ checkPersonalIncomeTax }}</span>
                    </div>
                    <!-- 6 -->
                    <div class="message_zeroDeclaration message_common">
                      <span>其他税费(元)：</span>
                      <span>{{ checkOtherTax }}</span>
                    </div>
                    <!-- 7 -->
                    <div class="message_customerLikes message_common">
                      <span>会计报表：</span>
                      <template>
                        <div v-if="checkBaccountingStatement == true">
                          是
                        </div>
                        <div v-if="checkBaccountingStatement == false">
                          否
                        </div>
                      </template>
                    </div>
                    <!-- 8 -->
                    <div class="message_common">
                      <span>税盘相关：</span>
                      <template>
                        <div v-if="checkBtaxControl == true">
                          是
                        </div>
                        <div v-if="checkBtaxControl == false">
                          否
                        </div>
                      </template>
                    </div>
                    <!-- 9 -->
                    <div class="message_common">
                      <span>是否扣税：</span>
                      <template>
                        <div v-if="checkBdeductTax == true">
                          是
                        </div>
                        <div v-if="checkBdeductTax == false">
                          否
                        </div>
                      </template>
                    </div>
                    <!-- 10 -->
                    <div class="message_common">
                      <span>是否清卡：</span>
                      <template>
                        <div v-if="checkBqingka == true">
                          是
                        </div>
                        <div v-if="checkBqingka == false">
                          否
                        </div>
                      </template>
                    </div>
                    <div class="message_common" style="padding-bottom:33px">
                      <span>资料：</span>
                      <img :src="profile" alt="">
                    </div>
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="innerVisible = false">确 定</el-button>
                    <el-button @click="innerVisible = false">取 消</el-button>
                  </span>
                </el-dialog>
                <!-- 开始记账弹出框 -->
                <el-dialog 
                  title="开始记账" 
                 :visible.sync="outerVisible" 
                 :close-on-click-modal = "false"
                  class="keepAccounts_dialog"
                  append-to-body>
                  <!-- 记账表单 -->
                  <el-form ref="keepAccountsform" :rules="keepAccountsRules" :model="keepAccountsform" label-width="130px">
                    <!-- 1 -->
                    <!-- <el-form-item label="当前报税期">{{  }}</el-form-item> -->
                    <el-form-item label="当前报税期">
                      <p>
                       {{bookData.taxDate ? bookData.taxDate.replace('-', '年').slice(0, -12) + '月' : ''}}
                      </p>
                    </el-form-item>
                    <!-- 2 -->
                    <el-form-item label="纳税类型">
                      <el-select
                        prop="taxPayType"
                        v-model="newCustomerform.taxPayType" 
                        placeholder="请选择纳税类型">
                        <el-option label="一般纳税人" value="1"></el-option>
                        <el-option label="小规模纳税人" value="2"></el-option>
                        <el-option label="个体工商户" value="3"></el-option>
                      </el-select>
                    </el-form-item>
                    <!-- 3 -->
                    <el-form-item 
                      prop="added_value_tax"
                      label="增值税(元)">
                      <el-input 
                        type= "number"
                        v-model="keepAccountsform.added_value_tax" 
                        @input="oninputAdded"
                        placeholder="请输入数字">
                      </el-input>
                    </el-form-item>
                    <!-- 4 -->
                    <el-form-item 
                      prop="corporate_income_tax"
                      label="企业所得税(元)">
                      <el-input 
                        type= "number"
                        v-model="keepAccountsform.corporate_income_tax" 
                        @input="oninputIncome"
                        placeholder="请输入数字"></el-input>
                    </el-form-item>
                    <!-- 5 -->
                    <el-form-item 
                      prop="individual_income_tax"
                      label="个人所得税(元)">
                      <el-input 
                        type= "number"
                        @input="oninputIndividual"
                        v-model="keepAccountsform.individual_income_tax" 
                        placeholder="请输入数字"></el-input>
                    </el-form-item>
                    <!-- 6 -->
                    <el-form-item 
                      prop="Other_taxes_and_fees"
                      label="其他税费(元)">
                      <el-input 
                        type= "number"
                        @input="oninputOther"
                        v-model="keepAccountsform.Other_taxes_and_fees" 
                        placeholder="请输入数字"></el-input>
                    </el-form-item>
                    <!-- 7 -->
                    <el-form-item 
                      prop="accounting_statement"
                      label="会计报表">
                      <el-radio-group v-model="keepAccountsform.accounting_statement">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item 
                      prop="resource"
                      label="税盘相关">
                      <el-radio-group v-model="keepAccountsform.resource">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item 
                      prop="tax_deduction"
                      label="是否扣税">
                      <el-radio-group v-model="keepAccountsform.tax_deduction">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item 
                      prop="clear_card"
                      label="是否清卡">
                      <el-radio-group v-model="keepAccountsform.clear_card">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item class="upload_file">
                      <el-upload
                        :action="actions"
                        :headers="headersobj"
                        :data="{}"
                        :limit="1"
                        :before-upload="beforeUpload"
                        :on-exceed="handleExceed"
                        :on-success="loadsuccess"
                        class="uploadFile">
                        <el-button size="small" type="primary">
                          <img src="../../assets/image/uploadFile_icon.png" alt="" style="margin-right:4px;">
                          <span>上传资料</span>
                        </el-button>
                      </el-upload>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('keepAccountsform')">确定</el-button>
                    <el-button @click="outerVisible = false">取 消</el-button>
                  </div>
                </el-dialog>
                <!-- 添加代账期弹出框 -->
                <el-dialog
                  title="增加代账期"
                  :visible.sync="centerDialogVisible"
                  :close-on-click-modal = "false"
                  :append-to-body="true"
                  class="addPayment_dialog">
                  <div class="addPayment_input">
                    <el-form-item label="请选择续期至">
                      <el-date-picker
                        v-model="addAccountForm.time"
                        type="month"
                        :picker-options="pickerOptions1"
                        placeholder="选择年月"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addAccount">确 定</el-button>
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                  </span>
                </el-dialog>
                <!-- 客户代账期结束提醒弹出框 -->
                <!-- <el-dialog
                  title="客户代账期结束提醒"
                  :visible.sync="dialogTableVisible"
                  :append-to-body="true"
                  class="addPayment_dialog2">
                  <div class="addPayment_input">
                    <el-form-item label="是否添加代账期">
                      <el-radio-group 
                        v-model="addAccountForm.sure">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                  <div class="addPayment_input">
                    <el-form-item label="请选择续期至">
                      <el-date-picker
                        v-model="addAccountForm.time"
                        type="month"
                        :picker-options="pickerOptions1"
                        placeholder="选择年月"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addAccount">确 定</el-button>
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                  </span>
                </el-dialog> -->
                <div class="message_box2">
                  <!-- 1 -->
                  <div class="message_customer_status message_common">
                    <span>客户状态</span>
                    <template style="background:rgba(241,248,255,1); border-radius:2px; text-align: center">
                      <div v-if="detailsStatus===1">
                        代账中
                      </div>
                      <div v-if="detailsStatus===2">
                        暂挂
                      </div>
                      <div v-if="detailsStatus===3">
                        终止
                      </div>
                    </template>
                  </div>
                  <!-- 2 -->
                  <div class="message_id message_common">
                    <span>客户 ID</span>
                    <span style="padding-top: 9px;height:36px; background:rgba(255,200,98,1); border-radius:2px; text-align: center">{{ detailsUuid }}</span>
                  </div>
                  <!-- 3 -->
                  <div class="message_company message_common">
                    <span>客户公司</span>
                    <span>{{ detailsCompany }}</span>
                    <span>联系人</span>
                    <span>{{ detailsContact }}</span>
                  </div>
                  <!-- 4 -->
                  <div class="message_phone message_common">
                    <span>联系电话</span>
                    <span>{{ detailsPhone}}</span>
                    <span>社会组织信用代码</span>
                    <span>{{ detailsUscc }}</span>
                  </div>
                  <!-- 5 -->
                  <div class="message_customerSource message_common">
                    <span>客户来源</span>
                    <span>{{ detailsSource2Name }}</span>
                    <span>客户等级</span>
                    <template>
                      <div v-if="detailsLevel===1">
                        普通客户
                      </div>
                      <div v-if="detailsLevel===2">
                        重要客户
                      </div>
                      <div v-if="detailsLevel===3">
                        优质客户
                      </div>
                    </template>
                  </div>
                  <!-- 6 -->
                  <div class="message_dutiable message_common">
                    <span>报税类型</span>
                    <template>
                      <div v-if="detailsTaxReportType==1">
                        季报
                      </div>
                      <div v-if="detailsTaxReportType==2">
                        月报
                      </div>
                    </template>
                    <span>分配会计</span>
                    <span>{{ detailsAccountantName }}</span>
                  </div>
                  <!-- 7 -->
                  <div class="message_zeroDeclaration message_common">
                    <span>纳税类型</span>
                    <template>
                      <div v-if="detailsTaxPayType==1">
                        一般纳税人
                      </div>
                      <div v-if="detailsTaxPayType==2">
                        小规模纳税人
                      </div>
                      <div v-if="detailsTaxPayType==3">
                        个体工商户
                      </div>
                    </template>
                    <span>是否零申报</span>
                    <template>
                      <div v-if="detailsBzeroDeclare==0">
                        否
                      </div>
                      <div v-if="detailsBzeroDeclare==1">
                        是
                      </div>
                    </template>
                  </div>
                  <!-- 8 -->
                  <div class="message_customerLikes message_common">
                    <span>客户喜好</span>
                    <span>{{ detailsTag }}</span>
                    <span>服务金额</span>
                    <span>{{ detailsServiceAmount }}</span>
                  </div>
                  <!-- 9 -->
                  <div class="message_business message_common">
                    <span>主营业务</span>
                    <span>{{ detailsMainBusiness }}</span>
                  </div>
                  <!-- 10 -->
                  <div class="message_descr message_common">
                    <span>备注说明</span>
                    <span>{{ detailsRemarks }}</span>
                  </div>
                </div>
              </div>
              <div class="bg_gray"></div>
              <div class="detailIncome">
                <div class="detailIncome_title_box">
                  <span class="detailIncome_title">收支明细</span>
                  <el-select 
                    v-model="type" 
                    no-data-text="收入" 
                    @change="switchTabRenven"
                    class="detailIncome_select">
                    <el-option label="收入" value="1"></el-option>
                    <el-option label="支出" value="2"></el-option>
                  </el-select>
                  <p class="detailIncome_title_box2">
                    <el-button type="primary"  @click="redirect('1')">添加收款</el-button>
                    <el-button @click="redirect('2')">添加支出</el-button>
                  </p>
                </div>
                <!-- 收支明细表格 -->
                <div class="detailIncome_form">
                  <el-table
                    :data="revenue_table"
                    v-if="revenue_table.length != 0"
                    style="width: 100%"
                    max-height="288">
                    <el-table-column
                      label="类型"
                    >
                      <template>
                        <div v-if="type === '1' ? true : false">收入</div>
                        <div v-else>支出</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="customerName"
                      label="客户名称"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="amount"
                      label="金额"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="updated"
                      label="时间"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="status"
                      label="状态"
                      fixed="right"
                      width="180">
                      <template slot-scope="scope">
                        <div>{{checkType(scope.row.status).txt}}</div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <NoData v-if="revenue_table.length === 0" :noDataPadding="''"></NoData>
                </div>
                <div class="detailIncome_footer">
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="pageSize"
                    :total="ptotalTab"
                    @current-change="gopageTab"
                    >
                  </el-pagination>
                </div>
              </div>
              <!-- <div class="bg_gray detailIncome_form_bg"></div> -->
              <!-- <div class="detailIncome_addComments">
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="">
                    <img src="../../assets/image/no-data.png" alt="">
                    <el-input v-model="form.name" placeholder="请输入文字"></el-input>
                  </el-form-item>
                </el-form>
              </div> -->
            </el-tab-pane>
            <!-- 动态 -->
            <el-tab-pane label="动态" name="second">
              <!-- <Dynamic></Dynamic> -->
              <div class="dynamic_content">
                <!-- 港的话 -->
                <div class="scroll_div infinite-list-wrapper">
                  <div class="div_else">
                  <div 
                    class="websocket_box" 
                    v-infinite-scroll="load"
                    infinite-scroll-disabled="disabled">
                    <div v-for="(item, idx) in dynamicList" :key="idx">
                      <div :class="{dynamicItem:true, dynamicItemWid:(item.type === '5'? true:false)}" :key="item.id">
                        <div class="sign_time">
                          <div class="sign" :style="{'background':signTitCor(item.type).color}">{{signTitCor(item.type).sign}}</div>
                          <div class="time">{{item.created}}</div>
                        </div>
                        <span>{{item.operatorName}}&nbsp;</span>
                        <span>{{item.content}}&nbsp;</span>
                        <span>{{item.assigneeName }}</span>
                        <!-- <div class="opportunity" v-else>
                          <span>{{item.operatorName}}</span>
                          <span class="span2">{{item.content}}</span>
                          <span>{{item.assigneeName}}</span>
                        </div> -->
                      </div>
                    </div>
                    </div>
                  </div>
                  <p v-if="loading" style="padding-left:20px">加载中...</p>
                  <p v-if="noMore" style="padding-left:20px">没有更多了</p>
                </div>
                <!-- 一些操作 -->
                <div class="operating">
                  <div class="left_tx">
                    <el-image src="https://static-shanghai.hanku.net.cn/jqyapp/user/IMG_1136.JPG" fit="cover"></el-image>
                  </div>
                  <div class="rigth_tab">
                    <div class="tab_">
                      <div :class="{active: TabFourFlag1}" @click="switchTabFour('1')">记录</div>
                      <div :class="{active: TabFourFlag2}" @click="switchTabFour('2')">客户上门</div>
                      <div :class="{active: TabFourFlag3}" @click="switchTabFour('3')">投诉</div>
                      <div :class="{active: TabFourFlag4}" @click="switchTabFour('4')">客户回访</div>
                    </div>
                    <textarea placeholder="请输入文字" v-model="textArea"></textarea>
                    <div class="bot_">
                      <el-date-picker
                        v-model="datetimeValue"
                        type="datetime"
                        placeholder="下次跟进时间"
                        align="right"
                        format= 'yyyy-MM-dd hh:mm:ss'
                        :editable="false"
                        @change="pickerChange"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                      <div class="two_qf_btn">
                        <div class="quit">取消</div>
                        <div class="submit" @click="submitFun">发布</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <!-- 资料管理 -->
            <el-tab-pane label="资料管理" name="third">
              <!-- 父 -->
              <ul class="documentManagement_second">
                <li @click="consign" :class="{active:cur==0}" ><span>已寄存</span></li>
                <li @click="confirmed" :class="{active:cur==1}" ><span>已确认</span></li>
                <li @click="customerInfo" :class="{active:cur==2}" ><span>客户资料</span></li>
                <li @click="operationLog" :class="{active:cur==3}" ><span>操作日志</span></li>
              </ul>
              <!-- 子 -->
              <div class="documentManagement_secondshow">
                <!-- 1 已寄存 -->
                <div class="topnav-show1 topnav-show" v-if="cur==0" style="overflow:auto">
                  <ul v-infinite-scroll="consignLoad" infinite-scroll-disabled="consignDisabled">
                    <li v-for="(item, index) in consignList" :key="index">
                      <div>
                        <h5 class="show_circle">客户材料已寄出，请确认！</h5>
                      </div>
                      <div class="detailsContent detailsContent_sureconfirmed">
                        <p class="detailsContent_bg">材料名称：{{ item.physicalProfileName }}</p>
                        <p class="remark">材料内容：{{ item.physicalProfileContent }}</p>
                        <div class="requirements">
                          <p class="checkdetails">查看详情</p>
                          <p class="requirements_bottons">
                            <el-button @click="unreceived(item.id)">未收到</el-button>
                            <el-button type="primary" @click="received(item.id)">确认收到</el-button>
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <!-- 2 已确认 -->
                <div class="topnav-show1 topnav-show" v-if="cur==1" style="overflow:auto">
                  <ul v-infinite-scroll="sureLoad" infinite-scroll-disabled="sureDisabled">
                    <li v-for="(item, index) in sureList" :key="index">
                      <div>
                        <h5 class="show_circle">客户材料已寄出，请确认！</h5>
                      </div>
                      <div class="detailsContent detailsContent_sureconfirmed">
                        <p class="detailsContent_bg">材料名称：{{ item.physicalProfileName }}</p>
                        <p class="remark">材料内容：{{ item.physicalProfileContent }}</p>
                        <div class="requirements">
                          <p class="checkdetails">查看详情</p> 
                          <!-- 查看详情不用管 -->
                          <p class="requirements_bottons">
                            <el-button type="primary" v-if="!item.bdelivered">未收到</el-button>
                            <el-button type="primary" v-if="item.bdelivered">已收到</el-button>
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <!-- 3客户资料 图文资料查看图片1 -->
                <div class="topnav-show3" v-if="cur==2">
                  <div class="topnav-show3_left_box" style="overflow:auto">
                    <p class="topnav-show3_left_titletop">图文资料</p>
                    <ul class="topnav-show3_left" v-infinite-scroll="picLoad" infinite-scroll-disabled="picDisabled">
                      <li v-for="(item, index) in picList" :key="index">
                        <div class="topnav-show3_left_title">
                          <p class="show_circle">{{item.digitalProfileName}}</p>
                          <p class="viewDetails" @click="picCheck(item.digitalProfileUrl)">查看</p>
                        </div>
                        <p class="detailsContent detailsContent_img">
                          <!-- <img :src="item.digitalProfileUrl" alt=""> -->
                           <img src="https://static-shanghai.hanku.net.cn/jqy_system/client/customerDetails/img_left.png" alt="">
                           <img src="https://static-shanghai.hanku.net.cn/jqy_system/client/customerDetails/img_center.png" alt="">
                           <img src="https://static-shanghai.hanku.net.cn/jqy_system/client/customerDetails/img_right.png" alt="">
                          <!--<img src="https://static-shanghai.hanku.net.cn/jqy_system/client/customerDetails/excel.png" alt="">
                          <img src="https://static-shanghai.hanku.net.cn/jqy_system/client/customerDetails/txt.png" alt="">
                          <img src="https://static-shanghai.hanku.net.cn/jqy_system/client/customerDetails/other.png" alt="">
                          <img src="https://static-shanghai.hanku.net.cn/jizhihudong/homepage/solution/solution1.1.png" alt="">
                          <img src="https://static-shanghai.hanku.net.cn/jizhihudong/homepage/solution/solution1.1.png" alt=""> -->
                        </p>
                      </li>
                      <p v-if="picLoading">加载中...</p>
                      <p v-if="picMore">没有更多了</p>
                    </ul>
                  </div>
                  <el-dialog
                    append-to-body
                    width="40%"
                    :close-on-click-modal = "false"
                    :visible.sync="dialogFormVisible">
                    <ul>
                      <li style="display: flex; flex-direction: column; align-items: center;">
                        <img :src="urlCurrent" alt="图文资料查看的图片" style="width:80%; padding-bottom:50px;">
                      </li>
                    </ul>
                  </el-dialog>
                  <!-- 3客户资料 寄存材料2 -->
                  <div class="topnav-show3_right_box" style="overflow:auto">
                    <p class="topnav-show3_left_titletop">寄存材料</p>
                    <ul class="topnav-show3_right" v-infinite-scroll="stuffLoad" infinite-scroll-disabled="stuffDisabled">
                      <li class="topnav-show3_right_li" v-for="(item, index) in stuffList" :key="index">
                        <div class="topnav-show3_right_li_content">
                          <p>材料名称：{{ item.physicalProfileName }}</p>
                          <p>材料内容：{{ item.physicalProfileContent }}</p>
                        </div>
                      </li>
                      <p v-if="stuffLoading">加载中...</p>
                      <p v-if="stuffMore">没有更多了</p>
                    </ul>
                  </div>
                </div>
                <!-- 4 操作日志-->
                <div class="topnav-show4 topnav-show" v-if="cur==3" style="overflow:auto">
                  <div class="topnav-show4_box" v-infinite-scroll="journalLoad" infinite-scroll-disabled="journalDisabled">
                    <p v-for="(item, index) in journalList" :key="index">
                      <span>{{ item.updated }}</span>
                      <span>{{ item.content }}</span>
                    </p>
                    <div v-if="journalLoading" style="margin-left: 35px; margin-top:20px">加载中...</div>
                    <div v-if="journalMore" style="margin-left: 35px; margin-top:20px">没有更多了</div>
                  </div>
                </div>
              </div>
              <clientinformation @loadAgain="loadAgain" :customerId2="detailsId"/>
            </el-tab-pane>
          </el-tabs>
          <div class="operation">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-submenu index="1">
                <template slot="title">操作</template>
                <!-- <el-menu-item index="2-1">编辑内容</el-menu-item> -->
                <el-menu-item index="2-1">转移负责人</el-menu-item>
                <el-menu-item index="2-2">变更来源</el-menu-item>
                <!-- <el-menu-item index="2-4">外勤派工</el-menu-item> -->
                <el-menu-item index="2-3">暂挂客户</el-menu-item>
                <el-menu-item index="2-4">终止客户</el-menu-item>
                <el-menu-item index="2-5" @click="serviceChangesButton1">服务变更</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </el-form>
    </el-drawer>
    <!-- 操作下拉的服务变更弹出框 -->
    <el-dialog
      title="服务变更"
      :visible.sync="dialogVisible"
      :before-close="serviceClose"
      :close-on-click-modal = "false"
      :append-to-body="true"
      class="operation_dialog">
      <!-- 服务变更表格 -->
      <div class="serviceChanges">
        <el-table
          ref="serviceChangesTable"
          :data="serviceChanges_tableData"
          tooltip-effect="dark"
          class="serviceChanges_table"
          style="width: 100%"
          :header-cell-style="{background:'rgba(228,238,249,1)', color:'#33393F'}"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column
            prop="changeItem"
            label="变更项">
          </el-table-column>
          <el-table-column
            prop="before_change"
            label="变更前">
          </el-table-column>
          <el-table-column
            prop="after_change"
            label="变更后">
            <template slot-scope="scope">
              <el-select v-model="scope.row.value" placeholder="请选择" @change="aa(scope.row, scope.$index)">
                  <el-option
                    v-for="item in options[scope.$index]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </template>
          </el-table-column>
          <!-- 点击出现详情 -->
        </el-table>
        
        <NoData v-if="serviceChanges_tableData.length === 0" :noDataPadding="''"></NoData>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="serviceChangesButton">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 操作下拉的服务变更弹出框 end-->
    <!-- 转移负责人 -->
    <template v-if="openPopIndex === '1'">
      <el-dialog
        :visible.sync="uploadPop"
        :close-on-click-modal = "false"
        v-if="uploadPop"
        width="35%"
        :append-to-body="true"
        class="s_task_client"
        >
        <div class="task_transferElse">
          <!-- 头部 -->
          <div class="operation_header">
            <span>转移负责人</span>
            <span @click="FuncancerUpload"><img src="https://static-shanghai.hanku.net.cn/Polaris-icon%EF%BC%8FMinor%EF%BC%8FMono%EF%BC%8FCancel%20%281%29.png" alt=""></span>
          </div>
          <!-- 内容 -->
          <div class="transFer_content">
            <el-form :model="dataTransfer" :rules="rulesElse" ref="dataTransfer" label-width="140px" class="demo-ruleForm"> 
              <el-form-item 
              label="客户联系人" 
              prop="region" 
              >
                <el-input v-model="dataTransfer.clientPrincipal" class="bor_none" readonly></el-input>
              </el-form-item>
              <el-form-item 
              label="会计负责人"
              >
                <el-cascader
                  :options="huanjieDepartment"
                  :props="{ expandTrigger: 'hover', value: 'id',label: 'name' }"
                  :show-all-levels="false"
                  ref="newnameEl2"
                  @change="DepartmentChange"
                  >
                  <template slot-scope="{ node, data }" >
                    <span>{{ data.name }}</span>
                    <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                  </template>
                </el-cascader>
              </el-form-item>
              <el-form-item 
              label=""
              >
                <el-select 
                v-model="dataTransfer.newCurrentPrincipal" 
                clearable 
                placeholder="请选择新负责人"
                @change="principalChange"
                >
                  <el-option
                    v-for="item in huanjiePerson"
                    :key="item.value"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <!-- 底部 -->
          <div class="operation_footer">
            <span slot="footer" class="dialog-footer">
              <el-button type="primary"  @click="contactChange">确认</el-button>
              <el-button class="waitMean" @click="FuncancerUpload">取消</el-button>
            </span>
          </div>
        </div>
      </el-dialog>
    </template>
    <!-- 变更来源 -->
    <template v-if="openPopIndex === '2'">
      <el-dialog
        :visible.sync="uploadPop"
        v-if="uploadPop"
        :close-on-click-modal = "false"
        width="30%"
        :append-to-body="true"
        class="s_task_client"
        >
        <div class="task_finsh_else">
          <!-- 头部 -->
          <div class="operation_header">
            <span>变更来源</span>
            <span @click="FuncancerUpload"><img src="https://static-shanghai.hanku.net.cn/Polaris-icon%EF%BC%8FMinor%EF%BC%8FMono%EF%BC%8FCancel%20%281%29.png" alt=""></span>
          </div>
          <div class="change_LY">
            <el-form ref="changeType" :model="changeType" label-width="150px">
              <el-form-item 
                label="变更来源"
                :rules="{
                  required: true, message: '请选择任务来源', trigger: 'change'
                }">
                <el-select 
                  style="margin-bottom:16px"
                  v-model="changeType.type" 
                  @change="FuntaskSource"
                  placeholder="请选择"
                  >
                    <el-option label="渠道" value="1"></el-option>
                  </el-select>
                <el-select 
                v-model="changeType.text"
                placeholder="请选择客户来源"
                @change="opichangeElse"
                >
                  <el-option
                    v-for="(item) in taskSourceOptions"
                    :key="item.id"
                    :value="item.name"
                    :lable="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              </el-form>
          </div>
          <!-- 底部 -->
          <div class="operation_footer">
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="sourceChange">确认</el-button>
              <el-button class="waitMean" @click="FuncancerUpload">取消</el-button>
            </span>
          </div>
        </div>
      </el-dialog>
    </template>
      <!-- 内容 暂挂客户 -->
    <template v-if="openPopIndex === '3'">
      <el-dialog
        :visible.sync="uploadPop"
        v-if="uploadPop"
        :close-on-click-modal = "false"
        width="35%"
        :append-to-body="true"
        class="s_task_client"
        >
        <div class="task_Hold_else">
          <!-- 头部 -->
          <div class="operation_header">
            <span>暂挂客户</span>
            <span @click="FuncancerUpload"><img src="https://static-shanghai.hanku.net.cn/Polaris-icon%EF%BC%8FMinor%EF%BC%8FMono%EF%BC%8FCancel%20%281%29.png" alt=""></span>
          </div>
          <!-- 内容 -->
          <div class="hold_content">
            <el-form :model="holdTask" ref="holdTask" label-width="140px" class="demo-ruleForm"> 
              <el-form-item 
              label="暂挂原因"
              prop="suspensionRea" 
              :rules="{
                required: true, message: '请输入暂挂原因', trigger: 'blur'
              }" 
              >
                <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" v-model="holdTask.suspensionRea" placeholder="请输入暂挂原因"></el-input>
              </el-form-item>
              <el-form-item 
              label="暂挂说明"
              prop="suspensionMea" 
              :rules="{
                required: true, message: '请输入暂挂说明', trigger: 'blur'
              }"
              >
                <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" v-model="holdTask.suspensionMea" placeholder="请输入暂挂说明"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <!-- 底部 -->
          <div class="operation_footer">
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="pendingCustomer">确认</el-button>
              <el-button class="waitMean" @click="FuncancerUpload">取消</el-button>
            </span>
          </div>
        </div>
      </el-dialog>
    </template>
    <!-- 内容 终止任务 -->
    <template v-if="openPopIndex === '4'">
      <el-dialog
        :visible.sync="uploadPop"
        v-if="uploadPop"
        :close-on-click-modal = "false"
        width="30%"
        :append-to-body="true"
        class="s_task_client"
        >
        <div class="task_finsh_else">
          <!-- 头部 -->
          <div class="operation_header">
            <span>终止客户</span>
            <span @click="FuncancerUpload"><img src="https://static-shanghai.hanku.net.cn/Polaris-icon%EF%BC%8FMinor%EF%BC%8FMono%EF%BC%8FCancel%20%281%29.png" alt=""></span>
          </div>
          <div class="finsh_content">
            <p>温馨提示：客户终止后，不再进行客户的工作提示；对终止客户进行任何操作会自动重启客户。</p>
          </div>
          <!-- 底部 -->
          <div class="operation_footer">
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="endCustomer">确认</el-button>
              <el-button class="waitMean" @click="FuncancerUpload">取消</el-button>
            </span>
          </div>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import clientinformation from './clientInformation'
import NoData from '@/components/no-data'
// import Dynamic from './dynamic/'
import { addClient, clientSource, getTreeList, departmentUser, profilingApiList, customerDetailsApi, detailsStepApi, serviceChangesApi, addAccountperiodApi, dynamicApi, checkDynamicApi, beginAccountApi, checkAccountApi, clientDataApi, checkDataApi, journalApi, confirmReceiptApi, taskSource, contactChangesApi, sourceChangesApi, pendingApi, endCustomerApi } from '@/api/client'
import { reviewList, expenseList } from '@/api/task/taskDetail/revenue'
// import { mapGetters } from 'vuex'
import { selectId } from '@/plugins/select'
// import { log } from 'util'
export default {
  props: {
    indexFlag: {
      type: String
    }
    // detail: {
    //   type: String
    // },
    // getIt: {
    //   type: Object
    // }
  },
  inject: ['reload'],
  components: {
    clientinformation,
    NoData
    // Dynamic
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    } //新增客户的手机验证
    return {
      isDisable: false, //防止重复点击
      openPopIndex: '',
      uploadPop: false,
      // 变更来源
      taskSourceOptions: [], //任务来源列表
      changeType: {
        type: '',
        text: '',
        changeTypeId: ''
      },
      rulesElse: {
        region: [
          { required: true, trigger: 'blur' }
        ]
      },
      // 暂挂任务
      holdTask: {
        suspensionRea: '',
        suspensionMea: ''
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      //资料管理
      //收入支出切换
      detailsId: '',
      revenue_item: [
        {
          txt: '服务金额',
          number: '0'
        }, {
          txt: '已收',
          number: '0'
        }, {
          txt: '待收',
          number: '0'
        }, {
          txt: '支出',
          number: '0'
        }, {
          txt: '毛利',
          number: '0'
        }
      ],
      revenue_table: [
        {
          Types: '收入',
          Amount: '300.00',
          status: '审核',
          time: '2019-11-11'
        }, {
          Types: '收入',
          Amount: '300.00',
          status: '审核',
          time: '2019-11-11'
        }, {
          Types: '收入',
          Amount: '300.00',
          status: '审核',
          time: '2019-11-11'
        }, {
          Types: '收入',
          Amount: '300.00',
          status: '审核',
          time: '2019-11-11'
        }, {
          Types: '收入',
          Amount: '300.00',
          status: '审核',
          time: '2019-11-11'
        }, {
          Types: '收入',
          Amount: '300.00',
          status: '审核',
          time: '2019-11-11'
        }
      ],
      type: '1',
      pageNumTab: 1,
      pageSizeTab: 5,
      ptotalTab: 0, //end 收入支出切换
      loading: false,
      count: 1,
      // 分页
      currentPage: 1,
      total: 0,
      delIds: '',
      //导出商机
      radio: '1',
      importBusiness: false,
      importcloseFlag: false,
      logFormVisible: false, //详情
      drawer: false, //新建客户
      otherDrawer: false, //新建客户
      direction: 'rtl', //从右往左 
      form: {
      }, //新增客户表单
      addAccountForm: {
        time: '',
        sure: ''
      },
      newCustomerform: {
        uuid: this.$uuid().replace(/\-/g, ''),
        company: '',
        contact: '',
        accountantName: '',
        bzeroDeclare: '',
        phone: '',
        level: '',
        newCustomerDate: '',
        clientSource: '',
        clientSource2: '',
        ChooseDepartment: '',
        chooseAccount: '',
        accounting_distribution: '',
        taxPayType: '',
        taxReportType: '',
        uscc: '',
        serviceAmount: '',
        mainBusiness: '',
        remarks: '',
        tag: ''
        // accountantId: ''
      }, //新增客户表单
      accountantId: '',
      rules: {
        company: [
          { required: true, message: '公司不能为空', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '联系人不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: checkPhone, trigger: 'blur' }
        ],
        uscc: [
          { required: true, message: '请输入社会组织信用代码', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请选择客户等级', trigger: 'change' }
        ],
        newCustomerDate: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        clientSource: [
          { required: true, message: '请选择客户来源', trigger: 'change' }
        ],
        chooseAccount: [
          { type: 'array', required: true, message: '请选择部门和会计', trigger: 'change' }
        ],
        taxPayType: [
          { required: true, message: '请选择纳税类型', trigger: 'change' }
        ],
        taxReportType: [
          { required: true, message: '请选择报税类型', trigger: 'change' }
        ],
        bzeroDeclare: [
          { required: true, message: '请选择是否零申报', trigger: 'change' }
        ],
        serviceAmount: [
          { required: true, message: '请输入数字', trigger: ['blur', 'change'] }
        ]
      },
      keepAccountsRules: {
        taxPayType: [
          { message: '请选择活动区域', trigger: 'change' }
        ],
        added_value_tax: [
          { message: '请输入数字', trigger: ['blur', 'change'] }
        ],
        corporate_income_tax: [
          { message: '请输入数字', trigger: ['blur', 'change'] }
        ],
        individual_income_tax: [
          { message: '请输入数字', trigger: ['blur', 'change'] }
        ],
        Other_taxes_and_fees: [
          { message: '请输入数字', trigger: ['blur', 'change'] }
        ],
        accounting_statement: [
          { message: '请选择会计报表', trigger: 'change' }
        ],
        resource: [
          { message: '请选择税盘相关', trigger: 'change' }
        ],
        tax_deduction: [
          { message: '请选择是否扣税', trigger: 'change' }
        ],
        clear_card: [
          { message: '请选择是否清卡', trigger: 'change' }
        ]
      },
      clientSourceOptions: [{
        value: '',
        label: ''
      }],
      // chooseDepartmentOptions: [{
      //   value: '',
      //   label: ''
      // }],
      // chooseAccountingOptions: [{
      //   value: '',
      //   label: ''
      // }],
      huanjieName: [], // 环节名称
      huanjieDepartment: [], //环节部门
      huanjiePerson: [], //环节负责人
      huanjieDepartmentId: null, //选择之后的
      huanjieDepartmentName: null, //选择之后的
      // 任务转发
      dataTransfer: {
        clientPrincipal: '', // 客户联系人
        currentPrincipal: '', // 当前环节负责人
        newCurrentPrincipal: '', // 当前环节新负责人
        sendMessage: '', //转出留言
        departmentId: '', //部门id
        userId: '', // 会计id
        userName: '' //会计名字
      },
      source2Id: '',
      source2Name: '',
      pickerOptionsStart: {},
      pickerOptionsEnd: {},
      message: {
        message_customer_status: '代账中',
        message_clientGrade: '重要客户',
        message_accounting: '不认识',
        message_dutiable: '不知道',
        message_payTaxes: '重要客户',
        message_zeroDeclaration: '是',
        message_customerLikes: '看电影',
        message_serviceAmount: '代账中',
        message_business: '代账中',
        message_descr: '备注说明'
      },
      detailsInvalidDate: '',
      detailsStatus: '',
      detailsUuid: '',
      detailsCompany: '',
      detailsContact: '',
      detailsAccountantId: '',
      detailsPhone: '',
      detailsUscc: '',
      detailsSource1Id: '',
      detailsSource1Name: '',
      detailsSource2Id: '',
      detailsSource2Name: '',
      detailsLevel: '',
      detailsTaxReportType: '',
      detailsAccountantName: '',
      detailsTaxPayType: '',
      detailsBzeroDeclare: '',
      detailsTag: '',
      detailsServiceAmount: '',
      detailsMainBusiness: '',
      detailsRemarks: '',
      detailsTaskBaseId: '',
      detailsTaskProductId: '',
      pageNum: 1,
      pageSize: 10,
      ptotal: 0,
      ProfilingtableData: [], //客户概况表格数据
      serviceChanges_tableData: [
        {
          changeItem: '报税类型',
          before_change: ''
        },
        {
          changeItem: '纳税类型',
          before_change: ''
        },
        {
          changeItem: '是否零申报',
          before_change: ''
        }], //服务变更表格数据
      multipleSelection: [],
      activeName: 'first',
      cur: 0,
      activeIndex: '1', //操作下拉
      dialogVisible: false, //操作下拉弹出框
      outerVisible: false, //记账弹出框
      innerVisible: false, //记账查看弹出框1
      dialogTableVisible: false, //客户代账期结束提醒弹出框
      centerDialogVisible: false,
      dialogFormVisible: false, //资料管理的图片查看
      detailsStepData: [],
      options: [
        [{
          value: 1,
          label: '季报'
        }, {
          value: 2,
          label: '月报'
        }],
        [{
          value: 1,
          label: '一般纳税人'
        }, {
          value: 2,
          label: '小规模纳税人'
        }, {
          value: 3,
          label: '个体工商户'
        }],
        [{
          value: 1,
          label: '是'
        }, {
          value: 0,
          label: '否'
        }]
      ], //服务变更
      //value: 1, //服务变更
      keepAccountsform: {
        // Current_filing_period: '12月',
        added_value_tax: '',
        corporate_income_tax: '',
        individual_income_tax: '',
        Other_taxes_and_fees: '',
        accounting_statement: '',
        tax_deduction: '',
        clear_card: ''
      },
      bAccountingStatement: '', //会计报表
      bTaxControl: '', //税盘相关
      bDeductTax: '', //是否扣税
      bQingka: '', //是否请卡
      Current_filing_period: '',
      Current_filing_period2: '',
      checkId: '',
      checkTaxPayType: '',
      checkValueAddedTax: '', 
      checkCorporateIncomeTax: '',
      checkPersonalIncomeTax: '',
      checkOtherTax: '',
      checkBaccountingStatement: '',
      checkBtaxControl: '',
      checkBdeductTax: '',
      checkBqingka: '',
      profile: '',
      //动态
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      datetimeValue: '',
      textArea: '',
      dynamicList: [],
      TabFourFlag1: true,
      TabFourFlag2: false,
      TabFourFlag3: false,
      TabFourFlag4: false,
      TabType: 1,
      pageTotal: 0,
      switchBtn: false,
      stepIndex: 0,
      moneyValue: '',
      AddedValue: '',
      IncomeValue: '',
      OtherValue: '',
      IndividualValue: '',
      actions: 'https://api-web.jianqiyun.net/common/upload',
      headersobj: {
        'Authriozation': localStorage.getItem('jqyToken'),
        'tokenId': localStorage.getItem('tokenId')
      },
      dataUpload: {
        dataName: '', // 文件名称
        dataUrl: '', // 文件地址
        taskProductId: '' //任务对应产品id
      },
      bookData: {},
      checkBook: {},
      rowData: {},
      innerDrawer: false,
      table: false,
      // 图片上传
      dialogImageUrl: '',
      headers: {
        'Authriozation': localStorage.getItem('jqyToken'),
        'tokenId': localStorage.getItem('tokenId')
      },
      // 公告 分页参数
      picpagenation: {
        pageNum: 0,
        pageSize: 10,
        totalPages: 1
      },
      picList: [], // 资料管理图片list
      picUrlList: '', //图文资料数组里的所有图片
      picLoading: false, // 图文加载
      picMore: false, // 图文更多
      stuffpagenation: {
        pageNum: 0,
        pageSize: 10,
        totalPages: 1
      },
      stuffList: [], // 寄存材料list
      stuffLoading: false, // 寄存材料
      stuffMore: false, // 寄存材料更多
      consignpagenation: {
        pageNum: 0,
        pageSize: 10,
        totalPages: 1
      },
      consignList: [], // 待寄存list
      consignLoading: false, // 待寄存加载
      consignMore: false, // 待寄存更多
      surepagenation: {
        pageNum: 0,
        pageSize: 10,
        totalPages: 1
      },
      sureList: [], // 已确认list
      sureLoading: false, // 已确认加载
      sureMore: false, // 已确认更多
      journalpagenation: {
        pageNum: 0,
        pageSize: 10,
        totalPages: 1
      },
      journalList: [], // 公告list
      journalLoading: false, // 图文加载
      journalMore: false, // 图文更多
      urlCurrent: '',
      ruleFormPerson: '',
      taskProductId: ''
    }
  },
  computed: {
    noMore() {
      return this.count >= this.pageTotal
    },
    disabled() {
      return this.loading || this.noMore
    },
    picDisabled() {
      return this.picLoading || this.picMore
    },
    stuffDisabled() {
      return this.stuffLoading || this.stuffMore
    },
    consignDisabled() {
      return this.consignLoading || this.consignMore
    },
    sureDisabled() {
      return this.sureLoading || this.sureMore
    },
    journalDisabled() {
      return this.journalLoading || this.journalMore
    }
  },
  methods: {
    // ---------------------------- 操作 starts
    FuncancerUpload() {
      this.uploadPop = false // 取消
    },
    handleSelect(key, keyPath) {
      if (key === '2-1') {
        this.openPopIndex = '1' // 转移负责人
        this.FungetTreeList('1')
      } else if (key === '2-2') {
        this.openPopIndex = '2' // 变更来源
      } else if (key === '2-3') {
        this.openPopIndex = '3' // 暂挂任务
      } else if (key === '2-4') {
        this.openPopIndex = '4' // 终止任务
      }
      this.uploadPop = true
    },
    // 任务来源 （变更来源）
    FuntaskSource(e) {
      const data = {
        pageSize: 500,
        pageNum: 1
      }
      taskSource(data).then(res => {
        if (res.data.code === '200') {
          this.taskSourceOptions = res.data.data.records
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    //任务来源id
    opichangeElse(e) {
      this.changeType.changeTypeId = selectId(this.taskSourceOptions, e)
    }, 
    // 环节部门
    FungetTreeList(type) {
      // 上面两个先显示
      if (type === '1') {
        this.dataTransfer.clientPrincipal = this.ruleFormPerson // 客户联系人
      }
      getTreeList({}).then((res) => {
        const result = res.data
        if (result.code === '200') {
          this.huanjieDepartment = result.data
        } else {
          this.$message({
            message: result.msg,
            type: 'error'
          })
          return
        }
      })
    },
    // --------------------------------- 操作 end
    /**
     * 未收到
     */
    unreceived(id) {
      const data = {
        id: id,
        type: 0
      }
      confirmReceiptApi(data).then(res => {
        if (res.data.code === '200') {
          this.consignList = [] //让当前列表为空
          this.consignpagenation.pageNum = 0 //第一页
          this.consignLoad() //重新调用获取列表方法
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    /**
     * 确认收到
     */
    received(id) {
      const data = {
        id: id,
        type: 1
      }
      confirmReceiptApi(data).then(res => {
        if (res.data.code === '200') {
          this.sureList = [] //让当前列表为空
          this.surepagenation.pageNum = 0//第一页
          this.sureLoad() //重新调用获取列表方法
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    /**
     * 操作日志数据
     */
    journalLoad() {
      this.journalLoading = true
      this.journalpagenation.pageNum++
      
      const data = {
        pageNum: this.journalpagenation.pageNum,
        pageSize: this.journalpagenation.pageSize,
        customerId: this.detailsId
      }
      if (this.journalpagenation.pageNum <= this.journalpagenation.totalPages) {
        journalApi(data).then(res => {
          if (res.data.code === '200') {
            this.journalLoading = false
            this.journalList = [...this.journalList, ...res.data.data.records]
            this.journalpagenation.totalPages = res.data.data.pages
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else {
        this.journalMore = true
        this.journalLoading = false
      }
    },
    /**
     * 已确定数据 已寄存 已确认
     */
    sureLoad() {
      this.sureLoading = true
      this.surepagenation.pageNum++
      const data = {
        pageNum: this.surepagenation.pageNum,
        pageSize: this.surepagenation.pageSize,
        type: 2 // 1=已寄存/未确认, 2=已确认
      }
      if (this.surepagenation.pageNum <= this.surepagenation.totalPages) {
        checkDataApi(data).then(res => {
          if (res.data.code === '200') {
            this.sureLoading = false
            this.sureList = [...this.sureList, ...res.data.data.records]
            this.surepagenation.totalPages = res.data.data.pages
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else {
        this.sureMore = true
        this.sureLoading = false
      }
    },
    /**
     * 已寄存数据 已寄存 已确认
     */
    consignLoad() {
      this.consignLoading = true
      this.consignpagenation.pageNum++
      const data = {
        pageNum: this.consignpagenation.pageNum,
        pageSize: this.consignpagenation.pageSize,
        type: 1
      }
      if (this.consignpagenation.pageNum <= this.consignpagenation.totalPages) {
        checkDataApi(data).then(res => {
          if (res.data.code === '200') {
            this.consignLoading = false
            this.consignList = [...this.consignList, ...res.data.data.records]
            this.consignpagenation.totalPages = res.data.data.pages
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else {
        this.consignMore = true
        this.consignLoading = false
      }
    },
    /**
     *图文资料右边的寄存材料数据
     */
    stuffLoad() {
      this.stuffLoading = true
      this.stuffpagenation.pageNum++
      const data = {
        pageNum: this.stuffpagenation.pageNum,
        pageSize: this.stuffpagenation.pageSize,
        type: 2
      }
      if (this.stuffpagenation.pageNum <= this.stuffpagenation.totalPages) {
        clientDataApi(data).then(res => {
          if (res.data.code === '200') {
            this.stuffLoading = false
            this.stuffList = [...this.stuffList, ...res.data.data.records]
            this.stuffpagenation.totalPages = res.data.data.pages
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else {
        this.stuffMore = true
        this.stuffLoading = false
      }
    },
    /**
     * 图文加载数据
     */
    picLoad() {
      this.picLoading = true
      this.picpagenation.pageNum++
      const data = {
        pageNum: this.picpagenation.pageNum,
        pageSize: this.picpagenation.pageSize,
        type: 1
      }
      
      if (this.picpagenation.pageNum <= this.picpagenation.totalPages) {
        clientDataApi(data).then(res => {
          if (res.data.code === '200') {
            this.picLoading = false
            this.picList = [...this.picList, ...res.data.data.records]
            this.picpagenation.totalPages = res.data.data.pages
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else {
        this.picMore = true
        this.picLoading = false
      }
    },
    /**
     *  loadAgain
     */
    loadAgain() {
      if (this.cur === 2) {
        this.picList = [] //让当前列表为空
        this.picpagenation.pageNum = 0//第一页
        this.picLoad()
        this.stuffList = [] //让当前列表为空
        this.stuffpagenation.pageNum = 0//第一页
        this.stuffLoad()
      } else if (this.cur === 3) {
        this.journalList = [] //让当前列表为空
        this.journalpagenation.pageNum = 0//第一页
        this.journalLoad()
      }
    },
    /**
     * 资料管理
     */
    picCheck(url) {
      this.dialogFormVisible = true
      this.urlCurrent = JSON.parse(url)[0].url
    },
    consign() {
      this.cur = 0
      this.consignLoad()
      
    },
    confirmed() {
      this.cur = 1
      this.sureLoad()
    },
    customerInfo(item) {
      this.cur = 2
      this.picLoad()
      this.stuffLoad()
    },
    operationLog() {
      this.cur = 3
      this.journalLoad()
    },
    /**
     * 收入支出切换
     */
    // tab切换
    switchTabRenven(type) {
      if (type === '1') {
        this.type = '1'
        this.Funincome()
      } else {
        this.type = '2'
        this.expenditure()
      }
    },
    //分页跳转
    gopageTab(e) {
      this.pageNumTab = e
      if (this.type === '1') {
        this.Funincome()
      } else {
        this.expenditure()
      }
    },
    // 收入状态
    checkType(type) {
      const result = {}
      if (type === 1) {
        result.txt = '待审核'
      } else if (type === 2) {
        result.txt = '审核通过'
      } else if (type === 3) {
        result.txt = '审核不通过'
      }
      return result
    },
    // 收入
    Funincome() {
      const data = {
        pageNum: this.pageNumTab,
        pageSize: this.pageSizeTab,
        taskProductId: this.taskProductId
      }
      reviewList(data).then(res => {
        const result = res.data
        if (result.code === '200') {
          result.data.records.forEach((item) => {
            item.amount = item.amount / 100
          })
          this.ptotalTab = result.data.total
          this.revenue_table = result.data.records
        } else {
          this.$message({
            message: result.msg,
            type: 'error'
          })
          return
        }
      })
    },
    // 支出
    expenditure() {
      const data = {
        pageNum: this.pageNumTab,
        pageSize: this.pageSizeTab,
        taskProductId: this.taskProductId
      }
      expenseList(data).then(res => {
        const result = res.data
        if (result.code === '200') {
          result.data.records.forEach((item) => {
            item.amount = item.amount / 100
          })
          this.ptotalTab = result.data.total
          this.revenue_table = result.data.records
        } else {
          this.$message({
            message: result.msg,
            type: 'error'
          })
          return
        }
      })
    },
    
    // 跳转账务
    redirect(type) {
      if (type === '1') { // 添加收款  ----> 跳转账务收款记录
        this.$router.push({
          path: '/collect',
          query: {
            detail: '4',
            baseId: this.detailsTaskBaseId,
            productId: this.detailsTaskProductId,
            mobile: this.detailsPhone,
            mobileName: this.detailsContact
          }
        })
      } else { // 添加支出  ----> 跳转账务支出记录
        this.$router.push({
          path: '/expend',
          query: {
            indexFlag: '4',
            baseId: this.detailsTaskBaseId,
            productId: this.detailsTaskProductId,
            mobile: this.detailsPhone,
            mobileName: this.detailsContact
          }
        })
      }
    },
    /**
     * 环节部门 当选中节点变化时触发 要 id 和 name
     */
    DepartmentChange(value) {
      this.huanjieDepartmentId = this.$refs['newnameEl2'].getCheckedNodes()[0].value
      this.huanjieDepartmentName = this.$refs['newnameEl2'].getCheckedNodes()[0].label
      this.FundepartmentUser(this.huanjieDepartmentId)
      this.dataTransfer.newCurrentPrincipal = ''
    },
    // 转出任务 ---> 当前环节新负责人
    FundepartmentUser(id) {
      departmentUser({ deptId: id }).then(res => {
        const result = res.data
        if (result.code === '200') {
          this.dataTransfer.departmentId = id
          this.huanjiePerson = result.data
        } else {
          this.$message({
            message: result.msg,
            type: 'error'
          })
          return
        }
      })
    },
    // 负责人id
    principalChange(e) {
      this.dataTransfer.userId = selectId(this.huanjiePerson, e)
      this.dataTransfer.userName = e
    },
    //文件上传
    beforeUpload(file) {
      if (!this.dataUpload.dataName) {
        this.dataUpload.dataName = file.name
      }
      this.dataUpload.taskProductId = this.getproductIds
    },
    handleExceed(files, fileList) {
      this.$message.warning('当前限制选择 1 个文件并且不能超过30MB')
    },
    loadsuccess(files, fileList) {
      this.$message.success('资料选择成功请确定')
      this.dataUpload.dataUrl = files[0]
    },
    oninput(e) {
      this.newCustomerform.serviceAmount = e.replace(/[^0-9.]/g, '')
      if (this.newCustomerform.serviceAmount.length > 7) {
        this.newCustomerform.serviceAmount = this.newCustomerform.serviceAmount.slice(0, 7)
      }
    }, //服务金额
    oninputAdded(e) {
      this.AddedValue = e.replace(/[^0-9.]/g, '')
    }, //开始记账的增值税(元)
    oninputIncome(e) {
      this.IncomeValue = e.replace(/[^0-9.]/g, '')
    }, //开始记账的企业所得税(元)
    oninputIndividual(e) {
      this.IndividualValue = e.replace(/[^0-9.]/g, '')
    }, //开始记账的个人所得税(元)
    oninputOther(e) {
      this.OtherValue = e.replace(/[^0-9.]/g, '')
    }, //开始记账的其他税费
    load() {
      this.loading = true
      setTimeout(() => {
        this.count += 1
        this.loading = false
        const data = {
          customerId: this.detailsId,
          pageNum: this.count,
          pageSize: 10
        }
        checkDynamicApi(data).then(res => {
          const a = this.dynamicList.concat(res.data.data.records)
          this.dynamicList = a
        }) 
      }, 2000)
    },
    //批量删除
    // s_handleSelectionChange(val) {
    //   let ids = ''
    //   val.forEach(row => {
    //     ids = ids + row.id + ','
    //   })
    //   if (ids.length > 1) {
    //     ids = ids.substring(0, ids.length - 1)
    //   }
    //   this.delIds = ids
    // },//批量删除
    // open() {
    //   this.$confirm('是否确认导出客户信息', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     showClose: false,
    //     center: true
    //   }).then(() => {
    //     this.$message({
    //       type: 'success',
    //       message: '导出成功!'
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消'
    //     })        
    //   })
    // },
    // 动态
    
    /**
     * dynamicList里面的sign的bg颜色
     */
    signTitCor(type) {
      const item = type.toString()
      const result = {}
      const signArr = ['记录', '客户上门', '投诉', '客户回访', '客户操作']
      const colors = ['#0097FE', '#66E2C5', '#FF836B', '#F8C35F', '#7590A2']
      if (item === '1') {
        result.color = colors[0]
        result.sign = signArr[0]
      } else if (item === '2') {
        result.color = colors[1]
        result.sign = signArr[1]
      } else if (item === '3') {
        result.color = colors[2]
        result.sign = signArr[2]
      } else if (item === '4') {
        result.color = colors[3]
        result.sign = signArr[3]
      } else {
        result.color = colors[4]
        result.sign = signArr[4]
      }
      return result
    },
    /**
     * 底部的4个按钮切换样式
     */
    switchTabFour(index) {
      if (index === '1') {
        this.TabFourFlag1 = true
        this.TabFourFlag2 = false
        this.TabFourFlag3 = false
        this.TabFourFlag4 = false
      } else if (index === '2') {
        this.TabFourFlag1 = false  
        this.TabFourFlag2 = true
        this.TabFourFlag3 = false
        this.TabFourFlag4 = false
      } else if (index === '3') {
        this.TabFourFlag1 = false  
        this.TabFourFlag2 = false
        this.TabFourFlag3 = true
        this.TabFourFlag4 = false
      } else if (index === '4') {
        this.TabFourFlag1 = false  
        this.TabFourFlag2 = false
        this.TabFourFlag3 = false
        this.TabFourFlag4 = true
      }
      this.TabType = index
    },
    /**
     * 日期改变
     */
    pickerChange(e) {
      this.switchBtn = !!e
    },
    /**
     * 发布
     */
    submitFun() {
      if (this.switchBtn) {
        const dynamicObj = {}
        if (this.TabFourFlag1) {
          dynamicObj.type = '1'
        } else if (this.TabFourFlag2) {
          dynamicObj.type = '2'
        } else if (this.TabFourFlag3) {
          dynamicObj.type = '3'
        } else if (this.TabFourFlag4) {
          dynamicObj.type = '4'
        }
        const d = new Date(this.datetimeValue)
        dynamicObj.created = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
        dynamicObj.content = this.textArea
        
        // this.dynamicList.push(dynamicObj)
        const data = {
          // accountantId: this.accountantId,
          // accountantName: this.accountantName,
          content: this.textArea,
          customerId: this.detailsId,
          // deptId: this.deptId,
          followTime: dynamicObj.time_tit,
          type: this.TabType
        }
        dynamicApi(data).then(res => {
          if (res.data.code === '200') {
            this.count = this.pageTotal - 1
            this.$message({
              type: 'success',
              message: '发布成功！'
            })
            this.datetimeValue = ''
            this.textArea = ''
            // this.load()
          } else {
            this.$message({
              type: 'error',
              message: '发布失败'
            })
          }
        }) //客户动态数据

      } else {
        this.$message.error('请选择日期')
      }
    },
    importClose() {
      this.importcloseFlag = true
      this.importBusiness = false
    },
    configClose() {
      this.importcloseFlag = false
      this.importBusiness = false
    },
    serviceClose(done) {
      done()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }, //表格全选
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.drawer = false
          this.otherDrawer = false
        })
        .catch(_ => {})
    }, //新增客户确认关闭
    gatheringClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }, //新增收款
    spendClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }, //新增支出
    checkButton(e) {
      this.innerVisible = true
      this.checkId = e.id
      this.checkBook = e
      const data = {
        customerId: this.detailsId,
        id: this.checkId,
        taxDate: this.Current_filing_period2
      }
      checkAccountApi(data).then(res => {
        if (res.data.code === '200') {
          const checkAccountList = res.data.data
          this.checkTaxPayType = checkAccountList.taxPayType
          this.checkValueAddedTax = checkAccountList.valueAddedTax / 100
          this.checkCorporateIncomeTax = checkAccountList.corporateIncomeTax / 100
          this.checkPersonalIncomeTax = checkAccountList.personalIncomeTax / 100
          this.checkOtherTax = checkAccountList.otherTax / 100
          this.checkBaccountingStatement = checkAccountList.baccountingStatement
          this.checkBtaxControl = checkAccountList.btaxControl
          this.checkBdeductTax = checkAccountList.bdeductTax
          this.checkBqingka = checkAccountList.bqingka
          this.profile = checkAccountList.profile
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }, //查看steps
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert('submit!')
    //     } else {
          
    //       return false
    //     }
    //   })
    // },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }, //
    handleClick_details(row) {
      this.rowData = row
      this.accountantName = row.accountantName
      this.detailsId = row.id
      this.accountantId = row.accountantId
      this.deptId = row.deptId
      const data = {
        customerId: this.detailsId,
        pageNum: this.pageNum,
        pageSize: 10
      }
      //接口详情总数据
      customerDetailsApi(data).then(res => {
        if (res.data.code === '200') {
          const detailsData = res.data.data
          this.taskProductId = res.data.data.taskProductId //taskProductId
          this.detailsInvalidDate = detailsData.invalidDate.slice(0, -12) //费用到期
          this.detailsStatus = detailsData.status
          this.detailsUuid = detailsData.uuid
          this.detailsCompany = detailsData.company
          this.detailsContact = detailsData.contact
          this.detailsPhone = detailsData.phone
          this.detailsUscc = detailsData.uscc
          this.detailsSource1Id = detailsData.source1Id //客户来源1ID
          this.detailsSource1Name = detailsData.source1Name //客户来源1名字
          this.detailsSource2Id = detailsData.source2Id //客户来源2ID
          this.detailsSource2Name = detailsData.source2Name //客户来源2名字
          this.detailsLevel = detailsData.level
          this.detailsTaxReportType = detailsData.taxReportType //报税
          this.detailsAccountantName = detailsData.accountantName //会计名
          this.detailsTaxPayType = detailsData.taxPayType //纳税
          this.detailsBzeroDeclare = detailsData.bzeroDeclare
          this.detailsTag = detailsData.tag
          this.detailsServiceAmount = detailsData.serviceAmount / 100 //服务金额
          this.detailsMainBusiness = detailsData.mainBusiness
          this.detailsRemarks = detailsData.remarks
          this.detailsTaskBaseId = detailsData.taskBaseId //账务
          this.detailsTaskProductId = detailsData.taskProductId
          this.detailsContact = detailsData.contact
          this.detailsAccountantId = detailsData.accountantId //会计id
          this.ruleFormPerson = detailsData.contact // 操作转出负责人-->用
        } else {
          this.$message.error(res.data.msg)
        }
      })
      // 接口步骤数据
      detailsStepApi(data).then(res => {
        if (res.data.code === '200') { 
          const data = res.data.data
          let idx = 0
          this.detailsStepData = data
          console.log(this.detailsStepData, 'step的数据看这里')
          data.map((item, index) => {
            if (item.status === 3) {
              idx++
            }
          })
          this.stepIndex = idx

          const arr = []
          data.map(item => {
            arr.push(item.taxDate.replace('-', '年').slice(0, -12) + '月')
          })
          this.Current_filing_period = arr[0] //只留年月的taxDate
          const arrTime = []
          data.map(item => {
            arrTime.push(item.taxDate)
          })
          this.Current_filing_period2 = arrTime[0] //有时分秒的taxDate
        } else {
          this.$message.error(res.data.msg)
        }
      })
      //查看客户动态
      checkDynamicApi(data).then(res => {
        if (res.data.code === '200') {
          this.dynamicList = res.data.data.records
          this.pageTotal = Math.ceil(res.data.data.total / this.pageSize) 
        } else {
          this.$message.error(res.data.msg)
        }
      }) 
    }, //点击详情
    changetab(tab, event) {
      if (tab.index === '2') {
        return
      }
    },
    /**
     * 开始记账
     */
    startBook(e) {
      this.outerVisible = true
      this.bookData = e
    },
    /**
     * 提交开始记账
     */
    submitForm(keepAccountsform) {
      this.keepAccountsform.accounting_statement === '是' ? this.bAccountingStatement = 1 : this.bAccountingStatement = 0
      this.keepAccountsform.resource === '是' ? this.bTaxControl = 1 : this.bTaxControl = 0
      this.keepAccountsform.tax_deduction === '是' ? this.bDeductTax = 1 : this.bDeductTax = 0
      this.keepAccountsform.clear_card === '是' ? this.bQingka = 1 : this.bQingka = 0
      
      this.$refs[keepAccountsform].validate((valid) => {
        
        if (valid) {
          const data = {
            customerId: this.detailsId,
            taxPayType: this.newCustomerform.taxPayType, //纳税类型
            // taxDate: this.Current_filing_period2, //当前报税期
            taxDate: this.bookData.taxDate,
            valueAddedTax: this.AddedValue * 100, //增值税
            corporateIncomeTax: this.IncomeValue * 100, //企业所得税
            personalIncomeTax: this.IndividualValue * 100, //个人所得税
            otherTax: this.OtherValue * 100, //其他税费
            bAccountingStatement: this.bAccountingStatement, //会计报表
            bTaxControl: this.bTaxControl, //税盘相关
            bDeductTax: this.bDeductTax, //是否扣税
            bQingka: this.bQingka, //是否请卡
            profile: this.dataUpload.dataUrl
          }
          beginAccountApi(data).then(res => {
            if (res.data.code === '200') {
              this.$message({
                type: 'success',
                message: '记账成功！'
              })
              this.outerVisible = false
              this.handleClick_details(this.rowData)
            } else {
              this.$message.error(res.data.msg)
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '记账失败'
          })
        }
      })
    },
    handleClick_details2(row) {

    }, //点击详情2
    handleClick(tab, event) {
    },
    opichange(e) {
      this.source2Id = selectId(this.clientSourceOptions, e)
      this.source2Name = e
    },
    // 新增客户保存
    newCustomer_submit(newCustomerform) {
      const validDate = this.newCustomerform.newCustomerDate[0].slice(0, -2) + '10'
      const invalidDate = this.newCustomerform.newCustomerDate[1].slice(0, -2) + '10'
      const data = {
        // accountantId: this.accountantId,
        // accountantName: this.accountName,
        accountantName: this.dataTransfer.userName,
        accountantId: this.dataTransfer.userId,
        uuid: this.$uuid(),
        company: this.newCustomerform.company,
        contact: this.newCustomerform.contact,
        phone: this.newCustomerform.phone,
        level: this.newCustomerform.level,
        validDate: validDate,
        invalidDate: invalidDate,
        taxReportType: this.newCustomerform.taxReportType,
        bzeroDeclare: Number(this.newCustomerform.bzeroDeclare),
        serviceAmount: this.newCustomerform.serviceAmount * 100, //服务金额
        mainBusiness: this.newCustomerform.mainBusiness,
        taxPayType: this.newCustomerform.taxPayType,
        tag: this.newCustomerform.tag,
        uscc: this.newCustomerform.uscc,
        source2Id: this.source2Id,
        source2Name: this.source2Name,
        remarks: this.newCustomerform.remarks
      } //我要发送的参数
      this.$refs[newCustomerform].validate((valid) => {
        this.isDisable = true //开始可以点击
        if (valid) {
          addClient(data).then(res => {
            this.isDisable = false //执行请求后就不能点击了
            this.$message({
              type: 'success',
              message: '添加成功！'
            })
            this.reload()
          })
        } else {
          this.isDisable = false //执行请求后就不能点击了
          this.$message({
            type: 'error',
            message: '请输写完整/正确信息！'
          })
        }
      })

    },
    clientSource(e) {
      if (e === '1') {
        const data = {
          pageSize: 500,
          pageNum: 1
        }
        clientSource(data).then(res => {
          if (res.data.code === '200') {
            this.clientSourceOptions = res.data.data.records
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    }, 
    /** 
     *新增客户的客户来源 
     */
    bzeroDeclare(e) {

    },
    newCustomerButton() {
      this.drawer = true
      getTreeList({}).then((res) => {
        const result = res.data
        if (result.code === '200') {
          this.huanjieDepartment = result.data
        } else {
          this.$message({
            message: result.msg,
            type: 'error'
          })
          return
        }
      })
    }, //分配部门
    chooseDepartment(e) {
      departmentUser().then(res => {
        if (res.data.code === '200') {
          this.chooseAccountingOptions = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }, //选择部门
    chooseDistribution(e) {
      this.accountantId = selectId(this.chooseAccountingOptions, e)
      this.accountName = e
    }, //准备取会计id给后端
    //分页跳转
    gopage(e) {
      this.pageNum = e
      this.profilingApiList()
    },
    //概况列表
    profilingApiList() {
      const data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      profilingApiList(data).then(res => {
        const result = res.data
        if (result.code === '200') {
          this.ptotal = result.data.total
          this.ProfilingtableData = result.data.records
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    //服务变更弹出请求数据
    serviceChangesButton1() {
      this.dialogVisible = true
      this.detailsTaxReportType === 1 ? this.serviceChanges_tableData[0].before_change = '季报' : this.serviceChanges_tableData[0].before_change = '月报'
      this.detailsTaxPayType === 1 ? this.serviceChanges_tableData[1].before_change = '一般纳税人' : (this.detailsTaxPayType === 2 ? this.serviceChanges_tableData[1].before_change = '小规模纳税人' : this.serviceChanges_tableData[1].before_change = '个体工商户')
      this.detailsBzeroDeclare.toString() === 'false' ? this.serviceChanges_tableData[2].before_change = '否' : this.serviceChanges_tableData[2].before_change = '是' 
    },
    aa(row, index) {
      if (index === 0) {
        this.taxPayType = row.value
      } else if (index === 1) {
        this.taxReportType = row.value
      } else if (index === 2) {
        this.bzeroDeclare = row.value
      }
      
    },
    //服务变更
    serviceChangesButton() {
      const data = {
        customerId: this.detailsId,
        taxPayType: this.taxPayType,
        taxReportType: this.taxReportType,
        bzeroDeclare: this.bzeroDeclare
      }
      serviceChangesApi(data).then(res => {
        if (res.data.code === '200') {
          this.$message({
            type: 'success',
            message: '更改成功！'
          })
          this.dialogVisible = false
          this.handleClick_details(this.rowData)
        } else {
          this.$message({
            type: 'error',
            message: '更改失败'
          })
        }
      })
    }, 
    //转移负责人
    contactChange() {
      const data = {
        accountantId: this.detailsAccountantId,
        customerId: this.detailsId
      }
      contactChangesApi(data).then(res => {
        if (res.data.code === '200') {
          this.FuncancerUpload()
          this.handleClick_details(this.rowData)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    //变更来源
    sourceChange() {
      const data = {
        customerId: this.detailsId,
        source1Id: this.detailsSource1Id,
        source1Name: this.detailsSource1Name,
        source2Id: this.detailsSource2Id,
        source2Name: this.detailsSource2Name
      }
      sourceChangesApi(data).then(res => {
        if (res.data.code === '200') {
          this.FuncancerUpload()
          this.handleClick_details(this.rowData)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    //暂挂客户
    pendingCustomer() {
      const data = {
        customerId: this.detailsId
      }
      pendingApi(data).then(res => {
        if (res.data.code === '200') {
          this.FuncancerUpload()
          this.handleClick_details(this.rowData)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    endCustomer() {
      const data = {
        customerId: this.detailsId
      }
      endCustomerApi(data).then(res => {
        if (res.data.code === '200') {
          this.FuncancerUpload()
          this.handleClick_details(this.rowData)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    addAccount() {
      const data = {
        customerId: this.detailsId,
        renewDate: this.addAccountForm.time.slice(0, -2) + '10'
      }
      addAccountperiodApi(data).then(res => {
        if (res.data.code === '200') {
          this.$message({
            type: 'success',
            message: '添加成功！'
          })
          this.centerDialogVisible = false
          this.handleClick_details(this.rowData)
        } else {
          this.$message({
            type: 'error',
            message: '添加失败'
          })
        }
      })
    }, //增加代账期
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3)
    }
  },
  // watch: {
  //   detailsInvalidDate: {
  //     handler(e) {
  //       const now = (new Date()).valueOf()
  //       const time = (new Date(e)).valueOf()
  //       if (time - now <= 0) {
  //         this.dialogTableVisible = true
  //       }
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  // }, //客户代账期结束提醒弹出框
  created() {
    this.newCustomerform.uuid = this.$uuid() //获取随机id
    this.profilingApiList() //客户概况api
    this.Funincome() //收入
    // this.getTopData() // 上面到数据
  },
  mounted() {
    this.consignLoad()
  }
}
</script>

<style lang="scss">
  @function px($px){
    $rem: 144;
    @return ($px/ $rem) + rem;
  }
.client{
  background:#fff;
  width: px(1200);
  margin: 24px px(24);
  .client_header{
    .client_header1{
        position: relative;
        margin-left: px(24);
        padding-top: 24px;
        :nth-child(1){
          display: inline-block;
          margin-left: px(10);
          font-size:16px;
          font-weight:500;
          color:rgba(51,57,63,1);
          line-height:16px;
        }
      }
      .client_header1::after{
          content: '';
          height: 18px;
          border-right: 2px solid #0097FE;
          position: absolute;
          left: 0;
          top: 24px;
      }
    .client_header2{
      margin-top: 32px;
      margin-bottom: 24px;
      margin-left: px(24);
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      .client_header2_left{
        .el-button{
          width: 88px;
          height: 32px;
        }
        .client_header2_left_buttons{
          .blue_border{
          border: 1px solid #0097FE;
        }
        .el-button--primary{
            height: 32px;
            width: 88px;
            line-height: 8px;
            span{
              margin-left: px(-3);
            }
          }//新增客户按钮
          .el-button + .el-button{
            margin-left: px(24);
            height: 32px;
            line-height: 8px;
            span{
              margin-left: px(-3);
              color: #0097FE;
            }
          }//导出客户导入客户按钮
          //导入详情
          .confirmClose,.import_mask{
              position: fixed;
              top: 0;
              bottom: 0;
              left: 0;
              width: 100%;
              background-color: rgba(0,0,0,.3);
              z-index: 101;
              display: flex;
              justify-content: center;
              align-items: center;
          }
          .import_mask{
            .import_innerbox{
              position: absolute;
              width: px(432);
              height:459px;
              background-color: #fff;
              .import_header{
                width:100%;
                height:48px;
                background:rgba(241,248,255,1);
                border-radius:4px 0px 0px 0px;
                text-align: center;
                display:flex;
                align-items: center;
                justify-content: space-between;
                span{
                  font-size:18px;
                  font-family:PingFangSC-Semibold,PingFang SC;
                  font-weight:600;
                  color:rgba(51,57,63,1);
                  line-height:24px;
                  margin-left:24px;
                }
                .close{
                  width:92px;
                  height:48px;
                  background:rgba(117,144,162,1); 
                  display:flex;
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                  span{
                    font-size:14px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    margin:0;
                  }
                  img{
                    width:12px;
                    height:12px;
                    margin-right:4px;
                  }
                }
              }
              .import_content{
                background: #fff;
                height:387px;
                .uploading_box1,.uploading_box2,.uploading_box3{
                  margin-left:24px;
                  margin-bottom:px(33);
                  .unload_module{
                    margin-left:px(30);
                  }
                  img{
                    width:18px;
                    height:18px;
                    margin-right:px(12);
                  }
                  span{
                    font-size:14px;
                    font-family:PingFangSC-Medium,PingFang SC;
                    font-weight:500;
                    color:rgba(111,124,141,1);
                  }
                  p{
                    font-size:14px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(111,124,141,1);
                    span{
                      font-size:12px;
                      font-family:PingFangSC-Regular,PingFang SC;
                      font-weight:400;
                      color:rgba(0,151,254,1);
                    }
                  }
                }
                .uploading_box1{
                  height:57px;
                  margin:24px px(24);
                  .unload_module{
                    width:104px;
                    height:28px;
                    background:rgba(241,248,255,1);
                    margin-left:px(30);
                    margin-top:12px;
                    line-height: 28px;
                    a{
                      font-family:PingFangSC-Regular,PingFang SC;
                      font-weight:400;
                      color:rgba(0,151,254,1);
                      border-bottom:1px solid rgba(0,151,254,1);
                    }
                  }
              
                }
                .uploading_box2,.uploading_box3{
                  .unload_module{
                    margin-top:16px;
                    p{
                      line-height: 24px;
                    }
                  }
                }
                .uploading_box4{
                  padding:0 px(24);
                  padding-top:15px;
                  .el-upload{
                    width:100%;
                    height:40px;
                    background:rgba(0,151,254,1);
                    box-shadow:0px 2px 10px 0px rgba(49,137,245,0.04);
                    border-radius:4px;
                    justify-content: center;
                    .el-button{
                      width:100%;
                      height:100%;
                    }
                  }
                }
              }
            }
          }
          //导入详情里的确认关闭
          .confirmClose{
            .confirm_innerbox{
              position: absolute;
              width:px(320);
              height:132px;
              background:rgba(255,255,255,1);
              box-shadow:0px 2px 10px 0px rgba(49,137,245,0.04);
              border-radius:4px;
              border:1px solid rgba(228,231,237,1);
              p{
                font-size:16px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:rgba(51,57,63,1);
                line-height:16px;
                text-align: center;
                margin:32px 0;
              }
              .btns{
                display: flex;
                justify-content: center;
                .el-button{
                  width:72px;
                  height:28px;
                  background:rgba(0,151,254,1);
                  border-radius:2px;
                  line-height: 5px;
                }
                button:nth-child(1){
                  background:rgba(255,255,255,1);
                  border-radius:2px;
                  border:1px solid rgba(197,205,213,1);
                  span{
                    color:rgba(111,124,141,1)!important;
                  }
                }
                button:nth-child(2){
                  border-radius:2px;
                  span{
                    color:#fff!important;
                  }
                }
              }
            }
          }
        }
      }
      .client_header2_right{
        margin-right: px(24);
        display:flex;
        flex-direction:row;
        justify-content:space-between;
        .client_header2_right_search1{
          height: 32px;
          width: 240px;
          input{
            height: 32px;
            background:rgba(246,248,251,1);
          }
          i{
            margin-top: -3px;
          }
        }
        .client_header2_right_search2{
          margin-left: px(16);
          height: 32px;
          width: 80px;
          line-height: 8px;
        }
      }
    }
  }
  .client_form{
    margin-left: px(24);
    margin-right: px(24);
    height: px(464);
    overflow: auto;
    .el-button--small{
      color:rgba(0,151,254,1);
      cursor: pointer;
      &:hover .detailbox{
        display:block;
      }
    }
    .detailbox{
      width:60px;
      height:32px;
      background:rgba(255,255,255,1);
      box-shadow:0px 4px 12px 0px rgba(49,137,245,0.24);
      border-radius:3px;
      margin-top:10px;
      z-index: 111;
      position: absolute;
      right:px(5);
      display: none;
    }
    .el-checkbox{
      display: none;
    }
  }
  .client_form_delete_page{
    width: px(1200);
    height: 86px;
    background: #fff;
    // display:flex;
    // flex-direction:row;
    // justify-content:space-between;
    z-index: 100;
    border-top: 1px solid rgba(228,238,249,1);
    position: relative;
    // .client_form_delete{
    //   margin-left: px(24);
    //   margin-top: 23px;
    //   button{
    //     height: 32px;
    //     width: 88px;
    //     line-height: 7px;
    //     border:1px solid rgba(32,129,229,1);
    //     background: #fff;
    //     span{
    //       margin-left: px(-3);
    //       color: #0097FE;
    //     }
    //   }
    // } //批量删除按钮
    .client_form_page{
      // margin-right: px(24);
      margin-top: 24px;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
// 新建用户的抽屉
 .el-drawer__body{
  overflow: auto!important;
}
.newCustomer{
  overflow: scroll !important;
  .el-drawer{
    width: px(960);
    .el-drawer__header{
      width:px(960);
      height:56px;
      background:rgba(241,248,255,1);
      border-radius:4px 0px 0px 0px;
      margin-bottom: 0;
      padding: 0;
      span{
      font-size:18px;
      font-weight:600;
      color:rgba(51,57,63,1);
      display: inline-block;
      height:56px;
      padding-left: px(24);
      padding-top: 16px;
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
    .newCustomer_title{
      padding-top: 49px;
      .profiling{
        font-size:16px;
        font-weight:500;
        color:rgba(51,57,63,1);
        line-height:16px;
        margin-left: px(24);
      }
      .profiling::before{
        content: '';
        height: 18px;
        border-right: 2px solid #0097FE;
        margin-right: px(8)
      }
    }
    .newCustomer_form{
      .el-form{
        // width: px(810);
        margin-left: px(30);
        margin-top: 33px;
        .newCustomer_form_id{
          width: px(500);
          height: 36px;
          padding-top: 10px;
          p{
            display: inline-block;
            font-size:14px;
            font-weight:500;
            color:rgba(111,124,141,1);
            line-height:18px;
            // width: px(118);
            text-align: right;
            width: px(80);
            margin-left: px(40);
          }
          .clientname{
            margin-left: px(130);
            margin-top: px(-20);
            background:rgba(255,200,98,1);
            width:px(264);
            height:36px;
            display: flex;
            flex-direction: column;
            align-items: center;
            span{
              display: inline-block;
              min-width:264px;
              line-height: 36px;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
          }
        }
        .el-form-item__label{
          font-size:14px;
          font-weight:500;
          color:rgba(111,124,141,1);
          width: px(130);
        }
        .el-form-item{
          width: px(700);
        }
        .newCustomer_form_uscc{
          margin-left: px(-60);
          .el-form-item__label{
            width: px(160) !important;
          }
        }
        .newCustomer_form_newCustomerDate{
          margin-left: px(-80);
          width: 100%;
          .el-form-item__label{
            width: px(160) !important;
          }
        }
        .el-input{
          width:px(264);
          height:38px;
          border-radius:4px;
        }
        .newCustomer_form_input_company{
          padding-top: 24px;
        }
        .newCustomer_form_input_display{
          display:flex;
          flex-direction:row;
          justify-content:space-between;
        }
        .newCustomer_form_input_newCustomerDate{
          padding: 0;
          .el-form-item__label{
            margin-left: px(50);
          }
          .el-form-item__content{
          .newCustomertime{
            margin-left: px(183);
            .el-date-editor{
              width:px(700) !important; 
              .el-range-separator{
                display: inline-block;
                width: 8%
              }
            }
          }
          }
        }
        .newCustomer_form_level{
            display:flex;
            flex-direction:row;
            justify-content:space-between;
            .newCustomer_form_level_left{
              width: px(400);
            }
            .newCustomer_form_level_right{
              display:flex;
              flex-direction:row;
              justify-content:space-between;
              padding-right: 200px;
              .el-form-item__content{
              display:flex;
              flex-direction:row;
              justify-content:space-between;
              width: 50%;
              .el-input__inner{
                width: px(100);
              }
              .line{
                margin-right: px(-35);
              }
              }
            }
        }
        .newCustomer_form_clientSource{
          .el-form-item__content{
            display:flex;
            flex-direction:row;
            justify-content:space-between;
            width: 3.86111rem;
          }
        }
        .newCustomer_form_textarea{
          width: 100%;
          .el-textarea{
            width:672px;
          }
        }
        .el-form-item__error{
          left:px(143);
        }
      }
    }
    .newCustomer_buttons{
      background:rgba(241,248,255,1);
      border-radius:4px 0px 0px 4px;
      margin-top: 24px;
      // margin-left: px(48)
      div{
        padding: 24px px(687)  24px 24px;
        button{
          width: 100px;
          span{
            display: block;
            margin-top: px(-3);
          }
        }
      }
    }

  }
  .el-drawer__body{
    overflow: scroll!important
  }
}
//弹出的客户详情
.customerDetails{
  overflow: scroll !important;
  .el-drawer{
    width: px(960);
    .el-drawer__header{
      padding-top: 16px;
      height: 56px;
      padding-bottom: 16px;
      background:rgba(241,248,255,1);
      span{
        // border-radius:4px 0px 0px 0px;
        font-size:18px;
        font-weight:600;
        color:rgba(51,57,63,1);
        outline: none;
      }
    }
    .message_descr{
      padding-bottom: 45px;
    }
    // 动态
    .dynamic_content{
      padding-left:px(24);
      box-sizing: border-box;
      width: px(840);
      background: #fff;
      height: 100%;
      max-height:822px;
      display: flex;
      flex-direction: column;
      height: px(565);
      .scroll_div{
        height: px(402);
        // height: px(565);
        // flex: 1;
        overflow: scroll;
        padding-bottom: 206px;
        box-sizing: border-box;
        .websocket_box{
          margin-bottom:100px;
          width: 100%;
          .dynamicItem{
            width: 100%;
            background: #F1F8FF;
            padding: 16px px(16);
            border-radius:4px;
            margin-bottom: 26px;
            box-sizing: border-box;
            .sign_time{
              height: 20px;
              display: flex;
              margin-bottom: 12px;
              .sign{
                height: 20px;
                line-height: 20px;
                padding: 0 px(8);
                background: #0097FE;
                margin-right: px(12);
                font-size:14px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(255,255,255,1);
              }
              .time{
                height: 20px;
                line-height: 20px;
                font-size:14px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(111,124,141,1);
              }
            }
            >p{
              font-size:14px;
              font-family:PingFangSC-Regular,PingFang SC;
              color:rgba(51,57,63,1);
            }
            .opportunity{
              span{
                font-size:14px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:rgba(51,57,63,1);
              }
              .span2{
                font-size:14px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(111,124,141,1);
                margin: 0 px(12);
              }
            }
          }
          .dynamicItemWid{
            width: 50%;
          }
        }
      }
      .operating{
        width:100%;
        height:206px;
        // flex: 1;
        padding:0 px(24);
        position: absolute;
        right: 0;
        left: 0;
        bottom:0;
        background:#fff;
        display: flex;
        justify-content: space-between;
        .left_tx{
          height: 100%;
          width: 40px;
          padding-top: 16px;
          box-sizing: border-box;
          .el-image{
            height: 40px;
            width: 100%;
            img{
              height: 100%;
              width: 100%;
              border-radius: 50%;
            }
          }
        }
        .rigth_tab{
          flex: 1;
          padding-top: 22px;
          padding-left: px(24);
          .tab_{
            display: flex;
            margin-bottom: 22px;
            >div{
              height: 28px;
              line-height: 28px;
              padding: 0 16px;
              background:rgba(255,255,255,1);
              border-radius:4px;
              border:1px solid rgba(197,205,213,1);
              font-size:12px;
              font-family:PingFangSC-Regular,PingFang SC;
              color:rgba(111,124,141,1);
              margin-right: px(16);
              cursor: pointer;
              transition: .3s;
            }
            >div.active{
              color: #fff;
              background: #0097FE;
              border:1px solid #0097FE;
              transition: .3s;
            }
          }
          >textarea{
            width:100%;
            height:62px;
            border-radius:4px;
            border:1px solid rgba(197,205,213,1);
            padding: 8px 0 0 px(16);
            color: #333;
            font-weight: 600;
            outline: none;
            margin-bottom: 10px;
            &::placeholder{
              font-size:14px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(173,181,192,1);
            }
          }
          .bot_{
            display: flex;
            justify-content: space-between;
            .two_qf_btn{
              width: px(168);
              height: 32px;
              display: flex;
              justify-content: space-between;
              .quit{
                width:px(72);
                height:100%;
                background:rgba(255,255,255,1);
                border-radius:4px;
                border:1px solid rgba(0,151,254,1);
                font-size:16px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:rgba(0,151,254,1);
                cursor: pointer;
                text-align: center;
                line-height: 32px;
                box-sizing: border-box;
              }
              .submit{
                width:px(72);
                height:100%;
                background:rgba(0,151,254,1);
                border-radius:4px;
                font-size:16px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:rgba(255,255,255,1);
                cursor: pointer;
                text-align: center;
                line-height: 32px;
              }
            }
          }
        }
      }
    }
    // 二级tabs空位
    .documentManagement_second{
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      width: px(479);
      padding-bottom: px(25);
      margin-left: px(24);
      li{
        width:px(120);
        height:36px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(241,248,255,1);
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        span{
          font-size:14px;
          font-weight:400;
          color:rgba(51,57,63,1);
        }
      }
      .active{
        background:rgba(241,248,255,1);
        span{
          color: #0097FE;
        }
      }
    }
    .documentManagement_secondshow{
      background:rgba(243,245,248,1);
      border-radius:4px 0px 0px 4px;
      .topnav-show{
        padding-top: 24px;
        padding-bottom: 144px;
        height: 610px;
        overflow: scroll;
        ul{
          padding-bottom: 24px;
          li{
            width:px(444);
            height:114px;
            background:rgba(255,255,255,1);
            border-radius:4px;
            display: inline-block;
            margin-left: px(24);
            margin-bottom: 24px;
            div{
              display:flex;
              flex-direction:row;
              justify-content:space-between;
              position: relative;  
              .show_circle{
                padding-left: px(40);
                padding-top: 24px;
              }
              .show_circle::before{
                content: ' ';
                position: absolute;
                left: px(24);
                top: 29px;
                width: 8px;
                height: 8px;
                background-color: #0097FE;
                border-radius: 5px;
              }
              .viewDetails{
                font-size:14px;
                font-weight:400;
                color:rgba(0,151,254,1);
                line-height:18px;
                cursor: pointer;
                padding-top: 24px;
              }
            }
            .detailsContent{
              font-size:14px;
              font-weight:400;
              color:rgba(111,124,141,1);
              line-height:20px;
              height: 40px;
              margin: 8px px(24) 24px px(24);
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
      .topnav-show::-webkit-scrollbar {
          width: 6px!important;
          height: 6px !important;
        }
        .topnav-show::-webkit-scrollbar-track{
          box-shadow: inset 0 0 6px rgba(243,245,248,1);
          border-radius: 10px;
          background-color: #f5f5f5;
        }
        /*定义滑块，内阴影及圆角*/
        .topnav-show::-webkit-scrollbar-thumb{
          height: 10px;
          border-radius: 10px;
          background-color: rgba(197,205,213,1);
        }
      // 1和2
      .topnav-show1{
        ul{
          li{
            width:px(444);
            height:171px;
            background:rgba(255,255,255,1);
            border-radius:4px;
            .detailsContent_sureconfirmed{
              overflow:visible;
              .detailsContent_bg{
                background:rgba(241,248,255,1);
                padding: 2px 0px 2px px(12);
                color: #0097FE;
                margin-right: 0;
              }
              .remark{
                padding-bottom: 16px;
                padding-left: px(12);
              }
              .requirements{
                border-top:  1px solid rgba(228,238,249,1);
                padding-top: 16px;
                p{
                  font-size:14px;
                  font-weight:400;
                  color:rgba(0,151,254,1);
                  line-height:18px;
                  cursor: pointer;
                }
                .checkdetails{
                  visibility: hidden;
                }
                .requirements_bottons{
                  margin-right: 20px;
                  .el-button{
                    span{
                      margin-right: 0
                    }
                  }
                  :nth-child(1){
                    width:64px;
                    height:24px;
                    margin-right: 16px;
                    span{
                      font-size:14px;
                      display: block;
                      margin-left: -20px;
                      margin-top: -6px;
                    }
                  }
                  :nth-child(2){
                    width:72px;
                    height:24px;
                    span{
                      font-size:14px;
                      display: block;
                      margin-left: -17px;
                      margin-top: -6px;
                    }
                  }
                }
              }
            }
          }  
        }
      }
      // 3
      .topnav-show3{
        display:flex;
        flex-direction:row;
        justify-content:space-between;
        padding-bottom: 24px;
        height: 610px;
        .topnav-show3_left_titletop{
          font-size:16px;
          font-weight:500;
          color:rgba(51,57,63,1);
          margin-top: 16px;
          margin-left: px(14);
        }
        ul{
          li{
            width:px(396);
            height:178px;
            background:rgba(243,245,248,1);
            border-radius:4px;
            border-left: 6px solid rgba(0,151,254,1);
            margin: 24px px(24);
            .topnav-show3_left_title{
              display:flex;
              flex-direction:row;
              justify-content:space-between;
              margin:16px px(24);
              .show_circle::before{
                display: none;
              }
              .show_circle{
                font-size:14px;
                font-weight:500;
                color:rgba(51,57,63,1);
              }
              .viewDetails{
                font-size:14px;
                font-weight:400;
                color:rgba(0,151,254,1);
                cursor: pointer;
              }
            }
            .detailsContent_img{
              overflow: visible;
              height: 108px;
              // display:flex;
              // flex-direction:row;
              // justify-content:space-between;
              margin-top: 17px;
              margin-left: px(24);
              margin-right: px(24);
                // img{
                // }
                :nth-child(1) {
                  width: 100px;
                  height: 100px;
                  border-radius: 2px 0px 0px 2px;
                }
                :nth-child(2) {
                  width: px(100);
                  height: 100px;
                }
                :nth-child(3) {
                  width: 100px;
                  height: 100px;
                  border-radius: 0px 2px 2px 0px;
                }
            }
            .detailsContent_img2{
              margin-left: px(24);
              margin-right: px(24);
              img{
                width:px(348);
                height:100px;
                border-radius:2px;
              }
            }
          }
          .topnav-show3_left_commonli{
            margin-top: 0;
            height: 170px;
          }
        }
        .topnav-show3_left_box{
          width: px(444);
          margin: 24px px(24);
          background:rgba(255,255,255,1);
          height: 586px;
          overflow-y: scroll;
          .topnav-show3_left{
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
        //滚动条
        .topnav-show3_left_box::-webkit-scrollbar {
          width: 6px !important;
          height: 10px !important;
        }
        .topnav-show3_left_box::-webkit-scrollbar-track{
          box-shadow: inset 0 0 6px rgba(243,245,248,1);
          border-radius: 10px;
          background-color: #f5f5f5;
        }
        .topnav-show3_left_box::-webkit-scrollbar-thumb{
          height: 10px;
          border-radius: 10px;
          background-color: rgba(197,205,213,1);
        }
        .topnav-show3_right_box{
            width: px(444);
            margin: 24px px(24);
            background:rgba(255,255,255,1);
            height: 586px;
            overflow-y: scroll;
          .topnav-show3_right{
            display: flex;
            flex-direction: column;
            align-items: center;
            .topnav-show3_right_li{
              height: 96px;
              .topnav-show3_right_li_content{
                width:px(348);
                height:64px;
                background:rgba(255,255,255,1);
                border-radius:2px;
                margin: 16px px(24);
                :nth-child(1){
                  font-size:14px;
                  font-weight:500;
                  color:rgba(51,57,63,1);
                  padding-left: px(12);
                  line-height:38px;
                }
                :nth-child(2){
                  color:rgba(111,124,141,1);
                  font-size:14px;
                  font-weight:500;
                  padding-left: px(12);
                  line-height:16px;
                }
              }
            }
          }
        }
        //滚动条
        .topnav-show3_right_box::-webkit-scrollbar {
          width: 6px !important;
          height: 10px !important;
        }
        .topnav-show3_right_box::-webkit-scrollbar-track{
          box-shadow: inset 0 0 6px rgba(243,245,248,1);
          border-radius: 10px;
          background-color: #f5f5f5;
        }
        .topnav-show3_right_box::-webkit-scrollbar-thumb{
          height: 10px;
          border-radius: 10px;
          background-color: rgba(197,205,213,1);
        }
      }
      // 4
      .topnav-show4{
        .topnav-show4_box{
          p{
            width:px(912);
            height:48px;
            background:rgba(255,255,255,1);
            border-radius:4px;
            margin-top: 24px;
            margin-left: px(24);
            margin-right: px(24);
            border-left: 4px solid rgba(0,151,254,1);
            span{
              font-size:14px;
              font-weight:400;
              color:rgba(51,57,63,1);
              line-height:48px;
            }
            :nth-child(1){
              padding-left: px(20);
            }
            :nth-child(2){
              padding-left: px(52);
            }
          }
        }
      }
    }
    .el-drawer__body{
      position: relative;
      padding: 0px;
      // 下面灰条
      .el-tabs__nav-wrap::after{
        display: none;
      }
      // tab切换
      .el-tabs__header{
        position: relative;
        .el-tabs__nav-scroll{
          margin-top: px(24);
          margin-left: px(24);
          margin-bottom: 33px;
          .is-active{
            width:72px;
            height:32px;
            background:rgba(0,151,254,1);
            border-radius:4px;
            color: #fff !important;
            text-align: center !important;
            padding-right: 0 !important;
          }
          // active时下面蓝条
          .el-tabs__active-bar{
            display: none;
          }
          .el-tabs__nav{
            .is-top{
              font-size:16px;
              font-weight:500;
              color:rgba(111,124,141,1);
              line-height:32px;
              text-align: center;
              padding-right: 0;
              margin-left: px(24);
            }
          }
          #tab-first{
            margin-left: 0 !important;
            width: px(72);
          }
          #tab-second{
            padding-left: 0 !important;
            width: px(72);
            margin-left: 0 !important;
          }
          #tab-third{
            padding-left: 0 !important;
            width: px(72);
            margin-left: 0 !important;
          }
        }
      }
      // 切换后的内容
      .el-tabs__content{
        .requiredStar::before {
          content: '* ';
          color: red;
        }
        // 信息表单
        .message_box{
          .message_title_box{
            padding-left: px(24);
            padding-top: 48px;
            position: relative;
            display:flex;
            flex-direction:row;
            justify-content:space-between;
            .message_title{
              font-size:16px;
              font-weight:500;
              color:rgba(51,57,63,1);
              line-height:16px;
              margin-left: px(8);
            }
            .message_title::before{
              content: '';
              height: 18px;
              border-right: 2px solid rgba(0,151,254,1);
              position: absolute;
              left: px(24);
              top: 47px;
           }
            .message_title_box2{
              padding-right: px(24);
              .message_title2{
                font-size:14px;
                font-weight:500;
                color:rgba(111,124,141,1);
                line-height:18px;
              }
              .message_title3{
                font-size:14px;
                font-weight:400;
                color:rgba(51,57,63,1);
                line-height:24px;
                display: inline-block;
                padding-left: px(24);
              }
              .message_addbutton{
                width:88px;
                height:32px;
                background:rgba(0,151,254,1);
                border-radius:4px;
                font-size:14px;
                font-weight:400;
                color:rgba(255,255,255,1);
                text-align: center;
                margin-left: px(24);
                span{
                  display: block;
                  padding: 0;
                  margin-left: -12px;
                  margin-top: -3px;
                }
              }
            }
          }
          .message_box2{
            padding-top: 33px;
            padding-left: px(44);
            .message_common{
              //有些一行有四个span
              :nth-child(1){
                font-size:14px;
                font-weight:500;
                color:rgba(111,124,141,1);
                line-height:18px;
                display: inline-block;
                width: 75px;
                margin-right: px(24);
                text-align: right;
                line-height: 52px;
              }
              :nth-child(2){
                font-size:14px;
                font-weight:400;
                color:rgba(51,57,63,1);
                line-height:24px;
                display: inline-block;
                width:264px;
              }
              :nth-child(3){
                font-size:14px;
                font-weight:500;
                color:rgba(111,124,141,1);
                line-height:18px;
                display: inline-block;
                margin-left: px(60);
              }
              :nth-child(4){
                font-size:14px;
                font-weight:400;
                color:rgba(51,57,63,1);
                line-height:24px;
                display: inline-block;
                margin-left: px(24)
              }
            }
            .message_customer_status{
              padding-bottom: 16px;
              :nth-child(2){
                width:px(64);
                height:36px;
                font-size:12px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(0,151,254,1);
                line-height:36px;
              }
            }
          }
        }
        // 信息进度
        .customerDetails_steps_box{
          overflow: auto;
          margin-bottom: 24px;
          background:rgba(241,248,255,1);
          height: 240px;
          padding: 0 px(24);
          box-sizing: border-box;
          width: 100%;
          .customerDetails_steps{
            height: 190px;
            background:rgba(241,248,255,1);
            border-radius:5px;
            display: flex;
            flex-direction: column;
            // 上
            .customerDetails_time_scroll{
              height: 58px;
            }
            .customerDetails_time{
              white-space:nowrap;
              background:rgba(241,248,255,1);
              height: 100%;
              span{
                display: inline-block;
                border-bottom: 1px solid rgba(228,238,249,1);
                padding-top: 24px;
                padding-bottom: px(8);
                width: px(110);
                height: 100%;
                text-align: center;
              }
              span:last-child{
                margin-right: px(24);
              }
            }
            //清浮动
            // .customerDetails_time:after {
            //   content:"\200B"; 
            //   display:block; 
            //   height:0; 
            //   clear:both; 
            // }
            // .customerDetails_time { 
            //   zoom:1; 
            // }
            // 下
            .el-steps{
              height: 190px;
              padding-top: 27px;
              // margin-bottom: 33px;
              position: relative;
              .el-step__icon{
                height: 40px;
                width: 40px;
              }
              .el-step__icon-inner{
                font-size:24px;
              }
              .el-step__line{
                width:px(50);
                height:2px;
                background:rgba(226,229,232,1);
                left: px(80);
                top: px(15);
              }
              .el-step__main{
                width: px(110);
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                .el-step__title {
                  font-size:16px;
                  font-weight:600;
                  color:rgba(51,57,63,1);
                  line-height:22px;
                  padding-top: 8px;
                }
                .el-step__description{
                  width:83px;
                  font-size:12px;
                  font-weight:400;
                  padding: 0;
                  padding-top: 12px;
                    p{  
                      color:rgba(111,124,141,1);
                      line-height:17px;
                      text-align: center;
                    }
                    button{
                      margin-top: 8px;
                    }
                }
                .is-wait{
                  font-size:16px;
                  font-weight:600;
                  color:rgba(111,124,141,1);
                  line-height:22px;
                }
                
              }
              .el-step{
                flex-basis: 0 !important;
              }
              .el-step__head {
                text-align: center;
                width: px(110);
              }
            }
            .customerDetails_steps_button1{
              cursor: pointer;
              width:48px;
              height:20px;
              background:#fff;
              border: 1px solid rgba(0,151,254,1);
              border-radius:4px;
              font-size:14px;
              font-weight:400;
              color:rgba(0,151,254,1);
              line-height:20px;
              z-index: 100;
            } //查看按钮
            .customerDetails_steps_button{
              cursor: pointer;
              width:80px;
              height:28px;
              background:rgba(0,151,254,1);
              border-radius:4px;
              font-size:14px;
              font-weight:400;
              color:rgba(255,255,255,1);
              line-height:28px;
              z-index: 100;
            } //开始记账按钮
          }
        }
        //滚动条
        .customerDetails_steps_box::-webkit-scrollbar {
            width: 6px!important;
            height: 10px;
          }
          .customerDetails_steps_box::-webkit-scrollbar-track{
            box-shadow: inset 0 0 6px rgba(243,245,248,1);
            border-radius: 10px;
            background-color: #f5f5f5;
          }
          /*定义滑块，内阴影及圆角*/
          .customerDetails_steps_box::-webkit-scrollbar-thumb{
            height: 10px;
            border-radius: 10px;
            background-color: rgba(197,205,213,1);
          }
        //灰色背景
        .bg_gray{
          width: px(960);
          height: 24px;
          background:rgba(243,245,248,1);
        }
        .detailIncome{
          width:px(960);
          height:100%;
          background:rgba(255,255,255,1);
          border-radius:4px 0px 0px 4px;
          .detailIncome_title_box{
            padding-left: px(24);
            padding-top: 48px;
            position: relative;
            display:flex;
            flex-direction:row;
            justify-content:space-between;
            .detailIncome_title{
              font-size:16px;
              font-weight:500;
              color:rgba(51,57,63,1);
              line-height:16px;
              margin-left: px(8);
            }
            .detailIncome_title::before{
              content: '';
              height: 18px;
              border-right: 2px solid rgba(0,151,254,1);
              position: absolute;
              left: px(24);
              top: 47px;
           }
           .detailIncome_select{
             margin-top: -6px;
             height: 32px;
             width: 75px;
             margin-left: px(-530);
             .el-input__inner{
               height: 32px;
             }
             .el-input{
               .el-input__suffix{
                 top: 4px !important;
               }
             }
           }
            .detailIncome_title_box2{
              padding-right: px(24);
              :nth-child(2){
                margin-left: px(24);
              }
            }
          }
          .detailIncome_form{
            width: px(912);
            height: 276px;
            margin-left: px(24);
            margin-top: 25px;
            overflow-y: scroll;
            .el-checkbox{
              display: none;
            }
          }
          .detailIncome_footer{
            padding-top: 30px;
            padding-bottom: 30px;
            display: flex;
            justify-content:flex-end;
            padding-right: px(19);
            box-sizing: border-box;
            align-items: center;
          }
          .detailIncome_form::-webkit-scrollbar {
              width: 6px!important;
              height: 10px;
            }
            .detailIncome_form::-webkit-scrollbar-track{
              box-shadow: inset 0 0 6px rgba(243,245,248,1);
              border-radius: 10px;
              background-color: #f5f5f5;
            }
            /*定义滑块，内阴影及圆角*/
            .detailIncome_form::-webkit-scrollbar-thumb{
              height: 10px;
              border-radius: 10px;
              background-color: rgba(197,205,213,1);
            }
        }
        // .detailIncome_form_bg{
        //   margin-top: 55px;
        // }
        // 添加评论
        // .detailIncome_addComments{
        //   padding-top: 24px;
        //   .el-form{
        //     .el-form-item{
        //       .el-form-item__content{
        //         display:flex;
        //         flex-direction:row;
        //         justify-content:space-between;
        //         align-items: center;
        //         margin-left: 0px !important;
        //         img{
        //           width:40px;
        //           height:40px;
        //           border-radius: 20px;
        //           margin-left: px(24);
        //           margin-right: px(24)
        //         }
        //         .el-input{
        //           margin-right: px(24);
        //         }
        //       }
        //     }
        //   }
        // }
      }
    }
    // 操作
    .operation{
      position: absolute;
      right: px(24);
      top: 0;
      width: px(65);
      .el-submenu__title{
        font-size:14px; 
        font-weight:500;
        color:rgba(111,124,141,1);
      }
    }
  }
}
// 添加代账期弹出框
.addPayment_dialog{
  .el-dialog{
    width:px(464);
    // height:238px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 10px 0px rgba(49,137,245,0.04);
    border-radius:4px;
    .el-dialog__header{
      background:rgba(241,248,255,1)
    }
    .el-dialog__body{
      width:px(464);
      padding: 0;
      padding-top: 43px;
      padding-bottom: 30px;
      padding-left: px(28);
      .addPayment_input{
        .el-form-item{
          .el-form-item__label{
            width:px(100);
            margin-right: px(24)
          }
          .el-form-item__content{
            .el-input{
              width:px(264);
              height: 38px;
            }
          }
        }
      }
    }
    .el-dialog__footer{
      padding-top: 12px;
      width:px(464);
      height:56px;
      background:rgba(241,248,255,1);
      .dialog-footer{
        button{
          width:100px;
          height:32px;
          padding-top: 7px;
        }
      }
    }
  }
}
// 客户代账期结束提醒弹出框
.addPayment_dialog2{
  .el-dialog{
    width:px(464);
    // height:238px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 10px 0px rgba(49,137,245,0.04);
    border-radius:4px;
    .el-dialog__header{
      background:rgba(241,248,255,1)
    }
    .el-dialog__body{
      width:px(464);
      padding: 0;
      padding-top: 43px;
      padding-bottom: 30px;
      padding-left: px(28);
      .addPayment_input{
        .el-form-item{
          .el-form-item__label{
            width:px(100);
            margin-right: px(24)
          }
          .el-form-item__content{
            .el-input{
              width:px(264);
              height: 38px;
            }
          }
        }
      }
    }
    .el-dialog__footer{
      padding-top: 12px;
      width:px(464);
      height:56px;
      background:rgba(241,248,255,1);
      .dialog-footer{
        button{
          width:100px;
          height:32px;
          padding-top: 7px;
        }
      }
    }
  }
}
//操作下拉弹出框
.operation_dialog{
  .el-dialog{
    width:px(840);
    .el-dialog__header{
      width:px(840);
      height:56px;
      background:rgba(241,248,255,1);
      border-radius:5px 5px 0px 0px;
      .el-dialog__title{
        font-size:18px;
        font-weight:600;
        color:rgba(51,57,63,1);
      }
    }
    .el-dialog__body{
      width: px(840);
      height: 192px;
      background:rgba(255,255,255,1);
      margin-top: 48px;
      padding: 0;
      padding-left: px(105);
      margin-bottom: 48px;
      .serviceChanges{
        width: px(630);
        height: 192px;
        // overflow-y: scroll;
        .el-table th, .el-table td{
          padding: 6px 0;
        }
        .serviceChanges_table{
          width: px(630);
        }
      }
      .serviceChanges::-webkit-scrollbar {
          width: 6px!important;
          height: 10px;
        }
      .serviceChanges::-webkit-scrollbar-track{
        box-shadow: inset 0 0 6px rgba(243,245,248,1);
        border-radius: 10px;
        background-color: #f5f5f5;
      }
      /*定义滑块，内阴影及圆角*/
      .serviceChanges::-webkit-scrollbar-thumb{
        height: 10px;
        border-radius: 10px;
        background-color: rgba(197,205,213,1);
      }
      .el-checkbox{
        display: none;
      }
    }
    .el-dialog__footer{
      width:px(840);
      height:68px;
      background:rgba(241,248,255,1);
      border-radius:4px 0px 5px 4px;
      padding: 0;
      .dialog-footer{
        width:px(840);
        height:68px;
        display: block;
        .el-button{
          width:100px;
          height:32px;
          line-height: 8px
        }
        .el-button--default{
          margin-right: px(48);
          margin-left: px(25);
          margin-top: 18px;
        }
      }
    }
  }
}
// 记账查看弹出框1
.customerDetails_steps_button1_dialog{
  .el-dialog{
    width:px(650);
    background:rgba(255,255,255,1);
    border-radius:5px;
    .el-dialog__header{
      width:px(650);
      height:68px;
      background:rgba(241,248,255,1);
      border-radius:4px 0px 5px 4px;
      font-size:18px;
      font-weight:600;
      color:rgba(51,57,63,1);
      line-height:24px;
    }
    .el-dialog__body{
      
        .message_box2{
          padding-top: 33px;
          padding-left: px(100);
          .message_common{
            //有些一行有四个span
            :nth-child(1){
              font-size:14px;
              font-weight:500;
              color:rgba(111,124,141,1);
              line-height:18px;
              display: inline-block;
              width: 110px;
              margin-right: px(24);
              text-align: right;
              line-height: 52px;
            }
            :nth-child(2){
              font-size:14px;
              font-weight:400;
              color:rgba(51,57,63,1);
              line-height:24px;
              display: inline-block;
              width:264px;
            }
            :nth-child(3){
              font-size:14px;
              font-weight:500;
              color:rgba(111,124,141,1);
              line-height:18px;
              display: inline-block;
              margin-left: px(60);
            }
            :nth-child(4){
              font-size:14px;
              font-weight:400;
              color:rgba(51,57,63,1);
              line-height:24px;
              display: inline-block;
              margin-left: px(24)
            }
          }
          .message_customer_status{
            padding-bottom: 16px;
            :nth-child(2){
              width:px(80);
              height:36px;
              font-size:12px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(0,151,254,1);
              line-height:36px;
            }
          }
        }
    }
    .el-dialog__footer{
      width:px(650);
      height:68px;
      background:rgba(241,248,255,1);
      border-radius:4px 0px 5px 4px;
      padding-top: 18px;
      .dialog-footer{
        margin-top: 9px;
        .el-button {
          width:100px;
          height:32px;
          line-height: 6px
        }
      }
    }
  }
}
//记账查看弹出框2
.customerDetails_steps_button2_dialog{
  .el-dialog{
    width:px(650);
    background:rgba(255,255,255,1);
    border-radius:5px;
    .el-dialog__header{
      width:px(650);
      height:68px;
      background:rgba(241,248,255,1);
      border-radius:4px 0px 5px 4px;
      font-size:18px;
      font-weight:600;
      color:rgba(51,57,63,1);
      line-height:24px;
    }
    .el-dialog__body{
        .message_box2{
          padding-top: 33px;
          padding-left: px(100);
          .message_common{
            //有些一行有四个span
            :nth-child(1){
              font-size:14px;
              font-weight:500;
              color:rgba(111,124,141,1);
              line-height:18px;
              display: inline-block;
              width: 110px;
              margin-right: px(24);
              text-align: right;
              line-height: 52px;
            }
            :nth-child(2){
              font-size:14px;
              font-weight:400;
              color:rgba(51,57,63,1);
              line-height:24px;
              display: inline-block;
              width:264px;
            }
            :nth-child(3){
              font-size:14px;
              font-weight:500;
              color:rgba(111,124,141,1);
              line-height:18px;
              display: inline-block;
              margin-left: px(60);
            }
            :nth-child(4){
              font-size:14px;
              font-weight:400;
              color:rgba(51,57,63,1);
              line-height:24px;
              display: inline-block;
              margin-left: px(24)
            }
          }
          .message_customer_status{
            padding-bottom: 16px;
            :nth-child(2){
              width:px(64);
              height:36px;
              font-size:12px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(0,151,254,1);
              line-height:36px;
            }
          }
        }
    }
    .el-dialog__footer{
      width:px(650);
      height:68px;
      background:rgba(241,248,255,1);
      border-radius:4px 0px 5px 4px;
      padding-top: 9px;
      .dialog-footer{
        margin-top: 9px;
        .el-button {
          width:100px;
          height:32px;
          line-height: 6px
        }
      }
    }
  }
}
// 记账弹出框
.keepAccounts_dialog{
  // height: 870px;
  .el-dialog{
    width:px(840);
    background:rgba(255,255,255,1);
    border-radius:5px;
    .el-dialog__header{
      width:px(840);
      height:68px;
      background:rgba(241,248,255,1);
      border-radius:4px 0px 5px 4px;
      font-size:18px;
      font-weight:600;
      color:rgba(51,57,63,1);
      line-height:24px;
    }
    .el-dialog__body{
      .el-form{
        margin-left: px(80);
        .el-form-item__label{
          padding-right:px(24)
        }
        .el-input{
          width: px(264);
        }
        .el-input__inner{
          width: px(264);
        }
        .keepAccounts_time{
          margin-left: px(-60)
        }
        .upload_file{
          .el-button{
            width:px(240);
            height:40px;
          }
          .el-upload-list__item-name{
            margin-left: px(92);
          }
            .el-upload-list__item-status-label{
              right: px(480);
              display: none;
            }
        }
      }
    }
    .el-dialog__footer{
      width:px(840);
      height:68px;
      background:rgba(241,248,255,1);
      border-radius:4px 0px 5px 4px;
      .dialog-footer{
        margin-top: 9px;
        .el-button {
          width:100px;
          height:32px;
          line-height: 6px
        }
      }
    }
  }
}
.client_form::-webkit-scrollbar {
  width: 6px!important;
  height: 10px!important;
}
.client_form::-webkit-scrollbar-track{
  box-shadow: inset 0 0 6px rgba(243,245,248,1);
  border-radius: 10px;
  background-color: #f5f5f5;
}
/*定义滑块，内阴影及圆角*/
.client_form::-webkit-scrollbar-thumb{
  width: 10px;
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
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: rgba(173,181,192,1);
}

.s_task_client{
  // 配置框
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding:0;
    border-radius:5px;
    background: #fff;
  }
}

// 操作
.task_finsh_else{
  // 头部
  .operation_header{
    height:48px;
    background:rgba(241,248,255,1);
    border-radius:5px 5px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 px(24);
    span:nth-child(1){
      border-radius:5px 5px 0px 0px;
      font-size:18px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(51,57,63,1);
      line-height:24px;
    }
    span:nth-child(2){
      background:rgba(241,248,255,1);
      border-radius:5px 5px 0px 0px;
      width: 20px;
      height:20px;
      cursor: pointer;
      img{
        width:100%;
        height:100%;
      }
    }
  }
  //底部
  .operation_footer{
    height:56px;
    background: rgba(241,248,255,1);
    display: flex;
    align-items: center;
    justify-content:flex-end;
    padding:0 24px;
    .el-button {
      width:100px;
      height:32px;
      box-shadow:0px 1px 0px 0px rgba(22,29,37,0.1);
      border-radius:4px;
      line-height: 8px;
    }
    .waitMean{
      background:rgba(255,255,255,1);
      box-shadow:0px 1px 0px 0px rgba(22,29,37,0.1);
      border-radius:4px;
      border:1px solid rgba(0,151,254,1);
      color: #0097FE;
      margin-left: 24px;
    }
  }
  .finsh_content{
    padding: 48px;
    box-sizing: border-box;
    p{
      font-size:20px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(255,131,107,1);
    }
  }
  .missMaterial_content{
    padding: 48px 48px 48px 0;
    box-sizing: border-box;
    .el-cascader, .el-select{
      width: 100%;
    }
  }
  .change_LY{
    padding: 32px 44px 22px 0;
    box-sizing: border-box;
    .el-select{
      width: 100%;
    }
  }
}

.task_Hold_else{
  // 头部
  .operation_header{
    height:48px;
    background:rgba(241,248,255,1);
    border-radius:5px 5px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 px(24);
    span:nth-child(1){
      border-radius:5px 5px 0px 0px;
      font-size:18px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(51,57,63,1);
      line-height:24px;
    }
    span:nth-child(2){
      background:rgba(241,248,255,1);
      border-radius:5px 5px 0px 0px;
      width: 20px;
      height:20px;
      cursor: pointer;
      img{
        width:100%;
        height:100%;
      }
    }
  }
  //底部
  .operation_footer{
    height:56px;
    background: rgba(241,248,255,1);
    display: flex;
    align-items: center;
    justify-content:flex-end;
    padding:0 24px;
    .el-button {
      width:100px;
      height:32px;
      box-shadow:0px 1px 0px 0px rgba(22,29,37,0.1);
      border-radius:4px;
      line-height: 8px;
    }
    .waitMean{
      background:rgba(255,255,255,1);
      box-shadow:0px 1px 0px 0px rgba(22,29,37,0.1);
      border-radius:4px;
      border:1px solid rgba(0,151,254,1);
      color: #0097FE;
      margin-left: 24px;
    }
  }
  // 内容
  .hold_content{
    padding:48px px(48) 10px 0;
    box-sizing: border-box;
    .el-form-item__label{
      font-size:14px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(51,57,63,1);
    }
  }
}

.task_transferElse{
  // 头部
  .operation_header{
    height:48px;
    background:rgba(241,248,255,1);
    border-radius:5px 5px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 px(24);
    span:nth-child(1){
      border-radius:5px 5px 0px 0px;
      font-size:18px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(51,57,63,1);
      line-height:24px;
    }
    span:nth-child(2){
      background:rgba(241,248,255,1);
      border-radius:5px 5px 0px 0px;
      width: 20px;
      height:20px;
      cursor: pointer;
      img{
        width:100%;
        height:100%;
      }
    }
  }
  //底部
  .operation_footer{
    height:56px;
    background: rgba(241,248,255,1);
    display: flex;
    align-items: center;
    justify-content:flex-end;
    padding:0 24px;
    .el-button {
      width:100px;
      height:32px;
      box-shadow:0px 1px 0px 0px rgba(22,29,37,0.1);
      border-radius:4px;
      line-height: 8px;
    }
    .waitMean{
      background:rgba(255,255,255,1);
      box-shadow:0px 1px 0px 0px rgba(22,29,37,0.1);
      border-radius:4px;
      border:1px solid rgba(0,151,254,1);
      color: #0097FE;
      margin-left: 24px;
    }
  }
  // 内容
  .transFer_content{
    padding:20px px(48) 10px 0;
    box-sizing: border-box;
    .el-form-item__label{
      font-size:14px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(51,57,63,1);
    }
    .bor_none{
      .el-input__inner{
        border: none;
      }
    }
    .el-select, .el-cascader{
      width: 100%;
    }
  }
}
</style>