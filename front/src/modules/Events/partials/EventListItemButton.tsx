import React from 'react';
import { Link } from 'react-router-dom';
import { ListItemButton } from '@mui/material';

import { useRouter } from '@core/hooks/useRouter';

export const EventListItemButton: React.FC<Events.Event> = Event => {

  const router = useRouter();

  return (
    <ListItemButton component={Link} to={router.Events.view(Event.id, 1).path}>
      {Event.title}
    </ListItemButton>
  );
};
