<template>
  <el-menu :default-active="active" class="el-menu-vertical-demo" unique-opened>
    <el-sub-menu
      v-for="item in $store.state.user.menus"
      :key="item.id"
      :index="item.desc"
    >
      <template #title>
        <el-icon :icon="item.icon"></el-icon>
        <span>{{ item.name }}</span>
      </template>
      <el-menu-item-group v-for="ite in item.child" :key="ite.id">
        <el-menu-item :index="ite.desc">
          <el-icon :icon="ite.icon"></el-icon>
          <span>{{ ite.name }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ref } from 'vue';
const active = ref('index');
</script>

<style lang="scss">
.el-menu {
  height: 100%;
}
</style>
