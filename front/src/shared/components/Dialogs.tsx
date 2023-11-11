import React from 'react';

import { DialogContext } from '@core/contexts';

import { Authenticated } from '@modules/Auth/components';
import { CreateBoardDialog } from '@modules/Boards/dialogs/CreateBoardDialog';
import { ViewTaskDialog } from '@modules/Tasks/dialogs/ViewTaskDialog';

export const Dialogs = () => {
  const { openedDialogs, closeDialog, dialogOptions } = React.useContext(DialogContext);

  return (
    <React.Fragment>
      <Authenticated>
        <CreateBoardDialog open={!!openedDialogs['createBoard']} onClose={() => closeDialog('createBoard')} />
        {openedDialogs['viewTask'] && dialogOptions['viewTask'] && (
          <ViewTaskDialog open={!!openedDialogs['viewTask']} onClose={() => closeDialog('viewTask')} data={dialogOptions['viewTask']} />
        )}
      </Authenticated>
    </React.Fragment>
  );
};
