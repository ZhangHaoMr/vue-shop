import { ElNotification } from 'element-plus';

import NProgress from 'nprogress';

// 封装消息提示
export const toast = (
  message: string,
  type?: any,
  dangerouslyUseHTMLString?: boolean
) => {
  ElNotification({
    message,
    type: type || 'success',
    duration: 2000,
    dangerouslyUseHTMLString: dangerouslyUseHTMLString || false
  });
};

// 开启全局loading
export const showLoading = () => {
  NProgress.start();
};

// 关闭全局loading
export const hideLoading = () => {
  NProgress.done();
};
