import { Avatar, Grid, Stack, Typography } from '@mui/material';


interface Props {
  task: Tasks.Task;
}
export const ViewTaskDialogMain: React.FC<Props> = ({ task }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3" component="h1">
          {task.title}
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
          <span dangerouslySetInnerHTML={{ __html: task.description }} />
        </Typography>
      </Grid>
    </Grid>
  );
};
