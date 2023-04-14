<template>
  <el-container>
    <el-header>
      <FHeader />
    </el-header>
    <el-container>
      <el-aside :width="$store.state.widthCe" style="overflow: hidden">
        <FMenu />
      </el-aside>
      <el-main>
        <FTagList />
        <div class="main">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import FHeader from '@/components/home/FHeader.vue';
import FMenu from '@/components/home/FMenu.vue';
import FTagList from '@/components/home/FTagList.vue';
</script>

<style lang="scss">
.el-container {
  height: 100vh;
  .el-aside,
  .el-main {
    height: calc(100vh - 60px);
    background-color: #f3f4f6;
    overflow: hidden;
    .main {
      height: 100%;
      margin: 0 auto !important;
      // overflow: scroll;
    }
  }
}
</style>
