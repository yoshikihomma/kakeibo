<template>
  <label for="type" class="p-inputTypeLabel">
    <input type="radio" name="type" id="type" data-item="type" class="c-radioButton">
    <!-- <input type="radio" name="type" id="type" data-item="type" class="p-itemtype c-radioButton"> -->
    分類
  </label>
</template>

<script>
export default {
  name: 'InputTypeLabel'
}
</script>

<style scoped lang="scss">
.p-inputTypeLabel {
  margin-right: 10px;
  padding: 10px;
  font-size: 12px;
  color: #fff;
  background-color: #00adffbf;
  border-radius: 20px;
  .c-radioButton {
    display: none;
  }
}
</style>