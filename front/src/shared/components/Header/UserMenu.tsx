import React from 'react';
import { Brightness4, Brightness7, Logout, Translate } from '@mui/icons-material';
import { Divider, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

import { LocalizationContext } from '@core/contexts';
import { NavLink } from '@core/components/NavLink';
import { LanguageSelect } from '@core/components/LanguageSelect';

import config from '@shared/config';
import { navigation } from '@shared/routes';
import { SettingsContext } from '@shared/contexts';

import { Authenticated, NotAuthenticated } from '@modules/Auth/components';
import { AuthContext } from '@modules/Auth/contexts';
import { useRouter } from '@core/hooks/useRouter';

type NavigationItemProps = {
  item: MT.Navigation.NavigationItem;
  onCloseRequest: () => void;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ item, onCloseRequest }) => {
  if(!!item.children) {
    return null;
  }
  if (!!item.route) {
    return (
      <MenuItem component={NavLink} to={item.route} onClick={onCloseRequest}>
        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
        <ListItemText primary={item.text} /> 
      </MenuItem>
    );
  }
  if (!!item.onClick) {
    return (
      <MenuItem onClick={() => [item.onClick && item.onClick(), onCloseRequest()]}>
        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
        <ListItemText primary={item.text} /> 
      </MenuItem>
    );
  }
  return null;
};

type Props = React.PropsWithChildren<{
  anchorEl: MT.MaybeNull<Element>;
  onCloseRequest: () => void;
}>;

export const UserMenu: React.FC<Props> = ({ children, anchorEl, onCloseRequest }) => {

  const router = useRouter();
  const { user, logout } = React.useContext(AuthContext);
  const { dictionary } = React.useContext(LocalizationContext);
  const { mode, toggleMode } = React.useContext(SettingsContext);

  const ToggleModeIcon = mode === 'dark' ? Brightness7 : Brightness4;

  const userMenuRoutes = React.useMemo(() => {
    return navigation(router, dictionary).userMenu || [];
  }, [router, dictionary]);

  const authenticatedNavRoutes = React.useMemo(() => {
    return userMenuRoutes.filter(it => it.requiresAuth || it.requiresAuth !== false);
  }, [userMenuRoutes]);

  const notAuthenticatedNavRoutes = React.useMemo(() => {
    return userMenuRoutes.filter(it => !it.requiresAuth);
  }, [userMenuRoutes]);


  return (
    <React.Fragment>
      {children}
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onCloseRequest}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Authenticated>
          {user && (
            <MenuItem onClick={() => [router.profile.go(), onCloseRequest()]}>
              <ListItemText primary={user.username} secondary={user.email} />
            </MenuItem>
          )}
          {authenticatedNavRoutes.map((item, idx) => <NavigationItem key={idx} item={item} onCloseRequest={onCloseRequest} />)}
          <NavigationItem
            item={{
              icon: <Logout />,
              text: dictionary.menu.auth.logout,
              onClick: logout,
            }}
            onCloseRequest={onCloseRequest}
          />
        </Authenticated>

        <NotAuthenticated>
          {notAuthenticatedNavRoutes.map((item, idx) => <NavigationItem key={idx} item={item} onCloseRequest={onCloseRequest} />)}
        </NotAuthenticated>
        {(config.featureFlags.darkMode || config.featureFlags.translations) && (
          <Divider />
        )}
        {config.featureFlags.darkMode && (
          <MenuItem onClick={() => [toggleMode(), onCloseRequest()]}>
            <ListItemIcon><ToggleModeIcon/></ListItemIcon>
            <ListItemText>{mode === 'light' ? dictionary.header.switchToDarkMode : dictionary.header.switchToLightMode}</ListItemText>
          </MenuItem>
        )}
        {config.featureFlags.translations && (
          <MenuItem>
            <ListItemIcon><Translate/></ListItemIcon>
            <ListItemText><LanguageSelect onChange={onCloseRequest}/></ListItemText>
          </MenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
};
