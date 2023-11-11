import { PaletteMode, ThemeOptions, lighten } from '@mui/material';
import { grey as MuiGrey } from '@mui/material/colors';

const grey = {
  ...MuiGrey,
};

const primary = '#C14953';
const secondary = '#D6D6B1';
// const tertiary = '#DBD56E';

const palette = (mode: PaletteMode) => {
  const palette: ThemeOptions['palette'] = {
    mode,
    grey,
    background: {
      default: '#090F1F',
      paper: '#0E172F',
    },
    primary: {
      main: primary,
      light: lighten(primary, 0.9),
      contrastText: '#FFF',
    },
    secondary: {
      main: secondary,
      light: lighten(secondary, 0.3),
      contrastText: '#090F1F',
    },
    text: {
      primary: '#FFF',
    },
  };
  return palette;
};

export default palette;
