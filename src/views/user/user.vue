<template>
  <div class="user">
    <div class="feedback">
      <el-input v-model="searchInput" placeholder="请输入昵称/手机号码/姓名" style="width:400px;"></el-input>
      <el-button type="primary" style="margin-left:20px;" @click="searchUser">查询</el-button>
    </div>
    <div class="content_form">
      <el-table
        :header-cell-style="{background:'rgba(228,238,249,1)',color:'#33393F'}"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column prop="name" align="center" label="姓名"></el-table-column>
        <el-table-column prop="mobile" align="center" label="联系方式"></el-table-column>
        <el-table-column align="center" label="实名认证状态">
          <template slot-scope="scope">
            <span v-if="scope.row.verifiedStatus ==0" style="color:#FF836B">未认证</span>
            <span v-if="scope.row.verifiedStatus ==1" style="color:#6F7C8D">审核中</span>
            <span v-if="scope.row.verifiedStatus ==2" style="color:#0097FE">审核通过</span>
            <span v-if="scope.row.verifiedStatus ==3" style="color:#FF836B">审核未通过</span>
          </template>
        </el-table-column>
        <el-table-column prop="credit" align="center" label="信用数"></el-table-column>
        <el-table-column align="center" label="是否会员">
          <template slot-scope="scope">
            <span v-if="scope.row.feeConfigureId === 0" style="color:#6F7C8D">非会员</span>
            <span v-if="scope.row.feeConfigureId !== 0" style="color:#FF836B">会员</span>
          </template>
        </el-table-column>
        <el-table-column prop="memberExtime" align="center" label="会员到期时间"></el-table-column>
        <el-table-column align="center" label="余额(元)">
          <template slot-scope="scope">{{(scope.row.balance/100).toFixed(2)}}</template>
        </el-table-column>
        <el-table-column fixed="right" align="center" width="250" label="操作">
          <template slot-scope="scope">
            <div
              style="
            display:flex;
            align-items: center;
            justify-content:center;
            cursor: pointer;"
            >
              <el-button
                v-if="!scope.row.blacklist"
                @click.native.prevent="willDeiete(scope.$index, tableData, true)"
                type="danger"
                size="small"
              >加入黑名单</el-button>
              <el-button
                v-if="scope.row.blacklist"
                @click.native.prevent="willDeiete(scope.$index, tableData, false)"
                type="primary"
                size="small"
              >解除黑名单</el-button>
              <el-button
                @click.native.prevent="see(scope.$index, tableData)"
                type="primary"
                size="small"
              >详情</el-button>
              <el-button
                @click.native.prevent="willGive(scope.$index, tableData)"
                type="primary"
                size="small"
              >修改会员</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <div></div>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        @current-change="changePage"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 弹框开始 -->
    <el-dialog title="用户详情 " :visible.sync="orderModal" :close-on-click-modal="false" width="40%">
      <div class="vip_main">
        <div class="vip_main_item">
          <div class="vip_main_item_text">昵称</div>
          <div class="vip_main_item_inputs">
            <el-input v-model="seeItem.nickname" :disabled="true"></el-input>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">姓名</div>
          <div class="vip_main_item_inputs">
            <el-input placeholder="姓名" v-model="seeItem.name" :disabled="true"></el-input>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">头像</div>
          <div class="vip_main_item_inputs">
            <el-image style="width: 100px; height: 100px" :src="seeItem.photo"></el-image>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">性别</div>
          <div class="vip_main_item_inputs">
            <el-radio-group v-model="seeItem.sex">
              <el-radio :label="1" disabled>男</el-radio>
              <el-radio :label="2" disabled>女</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">所在城市</div>
          <div class="vip_main_item_inputs">
            <el-input placeholder="所在城市" v-model="seeItem.city" :disabled="true"></el-input>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">兴趣行业</div>
          <div class="vip_main_item_inputs">
            <div v-for="(item) in seeItem.interest" :key="item.name">{{item.name}}</div>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">注册时间</div>
          <div class="vip_main_item_inputs">
            <el-input placeholder="注册时间" v-model="seeItem.created" :disabled="true"></el-input>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">会员名称</div>
          <div class="vip_main_item_inputs">
            <el-input v-model="vipDetail.feeName" :disabled="true"></el-input>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">最高接单数</div>
          <div class="vip_main_item_inputs">
            <el-input v-model="vipDetail.maximumNumber" :disabled="true"></el-input>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">会员费(元)</div>
          <div class="vip_main_item_inputs">{{(vipDetail.memberFee/100).toFixed(2)}}</div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">平台抽成(%)</div>
          <div class="vip_main_item_inputs">
            <el-input v-model="vipDetail.platformPumping" :disabled="true"></el-input>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">会员到期时间</div>
          <div class="vip_main_item_inputs">
            <el-input placeholder="会员到期时间" v-model="seeItem.memberExtime" :disabled="true"></el-input>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">绑定账号名称</div>
          <div class="vip_main_item_inputs" v-if="seeItem.alipayUsername">
            <el-input placeholder="绑定账号名称" v-model="seeItem.alipayUsername" :disabled="true"></el-input>
          </div>
          <div class="vip_main_item_inputs" v-if="seeItem.bankUsername">
            <el-input placeholder="绑定账号名称" v-model="seeItem.bankUsername" :disabled="true"></el-input>
          </div>
        </div>
        <div class="vip_main_item">
          <div class="vip_main_item_text">提现账号</div>
          <div class="vip_main_item_inputs" v-if="seeItem.alipay">
            <el-input placeholder="提现账号" v-model="seeItem.alipay" :disabled="true"></el-input>
          </div>
          <div class="vip_main_item_inputs" v-if="seeItem.bankCard">
            <el-input placeholder="提现账号" v-model="seeItem.bankCard" :disabled="true"></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="orderModal = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改会员" 
    :visible.sync="giveVipModal" 
    :close-on-click-modal="false" 
    width="40%"  
    >
      <div class="vip_main">
        <div class="vip_main_item">
          <div class="vip_main_item_text">选择会员类型</div>
          <div class="vip_main_item_inputs">
            <el-select v-model="vipType" placeholder="请选择">
              <el-option
                v-for="item in vipItem"
                :key="item.value"
                :label="item.feeName"
                :value="item.feeConfigureId"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" >
        <el-button @click="giveVipModal = false, vipTime = 1,vipType = ''">取 消</el-button>
        <el-button type="primary" @click="sureGiveVip">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 弹框结束 -->
  </div>
</template>
<script>
import NoData from "@/components/no-data";
import {
  clientList,
  userBlack,
  updateFee,
  getVipItem,
  getVipdetails
} from "@/api/user";
// import { download } from '@/plugins/download'
export default {
  components: {
    NoData
  },
  data() {
    return {
      vipDetail: {
        feeName: "",
        memberFee: 0
      },
      userId: "",
      vipItem: [],
      vipType: "",
      vipTime: 1,
      giveVipModal: false,
      orderModal: false,
      seeItem: {}, //查看详情
      input: "",
      tab_active: "0",
      value: "",
      value1: "",
      value2: "",
      drawer: false,
      indexFlag: "",
      tableData: [],
      selectVal: "",
      total: 0,
      pageNum: 1,
      pageSize: 8,
      getIt: 0,
      searchInput: ""
    };
  },
  watch: {},
  created() {
    this.initData();
  },
  methods: {
    // 确定赠送会员
    sureGiveVip() {
      this.$confirm("此操作不可逆是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const data = {
            clientUserId: this.userId,
            feeConfigureId: this.vipType
          };
          updateFee(data).then(res => {
            if (res.status === 200) {
              this.$message.success("操作成功");
              this.vipType = "";
              this.giveVipModal = false;
              this.initData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 打开修改会员页面
    willGive(index, table) {
      console.log(table[index]);
      this.userId = table[index].clientUserId;
      getVipItem({
        zipCode: table[index].cityCode
      }).then(res => {
        this.vipItem = res.data.data;
        console.log(res.data.data);
      });
      this.giveVipModal = true;
    },
    // 是否加入黑名单
    willDeiete(index, table, flag) {
      this.$confirm(
        flag == true ? "此操作将永久拉黑该用户, 是否继续?" : "取消拉黑",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          const data = {
            clientUserId: table[index].clientUserId,
            blacklist: flag
          };
          userBlack(data).then(res => {
            if (res.status === 200) {
              this.$message.success("操作成功");
              this.initData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消拉黑"
          });
        });
    },
    initData() {
      const data = {
        keyWords: this.searchInput,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      clientList(data).then(res => {
        if (res.status === 200) {
          console.log("fanhuideshuju", res);
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
        }
      });
    },
    changePage(e) {
      this.pageNum = e;
      this.initData();
    },
    searchUser() {
      this.initData();
    },
    enterTime(e) {
      console.log("e", e);
      this.initData(e[0], e[1]);
    },
    see(index, table) {
      this.seeItem = table[index];
      this.orderModal = true;
      console.log('dayinxiangqing',this.seeItem);
      getVipdetails({
        id: table[index].feeConfigureId
      }).then(res => {
        console.log('ffffffffff',res.data)
        if (res.data.msg !== "暂无承载数据") {
          this.vipDetail = res.data.data;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.user {
  //这里绝对有问题，900太高了，修改哪里太丑了
   .el-dialog__body{
    height: 900px;
  }
  // 搜索
  .feedback {
    display: flex;
    flex-direction: row;
    margin-bottom: 16px;
  }
}
.vip_main_item {
  display: flex;
  margin-top: 30px;
  align-items: center;
  .vip_main_item_text {
    margin-right: 25px;
    width: 70px;
  }
}
.vip_main {
  height: 280px;
  // overflow-y: scroll;
}
</style>

