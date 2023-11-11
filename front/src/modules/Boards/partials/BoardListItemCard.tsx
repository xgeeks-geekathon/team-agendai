import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

import { useRouter } from '@core/hooks/useRouter';

export const BoardListItemCard: React.FC<Boards.Board> = board => {

  const router = useRouter();

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea component={Link} to={router.boards.view(board.id, 1).path} sx={{ height: '100%' }}>
        <CardMedia
          component="img"
          image={import.meta.env.VITE__MEDIA_URL + board.cover?.data?.attributes.url}
          alt={board.title}
        />
        <CardContent>
          <Typography gutterBottom variant="body2" color="secondary">{formatDistanceToNow(board.createdAt, { addSuffix: true })}</Typography>
          <Typography gutterBottom variant="h6" component="div">
            {board.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
