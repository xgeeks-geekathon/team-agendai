import { Theme } from '@mui/material';
import config from '@shared/config';

const Button = (theme: Theme) => {
  return {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: config.theme.disableRipple,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: config.theme.elevation === 0,
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        containedInfo: {
          backgroundColor: theme.palette.common.white,
          color: theme.palette.primary.main,
        },
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        groupedContainedPrimary: {
          borderColor: `${theme.palette.primary.main} !important`,
          '&.Mui-disabled': {
            backgroundColor: theme.palette.primary.main,
          },
        },
      },
    },
  };
};

export default Button;
