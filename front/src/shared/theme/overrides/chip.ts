import { Theme } from '@mui/material';

const Chip = (theme: Theme) => {
  return {
    MuiChip: {
      styleOverrides: {
        root: {
          height: 'auto',
          fontSize: '0.8rem',
          fontWeight: 500,
          paddingTop: theme.spacing(0.4),
          paddingBottom: theme.spacing(0.4),
          borderRadius: theme.spacing(0.5),
        },
      },
    },
  };
};

export default Chip;
