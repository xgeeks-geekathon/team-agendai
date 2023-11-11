import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { FeedbackContext } from '@core/contexts';

import { authClient } from '../client/authClient';
import { cacheKeys } from '../config';
import { AuthContext } from '../contexts';

export const useMeCrud = () => {

  const queryClient = useQueryClient();
  const { logout } = React.useContext(AuthContext);
  const { genericErrorFeedback } = React.useContext(FeedbackContext);

  const updateMe = useMutation({
    mutationKey: [cacheKeys.updateMe],
    mutationFn: authClient.updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getMe],
      });
    },
    onError: () => {
      genericErrorFeedback();
    },
  });

  const deleteMe = useMutation({
    mutationKey: [cacheKeys.deleteMe],
    mutationFn: authClient.deleteMe,
    onSuccess: () => {
      logout();
    },
    onError: () => {
      genericErrorFeedback();
    },
  });

  return {
    updateMe: updateMe.mutateAsync,
    deleteMe: deleteMe.mutateAsync,
  };
};
