import { Theme } from '@mui/material';
import { grey } from '@mui/material/colors';

const Accordion = (theme: Theme) => {
  return {
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: grey[100],
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          backgroundColor: grey[100],
        },
      },
    },
  };
};

export default Accordion;
