<template>
  <button class="p-showInputButton"></button>
</template>

<script>
export default {
  name: 'ShowInputButton'
}
</script>

<style scoped lang="scss">
.p-showInputButton {
  position: fixed;
  right: 10px;
  bottom: 10px;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border: none;
  border-radius: 50%;
  box-shadow: 2px 5px 7px 0px #70707091;
  &::before {
    content: "";
    display: block;
    border-top: solid 1px #707070;
  }
  &::after {
    content: "";
    display: block;
    border-top: solid 1px #707070;
    transform: rotate(90deg);
  } 
}
</style>