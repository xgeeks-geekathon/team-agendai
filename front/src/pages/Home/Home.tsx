import React from 'react';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';

import { useDictionary } from '@core/hooks/useDictionary';

import { DialogContext } from '@core/contexts';
import { ViewCalendar } from '@modules/Calendar/views/ViewCalendar';

export const Home = () => {
  const { openDialog } = React.useContext(DialogContext);
  const dictionary = useDictionary();

  return (
    <Container maxWidth="lg">
      <Box pt={3} pb={{ xs: 11, sm: 3 }}>
        <Stack spacing={3}>
          <Box mb={2} textAlign="center">
            <Typography variant="h2">Your Calendar</Typography>
          </Box>
          <Box>
            <Paper sx={{ p: 3 }}>
              <ViewCalendar event={0} chapter={0}></ViewCalendar>
            </Paper>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};
