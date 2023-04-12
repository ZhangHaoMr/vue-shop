<template>
  <el-container>
    <el-header>
      <FHeader />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <FMenu />
      </el-aside>
      <el-main>
        <FTagList />
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import FHeader from '@/components/FHeader.vue';
import FMenu from '@/components/FMenu.vue';
import FTagList from '@/components/FTagList.vue';
</script>

<style lang="scss">
.el-container {
  height: 100vh;
  .el-aside,
  .el-main {
    height: calc(100vh - 60px);
  }
}
</style>
