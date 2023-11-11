import React from 'react';
import { noop } from 'lodash';
import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  SwipeableDrawer,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';

import { DialogContext } from '@core/contexts';
import { useDictionary } from '@core/hooks/useDictionary';
import { BodyLoading } from '@core/components/layout/BodyLoading';

import { EditCharacter } from '../partials/EditCharacter';
import { useCharacter } from '../hooks/useCharacter';
import { useCharacterCrud } from '../hooks/useCharacterCrud';

type Props = {
  open: boolean;
  onClose: () => void;
  data: {
    characterId: number;
  }
}

export const EditCharacterDialog: React.FC<Props> = ({ open, onClose, data }) => {

  const dictionary = useDictionary();
  const { asyncConfirmation } = React.useContext(DialogContext);

  const { character, status } = useCharacter({
    id: data.characterId,
  });


  const { deleteCharacter } = useCharacterCrud();

  const onDelete = React.useCallback(async () => {
    const userConfirmed = await asyncConfirmation({ title: dictionary.characters.edit.deleteConfirmation });
    if (!character || !userConfirmed) {
      return false;
    }
    return deleteCharacter(character.id).then(onClose);
  }, [character, deleteCharacter, asyncConfirmation, dictionary, onClose]);

  if (!data?.characterId) {
    return null;
  }

  return (
    <SwipeableDrawer
      disableSwipeToOpen
      keepMounted={false}
      anchor="bottom"
      open={open}
      onOpen={noop}
      onClose={onClose}
      PaperProps={{
        sx: theme => ({
          left: theme.spacing(1.5),
          right: theme.spacing(1.5),
          bottom: theme.spacing(1.5),
          maxWidth: theme.breakpoints.values.sm,
          margin: 'auto',
        }),
      }}
    >
      <Box
        position="absolute"
        top={8}
        left="50%"
        width={40}
        height={3}
        borderRadius={1}
        bgcolor="common.white"
        sx={{
          transform: 'translate(-50%)',
        }}
      />
      <DialogTitle component={Stack} direction="row" alignItems="center" justifyContent="space-between">
        <Box width={40}/>
        <Typography variant="h4" component="h1">{dictionary.characters.edit.title}</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          color="secondary"
        >
          <Close/>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box pt={1}>
          {(status === 'pending' || !character) &&  <BodyLoading height={300}/>}
          {status === 'success' && character && (
            <React.Fragment>
              <EditCharacter
                character={character}
                onSuccess={onClose}
              />
              <Box pt={2}>
                <Button fullWidth variant="text" color="secondary" onClick={onDelete}>
                  {dictionary.characters.edit.buttonDelete}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </DialogContent>
    </SwipeableDrawer>
  );
};
