<template>
  <button class="p-hiddenInputButton" @click="test()"></button>
  <!-- <button class="p-hiddenInputButton" @click="showInputArea = !showInputArea"></button> -->
</template>

<script>
export default {
  name: 'HiddenInputButton',
  // data: () => {
  //   return {
  //     showInputArea: false
  //   }
  // },
  methods: {
    test() {
      this.$data.showInputArea = !this.$data.showInputArea;
      console.log(111);
    }
  }
}
</script>

<style scoped lang="scss">
.p-hiddenInputButton {
  position: absolute;
  top: 3px;
  right: 3px;
  display: block;
  margin: 0 0 0 auto;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border: none;
  &::before {
    content: "";
    display: block;
    border-top: solid 1px #707070;
    transform: rotate(-45deg);
  }
  &::after {
    content: "";
    display: block;
    border-top: solid 1px #707070;
    transform: rotate(45deg);
  }
}
</style>