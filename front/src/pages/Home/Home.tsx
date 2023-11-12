import React from 'react';
import { Box, Container } from '@mui/material';

import { Calendar } from '@modules/Events/views/Calendar';

export const Home = () => {
  return (
    <Container maxWidth={false} sx={{ height: '100%' }}>
      <Box pt={3} pb={{ xs: 11, sm: 3 }} height="100%">
        <Calendar />
      </Box>
    </Container>
  );
};
