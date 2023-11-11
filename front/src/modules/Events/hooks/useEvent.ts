import { useQuery } from '@tanstack/react-query';

import { cacheKeys } from '../config';
import { EventsClient } from '../client/eventClient';

export type Params = {
  id: number;
};

type Options = {
  enabled: boolean
  retry: boolean
};

const defaultOptions: Partial<Options> = {
  enabled: true,
};

export const useEvent = (params: Params, options: Partial<Options> = defaultOptions) => {
  const { data: { data } = {}, status, error } = useQuery({
    queryKey: [cacheKeys.getEvent, params],
    queryFn: () => EventsClient.getEvent(params),
    enabled: options.enabled,
    retry: options.retry,
  });

  return {
    status,
    error,
    Event: data,
  };
};
