import { reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { toast } from '@/composables/util';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export function userLogin() {
  const store = useStore();
  const { push } = useRouter();

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

  const loading = ref(false);

  // 登录
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
      if (!valid) return false;

      loading.value = true;
      store
        .dispatch('login', ruleForm)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then((response: any) => {
          // 提示登录成功
          toast('登录成功');
          store.dispatch('getInfo');
          // 跳转到后台首页
          push('/');
        })
        .finally(() => {
          // 关闭登录按钮loading加载
          loading.value = false;
        });
    });
  };
  return {
    formSize,
    ruleFormRef,
    ruleForm,
    rules,
    loading,
    submitForm
  };
}
