<template>
  <div>
    <Prices/>
    <Total total="0"/>
  </div>
</template>

<script>
import Prices from '../../components/molecules/Prices.vue'
import Total from '../../components/atoms/Total.vue'

export default {
  name: 'ResultPrice',
  components: {
    Prices,
    Total
  }
}
</script>

<style scoped lang="scss">

</style>