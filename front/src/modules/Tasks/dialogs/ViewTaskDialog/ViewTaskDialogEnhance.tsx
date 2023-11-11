import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { BodyLoading } from '@core/components/layout/BodyLoading';

import { useTaskCrud } from '@modules/Tasks/hooks/useTaskCrud';
import { useTaskEnhancement } from '@modules/Tasks/hooks/useTaskEnhancement';

interface Props {
  taskId: number;
}

export const ViewTaskDialogEnhance: React.FC<Props> = ({ taskId }) => {

  const { generateEnhancement } = useTaskCrud();
  const { enhancement, status } = useTaskEnhancement({ id: taskId });

  const onGenerate = React.useCallback(() => {
    generateEnhancement.mutateAsync(taskId);
  }, [generateEnhancement, taskId]);

  return (
    <Box p={2} bgcolor="background.default" height="100%">
      {status === 'pending' && <BodyLoading height="100%" />}
      {status === 'success' && !!enhancement && (
        <Stack spacing={3}>
          <Typography variant="h4" component="h2">Suggestions from the cat</Typography>
          <Box>
            <Typography variant="body2" color="secondary.light" component="div">Cost</Typography>
            <Typography variant="h5" component="div">
              {Intl.NumberFormat('en-US', { currency: 'EUR' }).format(enhancement.cost)} EUR
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="secondary.light" component="div">Title</Typography>
            <Typography variant="body1" component="div">{enhancement?.title}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="secondary.light" component="div">Description</Typography>
            <Typography variant="body1" component="div">
              <span dangerouslySetInnerHTML={{ __html: enhancement.description }} />
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="secondary.light" component="div">Estimation</Typography>
            <Typography variant="body1" component="div">{enhancement.estimation} hours</Typography>
          </Box>
          <LoadingButton
            fullWidth
            variant="contained"
            color="secondary"
            onClick={onGenerate}
            loading={generateEnhancement.isPending}
          >
            Generate again
          </LoadingButton>
        </Stack>
      )}
    </Box>
  );
};
