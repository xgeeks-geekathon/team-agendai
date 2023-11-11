// ** MUI Imports
import { Theme } from '@mui/material';

const GlobalStyles = (theme: Theme) => {
  return {
    body: {
      margin: 0,
    },
    code: {
      fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
    },
    'strong, b': {
      fontWeight: 500,
    },
  };
};

export default GlobalStyles;
