import { AxiosResponse } from 'axios';

import { fakeRequest, request } from '@core/clients/baseClient';
import { mapTaskData } from './tasksClient.formatter';
import { getFakeTask, getFakeTasks } from './tasksClient.mocks';

const tasksApiBaseUrl = import.meta.env.VITE__API_URL;

const getTask = (params: { id: number }): Promise<AxiosResponse<Tasks.Task>> => {
  return fakeRequest({
    options: {
      url: `${tasksApiBaseUrl}/tasks/${params.id}`,
      method: 'GET',
    },
    response: {
      status: 200,
      data: getFakeTask(),
    },
  }).then((data: AxiosResponse<Tasks.TaskApi>) => ({
    ...data,
    data: mapTaskData(data.data),
  }));
};

const getTasks = (params: Tasks.GetListParams): Promise<AxiosResponse<MT.Query.PaginatedResults<Tasks.Task>>> => {
  return fakeRequest({
    options: {
      url: `${tasksApiBaseUrl}/tasks`,
      method: 'GET',
      params,
    },
    response: {
      status: 200,
      data: {
        count: 10,
        results: getFakeTasks(),
      },
    },
  }).then((data: AxiosResponse<MT.Query.PaginatedResults<Tasks.TaskApi>>) => ({
    ...data,
    data: {
      ...data.data,
      results: data.data.results.map(mapTaskData),
    },
  }));
};

const createTask = (data: Tasks.Create): Promise<AxiosResponse<Tasks.Task>> => {
  return request({
    options: {
      url: `${tasksApiBaseUrl}/tasks/`,
      method: 'POST',
      data,
    },
  }).then((data: AxiosResponse<Tasks.TaskApi>) => ({
    ...data,
    data: mapTaskData(data.data),
  }));
};

const editTask = (data: Tasks.Edit): Promise<AxiosResponse<Tasks.Task>> => {
  return request({
    options: {
      url: `${tasksApiBaseUrl}/tasks/${data.id}/`,
      method: 'PUT',
      data,
    },
  }).then((data: AxiosResponse<Tasks.TaskApi>) => ({
    ...data,
    data: mapTaskData(data.data),
  }));
};

const deleteTask = (params: { id: number | string }): Promise<AxiosResponse> => {
  return request({
    options: {
      url: `${tasksApiBaseUrl}/tasks/${params.id}`,
      method: 'DELETE',
    },
  });
};

export const tasksClient = {
  getTask,
  getTasks,
  createTask,
  editTask,
  deleteTask,
};
