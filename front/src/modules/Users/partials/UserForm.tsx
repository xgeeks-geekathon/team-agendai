import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';

import { useDictionary } from '@core/hooks/useDictionary';
import { emailRegex } from '@core/helpers/validation';


type FormCrud = Users.Crud;

export type Fields = keyof (FormCrud & {
  submit: boolean;
});


interface Props {
  defaultValues?: Partial<FormCrud>;
  onSubmitRequest: (values: Users.Crud) => void;
  onSubmitButtonText: string;
  disabledFields?: Array<Fields>;
  hiddenFields?: Array<Fields>;
  submitButtonParent?: MT.MaybeNull<Element>,
  submitButtonProps?: LoadingButtonProps,
}

const DEFAULT_VALUES: Partial<FormCrud> = {
  username: '',
  email: '',
};

export const UserForm: React.FC<Props> = ({
  defaultValues = {},
  onSubmitRequest,
  onSubmitButtonText,
  disabledFields,
  hiddenFields,
}) => {

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
      return onSubmitRequest(data);
    } catch (err) {
      console.error(err);
    }
  }, [onSubmitRequest]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {isFieldVisible('email') && (
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: dictionary.forms.validations.required,
                pattern: {
                  value: emailRegex,
                  message: dictionary.forms.validations.invalidEmail,
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={dictionary.forms.fieldEmail}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  disabled={isFieldDisabled('email') || !!defaultValues.email}
                  inputProps={{
                    autoCapitalize: 'none',
                  }}
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
              type="button"
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit(onSubmit)}
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
