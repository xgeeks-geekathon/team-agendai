import React from 'react';
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';

import { DialogContext } from '@core/contexts';
import { useDictionary } from '@core/hooks/useDictionary';
import { MessageFeedbackView } from '@core/components/MessageFeedbackView';
import { BodyLoading } from '@core/components/layout/BodyLoading';

import { AuthContext } from '@modules/Auth/contexts';
import { useMe } from '@modules/Auth/hooks/useMe';
import { useMeCrud } from '@modules/Auth/hooks/useMeCrud';
import { CharactersList } from '@modules/Characters/partials/CharactersList';
import { CharacterListItemButton } from '@modules/Characters/components/CharacterListItemButton';

import { UserForm } from '../partials/UserForm';


const ProfileView: React.FC<Users.User> = user => {

  const { asyncConfirmation } = React.useContext(DialogContext);
  const dictionary = useDictionary();
  const { updateMe, deleteMe } = useMeCrud();

  const onDelete = React.useCallback(async () => {
    const userConfirmed = await asyncConfirmation({ title: dictionary.users.profile.deleteConfirmation });
    if (!user || !userConfirmed) {
      return false;
    }
    return deleteMe();
  }, [user, deleteMe, dictionary, asyncConfirmation]);

  const onSubmit = React.useCallback((data: Partial<Auth.User>) => {
    return updateMe(data);
  }, [updateMe]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <UserForm
          defaultValues={{
            username: user.username,
            email: user.email,
          }}
          onSubmitRequest={onSubmit}
          onSubmitButtonText={dictionary.forms.buttonEdit}
        />
      </Grid>
      <Grid item xs={12}>
        <Button fullWidth variant="text" color="secondary" onClick={onDelete}>Delete account</Button>
      </Grid>
    </Grid>
  );
};

export const Profile: React.FC = () => {

  const dictionary = useDictionary();
  const { logout } = React.useContext(AuthContext);
  const { user, status } = useMe();
  const { openDialog } = React.useContext(DialogContext);

  if (status === 'error') {
    return <MessageFeedbackView height="100%" />;
  }

  if (status !== 'success' || !user ) {
    return <BodyLoading height="100%"/>;
  }

  return (
    <React.Fragment>
      <Box mb={2} textAlign="center">
        <Typography variant="h1">{dictionary.users.profile.title}</Typography>
      </Box>
      <Stack spacing={3}>
        <Paper component={Box} p={3}>
          <ProfileView {...user} />
        </Paper>
        <Box mb={2} textAlign="center">
          <Typography variant="h2">{dictionary.users.profile.childrenSectionTitle}</Typography>
        </Box>
        <Paper component={Box} p={3}>
          <Box mb={2}>
            <CharactersList
              renderItem={character => <CharacterListItemButton {...character} />}
              slotProps={{
                list: {
                  disablePadding: true,
                },
                listItem: {
                  disablePadding: true,
                  disableGutters: true,
                },
              }}
            />
          </Box>
          <Button fullWidth size="large" onClick={() => openDialog('createCharacter')}>
            Add a child
          </Button>
        </Paper>
        <Button fullWidth color="secondary" variant="text" size="large" onClick={logout}>
          Logout
        </Button>
      </Stack>
    </React.Fragment>
  );
};
