import React from 'react';
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';

import { useDictionary } from '@core/hooks/useDictionary';

import { BoardsGrid } from '@modules/Boards/partials/BoardsGrid';
import { BoardListItemCard } from '@modules/Boards/partials/BoardListItemCard';
import { DialogContext } from '@core/contexts';

export const Home = () => {
  const { openDialog } = React.useContext(DialogContext);
  const dictionary = useDictionary();

  return (
    <Container maxWidth="sm">
      <Box pt={3} pb={{ xs: 11, sm: 3 }}>
        <Stack spacing={3}>
          <Paper component={Box} p={4}>
            <Button fullWidth onClick={() => openDialog('createBoard')}>{dictionary.home.newBoardButton}</Button>
          </Paper>
          <Box mb={2} textAlign="center">
            <Typography variant="h2">{dictionary.home.boards.title}</Typography>
          </Box>
          <Box>
            <BoardsGrid
              filters={{
                pageSize: 4,
              }}
              renderItem={board => <BoardListItemCard {...board} />}
              slotProps={{
                container: {
                  spacing: 2,
                },
                item: {
                  xs: 6,
                  sm: 4,
                },
              }}
            />
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};
