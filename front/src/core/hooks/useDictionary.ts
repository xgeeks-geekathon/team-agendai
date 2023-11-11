import React from 'react';

import { LocalizationContext } from '@core/contexts';

export const useDictionary = () => {
  const { dictionary } = React.useContext(LocalizationContext);
  return dictionary;
};
