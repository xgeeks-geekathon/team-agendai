import React from 'react';

import { Login as LoginView } from '@modules/Auth/views';
import { Box, Container } from '@mui/material';

export const Login = () => {

  return (
    <Container maxWidth="md">
      <Box pt={8} pb="env(safe-area-inset-bottom)">
        <LoginView />
      </Box>
    </Container>
  );
};
