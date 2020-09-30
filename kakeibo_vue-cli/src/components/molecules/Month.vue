<template>
  <div class="p-month__number">{{month}}</div>
</template>

<script>
export default {
  name: 'Month',
  props: {
    month: String
  }
}
</script>

<style scoped lang="scss">
.p-month__number {
  margin: 0 30px;
}
</style>