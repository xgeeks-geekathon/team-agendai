import { Theme } from '@mui/material';

const Input = (theme: Theme) => {
  return {
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
    },
  };
};

export default Input;
