import instance from './index';

// 登录
export const login = (data = { username: '', password: '' }) =>
  instance.post('login', data);

// 退出登录 logout
export const logout = () => instance.post('logout');

// 用户信息
export const gitInfo = () => instance.post('getinfo');
