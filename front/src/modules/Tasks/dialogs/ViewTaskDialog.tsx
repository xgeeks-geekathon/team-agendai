import React from 'react';
import { noop } from 'lodash';
import {
  Box,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  SwipeableDrawer,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';

import { DialogContext } from '@core/contexts';
import { useDictionary } from '@core/hooks/useDictionary';
import { BodyLoading } from '@core/components/layout/BodyLoading';

import { useTask } from '../hooks/useTask';

type Props = {
  open: boolean;
  onClose: () => void;
  data?: {
    taskId: number;
  }
}

export const ViewTaskDialog: React.FC<Props> = ({ open, onClose, data }) => {

  const { asyncConfirmation } = React.useContext(DialogContext);
  const dictionary = useDictionary();

  const { task, status } = useTask({
    id: data?.taskId as number,
  }, {
    enabled: !!data?.taskId,
  });

  console.log({
    data,
    task,
  });

  const onEditRequest = React.useCallback(async (data: Tasks.Crud) => {
  }, [dictionary]);

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
          maxWidth: theme.breakpoints.values.sm,
          margin: 'auto',
        }),
      }}
    >
      <DialogTitle component={Stack} direction="row" alignItems="center" justifyContent="space-between">
        <Box width={40}/>
        <Typography variant="h1">{dictionary.tasks.view.title}</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          color="secondary"
        >
          <Close/>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box pt={1}>
          {status === 'pending' &&  <BodyLoading height={300}/>}
          {status === 'success' && task && (
            <React.Fragment>
              {task.title}
            </React.Fragment>
          )}
        </Box>
      </DialogContent>
    </SwipeableDrawer>
  );
};
