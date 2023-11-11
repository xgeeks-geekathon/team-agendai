import { useQuery } from '@tanstack/react-query';

import { cacheKeys } from '../config';
import { tasksClient } from '../client/tasksClient';

type Options = {
  enabled: boolean
};

const defaultOptions: Partial<Options> = {
  enabled: true,
};

export const useTasks = (params: Tasks.GetListParams = {}, options: Partial<Options> = defaultOptions) => {
  const { data: { data } = {}, status, error } = useQuery({
    queryKey: [cacheKeys.getTasks, params],
    queryFn: () => tasksClient.getTasks(params),
    enabled: options.enabled,
  });

  return {
    status,
    error,
    count: data?.count || 0,
    tasks: data?.results || [],
  };
};
