import React from 'react';
import { Divider, List, ListItem, ListItemProps, ListProps } from '@mui/material';

import { BodyLoading } from '@core/components/layout/BodyLoading';
import { MessageFeedbackView } from '@core/components/MessageFeedbackView';

import { useTasks } from '../hooks/useTasks';

export interface Props {
  renderItem: (character: Tasks.Task) => React.ReactNode;
  filters?: Tasks.GetListParams;
  slotProps?: {
    list?: ListProps;
    listItem?: ListItemProps;
 },
  showDivider?: boolean;
}

export const TasksList: React.FC<Props> = ({ filters, renderItem, slotProps, showDivider = false }) => {

  const { tasks, status } = useTasks(filters);

  if (status === 'pending' || !tasks) {
    return <BodyLoading height="100%"/>;
  }

  return (
    <React.Fragment>
      {tasks.length === 0 ? (
        <MessageFeedbackView height="100%" message="No tasks" />
      ) : (
        <List {...slotProps?.list}>
          {tasks.map(task => (
            <React.Fragment key={task.id}>
              {showDivider && (<Divider component="li"/>)}
              <ListItem {...slotProps?.listItem}>{renderItem(task)}</ListItem>
            </React.Fragment>
          ))}
        </List>
      )}
    </React.Fragment>
  );
};
