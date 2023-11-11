import { AxiosResponse } from 'axios';

import { fakeRequest, request } from '@core/clients/baseClient';
import { mapBoardData } from './boardsClient.formatter';
import { getFakeBoard, getFakeBoards } from './boardsClient.mocks';

const boardsApiBaseUrl = import.meta.env.VITE__API_URL;

const getBoard = (params: { id: number }): Promise<AxiosResponse<Boards.Board>> => {
  return fakeRequest({
    options: {
      url: `${boardsApiBaseUrl}/boards/${params.id}`,
      method: 'GET',
    },
    response: {
      status: 200,
      data: getFakeBoard(),
    },
  }).then((data: AxiosResponse<Boards.BoardApi>) => ({
    ...data,
    data: mapBoardData(data.data),
  }));
};

const getBoards = (params: Boards.GetListParams): Promise<AxiosResponse<MT.Query.PaginatedResults<Boards.Board>>> => {
  return fakeRequest({
    options: {
      url: `${boardsApiBaseUrl}/boards`,
      method: 'GET',
      params,
    },
    response: {
      status: 200,
      data: {
        count: 10,
        results: getFakeBoards(),
      },
    },
  }).then((data: AxiosResponse<MT.Query.PaginatedResults<Boards.BoardApi>>) => ({
    ...data,
    data: {
      ...data.data,
      results: data.data.results.map(mapBoardData),
    },
  }));
};

const createBoard = (data: Boards.Create): Promise<AxiosResponse<Boards.Board>> => {
  return request({
    options: {
      url: `${boardsApiBaseUrl}/boards/`,
      method: 'POST',
      data,
    },
  }).then((data: AxiosResponse<Boards.BoardApi>) => ({
    ...data,
    data: mapBoardData(data.data),
  }));
};

const editBoard = (data: Boards.Edit): Promise<AxiosResponse<Boards.Board>> => {
  return request({
    options: {
      url: `${boardsApiBaseUrl}/boards/${data.id}/`,
      method: 'PUT',
      data,
    },
  }).then((data: AxiosResponse<Boards.BoardApi>) => ({
    ...data,
    data: mapBoardData(data.data),
  }));
};

const deleteBoard = (params: { id: number | string }): Promise<AxiosResponse> => {
  return request({
    options: {
      url: `${boardsApiBaseUrl}/boards/${params.id}`,
      method: 'DELETE',
    },
  });
};

export const boardsClient = {
  getBoard,
  getBoards,
  createBoard,
  editBoard,
  deleteBoard,
};
