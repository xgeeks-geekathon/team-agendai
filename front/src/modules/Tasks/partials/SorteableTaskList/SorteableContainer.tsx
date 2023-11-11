import React from 'react';
import update from 'immutability-helper';
import { List } from '@mui/material';

import { useDictionary } from '@core/hooks/useDictionary';

import { useTaskCrud } from '@modules/Tasks/hooks/useTaskCrud';

import { LoadingButton } from '@mui/lab';

import { SorteableTaskItem } from './SorteableTaskItem';

interface Props {
  tasks: Tasks.Task[];
}

export const SortableContainer: React.FC<Props> = ({ tasks }) => {
  const dictionary = useDictionary();
  const { bulkUpdateTasks } = useTaskCrud();
  const [isDirty, setDirty] = React.useState(false);
  const [list, setList] = React.useState(tasks);
  

  const moveItem = React.useCallback((dragId: number, hoverId: number) => {
    setDirty(true);

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

  const onBulkUpdate = React.useCallback(() => {
    const priorityList = list.reduce((list, curr, currentIndex) => ({
      ...list,
      [curr.id]: currentIndex,
    }), {} as Record<string, number>);
  
    bulkUpdateTasks.mutateAsync(priorityList);
  }, [bulkUpdateTasks, list]);

  return (
    <React.Fragment>
      {isDirty && (
        <LoadingButton loading={bulkUpdateTasks.isPending} variant="contained" onClick={onBulkUpdate}>
          {dictionary.forms.buttonEdit}
        </LoadingButton>
      )}
      <List>
        {list.map(task => (
          <SorteableTaskItem key={task.id} task={task} moveItem={moveItem} />
        ))}
      </List>
    </React.Fragment>
  );
};
