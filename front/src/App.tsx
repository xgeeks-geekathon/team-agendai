import React from 'react';

import { App as CoreApp } from '@core/App';

import { AuthProvider } from '@modules/Auth/contexts';
import { UserProvider } from '@modules/Users/contexts';

import { LayoutContextProvider } from '@shared/contexts/LayoutContext/LayoutContext';
import { MainLayout } from '@shared/components/MainLayout';
import { Dialogs } from '@shared/components/Dialogs';

import { Root } from '@pages/Root';


const App = () => {
  return (
    <CoreApp>
      <AuthProvider>
        <UserProvider>
          <LayoutContextProvider>
            <MainLayout>
              <Root />
              <Dialogs />
            </MainLayout>
          </LayoutContextProvider>
        </UserProvider>
      </AuthProvider>
    </CoreApp>
  );
};

export default App;
