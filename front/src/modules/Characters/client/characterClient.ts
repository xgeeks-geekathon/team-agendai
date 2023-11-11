import { AxiosResponse } from 'axios';

import { request } from '@core/clients/baseClient';
import { mapCharacterData } from './characterClient.formatter';

const charactersApiBaseUrl = import.meta.env.VITE__API_URL;

const getCharacter = (params: { id: number }): Promise<AxiosResponse<MT.Query.Result<Characters.Character>>> => {
  return request({
    options: {
      url: `${charactersApiBaseUrl}/characters/${params.id}/`,
      method: 'GET',
    },
  }).then((data: AxiosResponse<MT.Query.Result<Characters.CharacterApi>>) => ({
    ...data,
    data: {
      ...data.data,
      data: mapCharacterData(data.data.data),
    },
  }));
};

const getCharacters = (params: Characters.GetListParams): Promise<AxiosResponse<MT.Query.PaginatedResults<Characters.Character>>> => {
  return request({
    options: {
      url: `${charactersApiBaseUrl}/characters/`,
      method: 'GET',
      params: {
        'pagination[page]': params.page,
        'pagination[pageSize]': params.pageSize,
      },
    },
  }).then((data: AxiosResponse<MT.Query.PaginatedResults<Characters.CharacterApi>>) => ({
    ...data,
    data: {
      ...data.data,
      data: data.data.data.map(mapCharacterData),
    },
  }));
};

const createCharacter = (data: Characters.Create): Promise<AxiosResponse<MT.Query.Result<Characters.Character>>> => {
  return request({
    options: {
      url: `${charactersApiBaseUrl}/characters/`,
      method: 'POST',
      data: {
        data,
      },
    },
  }).then((data: AxiosResponse<MT.Query.Result<Characters.CharacterApi>>) => ({
    ...data,
    data: {
      ...data.data,
      data: mapCharacterData(data.data.data),
    },
  }));
};


const editCharacter = (data: Characters.Edit): Promise<AxiosResponse<MT.Query.Result<Characters.Character>>> => {
  return request({
    options: {
      url: `${charactersApiBaseUrl}/characters/${data.id}/`,
      method: 'PUT',
      data: {
        data,
      },
    },
  }).then((data: AxiosResponse<MT.Query.Result<Characters.CharacterApi>>) => ({
    ...data,
    data: {
      ...data.data,
      data: mapCharacterData(data.data.data),
    },
  }));
};

const deleteCharacter = (params: { id: number | string }): Promise<AxiosResponse> => {
  return request({
    options: {
      url: `${charactersApiBaseUrl}/characters/${params.id}/`,
      method: 'DELETE',
    },
  });
};

export const charactersClient = {
  getCharacter,
  getCharacters,
  createCharacter,
  editCharacter,
  deleteCharacter,
};
