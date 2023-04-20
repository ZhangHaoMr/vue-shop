import instance from './index';

// 登录
export const login = (data = { username: '', password: '' }) =>
  instance.post('login', data);

// 退出登录 logout
export const logout = () => instance.post('logout');

// 用户信息
export const gitInfo = () => instance.post('getinfo');

// 修改密码  updatepassword
export const updatepassword = (
  data = { oldpassword: '', password: '', repassword: '' }
) => instance.post('updatepassword', data);

// 后台首页统计1 statistics1
export const getStatistics1 = () => instance.get('statistics1');

// statistics2
export const getStatistics2 = () => instance.get('statistics2');

export const getStatistics3 = (data: any) =>
  instance.get('statistics3?type=' + data);

// GET  商品管理 goods/1?tab=all
export const getGoods = (data: any) =>
  instance.get(`goods/${data.pages}?tab=${data.tab}`);
