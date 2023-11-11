import { AxiosResponse } from 'axios';

import { request } from '@core/clients/baseClient';

import { mapUserData } from './userClient.formatter';

const usersApiBaseUrl = import.meta.env.VITE__API_URL;

const getUser = (params: { id: number | string }): Promise<AxiosResponse<Users.User>> => {
  return request({
    options: {
      url: `${usersApiBaseUrl}/users/${params.id}/`,
      method: 'GET',
    },
  }).then((data: AxiosResponse<Users.UserApi>) => ({
    ...data,
    data: mapUserData(data.data),
  }));
};

const editUser = (data: Users.Edit): Promise<AxiosResponse<Users.User>> => {
  return request({
    options: {
      url: `${usersApiBaseUrl}/users/${data.id}/`,
      method: 'PUT',
      data,
    },
  }).then((data: AxiosResponse<Users.UserApi>) => ({
    ...data,
    data: mapUserData(data.data),
  }));
};

const deleteUser = (params: { id: number | string }): Promise<AxiosResponse> => {
  return request({
    options: {
      url: `${usersApiBaseUrl}/users/${params.id}/`,
      method: 'DELETE',
    },
  });
};

export const userClient = {
  getUser,
  editUser,
  deleteUser,
};
