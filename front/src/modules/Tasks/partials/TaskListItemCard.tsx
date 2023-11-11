import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

interface Props extends Tasks.Task {
  onClick: (id: number) => void;
}

export const TaskListItemCard: React.FC<Props> = ({ onClick, ...task }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea onClick={() => onClick(task.id)} sx={{ height: '100%' }}>
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
