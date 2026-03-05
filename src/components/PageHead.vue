<template>
  <div class="page-head">
    <p class="page-title">{{ props.title }}</p>
    <div class="action-btn">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script setup name="PageHead">
const props = defineProps({
  title: {
    type: String,
    default: '页面标题'
  }
})
console.log(props.title)
</script>

<style lang="scss" scoped>
.page-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .page-title {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
