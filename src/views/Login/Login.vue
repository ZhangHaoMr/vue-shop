<template>
  <el-row>
    <el-col :lg="16" :md="12" class="bg-indigo-500" style="color: #fff"
      >欢迎光临</el-col
    >
    <el-col :lg="8" :md="12">
      <div class="login">
        <h2 class="fond-bold text-3xl text-gray-800">欢迎回来</h2>
        <div
          class="my-5 text-gray-300 flex items-center justify-center space-x-2"
        >
          <div class="h-[1px] w-16 bg-gray-200"></div>
          <div class="font-extralight text-sm text-gray-200">账号密码登录</div>
          <div class="h-[1px] w-16 bg-gray-200"></div>
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
                :prefix-icon="User"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="ruleForm.password"
                class="w-50 m-2"
                placeholder="请输入密码"
                :prefix-icon="Lock"
                show-password
              />
            </el-form-item>
            <el-form-item>
              <el-button round color="#626aef" @click="resetForm(ruleFormRef)"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';

const formSize = ref('default');
const ruleFormRef = ref();
const ruleForm = reactive({
  username: '',
  password: ''
});
const rules = reactive({
  username: [
    {
      required: true,
      message: 'Please input Activity name',
      trigger: 'blur'
    },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  password: [
    {
      required: true,
      message: 'Please input Activity name',
      trigger: 'blur'
    }
  ]
});
const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
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
  h3 {
    @apply text-2xl font-bold;
  }

  .box {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 10px 0;
    .gang {
      width: 25%;
      height: 0;
      border: 1px solid #ecefec;
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
