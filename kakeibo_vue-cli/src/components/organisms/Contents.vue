<template>
  <div class="l-contents">
    <MonthSelector/>
    <Differ/>
    <Results/>
    <ShowInputButton/>
  </div>
</template>

<script>
import MonthSelector from '../../components/molecules/MonthSelector.vue'
import Differ from '../../components/molecules/Differ.vue'
import Results from '../../components/organisms/Results.vue'
import ShowInputButton from '../../components/molecules/ShowInputButton.vue'

export default {
  name: 'Contents',
  components: {
    MonthSelector,
    Differ,
    Results,
    ShowInputButton
  }
}
</script>

<style scoped lang="scss">
.l-contents {
  padding: 67px 10px;
}
</style>