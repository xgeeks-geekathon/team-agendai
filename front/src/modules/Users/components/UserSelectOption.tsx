import React from 'react';
import {
  Avatar,
  Box,
  Grid,
} from '@mui/material';

export type Props = React.HTMLAttributes<HTMLLIElement> & {
  user: Users.User;
};

export const UserSelectOption: React.FC<Props> = ({ user: { displayName, profilePicture }, ...props }) => (
  <Box component="li" {...props}>
    <Grid container spacing={1} wrap="nowrap" sx={{ overflow: 'hidden' }}>
      <Grid item>
        <Avatar alt={displayName} src={profilePicture} sx={{ width: 24, height: 24 }}/>
      </Grid>
      <Grid item>
        {displayName}
      </Grid>
      <Box ml="auto"/>
    </Grid>
  </Box>
);
