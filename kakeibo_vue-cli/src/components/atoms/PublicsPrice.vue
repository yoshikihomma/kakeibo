<template>
  <div class="p-price__public">公共料金: {{publicPrice}}円</div>
</template>

<script>
export default {
  name: 'PublicsPrice',
  props: {
    publicPrice: Number
  }
}
</script>

<style scoped lang="scss">
.p-price__public {
  margin-bottom: 15px;
  padding: 5px 0;
  background-color: #fff;
  border-radius: 10px;
  text-align: center;
}
</style>