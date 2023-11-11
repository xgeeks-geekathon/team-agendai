import React from 'react';
import { Box, Stack } from '@mui/material';

import { Authenticated } from '@modules/Auth/components';

import { LayoutContext } from '@shared/contexts/LayoutContext/LayoutContext';

import { Header } from './Header';
import { NavigationSidebar } from './NavigationSidebar';


export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {

  const { navigationOpen, setNavigationOpen } = React.useContext(LayoutContext);

  const openNavigation = () => {
    setNavigationOpen(true);
  };

  const closeNavigation = () => {
    setNavigationOpen(false);
  };
  

  return (
    <Stack direction="row">
      <Authenticated>
        <NavigationSidebar open={navigationOpen} onOpenRequest={openNavigation} onCloseRequest={closeNavigation} />
      </Authenticated>
      <Stack width="100%" direction="column">
        <Box component="main" width="100%">      
          <Header />      
          {children}
        </Box>
      </Stack>
    </Stack>
  );
};
