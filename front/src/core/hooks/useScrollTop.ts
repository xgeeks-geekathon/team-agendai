import React from 'react';
import { useMount } from 'react-use';

import { RoutingContext } from '../contexts';

export const useScrollTop = (top = 0) => {

  const { location } = React.useContext(RoutingContext);

  const scrollToTop = React.useCallback((props?: any) => window.scrollTo(0, top), [top]);

  useMount(() => {
    scrollToTop();
  });

  React.useEffect(() => {
    scrollToTop(location?.pathname);
  }, [scrollToTop, location]);

  return {
    scrollToTop,
  };
};
