import React from 'react';
import { format } from 'date-fns';
import { Card, CardActionArea, Avatar, CardContent, Typography, Stack, Box } from '@mui/material';

import { DialogContext } from '@core/contexts';

export const EventListItemCard: React.FC<Events.Event> = event => {

  const { openDialog } = React.useContext(DialogContext);

  const openTask = React.useCallback(() => {
    openDialog('viewTask', {
      taskId: event.task,
    });
  }, [openDialog, event]);

  return (
    <Card>
      <CardActionArea component={Box} width="100%" height="100%" onClick={openTask}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography gutterBottom variant="body2" color="secondary">
                {format(event.startDate ,'dd/MM')} - {format(event.startDate ,'hh:mm')} - {format(event.endDate ,'hh:mm')}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {event.title}
              </Typography>
            </Box>
            <Stack direction="row">
              {event.attendees.map((attendee: any, key:any) => (
                <Avatar sx={{ width: 24, height: 24 }} key={key} alt={attendee.name} src={attendee.avatar} />
              ))}
            </Stack>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {event.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
