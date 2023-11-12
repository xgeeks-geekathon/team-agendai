import { AxiosResponse } from 'axios';

import { fakeRequest, request } from '@core/clients/baseClient';
import { mapEnchancementData, mapTaskData } from './tasksClient.formatter';
import { getFakeEnchancement } from './tasksClient.mocks';

const tasksApiBaseUrl = import.meta.env.VITE__API_URL;

const getTask = (params: { id: number }): Promise<AxiosResponse<Tasks.Task>> => {
  return request({
    options: {
      url: `${tasksApiBaseUrl}/tasks/${params.id}`,
      method: 'GET',
    },
  }).then((data: AxiosResponse<Tasks.TaskApi>) => ({
    ...data,
    data: mapTaskData(data.data),
  }));
};

const getTasks = (params: Tasks.GetListParams): Promise<AxiosResponse<MT.Query.PaginatedResults<Tasks.Task>>> => {
  return request({
    options: {
      url: `${tasksApiBaseUrl}/tasks`,
      method: 'GET',
      // params,
    },
  }).then((data: AxiosResponse<MT.Query.PaginatedResults<Tasks.TaskApi>>) => {
    return {
      ...data,
      data: {
        ...data.data,
        data: data.data.data.map(mapTaskData),
      },
    };
  });
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

const bulkPriorityUpdate = (data: Record<number, number>): Promise<AxiosResponse<unknown>> => {
  return request({
    options: {
      url: `${tasksApiBaseUrl}/tasks/bulk-priority/`,
      method: 'PUT',
      data,
    },
  });
};

const deleteTask = (params: { id: number | string }): Promise<AxiosResponse> => {
  return request({
    options: {
      url: `${tasksApiBaseUrl}/tasks/${params.id}`,
      method: 'DELETE',
    },
  });
};

const getTaskEnhancement = (params: { id: number }): Promise<AxiosResponse<Tasks.Enhancement.Enhancement>> => {
  return fakeRequest({
    options: {
      url: `${tasksApiBaseUrl}/tasks-enhancement/${params.id}/`,
      method: 'GET',
    },
    response: {
      status: 200,
      data: getFakeEnchancement(),
    },
  }).then((data: AxiosResponse<Tasks.Enhancement.EnhancementApi>) => ({
    ...data,
    data: mapEnchancementData(data.data),
  }));
};

const generateTaskEnhancement = (params: { id: number }): Promise<AxiosResponse<Tasks.Enhancement.Enhancement>> => {
  return fakeRequest({
    options: {
      url: `${tasksApiBaseUrl}/tasks-enhancement/${params.id}/`,
      method: 'POST',
      timeout: 2000,
    },
    response: {
      status: 200,
      data: getFakeEnchancement(),
    },
  }).then((data: AxiosResponse<Tasks.Enhancement.EnhancementApi>) => ({
    ...data,
    data: mapEnchancementData(data.data),
  }));
};

export const tasksClient = {
  getTask,
  getTasks,
  createTask,
  editTask,
  deleteTask,
  getTaskEnhancement,
  generateTaskEnhancement,
  bulkPriorityUpdate,
};
