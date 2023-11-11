import { Theme } from '@mui/material';


const AppBar = (theme: Theme) => {
  return {
    MuiAppBar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
  };
};

export default AppBar;
