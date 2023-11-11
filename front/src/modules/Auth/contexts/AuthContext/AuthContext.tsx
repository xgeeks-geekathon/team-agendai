import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { noop } from 'lodash';

import { PermissionContext, RoutingContext } from '@core/contexts';
import { authClient } from '@modules/Auth/client/authClient';

import { cacheKeys } from '../../config';
import { useMe } from '../../hooks/useMe';

import { ContextProps } from './types';

export const defaultContext: ContextProps = {
  user: undefined,
  isLoggedIn: false,
  status: 'pending',
  logout: noop,
};

export const AuthContext = React.createContext(defaultContext);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

  const { resetPermissions } = React.useContext(PermissionContext);

  const queryClient = useQueryClient();
  const { router, location } = React.useContext(RoutingContext);

  const { user, status } = useMe();

  const isLoggedIn = React.useMemo(() => !!user, [user]);

  React.useEffect(() => {
    const isOnOnboardingPage = (location?.pathname || '').includes(router.onboarding.path);

    if (!!user && user.onboarding && !isOnOnboardingPage) {
      router.onboarding.step('1').go();
    }
    if (!!user && !user.onboarding && isOnOnboardingPage) {
      router.home.go();
    }
  }, [router, user, location?.pathname]);

  const logout = React.useCallback(async () => {
    authClient.logout();
    resetPermissions();
    queryClient.removeQueries({
      queryKey: [cacheKeys.getMe],
    });
    queryClient.clear();
  }, [queryClient, resetPermissions]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: status === 'success' && isLoggedIn,
        status,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
