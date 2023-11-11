import React from 'react';
import { Grid } from '@mui/material';

type Props = {
  size?: number;
  height?: number | string;
}

export const BodyLoading: React.FC<Props> = ({ size = 100, height = 'calc(100vh - 150px)' }) => {

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" style={{ height }}>
      <img src="/loader.svg" alt="Loader"/>
    </Grid>
  );
};
