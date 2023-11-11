import React, { useCallback, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Divider, IconButton, Tooltip, Typography, Button, Stack } from '@mui/material';

import { LocalizationContext } from '@core/contexts';
import { useRouter } from '@core/hooks/useRouter';
import config from '@shared/config';

import { useSignup } from '../hooks/useSignup';
import { LoggedOutActionsLayout } from '../components/LoggedOutActionsLayout';
import { UserSignupForm } from '../partials/UserSignupForm';

export const SignUp = () => {

  const router = useRouter();
  const { dictionary } = useContext(LocalizationContext);


  const { localSignup } = useSignup();

  const onSSOLogin = useCallback(async (provider: string) => {
  }, []);

  const onSubmit = useCallback(async (data: Auth.LocalSignup) => {
    try {
      await localSignup(data);
      router.onboarding.go();
    } catch(e) {
      console.error(e);
    }
  }, [localSignup, router]);

  return (
    <LoggedOutActionsLayout>
      <Typography variant="h1" align="center">{dictionary.auth.signUp.title}</Typography>
      <Box pt={2}>
        <Stack direction="row" justifyContent="center" spacing={2}>
          {config.featureFlags.appleSSO && (
            <Tooltip title={dictionary.auth.login.buttonLoginWithGoogle}>
              <IconButton onClick={() => onSSOLogin('apple')}>
                <img src="/apple.svg" alt="Apple" width={32} height={32} />
              </IconButton>
            </Tooltip>
          )}
          {config.featureFlags.googleSSO && (
            <Tooltip title={dictionary.auth.login.buttonLoginWithGoogle}>
              <IconButton onClick={() => onSSOLogin('google')}>
                <img src="/google.svg" alt="Google" width={32} height={32} />
              </IconButton>
            </Tooltip>
          )}
          {config.featureFlags.microsoftSSO && (
            <Tooltip title={dictionary.auth.login.buttonLoginWithMicrosoft}>
              <IconButton onClick={() => onSSOLogin('microsoft')}>
                <img src="/microsoft.svg" alt="Microsoft" width={32} height={32} />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Box>
      <Box pt={2}>
        <Divider orientation="horizontal" flexItem>
          {dictionary.auth.divider}
        </Divider>
      </Box>
      <Box pt={2}>
        <UserSignupForm
          onSubmitRequest={onSubmit}
          onSubmitButtonText={dictionary.auth.signUp.buttonSignup}
        />
      </Box>
      <Box mt={4} textAlign="center">
        <Typography variant="body2">
          {dictionary.auth.signUp.alreadyHaveAccount}
        </Typography>
        <Box mt={2}>
          <Button component={RouterLink} to={router.auth.login.path} variant="contained" color="secondary" size="large">
            {dictionary.auth.signUp.buttonLogin}
          </Button>
        </Box>
      </Box>
    </LoggedOutActionsLayout>
  );
};
