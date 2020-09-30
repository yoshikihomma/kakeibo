<template>
  <div class="c-inputItem">
    <input type="text" placeholder="金額" data-item="price" class="c-input p-itemprice">円
  </div>
</template>

<script>
export default {
  name: 'InputAreaPrice'
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