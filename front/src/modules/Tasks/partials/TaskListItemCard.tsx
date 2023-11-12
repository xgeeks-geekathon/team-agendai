import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, Box, Card, CardActionArea, CardContent, Stack, Tooltip, Typography } from '@mui/material';

interface Props extends Tasks.Task {
  onClick: (id: number) => void;
}

export const TaskListItemCard: React.FC<Props> = ({ onClick, ...task }) => {
  return (
    <Card component={Box} width="100%" height="100%" sx={{ borderRadius: 0 }}>
      <CardActionArea onClick={() => onClick(task.id)} sx={{ height: '100%' }}>
        <CardContent>
          <Stack width="100%" direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar src={task.typeIcon} alt={task.typeName} sx={{ width: 16, height: 16 }} variant="square" />
                <Typography variant="body2" color="secondary" fontWeight={500}>{task.originalId}</Typography>
              </Stack>
              <Typography variant="h6" component="div">
                {task.title}
              </Typography>
            </Stack>
            <Stack ml="100%" direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" color="secondary">
                {formatDistanceToNow(task.createdAt, { addSuffix: true })}
              </Typography>
              <Tooltip title={task.assigneeName}>
                <Avatar src={task.assigneeAvatar} alt={task.assigneeName} sx={{ width: 24, height: 24 }} />
              </Tooltip>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
