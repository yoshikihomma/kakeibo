<template>
  <div class="p-inputArea" v-show="!showInputArea">
    <InputAreaInner/>
  </div>

</template>

<script>
import InputAreaInner from '../../components/molecules/InputAreaInner.vue'

export default {
  name: 'InputArea',
  data: () => {
    return {
      showInputArea: false
    }
  },
  components: {
    InputAreaInner
  }
}
</script>

<style scoped lang="scss">
.p-inputArea {
  position: fixed;
  top: 0;
  right: 0;
  padding: 20px;
  width: 100%;
  height: 100vh;
  font-size: 18px;
  background-color: rgba(80, 77, 77, 0.815);
  box-sizing: border-box;
  z-index: 10;
}

</style>