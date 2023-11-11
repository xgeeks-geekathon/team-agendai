import { Box, Container } from '@mui/material';

import { Events as EventsList } from '@modules/Events/views/Events';

export const Events = () => {
  return (
    <Container maxWidth="sm">
      <Box pt={3} pb={{ xs: 11, sm: 3 }}>
        <EventsList />
      </Box>
    </Container>
  );
};
