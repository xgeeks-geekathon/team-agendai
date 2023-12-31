import { AxiosResponse } from 'axios';

import { request } from '@core/clients/baseClient';

import { mapUserData } from './authClient.formatter';

const authApiBaseUrl = `${import.meta.env.VITE__API_URL}`;

const localLogin = (data: Auth.LocalLogin) => {
  return request({
    authenticate: false,
    options: {
      url: `${authApiBaseUrl}/auth/local`,
      method: 'POST',
      data,
    },
  });
};

const localSignup = (data: Auth.LocalSignup) => {
  return request({
    authenticate: false,
    options: {
      url: `${authApiBaseUrl}/auth/local/register/`,
      method: 'POST',
      data,
    },
  });
};

const ssoGoogleCallback = (params: any) => {
  return request({
    authenticate: false,
    options: {
      url: `${authApiBaseUrl}/auth/google/callback/`,
      method: 'POST',
      params,
    },
  });
};

const getMe = (): Promise<AxiosResponse<Users.User>> => {
  return request({
    options: {
      url: `${authApiBaseUrl}/auth/me/`,
      method: 'GET',
    },
  }).then((data: AxiosResponse<Users.UserApi>) => ({
    ...data,
    data: mapUserData(data.data),
  }));
};

const updateMe = (data: Partial<Auth.User>): Promise<AxiosResponse<Users.User>> => {
  return request({
    options: {
      url: `${authApiBaseUrl}/auth/me/`,
      method: 'PUT',
      data,
    },
  }).then((data: AxiosResponse<Users.UserApi>) => ({
    ...data,
    data: mapUserData(data.data),
  }));
};

const deleteMe = (): Promise<AxiosResponse<Users.User>> => {
  return request({
    options: {
      url: `${authApiBaseUrl}/auth/me/`,
      method: 'DELETE',
    },
  });
};

const logout = (): void => {
  const localStorageBearerKey = `${import.meta.env.VITE__PROJECT_KEY}-bearer`;
  localStorage.removeItem(localStorageBearerKey);
};

export const authClient = {
  localLogin,
  localSignup,
  ssoGoogleCallback,
  getMe,
  updateMe,
  deleteMe,
  logout,
};
