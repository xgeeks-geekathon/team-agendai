import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Card, CardActionArea, CardActions, Avatar, CardContent, Typography } from '@mui/material';

import { useRouter } from '@core/hooks/useRouter';

export const EventListItemCard: React.FC<Events.Event> = event => {

  const router = useRouter();

  return (
    <Card>
      <CardActionArea component={Link} to={router.events.view(event.id).path} sx={{ height: '100%' }}>
        <CardContent>
          <Typography gutterBottom variant="body2" color="secondary">
            {format(event.startDate ,'dd/MM')} - {format(event.startDate ,'hh : mm')} - {format(event.endDate ,'hh : mm')}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {event.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {event.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        {event.attendees.map((attendee: any, key:any) => (
          <Avatar sx={{ width: 24, height: 24 }} key={key} alt={attendee.name} src={attendee.avatar} />
        ))}
      </CardActions>
    </Card>
  );
};
