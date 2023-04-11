import instance from './index';

export const login = (data = { username: '', password: '' }) => {
  return instance.post('login', data);
};
