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

  const generateBoard = useMutation({
    mutationFn: boardsClient.generateBoard,
    mutationKey: [cacheKeys.createBoard],
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

  const deleteBoard = useMutation({
    mutationFn: (id: number) => boardsClient.deleteBoard({ id }),
    mutationKey: [cacheKeys.deleteBoard],
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getBoards],
      });
      queryClient.removeQueries({
        queryKey: [cacheKeys.getBoard, {
          id,
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

  const generateBoardCover = useMutation({
    mutationFn: (id: number) => boardsClient.generateBoardCover({ id }),
    mutationKey: [cacheKeys.generateBoardCover],
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getBoards],
      });
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getBoard, {
          id,
        }],
      });
    },
    onError: () => {
      genericErrorFeedback();
    },
  });

  const generateSectionCover = useMutation({
    mutationFn: (id: number) => boardsClient.generateSectionCover({ id }),
    mutationKey: [cacheKeys.generateSectionCover],
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getChapterSections],
      });
    },
    onError: () => {
      genericErrorFeedback();
    },
  });

  return {
    generateBoard: generateBoard.mutateAsync,
    deleteBoard: deleteBoard.mutateAsync,
    generateBoardCover: generateBoardCover.mutateAsync,
    generateSectionCover: generateSectionCover.mutateAsync,
  };
};
