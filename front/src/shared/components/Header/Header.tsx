import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Avatar, Box, Hidden, IconButton, Stack, Toolbar } from '@mui/material';

import { useRouter } from '@core/hooks/useRouter';

import { AuthContext } from '@modules/Auth/contexts';

import config from '@shared/config';

import { Logo } from '@shared/components/Logo';
import { UserMenu } from './UserMenu';


export const Header: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { isLoggedIn, user } = React.useContext(AuthContext);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Hidden smDown>
      <AppBar
        position="fixed"
        elevation={0}
        color="transparent"
      >
        <Toolbar
          sx={{
            ...(!isLoggedIn && {
              justifyContent: 'center',
              flexDirection: 'column',
            }),
          }}
        >
          <Box component={Link} to={router.home.path} width={isLoggedIn? config.theme.drawerWidth : undefined} display={{ xs: 'flex', sm: isLoggedIn ? 'none' : 'flex' }}>
            <Logo style={{ width: 'auto', height: 40 }} alt={config.projectName}/>
          </Box>

          <Stack width="100%" flexGrow={0} direction="row" alignItems="center" spacing={1.5}>
            <Box width="100%">
              {children}
            </Box>
            <Box ml="auto" />
            {isLoggedIn && (
              <UserMenu anchorEl={anchorElUser} onCloseRequest={handleCloseUserMenu}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.username}/>
                </IconButton>
              </UserMenu>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Hidden>
  );
};
