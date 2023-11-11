import React from 'react';
import { Grid, GridProps } from '@mui/material';

import { BodyLoading } from '@core/components/layout/BodyLoading';
import { MessageFeedbackView } from '@core/components/MessageFeedbackView';

import { useBoards } from '../hooks/useBoards';

export interface Props {
  renderItem: (character: Boards.Board) => React.ReactNode;
  filters?: Boards.GetListParams;
  slotProps?: {
    container?: Omit<GridProps, 'container' | 'item'>;
    item?: Omit<GridProps, 'container' | 'item'>;
 },
}

export const BoardsGrid: React.FC<Props> = ({ filters, renderItem, slotProps }) => {

  const { boards, status } = useBoards(filters);

  console.log({
    boards,
  });
  if (status === 'pending' || !boards) {
    return <BodyLoading height="100%"/>;
  }

  return (
    <React.Fragment>
      {boards.length === 0 ? (
        <MessageFeedbackView height="100%" message="No boards" />
      ) : (
        <Grid container {...slotProps?.container}>
          {boards.map(board => (
            <React.Fragment key={board.id}>
              <Grid item {...slotProps?.item}>{renderItem(board)}</Grid>
            </React.Fragment>
          ))}
        </Grid>
      )}
    </React.Fragment>
  );
};
