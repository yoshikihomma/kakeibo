<template>
<div class="p-results">
  <Result/>
  <Result/>
</div>

</template>

<script>
import Result from '../../components/molecules/Result.vue'

export default {
  name: 'Results',
  components: {
    Result
  }
}
</script>

<style scoped lang="scss">
.p-results {
  display: flex;
  margin-top: 70px;
}
</style>