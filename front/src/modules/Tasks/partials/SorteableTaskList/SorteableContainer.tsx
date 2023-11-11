import React from 'react';
import update from 'immutability-helper';
import { List } from '@mui/material';

import { SorteableTaskItem } from './SorteableTaskItem';

interface Props {
  tasks: Tasks.Task[];
}

export const SortableContainer: React.FC<Props> = ({ tasks }) => {
  const [list, setList] = React.useState(tasks);

  const moveItem = React.useCallback((dragId: number, hoverId: number) => {
    const draggedTask = list.find(task => task.id === dragId);
    const draggedIndex = list.findIndex(task => task.id === dragId);
    const hoverIndex = list.findIndex(task => task.id === hoverId);
    setList(
      update(list, {
        // @ts-ignore this is not the droid you're looking for
        $splice: [[draggedIndex, 1], [hoverIndex, 0, draggedTask]],
      }),
    );
  }, [list]);

  return (
    <React.Fragment>
      <List>
        {list.map(task => (
          <SorteableTaskItem key={task.id} task={task} moveItem={moveItem} />
        ))}
      </List>
    </React.Fragment>
  );
};
