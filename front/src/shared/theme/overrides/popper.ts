import { Theme } from '@mui/material';

const Popper = (theme: Theme) => {
  return {
    MuiPopper: {
      styleOverrides: {
        root: {
          zIndex: '9999999999 !important',
        },
      },
    },
  };
};

export default Popper;
