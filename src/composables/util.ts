// 封装消息提示
import { ElNotification } from 'element-plus';

export const toast = (
  message: any,
  type?: any,
  dangerouslyUseHTMLString?: boolean
) => {
  ElNotification({
    message,
    type: type || 'success',
    duration: 2000,
    dangerouslyUseHTMLString: false || dangerouslyUseHTMLString
  });
};
