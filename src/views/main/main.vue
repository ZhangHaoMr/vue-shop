<template>
  <el-button type="primary" @click="gologout">退出</el-button>
</template>

<script setup>
import { logout } from '@/http/api';
import { useRouter } from 'vue-router';
import { removeToken } from '@/composables/auth';
import { ElNotification } from 'element-plus';

const { push } = useRouter();

const gologout = () => {
  logout().then((res) => {
    console.log(res);
    ElNotification({
      title: res,
      type: 'success',
      duration: 2000
    });
    removeToken('admin-token');
    push('/login');
  });
};
</script>

<style></style>
