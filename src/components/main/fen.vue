<template>
  <div class="fen">
    <div>
      <el-icon :color="item.color">
        <component :is="item.icon"></component>
      </el-icon>
      <div>{{ item.title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line no-undef
defineProps({
  item: {
    type: Object
  }
});
</script>

<style lang="scss">
.fen {
  flex: 1;
  height: 86px;
  padding: 20px;
  margin: 20px 10px;
  text-align: center;
  background-color: #fff;
}
.fen:hover {
  @apply shadow-md;
}
</style>
