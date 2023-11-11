import React from 'react';

import { SignUp as SignupView } from '@modules/Auth/views';
import { Box, Container } from '@mui/material';

export const Signup = () => {

  return (
    <Container maxWidth="md">
      <Box pt={8} pb="env(safe-area-inset-bottom)">
        <SignupView />
      </Box>
    </Container>
  );
};
