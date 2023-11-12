import { Avatar, Box, Grid, Stack, Typography } from '@mui/material';


interface Props {
  task: Tasks.Task;
}
export const ViewTaskDialogMain: React.FC<Props> = ({ task }) => {
  return (
    <Box p={2} bgcolor="background.default" height="100%">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" pt={2} mb={1} spacing={1} alignItems="center">
            <Avatar src={task.typeIcon} alt={task.type.name} sx={{ width: 16, height: 16 }} variant="square" />
            <Typography variant="body2" color="secondary" fontWeight={500}>{task.originalId}</Typography>
          </Stack>
          <Typography variant="h3" component="h1">
            {task.title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar src={task.assigneeAvatar} alt={task.assigneeName} sx={{ width: 24, height: 24 }} />
            <Typography variant="body2" color="text.light">{task.assigneeName}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <span dangerouslySetInnerHTML={{ __html: task.description }} />
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
