<template>
  <div class="removePaging">
    <div class="summary_form_delete_page">
      <div class="summary_form_delete">
        <el-button plain>批量删除</el-button>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
//删除和分页
  .removePaging{
    padding:0 px(24)!important;
    width: px(1200);
    .summary_form_delete_page{
      background: #fff;
      padding: 23px 0 30px 0;
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      z-index: 100;
      border-top: 1px solid rgba(228,238,249,1);
      .is-background{
        padding-right:0;
        .btn-next{
          margin-right:0;
        }
      }
      .summary_form_delete{
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
</style>