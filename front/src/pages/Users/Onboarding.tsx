import React from 'react';
import { useParams } from 'react-router';
import { Box, Container } from '@mui/material';

import { Onboarding as OnboardingView } from '@modules/Users/views/Onboarding';

import BgMap from  '@shared/assets/onboarding-map-bg.png';

export const Onboarding = () => {
  const { stepNumber } = useParams();

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={(theme) => ({
        backgroundColor: 'white',
        [theme.breakpoints.down('sm')]: {
          backgroundImage: `url(${BgMap})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        },
        position: 'fixed',
        zIndex: 1200,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      })}
    >
      <Box
        display="flex"
        justifyContent="center"
        height="100vh"
        width="100%"
        pt="env(safe-area-inset-top)"
        pb="env(safe-area-inset-bottom)"
        overflow="auto"
      >
        <Box height="100%" width="100%" maxWidth="sm" px={2}>
          <OnboardingView stepNumber={stepNumber} />
        </Box>
      </Box>
    </Container>
  );
};
