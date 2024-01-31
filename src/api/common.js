import request from '@/utils/request';

export const getLoginInfo = () => {
  return request({
    method: 'GET',
    url: '/admin/login/info',
  });
};

export function randomString() {
  return request({
    url: './randomString?_=' + new Date().getTime(),
    method: 'get',
  });
}

export const login = (data) => {
  return request({
    method: 'POST',
    url: '/login',
    data,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  });
};

export const logout = () => {
  return request({
    method: 'GET',
    url: '/logout',
  });
};
