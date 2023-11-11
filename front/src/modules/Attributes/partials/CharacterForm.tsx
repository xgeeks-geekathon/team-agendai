import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useDictionary } from '@core/hooks/useDictionary';

type FormCrud = Omit<Characters.Crud, 'user'>;

type Fields = keyof (FormCrud & {
  submit: boolean;
});


interface Props {
  defaultValues?: Partial<FormCrud>;
  onSubmitRequest: (values: Characters.Crud) => void;
  onSubmitButtonText: string;
  disabledFields?: Array<Fields>;
  hiddenFields?: Array<Fields>;
}

const DEFAULT_VALUES: Partial<FormCrud> = {
  name: '',
};



export const CharacterForm: React.FC<Props> = ({ defaultValues = {}, onSubmitRequest, onSubmitButtonText,  disabledFields, hiddenFields }) => {

  const dictionary = useDictionary();

  const { handleSubmit, control, formState: { isSubmitting } } = useForm<FormCrud>({
    defaultValues: {
      ...DEFAULT_VALUES,
      ...defaultValues,
    },
  });

  const isFieldDisabled = React.useCallback((field: Fields) => {
    if (!disabledFields) {
      return false;
    }
    return disabledFields.indexOf(field) !== -1;
  }, [disabledFields]);

  const isFieldVisible = React.useCallback((field: Fields) => {
    if (!hiddenFields) {
      return true;
    }
    return hiddenFields.indexOf(field) === -1;
  }, [hiddenFields]);

  const onSubmit = React.useCallback(async (data: FormCrud) => {
    try {
      await onSubmitRequest(data);
    } catch (err) {
      console.error(err);
    }
  }, [onSubmitRequest]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {isFieldVisible('name') && (
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              rules={{ required: dictionary.forms.validations.required }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={dictionary.forms.contact.fieldName}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  disabled={isFieldDisabled('name')}
                />
              )}
            />
          </Grid>
        )}

        {isFieldVisible('submit') && (
          <Grid item xs={12}>
            <LoadingButton
              fullWidth
              loading={isSubmitting}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={isFieldDisabled('submit')}
            >
              {onSubmitButtonText}
            </LoadingButton>
          </Grid>
        )}
      </Grid>
    </form>
  );
};
