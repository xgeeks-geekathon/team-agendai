import React from 'react';
import { Avatar, Chip, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { ClockIcon } from '@mui/x-date-pickers';
import { ArrowForward, AutoFixHigh } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

import { BodyLoading } from '@core/components/layout/BodyLoading';

import { useTaskCrud } from '@modules/Tasks/hooks/useTaskCrud';
import { useTaskEnhancement } from '@modules/Tasks/hooks/useTaskEnhancement';

interface Props {
  task: Tasks.Task;
  onApprove: (enhancement: Tasks.Enhancement.Enhancement) => void;
}

export const ViewTaskDialogEnhance: React.FC<Props> = ({ task, onApprove }) => {

  const { generateEnhancement } = useTaskCrud();
  const { enhancement, status } = useTaskEnhancement({ id: task.id });

  const onGenerate = React.useCallback(() => {
    generateEnhancement.mutateAsync(task.id);
  }, [generateEnhancement, task.id]);

  return (
    <Grid container spacing={2}>
      {status === 'pending' && <BodyLoading height="100%" />}
      {status === 'success' && !!enhancement && (
        <React.Fragment>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" pt={2} mb={1}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar src={task.type.icon} alt={task.type.name} sx={{ width: 16, height: 16 }} variant="square" />
                <Typography variant="body2" color="secondary" fontWeight={500}>{task.originalId}</Typography>
              </Stack>
              <Chip icon={<ClockIcon/>} color="primary" size="small" label={`${task.estimation} hours`} />
            </Stack>
            <Typography variant="h3" component="h1">
              {enhancement.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar src={task.assignee.avatar} alt={task.assignee.name} sx={{ width: 24, height: 24 }} />
              <Typography variant="body2" color="text.light">{task.assignee.name}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <span dangerouslySetInnerHTML={{ __html: enhancement.description }} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack pt={2} direction="row" spacing={1}>
              <LoadingButton
                fullWidth
                variant="contained"
                color="secondary"
                onClick={onGenerate}
                loading={generateEnhancement.isPending}
                startIcon={<AutoFixHigh/>}
              >
                Improve
              </LoadingButton>
              <Tooltip title="Approve">
                <IconButton
                  color="success"
                  onClick={() => onApprove(enhancement)}
                >
                  <ArrowForward/>
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  );
};
