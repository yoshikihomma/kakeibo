<template>
  <div class="p-result__name">{{name}}</div>
</template>

<script>
export default {
  name: 'ResultName',
  props: {
    name: String
  }
}
</script>

<style scoped lang="scss">
.p-result__name {
  position: absolute;
  top: -38px;
  left: calc(50% - 38px);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 76px;
  height: 76px;
  background-color: #fff;
  border-radius: 50%;
}
</style>