import React from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { FeedbackContext } from '@core/contexts';
import { useDictionary } from '@core/hooks/useDictionary';

import { cacheKeys } from '../config';
import { charactersClient } from '../client/characterClient';

export const useCharacterCrud = () => {

  const dictionary = useDictionary();
  const { triggerFeedback, genericErrorFeedback } = React.useContext(FeedbackContext);
  const queryClient = useQueryClient();

  const createCharacter = useMutation({
    mutationFn: charactersClient.createCharacter,
    mutationKey: [cacheKeys.createCharacter],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getCharacters],
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

  const editCharacter = useMutation({
    mutationFn: ({ id, ...data }: Characters.Edit) => charactersClient.editCharacter({ id, ...data }),
    mutationKey: [cacheKeys.editCharacter],
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getCharacters],
      });
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getCharacter, {
          id: data.data.data.id,
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

  const deleteCharacter = useMutation({
    mutationFn: (id: number) => charactersClient.deleteCharacter({ id }),
    mutationKey: [cacheKeys.deleteCharacter],
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getCharacters],
      });
      queryClient.removeQueries({
        queryKey: [cacheKeys.getCharacter, {
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

  return {
    createCharacter: createCharacter.mutateAsync,
    editCharacter: editCharacter.mutateAsync,
    deleteCharacter: deleteCharacter.mutateAsync,
  };
};
