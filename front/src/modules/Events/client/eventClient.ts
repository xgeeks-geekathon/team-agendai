import { AxiosResponse } from 'axios';

import { fakeRequest, request } from '@core/clients/baseClient';
import { mapEventData } from './eventClient.formatter';
import { getFakeEvent, getFakeEvents } from './eventClient.mocks';

const EventsApiBaseUrl = import.meta.env.VITE__API_URL;

const getEvent = (params: { id: number }): Promise<AxiosResponse<Events.Event>> => {
  return fakeRequest({
    options: {
      url: `${EventsApiBaseUrl}/Events/${params.id}`,
      method: 'GET',
    },
    response: {
      status: 200,
      data: getFakeEvent(),
    },
  }).then((data: AxiosResponse<Events.EventApi>) => ({
    ...data,
    data: mapEventData(data.data),
  }));
};

const getEvents = (params: Events.GetListParams): Promise<AxiosResponse<MT.Query.PaginatedResults<Events.Event>>> => {
  return fakeRequest({
    options: {
      url: `${EventsApiBaseUrl}/Events`,
      method: 'GET',
      params,
    },
    response: {
      status: 200,
      data: {
        count: 10,
        results: getFakeEvents(),
      },
    },
  }).then((data: AxiosResponse<MT.Query.PaginatedResults<Events.EventApi>>) => ({
    ...data,
    data: {
      ...data.data,
      results: data.data.results.map(mapEventData),
    },
  }));
};

const createEvent = (data: Events.Create): Promise<AxiosResponse<Events.Event>> => {
  return request({
    options: {
      url: `${EventsApiBaseUrl}/Events/`,
      method: 'POST',
      data,
    },
  }).then((data: AxiosResponse<Events.EventApi>) => ({
    ...data,
    data: mapEventData(data.data),
  }));
};

const editEvent = (data: Events.Edit): Promise<AxiosResponse<Events.Event>> => {
  return request({
    options: {
      url: `${EventsApiBaseUrl}/Events/${data.id}/`,
      method: 'PUT',
      data,
    },
  }).then((data: AxiosResponse<Events.EventApi>) => ({
    ...data,
    data: mapEventData(data.data),
  }));
};

const deleteEvent = (params: { id: number | string }): Promise<AxiosResponse> => {
  return request({
    options: {
      url: `${EventsApiBaseUrl}/Events/${params.id}`,
      method: 'DELETE',
    },
  });
};

export const EventsClient = {
  getEvent,
  getEvents,
  createEvent,
  editEvent,
  deleteEvent,
};
