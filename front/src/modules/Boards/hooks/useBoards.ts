import { useQuery } from '@tanstack/react-query';

import { cacheKeys } from '../config';
import { boardsClient } from '../client/boardsClient';

type Options = {
  enabled: boolean
};

const defaultOptions: Partial<Options> = {
  enabled: true,
};

export const useBoards = (params: Boards.GetListParams = {}, options: Partial<Options> = defaultOptions) => {
  const { data: { data } = {}, status, error } = useQuery({
    queryKey: [cacheKeys.getBoards, params],
    queryFn: () => boardsClient.getBoards(params),
    enabled: options.enabled,
  });

  return {
    status,
    error,
    count: data?.count || 0,
    boards: data?.results || [],
  };
};
