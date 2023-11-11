import React from 'react';

import { AuthContext } from '@modules/Auth/contexts';

import { ContextProps } from './types';

export const defaultContext: ContextProps = {
  user: undefined,
  isAdmin: false,
  isCustomer: false,
};


export const UserContext = React.createContext(defaultContext);

export const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

  const { user } = React.useContext(AuthContext);  
    
  return (
    <UserContext.Provider
      value={{
        user,
        isAdmin: false,
        isCustomer: true,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserConsumer = UserContext.Consumer;
 