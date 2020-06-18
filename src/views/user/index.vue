<template>
  <div class="user">
    <!-- 商机概况 -->
    <!-- 商机列表 -->
    <div class="business_content">
      <div class="table_tabs">
        <div class="tabs_position">
          <div
            :class="['tab', 'tab1', tab_active === '0' ? 'active_tab' : '']"
            @click="tab_active = '0'"
          >用户列表</div>
          <div
            :class="['tab', 'tab4', tab_active === '2' ? 'active_tab' : '']"
            @click="tab_active = '2'"
          >合伙人列表</div>
        </div>
      </div>
      <!-- 表格列表 -->
      <User v-if="tab_active === '0'"></User>
      <Agent v-if="tab_active === '2'"></Agent>
    </div>
  </div>
</template>

<script>
import User from "./user";
import Agent from "./agent";
export default {
  components: {
    User,
    Agent
  },
  data() {
    return {
      tab_active: "0"
    };
  },
  watch: {},
  created() {},
  methods: {}
};
</script> 

<style lang="scss">
@function px($px) {
  $rem: 144;
  @return ($px/ $rem) + rem;
}
.user {
  margin: 24px px(24);
  margin-bottom: 0;
  // 内容部分
  .business_content {
    position: relative;
    box-sizing: border-box;
    width: px(1200);
    background: #fff;
    padding: 24px px(24);
    padding-bottom: 0;
    .table_tabs {
      position: relative;
      height: 40px;
      padding-left: px(7);
      border-bottom: 1px solid #e4eef9;
      .tabs_position {
        position: absolute;
        bottom: -1px;
        display: flex;
      }
      .tab {
        width: 160px;
        height: 40px;
        line-height: 40px;
        background: rgba(246, 248, 251, 1);
        border-radius: 4px 4px 0px 0px;
        border: 1px solid rgba(228, 238, 249, 1);
        padding-left: 16px;
        margin-right: px(4);
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        color: #6f7c8d;
      }
      .active_tab {
        background: rgba(255, 255, 255, 1);
        color: rgba(0, 151, 254, 1);
        border-bottom: #fff;
      }
    }
    // 列表表格
  }
  .pagination {
    height: 86px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    right: px(24);
    background: #fff;
    z-index: 2;
    padding: 0 px(24);
    border-top: 1px solid rgba(228, 238, 249, 1);
  }
}
</style>
