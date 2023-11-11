import { useQuery } from '@tanstack/react-query';

import { cacheKeys } from '../config';
import { boardsClient } from '../client/boardsClient';

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

export const useBoard = (params: Params, options: Partial<Options> = defaultOptions) => {
  const { data: { data } = {}, status, error } = useQuery({
    queryKey: [cacheKeys.getBoard, params],
    queryFn: () => boardsClient.getBoard(params),
    enabled: options.enabled,
    retry: options.retry,
  });

  return {
    status,
    error,
    board: data?.data,
  };
};
