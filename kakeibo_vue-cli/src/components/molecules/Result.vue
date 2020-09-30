<template>
<div class="p-results__result">
  <ResultName name="name"/>
  <ResultPrice/>
</div>
</template>

<script>
import ResultName from '../../components/molecules/ResultName.vue'
import ResultPrice from '../../components/molecules/ResultPrice.vue'

export default {
  name: 'Result',
  components: {
    ResultName,
    ResultPrice
  }
}
</script>

<style scoped lang="scss">
.p-results__result {
  position: relative;
  flex-grow: 1;
  padding: 50px 5px 30px;
  min-width: 145px;
  margin-left: 10px;
  box-sizing: border-box;
  background-color: #F5EED1;
  &:first-of-type {
    margin-left: 0;
  }
}
</style>