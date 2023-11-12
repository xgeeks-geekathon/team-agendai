import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ListItem } from '@mui/material';

import { DialogContext } from '@core/contexts';

import { TaskListItemCard } from '../TaskListItemCard';

interface Props {
  task: Tasks.Task;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

export const SorteableTaskItem: React.FC<Props> = ({ task, moveItem }) => {
  const ref = React.useRef(null);
  const { openDialog } = React.useContext(DialogContext);

  const openTask = React.useCallback((id: number) => {    
    openDialog('viewTask', {
      taskId: id,
    });
  }, [openDialog]);

  const [, drop] = useDrop({
    accept: 'task',
    hover(item: Tasks.Task, monitor) {
      if (!ref.current) {
        return;
      }
      const hoverIndex = item.id;
      const dragIndex = task.id;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveItem(dragIndex, hoverIndex);
      item.id = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: {
      ...task,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <ListItem
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      disableGutters
      disablePadding
    >
      <TaskListItemCard {...task} onClick={openTask} />
    </ListItem>
  );
};
