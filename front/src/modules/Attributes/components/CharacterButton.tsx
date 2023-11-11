import React from 'react';
import { Button } from '@mui/material';

import { DialogContext } from '@core/contexts';


export const CharacterButton: React.FC<Characters.Character> = character => {

  const { openDialog } = React.useContext(DialogContext);

  return (
    <Button onClick={() => openDialog('editCharacter', { characterId: character.id })}>
      {character.name}
    </Button>
  );
};
