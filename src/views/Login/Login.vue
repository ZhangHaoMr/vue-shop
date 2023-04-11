<template>
  <el-row>
    <el-col :lg="16" :md="12" class="bg-indigo-500" style="color: #fff"
      >欢迎光临</el-col
    >
    <el-col :lg="8" :md="12">
      <div class="login">
        <h2>欢迎回来</h2>
        <div class="box">
          <div class="line"></div>
          <div class="zh">账号密码登录</div>
          <div class="line"></div>
        </div>
        <div class="inp">
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            class="demo-ruleForm"
            :size="formSize"
            status-icon
          >
            <el-form-item prop="username">
              <el-input
                v-model="ruleForm.username"
                class="w-50 m-2"
                placeholder="请输入用户名"
              >
                <template #prefix>
                  <el-icon class="el-input__icon"><User /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="ruleForm.password"
                class="w-50 m-2"
                placeholder="请输入密码"
                show-password
              >
                <template #prefix>
                  <el-icon class="el-input__icon"><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button round color="#626aef" @click="submitForm(ruleFormRef)"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { login, gitInfo } from '@/http/api';
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';
import { useCookies } from '@vueuse/integrations/useCookies';

const { push } = useRouter();
const cookie = useCookies();

const formSize = ref('default');
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  username: '',
  password: ''
});
const rules = reactive({
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    }
  ]
});

// 登录
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid, fields) => {
    if (!valid) return false;
    login(ruleForm).then((response) => {
      console.log(response);
      ElNotification({
        title: '登录成功',
        type: 'success',
        duration: 2000
      });
      cookie.set('admin-token', response.token);
      gitInfo().then((res) => {
        console.log(res);
      });
      push('/main');
    });
  });
};
</script>

<style lang="scss">
.el-row {
  width: 100vw;
  height: 100vh;
  .el-col {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.login {
  width: 300px;
  height: 300px;
  text-align: center;
  h2 {
    @apply text-3xl text-gray-800;
  }

  .box {
    @apply my-5 text-gray-300 flex items-center justify-center space-x-2;
    .line {
      @apply h-[1px] w-16 bg-gray-200;
    }
    .zh {
      @apply font-extralight text-sm text-gray-200;
    }
  }
  .inp {
    .el-input {
      margin: 10px 0 !important;
    }
    .el-button {
      width: 100%;
      margin: auto;
    }
  }
}
</style>
