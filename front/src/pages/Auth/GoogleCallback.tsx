import React from 'react';

import { GoogleCallback as GoogleCallbackView } from '@modules/Auth/views/Callback/Google';
import { Container } from '@mui/material';

export const GoogleCallback = () => {
  return (
    <Container maxWidth="md">
      <GoogleCallbackView />
    </Container>
  );
};
