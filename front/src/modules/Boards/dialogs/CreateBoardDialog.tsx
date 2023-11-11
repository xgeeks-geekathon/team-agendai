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

import { useDictionary } from '@core/hooks/useDictionary';

import { CreateBoard } from '../partials/CreateBoard';

type Props = {
  open: boolean;
  onClose: () => void;
}

export const CreateBoardDialog: React.FC<Props> = ({ open, onClose }) => {

  const dictionary = useDictionary();

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
          maxHeight: `calc(100% - ${theme.spacing(3)})`,
        }),
      }}
    >
      <Box
        position="absolute"
        top={8}
        left="50%"
        width={40}
        height={3}
        borderRadius={1}
        bgcolor="common.white"
        sx={{
          transform: 'translate(-50%)',
        }}
      />
      <DialogTitle component={Stack} direction="row" alignItems="center" justifyContent="space-between">
        <Box width={40}/>
        <Typography variant="h4" component="h1">{dictionary.boards.create.title}</Typography>
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
          {open && (
            <CreateBoard
              onSuccess={onClose}
            />
          )}
        </Box>
      </DialogContent>
    </SwipeableDrawer>
  );
};
