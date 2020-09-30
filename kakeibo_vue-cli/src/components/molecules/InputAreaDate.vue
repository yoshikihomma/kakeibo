<template>
  <div class="c-inputItem">
    <!-- <input type="text" placeholder="金額" data-item="price" class="c-input p-itemprice"> -->
    <input type="date" id="itemdate" data-item="date" class="c-input p-itemdate">
  </div>
</template>

<script>
export default {
  name: 'InputAreaDate'
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