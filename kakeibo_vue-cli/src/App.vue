<template>
  <div class="l-main">
    <Header/>
    <Contents/>
    <InputArea/>
  </div>
</template>

<script>
import Header from './components/organisms/Header.vue'
import Contents from './components/organisms/Contents.vue'
import InputArea from './components/organisms/InputArea.vue'

export default {
  name: 'App',
  components: {
    Header,
    Contents,
    InputArea
  }
}
</script>

<style scoped lang="scss">
.l-main {
  color: $black;
}
</style>
