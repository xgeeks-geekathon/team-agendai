import { Theme } from '@mui/material';

const ToggleButton = (theme: Theme) => {
  return {
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          '& + &': {
            marginLeft: theme.spacing(1),
          },
        },
      },
    },
  };
};

export default ToggleButton;
