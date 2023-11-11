import { PaletteMode } from '@mui/material';

export type ContextProps = {
  drawerWidth: number;
  mode: PaletteMode;
  setMode: (mode: PaletteMode) => void;
  toggleMode: () => void;
  sidebar: MT.Settings['sidebar'];
  setSidebar: (state: MT.Settings['sidebar']) => void;
  toggleSidebar: () => void;
};
