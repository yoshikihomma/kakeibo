<template>
  <div class="p-price__commodity">日用品: {{commodityPrice}}円</div>
</template>

<script>
export default {
  name: 'CommoditiesPrice',
  props: {
    commodityPrice: Number
  }
}
</script>

<style scoped lang="scss">
.p-price__commodity {
  margin-bottom: 15px;
  padding: 5px 0;
  background-color: #fff;
  border-radius: 10px;
  text-align: center;
}
</style>