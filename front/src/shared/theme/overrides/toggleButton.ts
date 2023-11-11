import { Theme, lighten } from '@mui/material';

const ToggleButton = (theme: Theme) => {
  return {
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          // backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          // '&.Mui-selected, &.Mui-selected:hover': {
          //   backgroundColor: lighten(theme.palette.secondary.main, 0.85),
          // },
          '& + &': {
            marginLeft: theme.spacing(1),
          },
        },
      },
    },
  };
};

export default ToggleButton;
