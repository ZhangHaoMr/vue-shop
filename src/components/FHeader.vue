<template>
  <div>
    <el-button type="primary" @click="gologout">退出</el-button>
  </div>
</template>
<script lang="ts" setup>
import { logout } from '@/http/api';
import { useRouter } from 'vue-router';
import { removeToken } from '@/composables/auth';
import { toast } from '@/composables/util';
import { ElMessageBox } from 'element-plus';

const { push } = useRouter();

const gologout = () => {
  ElMessageBox.confirm('是否要退出登录？', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      logout().then((res) => {
        console.log(res);
        toast(res);
        removeToken('admin-token');
        push('/login');
      });
    })
    .catch(() => {
      toast('已取消', 'info');
    });
};
</script>
