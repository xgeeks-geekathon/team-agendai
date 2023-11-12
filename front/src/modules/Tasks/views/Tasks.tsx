import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { DialogContext } from '@core/contexts';
import { useDictionary } from '@core/hooks/useDictionary';

import { TaskListItemCard } from '../partials/TaskListItemCard';
import { TasksGrid } from '../partials/TaskGrid';

export const Tasks = () => {
  const dictionary = useDictionary();

  const { openDialog } = React.useContext(DialogContext);

  const openTask = React.useCallback((id: number) => {    
    openDialog('viewTask', {
      taskId: id,
    });
  }, [openDialog]);

  return (
    <Stack spacing={3}>
      <Box mb={2} textAlign="center">
        <Typography variant="h2">{dictionary.boards.list.title}</Typography>
      </Box>
      <Box>
        <TasksGrid
          filters={{
            limit: 10000,
          }}
          renderItem={task => <TaskListItemCard {...task} onClick={openTask}/>}
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
