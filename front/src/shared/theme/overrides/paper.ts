import { Theme } from '@mui/material';

import config from '../../config';

const Paper = (theme: Theme) => {
  return {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none !important',
          borderRadius: 16,
        },
      },
      defaultProps: {
        elevation: config.theme.elevation,
      },
    },
  };
};

export default Paper;
