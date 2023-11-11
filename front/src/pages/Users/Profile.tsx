import React from 'react';
import { Box, Container } from '@mui/material';

import { Profile as ProfileView } from '@modules/Users/views/Profile';

export const Profile = () => {
  return (
    <Container maxWidth="sm">
      <Box py={3}>
        <ProfileView />
      </Box>
    </Container>
  );
};
