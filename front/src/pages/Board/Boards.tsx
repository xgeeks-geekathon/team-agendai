import { Box, Container } from '@mui/material';

import { Boards as BoardsList } from '@modules/Boards/views/Boards';

export const Boards = () => {
  return (
    <Container maxWidth="sm" sx={{ height: '100%' }}>
      <Box pt={3} pb={{ xs: 11, sm: 3 }} height="100%">
        <BoardsList />
      </Box>
    </Container>
  );
};
