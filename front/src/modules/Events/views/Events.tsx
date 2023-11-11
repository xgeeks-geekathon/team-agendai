import { Box, Stack, Typography } from '@mui/material';

import { useDictionary } from '@core/hooks/useDictionary';

import { EventsGrid } from '@modules/Events/partials/EventsGrid';
import { EventListItemCard } from '@modules/Events/partials/EventListItemCard';

export const Events = () => {
  const dictionary = useDictionary();

  return (
    <Stack spacing={3}>
      <Box mb={2} textAlign="center">
        <Typography variant="h2">Events List</Typography>
      </Box>
      <Box>
        <EventsGrid
          filters={{
            limit: 1000,
          }}
          renderItem={Event => <EventListItemCard {...Event} />}
          slotProps={{
            container: {
              spacing: 2,
            },
            item: {
              xs: 12,
              sm: 12,
            },
          }}
        />
      </Box>
    </Stack>
  );
};
