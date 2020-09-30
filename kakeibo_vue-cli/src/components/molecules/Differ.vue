<template>
  <div class="p-differ">
    <DifferTitle/>
    <DifferText/>
  </div>
</template>

<script>
import DifferTitle from '../../components/atoms/DifferTitle.vue'
import DifferText from '../../components/atoms/DifferText.vue'

export default {
  name: 'Differ',
  components: {
    DifferTitle,
    DifferText
  }
}
</script>

<style scoped lang="scss">
.p-differ {
  margin-top: 23px;
  padding: 20px 0;
  text-align: center;
  background-color: #fff;
  border-radius: 30px;
}
</style>