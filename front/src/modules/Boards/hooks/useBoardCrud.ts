import React from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { FeedbackContext } from '@core/contexts';
import { useDictionary } from '@core/hooks/useDictionary';

import { cacheKeys } from '../config';
import { boardsClient } from '../client/boardsClient';

export const useBoardCrud = () => {

  const dictionary = useDictionary();
  const { triggerFeedback, genericErrorFeedback } = React.useContext(FeedbackContext);
  const queryClient = useQueryClient();

  const createBoard = useMutation({
    mutationKey: [cacheKeys.createBoard],
    mutationFn: boardsClient.createBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getBoards],
      });
      triggerFeedback({
        severity: 'success',
        message: dictionary.feedback.changesSaved,
      });
    },
    onError: () => {
      genericErrorFeedback();
    },
  });

  const editBoard = useMutation({
    mutationKey: [cacheKeys.editBoard],
    mutationFn: ({ id, ...data }: Boards.Edit) => boardsClient.editBoard({ id, ...data }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getBoards],
      });
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getBoard, {
          id: data.data.id,
        }],
      });
      triggerFeedback({
        severity: 'success',
        message: dictionary.feedback.changesSaved,
      });
    },
    onError: () => {
      genericErrorFeedback();
    },
  });

  const deleteBoard = useMutation({
    mutationKey: [cacheKeys.deleteBoard],
    mutationFn: (id: number) => boardsClient.deleteBoard({ id }),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getBoards],
      });
      queryClient.removeQueries({
        queryKey: [cacheKeys.getBoard, {
          id: data.data.id,
        }],
      });
      triggerFeedback({
        severity: 'success',
        message: dictionary.feedback.changesSaved,
      });
    },
    onError: () => {
      genericErrorFeedback();
    },
  });

  return {
    createBoard: createBoard.mutateAsync,
    editBoard: editBoard.mutateAsync,
    deleteBoard: deleteBoard.mutateAsync,
  };
};
