import React from 'react';

import { DialogContext } from '@core/contexts';

import { Authenticated } from '@modules/Auth/components';
import { ViewTaskDialog } from '@modules/Tasks/dialogs/ViewTaskDialog/ViewTaskDialog';

export const Dialogs = () => {
  const { openedDialogs, closeDialog, dialogOptions } = React.useContext(DialogContext);

  return (
    <React.Fragment>
      <Authenticated>
        {openedDialogs['viewTask'] && dialogOptions['viewTask'] && (
          <ViewTaskDialog open={!!openedDialogs['viewTask']} onClose={() => closeDialog('viewTask')} data={dialogOptions['viewTask']} />
        )}
      </Authenticated>
    </React.Fragment>
  );
};
