import { useQuery } from '@tanstack/react-query';

import { cacheKeys } from '../config';
import { userClient } from '../client/userClient';

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

export const useUser = (params: Params, options: Partial<Options> = defaultOptions) => {
  const { data: { data: user } = {}, status, error } = useQuery({
    queryKey: [cacheKeys.getUser, params],
    queryFn: () => userClient.getUser(params),
    enabled: options.enabled,
    retry: options.retry,
  });

  return {
    status,
    error,
    user,
  };
};
