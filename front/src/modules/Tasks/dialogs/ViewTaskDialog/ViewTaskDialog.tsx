import React from 'react';
import { noop } from 'lodash';
import {
  // Box,
  DialogContent,
  Grid,
  IconButton,
  SwipeableDrawer,
} from '@mui/material';
import { Close } from '@mui/icons-material';

// import { DialogContext } from '@core/contexts';
// import { useDictionary } from '@core/hooks/useDictionary';
import { BodyLoading } from '@core/components/layout/BodyLoading';

import { useTask } from '../../hooks/useTask';
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

  // const { asyncConfirmation } = React.useContext(DialogContext);
  // const dictionary = useDictionary();

  const { task, status } = useTask({
    id: data?.taskId as number,
  }, {
    enabled: !!data?.taskId,
  });

  // const onEditRequest = React.useCallback(async (data: Tasks.Crud) => {
  // }, [dictionary]);

  return (
    <SwipeableDrawer
      disableSwipeToOpen
      keepMounted={false}
      anchor="bottom"
      open={open}
      onOpen={noop}
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
              <ViewTaskDialogMain task={task} />
            </DialogContent>
          </Grid>
          <Grid item md={4}>
            <ViewTaskDialogEnhance taskId={task.id} />
          </Grid>
        </Grid>
      )}
    </SwipeableDrawer>
  );
};
