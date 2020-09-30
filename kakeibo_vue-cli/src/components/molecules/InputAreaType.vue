<template>
  <div class="p-inputArea__type">
    <InputTypeLabel/>
    <InputTypeLabel/>
    <InputTypeLabel/>
  </div>
</template>

<script>
import InputTypeLabel from '../../components/atoms/InputTypeLabel.vue'

export default {
  name: 'InputAreaType',
  components: {
    InputTypeLabel
  }
}
</script>

<style scoped lang="scss">
.p-inputArea__type {
  margin-bottom: 30px;
}
</style>