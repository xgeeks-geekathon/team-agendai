import * as React from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Box, Collapse, Divider, Drawer, Hidden, IconButton, List, ListItemButtonProps, ListItemIcon, ListItemText, MenuItem, Paper, Tooltip } from '@mui/material';
import { AutoStories, ChevronLeft, ChevronRight, ExpandLess, ExpandMore, HomeWork, Person } from '@mui/icons-material';

import { PermissionContext } from '@core/contexts';
import { useDictionary } from '@core/hooks/useDictionary';
import { NavLink } from '@core/components/NavLink';

import { AuthContext } from '@modules/Auth/contexts';
import { Authenticated, NotAuthenticated } from '@modules/Auth/components';

import config from '@shared/config';
import { navigation } from '@shared/routes';
import { SettingsContext } from '@shared/contexts';
import { Logo } from '@shared/components/Logo';
import { useRouter } from '@core/hooks/useRouter';

type NavigationItemProps = {
  item: MT.Navigation.NavigationItem;
  onCloseRequest: () => void;
  ListItemButtonProps?: Pick<ListItemButtonProps, 'sx'>;
}

type Props = React.PropsWithChildren<{
  open: boolean;
  onOpenRequest: () => void;
  onCloseRequest: () => void;
}>;

const NavigationItem: React.FC<NavigationItemProps> = ({ item, onCloseRequest, ListItemButtonProps }) => {
  const { sidebar } = React.useContext(SettingsContext);
  const [open, setOpen] = React.useState(false);

  const { getPermission } = React.useContext(PermissionContext);

  const canView = React.useMemo(() => {
    return item.permission ? getPermission(item.permission) : true;
  }, [item, getPermission]);

  const allowedChildren = React.useMemo(() => {
    return item.children?.filter(it => it.permission ? getPermission(it.permission) : true);
  }, [item, getPermission]);

  const handleClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(!open);
  };

  const itemContent = (
    <React.Fragment>
      {item.icon && <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>}
      <ListItemText primary={item.text} secondary={item.secondaryText} primaryTypographyProps={{ variant: 'body2' }} />
      {allowedChildren && allowedChildren.length > 0 && (
        <IconButton onClick={handleClick} size="small">
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      )}
    </React.Fragment>
  );
  const itemChildren = (
    <React.Fragment>
      {allowedChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {allowedChildren.map((child, idx) => (
              <NavigationItem
                key={idx}
                item={child}
                onCloseRequest={onCloseRequest}
                ListItemButtonProps={{
                  sx: {
                    pl: child.icon ? 5 : 9,
                  },
                }}
              />
            ))}
          </List>
        </Collapse>
      )}
    </React.Fragment>
  );

  if (!canView) {
    return null;
  }
  if (item.divider) {
    return <Divider component="li" variant="middle" sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}/>;
  }
  if (!!item.route) {
    return (
      <React.Fragment>
        <Tooltip title={item.disabled ? 'Coming Soon' : (sidebar === 'open' ? '' : item.text)} placement="right">
          <li>
            <MenuItem
              {...ListItemButtonProps}
              component={NavLink}
              to={item.route}
              onClick={onCloseRequest}
              disabled={item.disabled}
              sx={theme => ({
                py: 1,
                pr: 1,
                pl: 2,
                my: 0.5,
                '&.Mui-selected': {
                  color: 'primary.main',
                },
              })}
            >
              {itemContent}
            </MenuItem>
          </li>
        </Tooltip>
        {itemChildren}
      </React.Fragment>
    );
  }
  if (!!item.onClick) {
    return (
      <React.Fragment>
        <MenuItem
          {...ListItemButtonProps}
          component="li"
          disabled={item.disabled}
          onClick={() => [item.onClick && item.onClick(), onCloseRequest()]}
        >
          {itemContent}
        </MenuItem>
        {itemChildren}
      </React.Fragment>
    );
  }
  return null;
};

export const NavigationSidebar: React.FC<Props> = ({ open, onOpenRequest, onCloseRequest }) => {

  const { sidebar, toggleSidebar } = React.useContext(SettingsContext);
  const { isLoggedIn } = React.useContext(AuthContext);
  const router = useRouter();
  const dictionary = useDictionary();

  const sidebarMenuRoutes = React.useMemo(() => {
    return (navigation(router, dictionary).sidebar || []).filter(it => sidebar === 'closed' ? !it.divider : true);
  }, [router, dictionary, sidebar]);

  const authenticatedNavRoutes = React.useMemo(() => {
    return sidebarMenuRoutes.filter(it =>  it.requiresAuth || it.requiresAuth !== false);
  }, [sidebarMenuRoutes]);

  const notAuthenticatedNavRoutes = React.useMemo(() => {
    return sidebarMenuRoutes.filter(it => !it.requiresAuth);
  }, [sidebarMenuRoutes]);

  const drawer = (
    <React.Fragment>
      <List>
        <Authenticated>
          {authenticatedNavRoutes.map((item, idx) => <NavigationItem key={idx} item={item} onCloseRequest={onCloseRequest} ListItemButtonProps={{ sx: { my: 1 } }} />)}
        </Authenticated>
        <NotAuthenticated>
          {notAuthenticatedNavRoutes.map((item, idx) => <NavigationItem key={idx} item={item} onCloseRequest={onCloseRequest} ListItemButtonProps={{ sx: { my: 1 } }} />)}
        </NotAuthenticated>
      </List>
    </React.Fragment>
  );

  // const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: sidebar === 'open' ? config.theme.drawerWidth : 55 },
        transition: 'width ease-in-out 0.4s',
        flexShrink: { sm: 0 },
        '&:hover #sidebar-toggle': {
          opacity: 1,
        },
      }}
      position="relative"
    >
      <Authenticated>
        <Hidden xsUp={!isLoggedIn} smUp>
          <Paper
            position="fixed"
            zIndex={1000}
            bottom={16}
            left={16}
            right={16}
            elevation={3}
            component={Box}
            sx={{ borderRadius: '34px', backgroundColor: 'white' }}
          >
            <BottomNavigation
              showLabels={false}
              sx={{ backgroundColor: 'transparent', color: 'background.default' }}
            >
              <BottomNavigationAction component={NavLink} to={router.home.path} label="Home" icon={<HomeWork/>} />
              <BottomNavigationAction component={NavLink} to={router.events.path} label="Events" icon={<HomeWork/>} />
              <BottomNavigationAction component={NavLink} to={router.boards.path} label="Boards" icon={<AutoStories/>} />
              <BottomNavigationAction component={NavLink} to={router.profile.path} label="Profile" icon={<Person/>} />
            </BottomNavigation>
          </Paper>
        </Hidden>
      </Authenticated>
      {/* <SwipeableDrawer
        container={container}
        variant="temporary"
        open={open}
        onOpen={onOpenRequest}
        onClose={onCloseRequest}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        PaperProps={{
          sx: {
            backgroundColor: 'background.paper',
            color: 'common.white',
            paddingTop: isNative() ? 'env(safe-area-inset-top)' : 0,
            paddingBottom: isNative() ? 'env(safe-area-inset-bottom)' : 0,
            boxSizing: 'border-box',
            width: config.theme.drawerWidth,
          },
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
        }}
      >
        <Box component={Link} to={router.home.path} py={2} px={sidebar === 'open' ? 2 : 1 }>
          <Logo color="white" style={{ display: 'block', maxWidth: '100%', maxHeight: 40 }} alt={config.projectName} />
        </Box>
        {drawer}
      </SwipeableDrawer> */}
      <Drawer
        variant="permanent"
        PaperProps={{
          variant: 'elevation',
          sx: {
            backgroundColor: 'background.paper',
            color: 'common.white',
            boxSizing: 'border-box',
            width: sidebar === 'open' ? config.theme.drawerWidth : 55,
            overflowX: 'hidden',
            transition: 'width ease-in-out 0.4s',
            border: 0,
            borderRadius: 0,
          },
        }}
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
        open
      >
        <Box component={Link} to={router.home.path} py={2} px={sidebar === 'open' ? 2 : 1 }>
          <Logo color="white" style={{ display: 'block', maxWidth: '100%', maxHeight: 40 }} alt={config.projectName} />
        </Box>
        {drawer}
      </Drawer>
      <IconButton
        id="sidebar-toggle"
        aria-label="sidebar toggle"
        color="primary"
        size="small"
        sx={{
          display: { xs: 'none', sm: 'flex' },
          opacity: 0,
          transition: 'all ease-in 0.2s',
          position: 'fixed',
          top: theme => theme.spacing(2),
          left: sidebar === 'open' ? config.theme.drawerWidth : 55,
          transform: 'translateX(-50%)',
          backgroundColor: 'common.white',
          zIndex: theme => theme.zIndex.drawer + 1,
          boxShadow: theme => theme.shadows[3],
          color: 'primary.main',
          '&:hover': {
            color: 'secondary.main',
          },
          '&:hover, &:focus': {
            backgroundColor: 'common.white',
          },
        }}
        onClick={toggleSidebar}
      >
        {sidebar === 'open' ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
    </Box>
  );
};
