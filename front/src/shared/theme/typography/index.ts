declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
  }
}

const Typography = () => {
  return {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    h1: {
      fontFamily: '"Crimson Text", serif',
      fontSize: '3rem',
      fontWeight: 600,
    },
    h2: {
      fontFamily: '"Crimson Text", serif',
      fontSize: '2.125rem',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Crimson Text", serif',
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Crimson Text", serif',
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    subtitle1: {
    },
    subtitle2: {
    },
    body1: {
      fontSize: 14,
    },
    body2: {
      fontSize: 12,
    },
    body3: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    button: {
    },
    caption: {
    },
    overline: {
    },
  };
};

export default Typography;
