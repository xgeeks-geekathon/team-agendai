import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

import { BodyLoading } from '@core/components/layout/BodyLoading';

import useIsInViewport from '@shared/hooks/useIsInViewport';

import { useBoardCrud } from '../../hooks/useBoardCrud';

export const Section: React.FC<Boards.ChapterSections.ChapterSection> = section => {

  const { generateSectionCover } = useBoardCrud();

  const el = React.useRef<HTMLElement>(null);
  const isInViewPort = useIsInViewport(el);
  const [imageRequested, setImageRequested] = React.useState(false);
  const [generatingCover, setGeneratingCover] = React.useState(false);

  const generateImage = React.useCallback(async () => {
    try {
      setImageRequested(true);
      setGeneratingCover(true);
      await generateSectionCover(section.id);
      setGeneratingCover(false);
    } catch(err) {
      setGeneratingCover(false);
    }
  }, [generateSectionCover, section.id]);

  React.useEffect(() => {
    if (!imageRequested) {
      if (isInViewPort) {
        generateImage();
      }
    }
  }, [isInViewPort, imageRequested, generateImage]);

  return (
    <Stack flexDirection="column" spacing={4} pb={{ xs: 11, sm: 2 }} width="100%" height="100%">
      <Box flexShrink={0}>
        <Box mt={2} borderRadius={1} overflow="hidden">
          {section.cover.data ? (
            <img height="auto" style={{ maxWidth: '100%', display: 'block' }} src={`${import.meta.env.VITE__MEDIA_URL}${section.cover.data?.attributes.url}`} alt={section.content} />
          ) : (
            <Box ref={el} width="100%" position="relative" bgcolor="background.paper">
              <Box pt="100%" />
              <Box position="absolute" top={0} right={0} bottom={0} left={0} display="flex" justifyContent="center" alignItems="center">
                {generatingCover ? (
                  <BodyLoading height="100%" />
                ) : (
                  <Button variant="outlined" color="secondary" onClick={generateImage}>
                    Generate image
                  </Button>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Box display="flex" flex="1" justifyContent="center" alignItems="center">
        <Typography component="p" variant="body3">{section?.content}</Typography>
      </Box>
    </Stack>
  );
};
