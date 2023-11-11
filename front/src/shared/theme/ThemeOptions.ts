import { ThemeOptions } from '@mui/material';

import palette from './palette';
import spacing from './spacing';
import typography from './typography';
import breakpoints from './breakpoints';

const themeOptions = (settings: MT.Theme.Settings): ThemeOptions => {
  const { mode } = settings;

  return {
    palette: palette(mode),
    typography: typography(),
    ...spacing,
    breakpoints,
    shape: {
      borderRadius: 32,
    },
  };
};

export default themeOptions;
