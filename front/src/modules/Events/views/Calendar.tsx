import React from 'react';
import { Calendar as ReactCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, setHours, setMinutes } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { Avatar, Box, Button, Paper, Stack, Tooltip, Typography, useTheme } from '@mui/material';

import { DialogContext } from '@core/contexts';
import { useDictionary } from '@core/hooks/useDictionary';
import { BodyLoading } from '@core/components/layout/BodyLoading';

import { useTasks } from '@modules/Tasks/hooks/useTasks';

import { useEvents } from '../hooks/useEvents';
import { useEventCrud } from '../hooks/useEventCrud';

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
  const { openDialog } = React.useContext(DialogContext);
  const dictionary = useDictionary();
  const theme = useTheme();

  const { populateEvents } = useEventCrud();

  const { events, status } = useEvents({
    // This is not the droid you're looking for :)
    limit: 10000,
  });

  const { tasks } = useTasks({
    // This is not the droid you're looking for :)
    limit: 10000,
  });

  const eventList = React.useMemo(() => events.map(event => ({
    title: event.summary,
    start: event.start,
    end: event.end,
    resource: event.task,
  })), [events]);

  const openTask = React.useCallback((id: number) => {
    openDialog('viewTask', {
      taskId: id,
    });
  }, [openDialog]);

  if (status === 'pending') {
    return <BodyLoading height="100%" />;
  }

  return (
    <Stack spacing={3} height="100%">
      <Box mb={2} textAlign="center">
        <Typography variant="h2">{dictionary.events.calendar.title}</Typography>
      </Box>
      <Paper component={Box} p={2} height="100%">
        <ReactCalendar
          localizer={localizer}
          events={eventList}
          components={{
            toolbar: props => (
              <Stack direction="row" justifyContent="space-between" pb={2}>
                <Typography variant="h5" component="span" color="secondary">{props.label}</Typography>
                <Box ml={3}>
                  <Button color="secondary" size="small" onClick={() => populateEvents()}>Populate my life!</Button>
                </Box>
              </Stack>
            ),
            event: props => {
              const task = tasks.find(task => task.id);
              if (task) {
                return (
                  <Stack direction="column" alignItems="left">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar src={task.typeIcon} alt={task.typeName} sx={{ width: 16, height: 16 }} variant="square" />
                      <Typography variant="body2">{task.originalId}</Typography>
                    </Stack>
                    <Typography variant="body1" component="div" fontWeight={500}>
                      {task.title}
                    </Typography>
                    <Tooltip title={task.assigneeName}>
                      <Avatar src={task.assigneeAvatar} alt={task.assigneeName} sx={{ mt: 1, width: 24, height: 24 }} />
                    </Tooltip>
                  </Stack>
                );
              }
              return props.title;
            },
          }}
          startAccessor="start"
          endAccessor="end"
          defaultView="work_week"
          views={['work_week']}
          onSelectEvent={event => event.resource && openTask(event.resource)}
          min={setMinutes(setHours(new Date(), 8), 0)}
          max={setMinutes(setHours(new Date(), 21), 0)}
          eventPropGetter={event => ({
            style: {
              borderColor: event.resource ? theme.palette.secondary.dark : theme.palette.info.dark,
              backgroundColor: event.resource ? theme.palette.secondary.main : theme.palette.info.light,
              color: event.resource ? theme.palette.secondary.contrastText : theme.palette.info.contrastText,
            },
          })}
        />
      </Paper>
    </Stack>
  );
};
