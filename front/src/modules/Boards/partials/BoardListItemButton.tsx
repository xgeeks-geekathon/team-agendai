import React from 'react';
import { Link } from 'react-router-dom';
import { ListItemButton } from '@mui/material';

import { useRouter } from '@core/hooks/useRouter';

export const BoardListItemButton: React.FC<Boards.Board> = board => {

  const router = useRouter();

  return (
    <ListItemButton component={Link} to={router.boards.view(board.id).path}>
      {board.title}
    </ListItemButton>
  );
};
