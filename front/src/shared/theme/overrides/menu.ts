import { Theme } from '@mui/material';

const Menu = (theme: Theme) => {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          paddingTop: theme.spacing(1.5),
          paddingBottom: theme.spacing(1.5),
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
  };
};

export default Menu;
