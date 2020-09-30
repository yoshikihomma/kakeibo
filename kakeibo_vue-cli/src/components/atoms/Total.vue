<template>
  <div class="p-price__total">合計: {{total}}円</div>

</template>

<script>
export default {
  name: 'Total',
  props: {
    total: Number
  }
}
</script>

<style scoped lang="scss">
.p-price__total {
  margin-top: 15px;
  padding: 5px 0;
  background-color: #fff;
  border-radius: 10px;
  text-align: center;
}

</style>