import { reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { login, gitInfo } from '@/http/api';
import { toast } from '@/composables/util';
import { useRouter } from 'vue-router';
import { setToken } from '@/composables/auth';
import { useStore } from 'vuex';
export function userLogin() {
  const { push } = useRouter();
  const { commit } = useStore();

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
      // 调用登录接口
      login(ruleForm)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response: any) => {
          console.log(response);
          toast('登录成功');
          setToken(response.token);
          gitInfo().then((res) => {
            console.log(res);
            commit('setUserinfo', res);
          });
          push('/');
        })
        .finally(() => {
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
