<template>
  <div
    class="no_data"
    :style="{paddingTop: noDataPadding ? noDataPadding : '', 
    justifyContent: noDataPadding ? '' : 'center', 
    height: noDataHeight ? noDataHeight : '88%'}"
  >
    <img src="@/assets/image/no-data.png" alt />
    <div>暂无数据</div>
  </div>
</template>

<script>
export default {
  props: {
    noDataPadding: {
      type: String
    },
    noDataHeight: {
      type: String
    }
  }
};
</script>

<style lang="scss">
.no_data {
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 400;
  color: rgba(173, 181, 192, 1);
  align-items: center;
  img {
    width: 50px;
    height: 56px;
    margin-bottom: 10px;
  }
}
</style>