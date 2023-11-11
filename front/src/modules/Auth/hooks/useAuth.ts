import React from 'react';
import { AuthContext } from '../contexts';


export const useAuth = () => {
  const context = React.useContext(AuthContext);

  return context;
};
