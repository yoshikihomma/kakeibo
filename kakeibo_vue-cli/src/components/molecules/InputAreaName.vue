<template>
  <div class="p-inputArea__name">
    <InputNameLabel/>
    <InputNameLabel/>
  </div>
</template>

<script>
import InputNameLabel from '../../components/atoms/InputNameLabel.vue'

export default {
  name: 'InputAreaName',
  components: {
    InputNameLabel
  }
}
</script>

<style scoped lang="scss">
.p-inputArea__name {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
  padding: 10px 0;
}

</style>