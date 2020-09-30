<template>
  <div class="p-price__food">食品: {{foodPrice}}円</div>

</template>

<script>
export default {
  name: 'FoodsPrice',
  props: {
    foodPrice: Number
  }
}
</script>

<style scoped lang="scss">
.p-price__food {
  margin-bottom: 15px;
  padding: 5px 0;
  background-color: #fff;
  border-radius: 10px;
  text-align: center;
}

</style>