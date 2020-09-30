<template>
  <header class="l-header">
    <Title/>
    <MenuButton/>
  </header>
</template>

<script>
import Title from '../../components/atoms/Title'
import MenuButton from '../../components/molecules/MenuButton'

export default {
  name: 'Header',
  components: {
    Title,
    MenuButton
  }
}
</script>

<style scoped lang="scss">
.l-header {
  position: fixed;
  padding: 24px 0;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid $black;
  z-index: 10;
}
</style>
