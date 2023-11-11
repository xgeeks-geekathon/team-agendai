import { Box, Container } from '@mui/material';

import { Events as EventsList } from '@modules/Events/views/Events';

export const Events = () => {
  return (
    <Container maxWidth="sm" sx={{ height: '100%' }}>
      <Box pt={3} pb={{ xs: 11, sm: 3 }} height="100%">
        <EventsList />
      </Box>
    </Container>
  );
};
