import React from 'react';
import { ListItemButton } from '@mui/material';

import { DialogContext } from '@core/contexts';


export const CharacterListItemButton: React.FC<Characters.Character> = character => {

  const { openDialog } = React.useContext(DialogContext);

  return (
    <ListItemButton onClick={() => openDialog('editCharacter', { characterId: character.id })}>
      {character.name}
    </ListItemButton>
  );
};
