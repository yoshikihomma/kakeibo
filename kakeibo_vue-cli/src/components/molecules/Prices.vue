<template>
  <div class="p-prices">
    <FoodsPrice foodPrice="0"/>
    <CommoditiesPrice commodityPrice="0"/>
    <PublicsPrice publicPrice="0"/>

  </div>
</template>

<script>
import FoodsPrice from '../../components/atoms/FoodsPrice.vue'
import CommoditiesPrice from '../../components/atoms/CommoditiesPrice.vue'
import PublicsPrice from '../../components/atoms/PublicsPrice.vue'

export default {
  name: 'Prices',
  components: {
    FoodsPrice,
    CommoditiesPrice,
    PublicsPrice
  }
}
</script>

<style scoped lang="scss">
.p-prices {
  padding-bottom: 15px;
  border-bottom: 1px solid $black;
}
</style>