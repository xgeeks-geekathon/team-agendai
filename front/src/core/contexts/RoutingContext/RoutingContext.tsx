import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { noop } from 'lodash';

import { routes } from '@shared/routes';

import { addQuery } from '../../helpers/query';
import { generateRouter } from '../../routing/routing';

import { ContextProps } from './RoutingContext.types';

export const RoutingContext = React.createContext<ContextProps>({
  router: generateRouter(() => {}, routes),
  location: undefined,
  go: noop,
});

export const RoutingProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const go = React.useCallback((pathname: string, params: MT.Maybe<MT.Routing.RouteParams>, replace: boolean = false) => {
    navigate({
      pathname,
      search: params && addQuery(window.location.search, params),
    }, {
      replace,
    });
  }, [navigate]);

  const router = React.useMemo(() => generateRouter(go, routes), [go]);

  return (
    <RoutingContext.Provider value={{
      router,
      location,
      go: (params, replace) => go(window.location.pathname, params, replace),
    }}>
      {children}
    </RoutingContext.Provider>
  );
};

export const RoutingConsumer = RoutingContext.Consumer;
