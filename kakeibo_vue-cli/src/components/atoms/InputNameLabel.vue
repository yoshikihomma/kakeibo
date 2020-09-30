<template>
  <label for="a" class="p-inputNameLabel">
    <input type="radio" name="name" class="c-radioButton">
    <!-- <input type="radio" name="name" value="a" id="a" data-item="who" class="p-inputArea__item p-itemwho c-radioButton"> -->
    name
  </label>
</template>

<script>
export default {
  name: 'InputNameLabel'
}
</script>

<style scoped lang="scss">
.p-inputNameLabel {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border: solid 1px #707070;
  border-radius: 50%;
  .c-radioButton {
    display: none;
  }
}
</style>