<template>
  <div class="main_top_box">
    <div class="main_top__box_top">
      <div>{{ item.title }}</div>
      <div>{{ item.unit }}</div>
    </div>
    <div class="main_top_box_bottom">
      <div class="main_top_box_bottom_content">{{ item.value }}</div>
      <el-divider v-if="item.subTitle" />
      <div v-if="item.subTitle" class="main_top_box_bottom_bottom">
        <span>{{ item.subTitle }}</span>
        <span>{{ item.subValue }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line no-undef
const props = defineProps({
  item: {
    type: Object
  }
});
</script>

<style lang="scss">
.main_top_box {
  flex: 1;
  @apply bg-light-50 mx-2;
  .main_top__box_top {
    border-bottom: 1px solid #ccc;
    @apply bg-light-300 flex justify-between items-center p-2 text-sm;
  }
  .main_top_box_bottom {
    height: 145px;
    padding: 20px;
    .main_top_box_bottom_content {
      @apply text-3xl font-bold text-gray-500;
    }
    .main_top_box_bottom_bottom {
      @apply flex justify-between text-sm text-gray-500;
    }
  }
}
.main_top_box:hover {
  @apply shadow-md;
}
</style>
