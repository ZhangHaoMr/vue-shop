<template>
  <div class="fHeader">
    <!-- logo -->
    <span class="logo">
      <el-icon class="mr-1"><ElemeFilled /></el-icon>
      九月云编程
    </span>
    <!-- 菜单展开收起 -->
    <el-tooltip effect="dark" content="菜单" placement="bottom">
      <el-icon class="icon-btn" @click="$store.commit('handWidth')">
        <Fold v-if="$store.state.widthCe == '250px'" />
        <Expand v-else />
      </el-icon>
    </el-tooltip>

    <!-- 刷新图标 -->
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="shua"><Refresh /></el-icon>
    </el-tooltip>

    <div class="ml-auto flex items-center">
      <!-- 全屏图标 -->
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon class="icon-btn" @click="toggle"><FullScreen /></el-icon>
      </el-tooltip>
      <!-- 下拉菜单 -->
      <el-dropdown class="dropdown">
        <span class="el-dropdown-link">
          <el-avatar
            class="mr-1"
            trigger="hover"
            :size="25"
            :src="$store.state.user.avatar"
          />
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="editPaw">修改密码</el-dropdown-item>
            <el-dropdown-item @click="gologout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { logout } from '@/http/api';
import { useRouter } from 'vue-router';
import { removeToken } from '@/composables/auth';
import { toast } from '@/composables/util';
import { ElMessageBox } from 'element-plus';
import { useFullscreen } from '@vueuse/core';

const { toggle } = useFullscreen();

const { push } = useRouter();

// 退出登录
const gologout = () => {
  ElMessageBox.confirm('是否要退出登录？', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      logout().then((res: any) => {
        console.log(res);
        toast(res);
        removeToken();
        localStorage.removeItem('vuex');
        push('/login');
      });
    })
    .catch(() => {
      toast('已取消', 'info');
    });
};

// 刷新
const shua = () => {
  location.reload();
};

// 修改密码
const editPaw = () => {
  console.log(111);
};
</script>

<style lang="scss">
.fHeader {
  height: 60px;
  @apply flex items-center text-light-50 bg-indigo-700 fixed left-0 top-0 right-0;
}
.logo {
  width: 250px;
  @apply flex items-center justify-center text-xl font-thin;
}
.icon-btn {
  width: 42px;
  height: 60px;
  cursor: pointer;
  @apply flex items-center justify-center;
}
.icon-btn:hover {
  @apply bg-indigo-600;
}
.dropdown,
.el-dropdown-link {
  @apply w-30 flex justify-center items-center text-light-50;
  height: 60px;
  cursor: pointer;
  overflow: hidden;
  border: 0;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
