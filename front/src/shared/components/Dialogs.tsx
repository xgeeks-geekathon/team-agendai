import React from 'react';

import { DialogContext } from '@core/contexts';

import { Authenticated } from '@modules/Auth/components';
import { CreateBoardDialog } from '@modules/Boards/dialogs/CreateBoardDialog';

export const Dialogs = () => {
  const { openedDialogs, closeDialog, dialogOptions } = React.useContext(DialogContext);

  return (
    <React.Fragment>
      <Authenticated>
        <CreateBoardDialog open={!!openedDialogs['createBoard']} onClose={() => closeDialog('createBoard')} />
      </Authenticated>
    </React.Fragment>
  );
};
