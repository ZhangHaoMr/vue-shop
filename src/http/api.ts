import instance from './index';

export const login = (data: object) => instance.post('login', data);
