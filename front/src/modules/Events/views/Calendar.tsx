import React from 'react';
import { Calendar as ReactCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { Box, Paper, Stack, Typography } from '@mui/material';

import { useDictionary } from '@core/hooks/useDictionary';
import { BodyLoading } from '@core/components/layout/BodyLoading';

import { useEvents } from '../hooks/useEvents';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    'en-US': enUS,
  },
});

export const Calendar = () => {
  const dictionary = useDictionary();

  const { events, status } = useEvents({
    // This is not the droid you're looking for :)
    limit: 1000,
  });

  const eventList = React.useMemo(() => events.map(event => ({
    title: event.title,
    start: event.startDate,
    end: event.endDate,
    resource: event.task,
  })), [events]);

  
  if (status === 'pending') {
    return <BodyLoading height="100%" />;
  }

  return (
    <Stack spacing={3}>
      <Box mb={2} textAlign="center">
        <Typography variant="h2">{dictionary.events.calendar.title}</Typography>
      </Box>
      <Paper component={Box} p={2}>
        <ReactCalendar
          localizer={localizer}
          events={eventList}
          startAccessor="start"
          endAccessor="end"
          defaultView="work_week"
          views={['work_week']}
        />
      </Paper>
    </Stack>
  );
};
