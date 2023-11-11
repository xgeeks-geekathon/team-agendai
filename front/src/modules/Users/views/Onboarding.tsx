import React from 'react';
import { Stack, Box, Typography, MobileStepper, Button, Paper } from '@mui/material';

import { Logo } from '@shared/components/Logo';
import config from '@shared/config';
import { DialogContext } from '@core/contexts';
import { useDictionary } from '@core/hooks/useDictionary';

import { useAuth } from '@modules/Auth/hooks/useAuth';

import { useOnboardingStepContent } from '../hooks/useOnboardingStepContent';

interface Props {
    stepNumber?: string;
};
export const Onboarding: React.FC<Props> = ({ stepNumber = '1' }) => {

  const { openDialog } = React.useContext(DialogContext);

  const dictionary = useDictionary();
  const { user } = useAuth();

  const stepContent = useOnboardingStepContent();

  const ref = React.useRef<React.ElementRef<typeof Stack>>(null);

  const currentStepContent = stepContent[stepNumber];

  return (
    <React.Fragment>
      <Stack height="100%" justifyContent="space-between">
        <Stack alignItems="center" pt={4} pb={3}>
          <Logo
            style={{ width: '5rem', height: 'auto' }}
            alt={config.projectName}
          />
        </Stack>
        {['1'].includes(`${stepNumber}`) && (
          <React.Fragment>
            <Box position="relative">
              <Stack direction="row" justifyContent="space-evenly">
                <Typography
                  textAlign="center"
                  color="primary"
                  maxWidth="7rem"
                >
                  {currentStepContent.leftText}
                </Typography>
                <Typography
                  textAlign="center"
                  color="primary"
                  maxWidth="7rem"
                >
                  {currentStepContent.rightText}
                </Typography>
              </Stack>
              <Box height="50vh" display="flex" justifyContent="center">
                <img
                  src={currentStepContent.image}
                  style={{
                    objectFit: 'contain',
                    width: '100%',
                    height: 'auto',
                    maxWidth: '100%',
                    maxHeight: '100%',
                  }}
                  alt="onboarding step"
                />
              </Box>
            </Box>
            <Box>
              <Typography variant="h1" textAlign="center" mt={2}>{currentStepContent.title}</Typography>
              <Typography variant="body1" px={4} textAlign="center" mt={1}>
                {currentStepContent.subtitle}
              </Typography>
              <Box mt={1}>
                <MobileStepper
                  steps={3}
                  position="static"
                  activeStep={(parseInt(stepNumber) || 1) - 1}
                  backButton={null}
                  nextButton={null}
                  sx={{
                    justifyContent: 'center',
                    background: 'transparent',
                    '.MuiMobileStepper-dotActive': {
                      backgroundColor: theme => theme.palette.secondary.main,
                    },
                  }}
                />
              </Box>
            </Box>
            <Box mt="auto"/>
          </React.Fragment>
        )}
        {(stepNumber === '2' && !!user) && (
          <React.Fragment>
            <Box component={Paper} p={2}>
              <Typography variant="h2" textAlign="center" mb={3}>{dictionary.users.onboarding.form.title}</Typography>
              <Stack direction="row" spacing={1}>
                
                <Button variant="text" onClick={() => openDialog('createBoard')}>
                  Add a Jira board
                </Button>
              </Stack>
            </Box>
            <Box mt="auto"/>
          </React.Fragment>
        )}
        <Box ref={ref} px={2} pt={2} pb={4}>
          <Button
            fullWidth
            onClick={currentStepContent.nextButtonClick}
          >
            {currentStepContent.nextButtonText}
          </Button>
        </Box>
      </Stack>
    </React.Fragment>
  );
};
