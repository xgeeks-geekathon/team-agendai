import { useQuery } from '@tanstack/react-query';

import { cacheKeys } from '../config';
import { eventsClient } from '../client/eventClient';

type Options = {
  enabled: boolean
};

const defaultOptions: Partial<Options> = {
  enabled: true,
};

export const useEvents = (params: Events.GetListParams = {}, options: Partial<Options> = defaultOptions) => {
  const { data: { data } = {}, status, error } = useQuery({
    queryKey: [cacheKeys.getEvents, params],
    queryFn: () => eventsClient.getEvents(params),
    enabled: options.enabled,
  });

  return {
    status,
    error,
    count: data?.data.length || 0,
    events: data?.data || [],
  };
};
