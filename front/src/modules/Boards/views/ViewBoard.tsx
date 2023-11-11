import React from 'react';
import { Box, Container, Grid, List, ListItemButton, Typography } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';

import { DialogContext } from '@core/contexts';
import { useRouter } from '@core/hooks/useRouter';
import { useDictionary } from '@core/hooks/useDictionary';
import { MessageFeedbackView } from '@core/components/MessageFeedbackView';
import { BodyLoading } from '@core/components/layout/BodyLoading';
import { IconButtonDropdown } from '@core/components/ButtonDropdown';

import { useBoard } from '../hooks/useBoard';
import { useBoardCrud } from '../hooks/useBoardCrud';
import { useChapterSections } from '../hooks/useChapterSections';
import { boardsClient } from '../client/boardsClient';
import { Section } from './components/Section';

const BoardSection: React.FC<Boards.ExtendedBoard> = board => {

  const { asyncConfirmation } = React.useContext(DialogContext);
  const router = useRouter();
  const dictionary = useDictionary();
  const { deleteBoard } = useBoardCrud();


  const onDelete = React.useCallback(async () => {
    const userConfirmed = await asyncConfirmation({ title: dictionary.boards.edit.deleteConfirmation });
    if (!userConfirmed) {
      return false;
    }
    return deleteBoard(board.id).then(() => {
      router.boards.go();
    });
  }, [board, deleteBoard, router, dictionary, asyncConfirmation]);

  return (
    <Box
      position="relative"
      height="100%"
      sx={{
        background: `center / cover no-repeat url(${import.meta.env.VITE__MEDIA_URL}${board.cover.data?.attributes.url})`,
        scrollSnapAlign: 'center',
      }}
    >
      <Box sx={{ backdropFilter: 'blur(8px)', width: '100%', height: '100%' }}>
        <Grid container margin="auto" maxWidth="sm" sx={{ backdropFilter: 'blur(8px)', height: '100%' }}>
          <Box position="absolute" top={12} right={{ xs: 12, sm: 80 }}>
            <IconButtonDropdown
              buttonProps={{
                color: 'default',
              }}
              content={(
                <List>
                  {!board.cover.data && (
                    <ListItemButton onClick={() => boardsClient.generateBoardCover({ id: board.id })}>Generate cover</ListItemButton>
                  )}
                  <ListItemButton onClick={onDelete}>Delete board</ListItemButton>
                </List>
              )}
            >
              <MoreHoriz/>
            </IconButtonDropdown>
          </Box>
          <Box p={3} display="flex" width="100%" height="100%" justifyContent="center" alignItems="center" textAlign="center" sx={{ textWrap: 'balance' }}>
            <Typography variant="h2" component="h1">{board.title}</Typography>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

const ChaptersSection: React.FC<Boards.Chapters.Chapter> = chapter => {

  const { sections, status } = useChapterSections({ chapter: chapter.id });


  if (status === 'error') {
    return <MessageFeedbackView height="100%" />;
  }

  if (status !== 'success') {
    return <BodyLoading height="100%"/>;
  }

  return (
    <React.Fragment>
      {sections.map(section => (
        <Container maxWidth="sm" sx={{ scrollSnapAlign: 'center', minHeight: '100%' }}>
          <Section {...section} />
        </Container>
      ))}
    </React.Fragment>
  );
};

interface Props {
  board: number;
  chapter: number;
}

export const ViewBoard: React.FC<Props> = ({ board: boardId, chapter: chapterOrder }) => {

  const { board, status } = useBoard({ id: boardId });

  const chapter = React.useMemo(() => {
    return board?.chapters.find(chapter => chapter.order === chapterOrder);
  }, [board, chapterOrder]);
  
  if (status === 'error') {
    return <MessageFeedbackView height="100%" />;
  }

  if (status !== 'success' || !board || !chapter) {
    return <BodyLoading height="100%"/>;
  }

  return (
    <Box height="100vh" maxHeight="100vh">
      <Box height="100%" overflow="auto" sx={{ scrollSnapType: 'y mandatory' }}>
        <BoardSection {...board} />
        <ChaptersSection {...chapter} />
      </Box>
    </Box>  
  );
};
