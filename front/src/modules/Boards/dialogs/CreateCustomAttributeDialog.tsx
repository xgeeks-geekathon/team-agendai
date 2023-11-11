import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { noop } from 'lodash';
import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  SwipeableDrawer,
  TextField,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';

import { useDictionary } from '@core/hooks/useDictionary';


type Props = {
  open: boolean;
  onClose: () => void;
  data?: {
    title: string;
    buttonLabel: string;
    onSubmit?: (data: string) => void;
  }
}

export const CreateCustomAttributeDialog: React.FC<Props> = ({ open, onClose, data }) => {

  const dictionary = useDictionary();

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = React.useCallback(async ({ name } : { name: string }) => {
    if (data?.onSubmit) {
      try {
        data.onSubmit(name);
      } catch (err) {
        console.error(err);
      }
    }
    reset();
    onClose();
  }, [data, onClose, reset]);

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
        {data?.title && (
          <Typography variant="h4" component="h1">{data?.title}</Typography>
        )}
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: dictionary.forms.validations.required }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label={dictionary.forms.character.fieldName}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                {data?.buttonLabel && (
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    {data?.buttonLabel}
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </Box>
      </DialogContent>
    </SwipeableDrawer>
  );
};
