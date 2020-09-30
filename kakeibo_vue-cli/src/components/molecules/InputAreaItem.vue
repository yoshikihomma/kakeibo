<template>
  <div class="c-inputItem">
    <input type="text" placeholder="商品名" data-item="name" class="c-input p-itemname">
  </div>
</template>

<script>
export default {
  name: 'InputAreaItem'
}
</script>

<style scoped lang="scss">
.c-inputItem {
  margin-bottom: 30px;
  .c-input {
    padding: 0 6px;
    min-height: 30px;
    min-width: 180px;
    font-size: 18px;
    color: #707070;
    margin-right: 10px;
  }
}
</style>