<template>
  <div class="p-inputArea__inner">
    <HiddenInputButton/>
    <InputAreaName/>
    <InputAreaType/>
    <InputAreaPrice/>
    <InputAreaDate/>
    <InputAreaItem/>
    <AddButton/>
  </div>
</template>

<script>
import HiddenInputButton from '../../components/molecules/HiddenInputButton.vue'
import InputAreaName from '../../components/molecules/InputAreaName.vue'
import InputAreaType from '../../components/molecules/InputAreaType.vue'
import InputAreaPrice from '../../components/molecules/InputAreaPrice.vue'
import InputAreaDate from '../../components/molecules/InputAreaDate.vue'
import InputAreaItem from '../../components/molecules/InputAreaItem.vue'
import AddButton from '../../components/molecules/AddButton.vue'

export default {
  name: 'InputAreaInner',
  components: {
    HiddenInputButton,
    InputAreaName,
    InputAreaType,
    InputAreaPrice,
    InputAreaDate,
    InputAreaItem,
    AddButton
  }
}
</script>

<style scoped lang="scss">
.p-inputArea__inner {
  position: relative;
  padding: 40px 20px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: #fff;
  box-sizing: border-box;
}

</style>