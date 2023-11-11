import { AxiosResponse } from 'axios';

import { request } from '@core/clients/baseClient';
import { mapAttributeData } from './attributesClient.formatter';

const attributesApiBaseUrl = import.meta.env.VITE__API_URL;

const getAttribute = (params: { id: number }): Promise<AxiosResponse<MT.Query.Result<Attributes.Attribute>>> => {
  return request({
    options: {
      url: `${attributesApiBaseUrl}/attributes/${params.id}/`,
      method: 'GET',
    },
  }).then((data: AxiosResponse<MT.Query.Result<Attributes.AttributeApi>>) => ({
    ...data,
    data: {
      ...data.data,
      data: mapAttributeData(data.data.data),
    },
  }));
};

const getAttributes = (params: Attributes.GetListParams): Promise<AxiosResponse<MT.Query.PaginatedResults<Attributes.Attribute>>> => {
  return request({
    options: {
      url: `${attributesApiBaseUrl}/attributes/`,
      method: 'GET',
      params: {
        'sort[0]': 'name:asc',
        populate: 'picture',
        'filters[type]': params.type,
        'pagination[page]': params.page,
        'pagination[pageSize]': params.pageSize,
      },
    },
  }).then((data: AxiosResponse<MT.Query.PaginatedResults<Attributes.AttributeApi>>) => ({
    ...data,
    data: {
      ...data.data,
      data: data.data.data.map(mapAttributeData),
    },
  }));
};

export const attributesClient = {
  getAttribute,
  getAttributes,
};
