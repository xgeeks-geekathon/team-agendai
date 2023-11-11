import { Theme } from '@mui/material';

const TextField = (theme: Theme) => {
  return {
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          shrink: true,
        },
        fullWidth: true,
      },
    },
  };
};

export default TextField;
