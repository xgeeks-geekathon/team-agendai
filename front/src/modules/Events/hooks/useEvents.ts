import { useQuery } from '@tanstack/react-query';

import { cacheKeys } from '../config';
import { EventsClient } from '../client/eventClient';

type Options = {
  enabled: boolean
};

const defaultOptions: Partial<Options> = {
  enabled: true,
};

export const useEvents = (params: Events.GetListParams = {}, options: Partial<Options> = defaultOptions) => {
  const { data: { data } = {}, status, error } = useQuery({
    queryKey: [cacheKeys.getEvents, params],
    queryFn: () => EventsClient.getEvents(params),
    enabled: options.enabled,
  });

  return {
    status,
    error,
    count: data?.count || 0,
    Events: data?.results || [],
  };
};
