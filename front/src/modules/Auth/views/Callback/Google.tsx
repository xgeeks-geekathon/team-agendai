import React from 'react';
import { useLocation } from 'react-router';

import { useRouter } from '@core/hooks/useRouter';
import { BodyLoading } from '@core/components/layout/BodyLoading';

import { useLogin } from '@modules/Auth/hooks/useLogin';
import { parseQuery } from '@core/helpers/query';

export const GoogleCallback: React.FC = () => {

  const location = useLocation();
  const router = useRouter();

  const { ssoGoogleCallback } = useLogin();


  const ssoCallback = React.useCallback(async (data: any) => {
    try {
      await ssoGoogleCallback(data);
      router.home.go();
    } catch {
      router.auth.login.go();
    }
  }, [ssoGoogleCallback, router]);

  React.useEffect(() => {
    const params = parseQuery(location.search);
    ssoCallback(params);
  }, [ssoCallback, location.search]);

  return <BodyLoading height="100vh"/>;
};
