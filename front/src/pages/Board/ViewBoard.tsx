import { useParams } from 'react-router';
import { Box, Container } from '@mui/material';

import { useRouter } from '@core/hooks/useRouter';

import { ViewBoard as ViewBoardView } from '@modules/Boards/views/ViewBoard';

export const ViewBoard = () => {
  const { boardId = null } = useParams();
  const router = useRouter();

  if (!boardId) {
    router.home.go();
    return null;
  }

  const id = parseInt(boardId, 10);

  return (
    <Container maxWidth="md" sx={{ height: '100%' }}>
      <Box pt={8} height="100%">
        <ViewBoardView boardId={id} />
      </Box>
    </Container>
  );
};
