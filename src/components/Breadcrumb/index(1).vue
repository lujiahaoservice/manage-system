<template>
  <div  class="Breadcrumb">
    <div class="bigBox">
      <div class="smallBox">
        <el-tag
          v-for="tag in tagFor"
          :key="tag.name"
          :closable="tag.name!='首页'"
          :type="tag.name === nowRouteName ? '' : 'info'"
          @click="to_route(tag)"
          @close="handleClose(tag)">
          {{tag.name}}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {

  },
  data() {
    return {
      tags: ['首页'],
      tagFor: [{ name: '首页', path: '/homepage' }],
      nowRouteName: '首页'
    }
  },
  watch: {
    $route(val) {
      this.nowRouteName = val.name
      if (this.tags.indexOf(val.name) < 0) {
        this.tags.push(val.name)
        this.tagFor.push({
          name: val.name,
          path: val.path
        })
      }
    }
  },
  mounted() {
    const val = this.$route
    this.nowRouteName = val.name
    if (this.tags.indexOf(val.name) < 0) {
      this.tags.push(val.name)
      this.tagFor.push({
        name: val.name,
        path: val.path
      })
    }
  },
  methods: {
    to_route(e) {
      if (e.name === this.nowRouteName) {
        return
      }
      this.$router.push(e.path)
      this.$emit('go_thisPath', e.path)
    },
    handleClose(tag) {
      const index = this.tagFor.indexOf(tag)
      if (index !== this.tagFor.length - 1 && this.tagFor[this.tagFor.length - 1].name === this.nowRouteName) {
        this.tagFor.splice(index, 1)
        this.tags.splice(index, 1)
        return
      }
      if (this.nowRouteName === this.tagFor[index - 1].name) {
        this.tagFor.splice(index, 1)
        this.tags.splice(index, 1)
        return
      }
      this.nowRouteName = this.tagFor[index - 1].name
      this.$emit('go_thisPath', this.tagFor[index - 1].path)
      this.$router.push(this.tagFor[index - 1].path)
      this.tagFor.splice(index, 1)
      this.tags.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
@function px($px){
  $rem: 144;
  @return ($px/ $rem) + rem;
}
  .Breadcrumb{
    padding: 18px px(20) 16px 0;
    font-weight:500;
    height: 58px;
    color:rgba(102,102,102,1);
    font-size:14px;
    width: px(1240);
    position: relative;
    .bigBox{
      display: block;
      white-space: nowrap;
      min-width: 3000px;
      position: absolute;
      right: 0;
      .smallBox{
        min-width: px(1232);
        position: absolute;
        right: 0;
      }
    }
    .el-tag{
      margin-left: px(12)!important;
      height: 24px!important;
      line-height: 22px!important;
      cursor: pointer;
      background:(240,247,255,1);
      border-radius:2px;
      background: rgba(240,247,255,1);
      border:1px solid rgba(35,121,230,1);
      color: #2078E5;
    }
    .el-tag.el-tag--info{
      color: #8894A3;
      background:rgba(240,247,255,1);
      border-radius:2px;
      border:1px solid rgba(192,196,204,1);
    }
  }
</style>