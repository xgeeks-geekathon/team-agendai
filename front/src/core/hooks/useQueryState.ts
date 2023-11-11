import React from 'react';
import { useMount } from 'react-use';

import { RoutingContext } from '../contexts';
import { parseQuery } from '../helpers/query';

export const useQueryState = <T = string>(name: string, defaultValue?: T): [MT.Maybe<T>, (value?: MT.MaybeNull<T>, replace?: boolean) => void] => {
  const { go, location } = React.useContext(RoutingContext);

  const value = React.useMemo(() => location ? parseQuery(location.search)[name] as MT.Maybe<T> : undefined, [location, name]);

  const setValue = React.useCallback((value?: MT.MaybeNull<T>, replace: boolean = false) => {
    go({ [name]: value }, replace);
  }, [go, name]);
  

  useMount(() => {
    if (!value && defaultValue) {
      go({ [name]: defaultValue }, true);
    }
  });

  return [
    value,
    setValue,
  ];
};
