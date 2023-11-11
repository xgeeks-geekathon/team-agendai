import React from 'react';
import { Box, Container } from '@mui/material';

import { Calendar } from '@modules/Events/views/Calendar';

export const Home = () => {
  return (
    <Container>
      <Box pt={3} pb={{ xs: 11, sm: 3 }}>
        <Calendar />
      </Box>
    </Container>
  );
};
