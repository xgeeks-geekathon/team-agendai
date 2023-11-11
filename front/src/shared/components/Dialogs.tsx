import React from 'react';

import { DialogContext } from '@core/contexts';

import { Authenticated } from '@modules/Auth/components';
import { CreateBoardDialog } from '@modules/Boards/dialogs/CreateBoardDialog';
import { CreateCustomAttributeDialog } from '@modules/Boards/dialogs/CreateCustomAttributeDialog';
import { CreateCharacterDialog } from '@modules/Characters/dialogs/CreateCharacterDialog';
import { EditCharacterDialog } from '@modules/Characters/dialogs/EditCharacterDialog';


export const Dialogs = () => {
  const { openedDialogs, closeDialog, dialogOptions } = React.useContext(DialogContext);

  return (
    <React.Fragment>
      <Authenticated>
        <CreateBoardDialog open={!!openedDialogs['createBoard']} onClose={() => closeDialog('createBoard')} />
        <CreateCharacterDialog open={!!openedDialogs['createCharacter']} onClose={() => closeDialog('createCharacter')} />
        <CreateCustomAttributeDialog open={!!openedDialogs['createCustomAttribute']} onClose={() => closeDialog('createCustomAttribute')} data={dialogOptions['createCustomAttribute']} />
        {openedDialogs['editCharacter'] && dialogOptions['editCharacter'] && (
          <EditCharacterDialog open={!!openedDialogs['editCharacter']} onClose={() => closeDialog('editCharacter')} data={dialogOptions['editCharacter']} />
        )}
      </Authenticated>
    </React.Fragment>
  );
};
