import { Theme } from '@mui/material';

const Dialog = (theme: Theme) => {
  return {
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3),
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3),
          paddingBottom: theme.spacing(3),
        },
      },
    },
  };
};

export default Dialog;
