import instance from './index';

export const login = (data = { username: '', password: '' }) => {
  return instance.post('login', {
    username: data.username,
    password: data.password
  });
};
