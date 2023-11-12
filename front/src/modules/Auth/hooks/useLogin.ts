import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';


import { authClient } from '../client/authClient';
import { cacheKeys } from '../config';

const authApiBaseUrl = `${import.meta.env.VITE__API_URL}`;

export const useLogin = () => {
  const queryClient = useQueryClient();

  const localLogin = useMutation({
    mutationKey: [cacheKeys.localLogin],
    mutationFn: (data: Auth.LocalLogin) => authClient.localLogin(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getMe],
      });
    },
  });

  const ssoGoogleCallback = useMutation({
    mutationKey: [cacheKeys.googleCallback],
    mutationFn: (data: any) => authClient.ssoGoogleCallback(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getMe],
      });
    },
  });

  const signInWithSSO = useCallback(async () => {
    window.open(`${authApiBaseUrl}/oauth/google/login`, '_self');
  }, []);

  return {
    localLogin: localLogin.mutateAsync,
    signInWithSSO,
    ssoGoogleCallback: ssoGoogleCallback.mutateAsync,
  };
};
