<template>
  <el-menu
    :default-active="$route.path"
    :collapse="$store.state.widthCe == '65px'"
    class="el-menu-vertical-demo"
    unique-opened
    @select="tiao"
  >
    <el-sub-menu
      v-for="item in $store.state.menus"
      :key="item.id"
      :index="item.desc"
    >
      <template #title>
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <el-icon :icon="item.icon"></el-icon>
        <span>{{ item.name }}</span>
      </template>
      <el-menu-item-group v-for="ite in item.child" :key="ite.id">
        <el-menu-item :index="ite.desc">
          <el-icon>
            <component :is="ite.icon"></component>
          </el-icon>
          <span>{{ ite.name }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { useRouter } from 'vue-router';
const { push } = useRouter();
// 跳转
const tiao = (e) => {
  console.log(e);
  push(e);
};
</script>

<style lang="scss">
.el-menu {
  height: 100%;
}
</style>
