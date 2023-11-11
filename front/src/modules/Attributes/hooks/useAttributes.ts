import { useQuery } from '@tanstack/react-query';

import { cacheKeys } from '../config';
import { attributesClient } from '../client/attributesClient';

type Options = {
  enabled: boolean
};

const defaultOptions: Partial<Options> = {
  enabled: true,
};

export const useAttributes = (params: Attributes.GetListParams = {}, options: Partial<Options> = defaultOptions) => {
  const { data: { data } = {}, status, error } = useQuery({
    queryKey: [cacheKeys.getAttributes, params],
    queryFn: () => attributesClient.getAttributes(params),
    enabled: options.enabled,
  });

  return {
    status,
    error,
    count: data?.meta.pagination.total || 0,
    attributes: data?.data || [],
  };
};
