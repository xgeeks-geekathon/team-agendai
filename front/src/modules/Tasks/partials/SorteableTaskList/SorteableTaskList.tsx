import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BodyLoading } from '@core/components/layout/BodyLoading';
import { MessageFeedbackView } from '@core/components/MessageFeedbackView';

import { useTasks } from '../../hooks/useTasks';
import { SortableContainer } from './SorteableContainer';

export interface Props {
  filters?: Tasks.GetListParams;
}

export const SorteableTaskList: React.FC<Props> = ({ filters }) => {

  const { tasks, status } = useTasks(filters);

  if (status === 'pending' || !tasks) {
    return <BodyLoading height="100%"/>;
  }

  return (
    <React.Fragment>
      {tasks.length === 0 ? (
        <MessageFeedbackView height="100%" message="No tasks" />
      ) : (
        <DndProvider backend={HTML5Backend}>
          <SortableContainer tasks={tasks} />
        </DndProvider>
      )}
    </React.Fragment>
  );
};
