// ** External Imports
import axiosRequest, { AxiosResponse, AxiosRequestConfig } from 'axios';

import { timeout } from '../helpers/timeout';

type RequestOptions = Omit<AxiosRequestConfig, 'url'> & {
  url: string;
};

export type AbstractRequest = (props: {
  options: RequestOptions;
  authenticate?: boolean;
  maxRetries?: number;
}) => Promise<AxiosResponse>;


export type FakeAbstractRequest = (props: {
  options: AxiosRequestConfig;
  authenticate?: boolean;
  maxRetries?: number;
  response: any;
}) => Promise<AxiosResponse>;

const localStorageLanguageKey = `${import.meta.env.VITE__PROJECT_KEY}-bearer`;

export const attachOptions = async (options: RequestOptions, authenticate: boolean): Promise<RequestOptions> => {
  const selectedLanguage = typeof localStorage !== 'undefined' ? localStorage.getItem(localStorageLanguageKey) || 'en' : 'en';

  return {
    ...options,
    withCredentials: authenticate,
    params: {
      ...options.params,
    },
    // @ts-ignore
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': selectedLanguage,
      // ...(authenticate && token && {
      //   'Authorization': 'Bearer ' + token,
      // }),
      ...options.headers,
    },
  };
};

export const request: AbstractRequest = async ({ options, authenticate = true, maxRetries = 3 }): Promise<AxiosResponse> => {
  const optionsWithHeader = await attachOptions({
    ...options,
  }, authenticate);

  return axiosRequest(optionsWithHeader);
};

export const fakeRequest: FakeAbstractRequest = async ({ response: { status = 200, timeout: timeoutMs = 0, data = {} } }): Promise<AxiosResponse> => {
  await timeout(timeoutMs);

  if (status === 200) {
    // @ts-ignore
    return Promise.resolve({
      status,
      data,
      statusText: 'success',
      headers: {},
      config: {},
    });
  } else {
    return Promise.reject({
      status,
      data,
      statusText: 'error',
      headers: {},
      config: {},
    });
  }
};
