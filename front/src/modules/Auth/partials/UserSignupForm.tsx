import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { emailRegex, passwordRegex } from '@core/helpers/validation';
import { LocalizationContext } from '@core/contexts';

type FormCrud = Auth.LocalSignup & { repeatedPassword: string, terms: boolean};

type Field = keyof FormCrud;

interface Props {
  defaultValues?: Partial<FormCrud>;
  onSubmitRequest: (values: Auth.LocalSignup) => void;
  onSubmitButtonText: string;
  disabledFields?: Array<Field>;
  hiddenFields?: Array<Field>;
}

const DEFAULT_VALUES: Partial<FormCrud> = {
  username: '',
  email: '',
  password: '',
  repeatedPassword: '',
};

export const UserSignupForm: React.FC<Props> = ({
  defaultValues = {},
  onSubmitRequest,
  onSubmitButtonText,
  hiddenFields,
  disabledFields,
}) => {

  const { dictionary } = React.useContext(LocalizationContext);
  const { handleSubmit, control, formState: { isSubmitting }, watch } = useForm<FormCrud>({
    defaultValues: {
      ...DEFAULT_VALUES,
      ...defaultValues,
    },
  });

  const password = watch('password');

  const isFieldVisible = React.useCallback((field: Field) => {
    if (!hiddenFields) {
      return true;
    }
    return hiddenFields.indexOf(field) === -1;
  }, [hiddenFields]);

  const isFieldEnabled = React.useCallback((field: Field) => {
    if (!disabledFields) {
      return true;
    }
    return disabledFields.indexOf(field) === -1;
  }, [disabledFields]);

  const onSubmit = React.useCallback(async (data: Auth.LocalSignup) => {
    try {
      await onSubmitRequest(data);
    } catch (err) {
      console.error(err);
    }
  }, [onSubmitRequest]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} style={{ maxWidth: 500 }}>
        {isFieldVisible('username') && (
          <Grid item xs={12}>
            <Controller
              name="username"
              control={control}
              rules={{ required: dictionary.forms.validations.required }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="outlined"
                  label={dictionary.forms.user.username}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  disabled={!isFieldEnabled('username')}
                />
              )}
            />
          </Grid>
        )}
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
                  fullWidth
                  variant="outlined"
                  label={dictionary.forms.fieldEmail}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  disabled={!isFieldEnabled('email')}
                  inputProps={{
                    autoCapitalize: 'none',
                  }}
                />
              )}
            />
          </Grid>
        )}
        {isFieldVisible('password') && (
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              rules={{
                required: dictionary.forms.validations.required,
                minLength: {
                  value: 6,
                  message: dictionary.forms.validations.minLength(6),
                },
                maxLength: {
                  value: 20,
                  message: dictionary.forms.validations.minLength(20),
                },
                pattern: {
                  value: passwordRegex,
                  message: dictionary.forms.validations.invalidPassword,
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="outlined"
                  label={dictionary.forms.fieldPassword}
                  type="password"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  disabled={!isFieldEnabled('password')}
                  inputProps={{
                    autoCapitalize: 'none',
                  }}
                />
              )}
            />
          </Grid>
        )}
        {isFieldVisible('repeatedPassword') && (
          <Grid item xs={12}>
            <Controller
              name="repeatedPassword"
              control={control}
              rules={{
                required: dictionary.forms.validations.required,
                validate: repeatedPassword => repeatedPassword === password || dictionary.auth.validations.passwordsDoNotMatch,
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="outlined"
                  label={dictionary.forms.signup.fieldRepeatPassword}
                  type="password"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  disabled={!isFieldEnabled('repeatedPassword')}
                  inputProps={{
                    autoCapitalize: 'none',
                  }}
                />
              )}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            loading={isSubmitting}
          >
            {onSubmitButtonText}
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};
