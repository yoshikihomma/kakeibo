<template>
  <div class="l-header__menuButon">
    <Bar/>
    <Bar/>
    <Bar/>
  </div>
</template>

<script>
import Bar from '../../components/atoms/Bar'

export default {
  name: 'MenuButton',
  components: {
    Bar
  }
}
</script>

<style scoped lang="scss">
.l-header__menuButon {
  position: absolute;
  top: calc(50% - 18.5px);
  right: 0;
  padding: 10px;
  width: 45px;
  box-sizing: border-box;
  >.c-bar {
    margin-bottom: 5px;
    &:last-of-type {
    margin-bottom: 0;
  }
  }
}
</style>