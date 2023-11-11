import { useQuery } from '@tanstack/react-query';

import { cacheKeys } from '../config';
import { charactersClient } from '../client/characterClient';

type Options = {
  enabled: boolean
};

const defaultOptions: Partial<Options> = {
  enabled: true,
};

export const useCharacters = (params: Characters.GetListParams = {}, options: Partial<Options> = defaultOptions) => {
  const { data: { data } = {}, status, error } = useQuery({
    queryKey: [cacheKeys.getCharacters, params],
    queryFn: () => charactersClient.getCharacters(params),
    enabled: options.enabled,
  });

  return {
    status,
    error,
    count: data?.meta.pagination.total || 0,
    characters: data?.data || [],
  };
};
