import React from 'react';
import {
  Dialog,
  DialogContent,
  Grid,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';

import { DialogContext } from '@core/contexts';
import { BodyLoading } from '@core/components/layout/BodyLoading';

import { useTask } from '../../hooks/useTask';
import { useTaskCrud } from '../../hooks/useTaskCrud';
import { ViewTaskDialogMain } from './ViewTaskDialogMain';
import { ViewTaskDialogEnhance } from './ViewTaskDialogEnhance';

type Props = {
  open: boolean;
  onClose: () => void;
  data?: {
    taskId: number;
  }
}

export const ViewTaskDialog: React.FC<Props> = ({ open, onClose, data }) => {

  const { asyncConfirmation } = React.useContext(DialogContext);

  const { editTask } = useTaskCrud();

  const { task, status } = useTask({
    id: data?.taskId as number,
  }, {
    enabled: !!data?.taskId,
  });

  const onEditRequest = React.useCallback(async (enhancement: Tasks.Enhancement.Enhancement) => {
    const confirmed = await asyncConfirmation({
      title: 'Attention!',
      content: 'You incur the risk of making this task awesome! Proceed at your own risk.',
      confirmLabel: 'Yes, I like it awesome!',
      cancelLabel: 'No, I like it rought.',
    });

    if (confirmed && !!task) {
      return editTask({
        ...task,
        title: enhancement.title,
        description: enhancement.description,
        estimation: enhancement.estimation,
      });
    }
  }, [asyncConfirmation, task, editTask]);

  return (
    <Dialog
      keepMounted={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: theme => ({
          left: theme.spacing(1.5),
          right: theme.spacing(1.5),
          bottom: theme.spacing(1.5),
          maxWidth: theme.breakpoints.values.md,
          margin: 'auto',
        }),
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        color="secondary"
        sx={theme => ({
          position: 'absolute',
          top: theme.spacing(2),
          right: theme.spacing(2),
        })}
      >
        <Close/>
      </IconButton>
      {status === 'pending' &&  <BodyLoading height={300}/>}
      {status === 'success' && task && (
        <Grid container spacing={2}>
          <Grid item md={8}>
            <DialogContent>
              <ViewTaskDialogEnhance task={task} onApprove={onEditRequest} />
            </DialogContent>
          </Grid>
          <Grid item md={4}>
            <ViewTaskDialogMain task={task} />
          </Grid>
        </Grid>
      )}
    </Dialog>
  );
};
