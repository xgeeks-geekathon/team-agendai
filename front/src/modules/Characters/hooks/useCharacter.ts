import { useQuery } from '@tanstack/react-query';

import { cacheKeys } from '../config';
import { charactersClient } from '../client/characterClient';

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

export const useCharacter = (params: Params, options: Partial<Options> = defaultOptions) => {
  const { data: { data } = {}, status, error } = useQuery({
    queryKey: [cacheKeys.getCharacter, params],
    queryFn: () => charactersClient.getCharacter(params),
    enabled: options.enabled,
    retry: options.retry,
  });

  return {
    status,
    error,
    character: data?.data,
  };
};
