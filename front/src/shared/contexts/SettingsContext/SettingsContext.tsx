import React from 'react';

import config from '@shared/config';

import { ContextProps } from './SettingsContext.types';

const themeStorageKey = `${import.meta.env.VITE__PROJECT_KEY}-theme-mode`;
const navigationStateStorageKey = `${import.meta.env.VITE__PROJECT_KEY}-navigation-state`;

const defaultContext: ContextProps = {
  drawerWidth: config.theme.drawerWidth,
  mode: config.theme.defaultMode,
  setMode: () => null,
  toggleMode: () => null,
  sidebar: 'open',
  setSidebar: () => null,
  toggleSidebar: () => null,
};

const getModeFromLocalStorage = (): MT.Theme.Settings['mode'] => {
  if (config.featureFlags.darkMode) {
    return localStorage.getItem(themeStorageKey) as MT.Theme.Settings['mode'] || 'dark';
  }
  return 'dark';
};
const getSidebarStateFromLocalStorage = (): MT.Settings['sidebar'] => {
  return localStorage.getItem(navigationStateStorageKey) as MT.Settings['sidebar'] || 'open';
};


export const SettingsContext = React.createContext(defaultContext);

export const SettingsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

  const [mode, setMode] = React.useState<MT.Theme.Settings['mode']>(getModeFromLocalStorage());
  const [sidebar, setSidebar] = React.useState<MT.Settings['sidebar']>(getSidebarStateFromLocalStorage());

  React.useEffect(() => {
    localStorage.setItem(themeStorageKey, mode);
  },[mode]);

  React.useEffect(() => {
    localStorage.setItem(navigationStateStorageKey, sidebar);
  },[sidebar]);

  const toggleMode = React.useCallback(() => {
    setMode(mode => mode === 'light' ? 'dark' : 'light');
  }, []);

  const toggleSidebar = React.useCallback(() => {
    setSidebar(sidebar => sidebar === 'open' ? 'closed' : 'open');
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        drawerWidth: config.theme.drawerWidth,
        mode,
        setMode,
        toggleMode,
        sidebar,
        setSidebar,
        toggleSidebar,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;
