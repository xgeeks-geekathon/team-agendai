import React from 'react';
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';

export type AsyncConfirmationProps = {
  show?: boolean;
  title?: MT.MaybeNull<React.ReactNode>;
  content?: MT.MaybeNull<React.ReactNode>;
  confirmLabel?: MT.MaybeNull<React.ReactNode>;
  cancelLabel?: MT.MaybeNull<React.ReactNode>;
}

export type Props = AsyncConfirmationProps & {
  open?: boolean;
  onCancel?: () => void;
  onClose?: () => void;
  onConfirm?: () => void;
}

export const AsyncConfirmationDialog: React.FC<Props> = ({
  open = false,
  onClose = () => null,
  onCancel = () => null,
  onConfirm = () => null,
  title,
  content,
  confirmLabel,
  cancelLabel,
}) => (
  <Dialog open={open} onClose={onClose} PaperProps={{ variant: 'elevation' }}>
    <DialogContent>
      <Typography variant="h4" align="center" mb={content ? 2 : 0}>
        {title}
      </Typography>
      {content && (
        <Typography variant="body1" align="center">
          {content}
        </Typography>
      )}
    </DialogContent>
    <DialogActions sx={{ padding: 0 }}>
      <ButtonGroup
        variant="contained"
        fullWidth
      >
        {cancelLabel && (
          <Button
            type="button"
            onClick={onCancel}
            color="inherit"
            sx={{ borderRadius: 0 }}
          >
            {cancelLabel}
          </Button>
        )}
        <Button
          type="button"
          onClick={onConfirm}
          color="primary"
          sx={{ borderRadius: 0 }}
        >
          {confirmLabel}
        </Button>
      </ButtonGroup>
    </DialogActions>
  </Dialog>
);
