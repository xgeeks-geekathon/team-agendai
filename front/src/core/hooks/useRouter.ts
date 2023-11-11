import React from 'react';

import { RoutingContext } from '@core/contexts';

export const useRouter = () => {
  const { router } = React.useContext(RoutingContext);
  return router;
};
