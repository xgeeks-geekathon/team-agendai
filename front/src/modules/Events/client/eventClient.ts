import { AxiosResponse } from 'axios';
import { isAfter } from 'date-fns';

import { request } from '@core/clients/baseClient';
import { mapEventData } from './eventClient.formatter';

const EventsApiBaseUrl = import.meta.env.VITE__API_URL;

const getEvent = (params: { id: number }): Promise<AxiosResponse<Events.Event>> => {
  return request({
    options: {
      url: `${EventsApiBaseUrl}/events/${params.id}/`,
      method: 'GET',
    },
  }).then((data: AxiosResponse<Events.EventApi>) => ({
    ...data,
    data: mapEventData(data.data),
  }));
};

const getEvents = (params: Events.GetListParams): Promise<AxiosResponse<MT.Query.PaginatedResults<Events.Event>>> => {
  return request({
    options: {
      url: `${EventsApiBaseUrl}/events/`,
      method: 'GET',
      params,
    },
  }).then((data: AxiosResponse<MT.Query.PaginatedResults<Events.EventApi>>) => ({
    ...data,
    data: {
      ...data.data,
      data: data.data.data
        .filter(event => event.start && event.end)
        .filter(event => isAfter(new Date(), new Date(event.start)))
        .map(mapEventData),
    },
  }));
};

const createEvent = (data: Events.Create): Promise<AxiosResponse<Events.Event>> => {
  return request({
    options: {
      url: `${EventsApiBaseUrl}/events/`,
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
      url: `${EventsApiBaseUrl}/events/${data.id}/`,
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
      url: `${EventsApiBaseUrl}/events/${params.id}`,
      method: 'DELETE',
    },
  });
};
const populateEvents = (): Promise<AxiosResponse> => {
  return request({
    options: {
      url: `${EventsApiBaseUrl}/events/populate`,
      method: 'POST',
    },
  });
};

export const eventsClient = {
  getEvent,
  getEvents,
  createEvent,
  editEvent,
  deleteEvent,
  populateEvents,
};
