import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { trackSignUp } from '@core/tracking';
import { FeedbackContext } from '@core/contexts';

import { authClient } from '../client/authClient';
import { cacheKeys } from '../config';


export const useSignup = () => {
  const queryClient = useQueryClient();
  const { genericErrorFeedback } = React.useContext(FeedbackContext);

  const localSignup = useMutation({
    mutationKey: [cacheKeys.localSignup],
    mutationFn: async (data: Auth.LocalSignup) => {
      trackSignUp();
      return authClient.localSignup(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getMe],
      });
    },
    onError: () => {
      genericErrorFeedback();
    },
  });

  // const signupInWithSSO = useCallback(async (provider: string) => {
  // }, []);

  return {
    localSignup: localSignup.mutateAsync,
    // signupInWithSSO,
  };
};
