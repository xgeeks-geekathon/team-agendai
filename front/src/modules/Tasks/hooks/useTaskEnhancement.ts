import { useQuery } from '@tanstack/react-query';

import { cacheKeys } from '../config';
import { tasksClient } from '../client/tasksClient';

export type Params = {
  id: number | string;
};

type Options = {
  enabled: boolean
  retry: boolean
};

const defaultOptions: Partial<Options> = {
  enabled: true,
};

export const useTaskEnhancement = (params: Params, options: Partial<Options> = defaultOptions) => {
  const { data: { data } = {}, status, error } = useQuery({
    queryKey: [cacheKeys.getEnhancement, params],
    queryFn: () => tasksClient.getTaskEnhancement(params),
    enabled: options.enabled,
    retry: options.retry,
  });

  return {
    status,
    error,
    enhancement: data,
  };
};
