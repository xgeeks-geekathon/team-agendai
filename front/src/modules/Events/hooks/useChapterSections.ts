import { useQuery } from '@tanstack/react-query';

import { cacheKeys } from '../config';
import { boardsClient } from '../client/boardsClient';

type Options = {
  enabled: boolean
};

const defaultOptions: Partial<Options> = {
  enabled: true,
};

export const useChapterSections = (params: Boards.ChapterSections.GetListParams = {}, options: Partial<Options> = defaultOptions) => {
  const { data: { data } = {}, status, error } = useQuery({
    queryKey: [cacheKeys.getChapterSections, params],
    queryFn: () => boardsClient.getChapterSections(params),
    enabled: options.enabled,
  });

  return {
    status,
    error,
    count: data?.meta.pagination.total || 0,
    sections: data?.data || [],
  };
};
