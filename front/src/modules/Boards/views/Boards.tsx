import { Box, Stack, Typography } from '@mui/material';

import { useDictionary } from '@core/hooks/useDictionary';

import { BoardsGrid } from '@modules/Boards/partials/BoardsGrid';
import { BoardListItemCard } from '@modules/Boards/partials/BoardListItemCard';

export const Boards = () => {
  const dictionary = useDictionary();

  return (
    <Stack spacing={3}>
      <Box mb={2} textAlign="center">
        <Typography variant="h2">{dictionary.boards.list.title}</Typography>
      </Box>
      <Box>
        <BoardsGrid
          filters={{
            limit: 1000,
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
  );
};
