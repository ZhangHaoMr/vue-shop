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

// 获取公告管理列表
export const getNotice = (data: number) => instance.get(`notice/${data}`);

// 公告添加
export const addNotice = (data: any) => instance.post('notice', data);

// 公告修改
export const updateNotice = (id: number, data: any) =>
  instance.post(`/notice/${id}`, data);

//公告删除
export const deleteNotice = (id: number) =>
  instance.post(`/notice/${id}/delete`);

// 获取 图库管理 左侧菜单
export const getImgList = (data: number) => instance.get(`image_class/${data}`);

// 获取 图片列表 image_class/168/image/1
export const getImage = (id: number, page: number) =>
  instance.get(`image_class/${id}/image/${page}`);

// 删除 图片管理 左侧菜单  image_class/174/delete
export const deleteImage = (id: number) =>
  instance.post(`image_class/${id}/delete`);

// 删除 图片 image/delete_all
export const deleteAll = (id: number) =>
  instance.post('image/delete_all', { ids: [id] });

// 修改 图片 名称  image/
export const getEditName = (data: any) =>
  instance.post(`image/${data.id}`, data);
