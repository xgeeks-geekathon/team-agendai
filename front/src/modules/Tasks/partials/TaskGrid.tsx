import React from 'react';
import { Grid, GridProps } from '@mui/material';

import { BodyLoading } from '@core/components/layout/BodyLoading';
import { MessageFeedbackView } from '@core/components/MessageFeedbackView';

import { useTasks } from '../hooks/useTasks';

export interface Props {
  renderItem: (character: Tasks.Task) => React.ReactNode;
  filters?: Tasks.GetListParams;
  slotProps?: {
    container?: Omit<GridProps, 'container' | 'item'>;
    item?: Omit<GridProps, 'container' | 'item'>;
 },
}

export const TasksGrid: React.FC<Props> = ({ filters, renderItem, slotProps }) => {

  const { tasks, status } = useTasks(filters);

  if (status === 'pending' || !tasks) {
    return <BodyLoading height="100%"/>;
  }

  return (
    <React.Fragment>
      {tasks.length === 0 ? (
        <MessageFeedbackView height="100%" message="No tasks" />
      ) : (
        <Grid container {...slotProps?.container}>
          {tasks.map(task => (
            <React.Fragment key={task.id}>
              <Grid item {...slotProps?.item}>{renderItem(task)}</Grid>
            </React.Fragment>
          ))}
        </Grid>
      )}
    </React.Fragment>
  );
};
