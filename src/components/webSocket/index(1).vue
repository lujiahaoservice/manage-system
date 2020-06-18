<template> 
  <div class="task">333</div>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<style lang="scss">
  @function px($px){
    $rem: 144;
    @return ($px/ $rem) + rem;
  }
  .task{
    margin: 24px;
  }
</style>