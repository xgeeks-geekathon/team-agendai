import React from 'react';
import { Box, Typography } from '@mui/material';

import { MessageFeedbackView } from '@core/components/MessageFeedbackView';
import { BodyLoading } from '@core/components/layout/BodyLoading';

import { SorteableTaskList } from '@modules/Tasks/partials/SorteableTaskList/SorteableTaskList';

import { useBoard } from '../hooks/useBoard';

const BoardSection: React.FC<Boards.Board> = board => {
  return (
    <Box textAlign="center" mb={2}>
      <Typography variant="h1">{board.title}</Typography>
    </Box>
  );
};

interface Props {
  boardId: number;
}

export const ViewBoard: React.FC<Props> = ({ boardId }) => {

  const { board, status } = useBoard({ id: boardId });

  if (status === 'error') {
    return <MessageFeedbackView height="100%" />;
  }

  if (status !== 'success' || !board) {
    return <BodyLoading height="100%"/>;
  }

  return (
    <React.Fragment>
      <BoardSection {...board} />
      <SorteableTaskList
        filters={{
          limit: 1000,
          boardId: board.id,
        }}
      />
    </React.Fragment>
  );
};
