import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

import { useRouter } from '@core/hooks/useRouter';

export const TaskListItemCard: React.FC<Tasks.Task> = task => {

  const router = useRouter();

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea component={Link} to={router.tasks.view(task.id).path} sx={{ height: '100%' }}>
        <CardContent>
          <Typography gutterBottom variant="body2" color="secondary">{formatDistanceToNow(task.createdAt, { addSuffix: true })}</Typography>
          <Typography gutterBottom variant="h6" component="div">
            {task.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
