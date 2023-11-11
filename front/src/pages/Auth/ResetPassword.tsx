import React from 'react';

import { ResetPassword as ResetPasswordView } from '@modules/Auth/views';
import { Box, Container } from '@mui/material';

export const ResetPassword = () => {

  return (
    <Container maxWidth="md">
      <Box pt={8} pb="env(safe-area-inset-bottom)">
        <ResetPasswordView />
      </Box>
    </Container>
  );
};
