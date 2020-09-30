<template>
  <div class="p-month">
    <PrevButton prevArrow="＜"/>
    <Month month="{{yyyy-mm}}"/>
    <NextButton nextArrow="＞"/>
  </div>
</template>

<script>
import PrevButton from '../../components/molecules/PrevButton.vue'
import Month from '../../components/molecules/Month.vue'
import NextButton from '../../components/molecules/NextButton.vue'

export default {
  name: 'MonthSelector',
  components: {
    PrevButton,
    Month,
    NextButton
  }
}
</script>

<style scoped lang="scss">
.p-month {
  display: flex;
  justify-content: center;
  margin: 0 -10px;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>