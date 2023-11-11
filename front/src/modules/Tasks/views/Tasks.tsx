import { Box, Stack, Typography } from '@mui/material';

import { useDictionary } from '@core/hooks/useDictionary';

import { TaskListItemCard } from '../partials/TaskListItemCard';
import { TasksGrid } from '../partials/TaskGrid';

export const Tasks = () => {
  const dictionary = useDictionary();

  return (
    <Stack spacing={3}>
      <Box mb={2} textAlign="center">
        <Typography variant="h2">{dictionary.boards.list.title}</Typography>
      </Box>
      <Box>
        <TasksGrid
          filters={{
            limit: 1000,
          }}
          renderItem={task => <TaskListItemCard {...task} />}
          slotProps={{
            container: {
              spacing: 2,
            },
            item: {
              xs: 12,
            },
          }}
        />
      </Box>
    </Stack>
  );
};
