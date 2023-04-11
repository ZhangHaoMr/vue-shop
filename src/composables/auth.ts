import { useCookies } from '@vueuse/integrations/useCookies';

const cookie = useCookies();
const TokenName = 'admin-token';

// 设置 token
export const setToken = (token: string) => {
  return cookie.set(TokenName, token);
};
// 获取 token
export const getToken = () => {
  return cookie.get(TokenName);
};
// 删除 token
export const removeToken = () => {
  return cookie.remove(TokenName);
};
