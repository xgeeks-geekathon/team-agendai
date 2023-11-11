import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

import { UserContext } from '@modules/Users/contexts';

import { ContextProps } from './types';

const defaultContext: ContextProps = {
  adminView: false,
  isMobile: false,

  mobileMenuOpen: false,
  setMobileMenuOpen: () => null,
  navigationOpen: true,
  setNavigationOpen: () => null,
};


export const LayoutContext = React.createContext(defaultContext);

interface Props {
  children: React.ReactNode;
}

export const LayoutContextProvider: React.FC<Props> = ({ children }) => {

  const { isAdmin } = React.useContext(UserContext);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [navigationOpen, setNavigationOpen] = React.useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  
  return (
    <LayoutContext.Provider
      value={{
        mobileMenuOpen,
        setMobileMenuOpen,
        navigationOpen,
        setNavigationOpen,

        adminView: isAdmin,
        isMobile,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
