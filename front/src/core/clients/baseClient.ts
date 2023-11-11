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

const localStorageBearerKey = `${import.meta.env.VITE__PROJECT_KEY}-bearer`;
const localStorageLanguageKey = `${import.meta.env.VITE__PROJECT_KEY}-bearer`;

export const attachOptions = async (options: RequestOptions, authenticate: boolean): Promise<RequestOptions> => {
  let token: MT.MaybeNull<string> = null;

  if (authenticate) {
    token = localStorage.getItem(localStorageBearerKey);
  }
  const selectedLanguage = typeof localStorage !== 'undefined' ? localStorage.getItem(localStorageLanguageKey) || 'en' : 'en';

  return {
    ...options,
    params: {
      ...options.params,
    },
    // @ts-ignore
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': selectedLanguage,
      ...(authenticate && token && {
        'Authorization': 'Bearer ' + token,
      }),
      ...options.headers,
    },
  };
};

export const request: AbstractRequest = async ({ options, authenticate = true, maxRetries = 3 }): Promise<AxiosResponse> => {
  const optionsWithHeader = await attachOptions({
    ...options,
  }, authenticate);

  return axiosRequest(optionsWithHeader).then((data: AxiosResponse<any, any>) => {
    if (data.data && data.status && data.status === 200) {
      if (data.data.jwt) {
        localStorage.setItem(localStorageBearerKey, data.data.jwt);
      }
    }
    return data;
  });
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
