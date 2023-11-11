import { AxiosResponse } from 'axios';

import { request } from '@core/clients/baseClient';
import { mapChapterSectionData, mapExtendedBoardData, mapBoardData } from './boardsClient.formatter';

const boardsApiBaseUrl = import.meta.env.VITE__API_URL;

const getBoard = (params: { id: number }): Promise<AxiosResponse<MT.Query.Result<Boards.ExtendedBoard>>> => {
  return request({
    options: {
      url: `${boardsApiBaseUrl}/boards/${params.id}`,
      method: 'GET',
      params: {
        populate: '*',
      },
    },
  }).then((data: AxiosResponse<MT.Query.Result<Boards.ExtendedBoardApi>>) => ({
    ...data,
    data: {
      ...data.data,
      data: mapExtendedBoardData(data.data.data),
    },
  }));
};

const getBoards = (params: Boards.GetListParams): Promise<AxiosResponse<MT.Query.PaginatedResults<Boards.Board>>> => {
  return request({
    options: {
      url: `${boardsApiBaseUrl}/boards`,
      method: 'GET',
      params: {
        'sort[0]': 'createdAt:desc',
        populate: 'cover',
        'pagination[page]': params.page,
        'pagination[pageSize]': params.pageSize,
      },
    },
  }).then((data: AxiosResponse<MT.Query.PaginatedResults<Boards.BoardApi>>) => ({
    ...data,
    data: {
      ...data.data,
      data: data.data.data.map(mapBoardData),
    },
  }));
};

const getChapterSections = (params: Boards.ChapterSections.GetListParams): Promise<AxiosResponse<MT.Query.PaginatedResults<Boards.ChapterSections.ChapterSection>>> => {
  return request({
    options: {
      url: `${boardsApiBaseUrl}/chapter-sections`,
      method: 'GET',
      params: {
        populate: 'cover',
        'pagination[page]': params.page,
        'pagination[pageSize]': params.pageSize,
        'filters[chapter]': params.chapter,
      },
    },
  }).then((data: AxiosResponse<MT.Query.PaginatedResults<Boards.ChapterSections.ChapterSectionApi>>) => ({
    ...data,
    data: {
      ...data.data,
      data: data.data.data.map(mapChapterSectionData),
    },
  }));
};

const generateBoard = (data: Boards.Generate): Promise<AxiosResponse<MT.Query.Result<Boards.Board>>> => {
  return request({
    options: {
      url: `${boardsApiBaseUrl}/boards/generate`,
      method: 'POST',
      data: data,
    },
  }).then((data: AxiosResponse<MT.Query.Result<Boards.BoardApi>>) => ({
    ...data,
    data: {
      ...data.data,
      data: mapBoardData(data.data.data),
    },
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

const generateBoardCover = (params: { id: number }): Promise<AxiosResponse<void>> => {
  return request({
    options: {
      url: `${boardsApiBaseUrl}/boards/${params.id}/generate-cover`,
      method: 'POST',
    },
  });
};

const generateSectionCover = (params: { id: number }): Promise<AxiosResponse<void>> => {
  return request({
    options: {
      url: `${boardsApiBaseUrl}/chapter-section/${params.id}/generate-cover`,
      method: 'POST',
    },
  });
};

export const boardsClient = {
  getBoard,
  getBoards,
  generateBoard,
  deleteBoard,
  getChapterSections,
  generateBoardCover,
  generateSectionCover,
};
