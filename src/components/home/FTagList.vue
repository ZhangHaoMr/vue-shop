<template>
  <div
    class="box"
    :style="{
      left: $store.state.widthCe
    }"
  >
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      @tab-remove="removeTab"
      style="min-width: 100px"
      @tab-click="changeTab"
    >
      <el-tab-pane
        :closable="item.path !== '/'"
        v-for="item in tabList"
        :key="item.path"
        :label="item.title"
        :name="item.path"
      >
      </el-tab-pane>
    </el-tabs>

    <span class="tag-btn">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="a">关闭其他</el-dropdown-item>
            <el-dropdown-item command="b">全部关闭</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';

const route = useRoute();
const router = useRouter();

const editableTabsValue = ref(route.path);
const tabList = ref([
  {
    title: '后台首页',
    path: '/index'
  }
]);

onBeforeRouteUpdate((to) => {
  editableTabsValue.value = to.path;
  addTab({
    title: to.meta.title as string,
    path: to.path
  });
});

const handleCommand = (command: string | number | object) => {
  console.log(command);
};

// 添加tab
const addTab = (tab: { title: string; path: string }) => {
  // console.log(tab);
  let noTab = tabList.value.findIndex((res) => res.path === tab.path) == -1;
  if (noTab) {
    tabList.value.push(tab);
  }
};

// 删除tab
const removeTab = (targetName: string) => {
  // console.log(targetName);
  tabList.value = tabList.value.filter((res) => res.path !== targetName);
};

// 切换页面
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const changeTab = (t: any) => {
  // console.log(t);
  router.push(t.props.name);
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  top: 65px;
}

.tag-btn {
  @apply bg-white px-2 flex justify-center items-center text-black float-right;
  float: right;
  width: 32px;
  height: 32px;
  overflow: hidden;
  .el-dropdown {
    height: 32px !important;
    width: 32px !important;
    .el-dropdown-link {
      height: 32px !important;
      color: #000;
    }
  }
}

:deep(.el-tabs) {
  height: auto;
}

:deep(.el-tabs__header) {
  margin-bottom: 0;
  border: 0 !important;
}

:deep(.el-tabs__nav) {
  border: 0 !important;
}

:deep(.el-tabs__item) {
  height: 32px;
  line-height: 32px;
  border: 0 !important;
  @apply bg-white mx-1 rounded;
}

:deep(.el-tabs_nav-next),
:deep(.el-tabs_nav-next) {
  line-height: 32px;
}
:deep(.is-disabled) {
  cursor: not-allowed;
  @apply text-gray-300;
}
</style>
