import React from 'react';
import { useParams } from 'react-router';
import { Box, Container } from '@mui/material';

import { useRouter } from '@core/hooks/useRouter';

import { ViewBoard as ViewBoardView } from '@modules/Boards/views/ViewBoard';
import { TasksList } from '@modules/Tasks/partials/TaskList';
import { TaskListItemCard } from '@modules/Tasks/partials/TaskListItemCard';
import { DialogContext } from '@core/contexts';

export const ViewBoard = () => {
  const { boardId = null } = useParams();
  const router = useRouter();

  const { openDialog } = React.useContext(DialogContext);

  const openTask = React.useCallback((id: number) => {    
    openDialog('viewTask', {
      taskId: id,
    });
  }, [openDialog]);

  if (!boardId) {
    router.home.go();
    return null;
  }

  const id = parseInt(boardId, 10);

  return (
    <Container maxWidth="md" disableGutters>
      <Box pt={8}>
        <ViewBoardView boardId={id} />
        <TasksList
          filters={{
            limit: 1000,
            board: id,
          }}
          renderItem={task => <TaskListItemCard {...task} onClick={openTask} />}
        />
      </Box>
    </Container>
  );
};
