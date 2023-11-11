import { useQuery } from '@tanstack/react-query';

import { cacheKeys } from '../config';
import { tasksClient } from '../client/tasksClient';

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

export const useTask = (params: Params, options: Partial<Options> = defaultOptions) => {
  const { data: { data } = {}, status, error } = useQuery({
    queryKey: [cacheKeys.getTask, params],
    queryFn: () => tasksClient.getTask(params),
    enabled: options.enabled,
    retry: options.retry,
  });

  return {
    status,
    error,
    task: data,
  };
};
