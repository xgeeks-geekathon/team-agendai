import { useQuery } from '@tanstack/react-query';

import { authClient } from '../client/authClient';
import { cacheKeys } from '../config';

type Options = {
  enabled: boolean
};

const defaultOptions: Partial<Options> = {
  enabled: true,
};

export const useMe = (options: Partial<Options> = defaultOptions) => {
  const { data: { data: user } = {}, isLoading, status, error } = useQuery({
    queryKey: [cacheKeys.getMe],
    queryFn: authClient.getMe,
    enabled: options.enabled,
    retry: false,
  });

  return {
    isLoading,
    status,
    error,
    user,
  };
};
