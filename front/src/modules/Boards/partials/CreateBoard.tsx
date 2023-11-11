import React from 'react';
import { noop } from 'lodash';

import { LocalizationContext } from '@core/contexts';

import { useBoardCrud } from '../hooks/useBoardCrud';
import { BoardForm } from './BoardForm';

export interface Props {
  onSuccess?: (trip: Characters.Character) => void;
}
export const CreateBoard: React.FC<Props> = ({ onSuccess = noop }) => {

  const { dictionary } = React.useContext(LocalizationContext);

  const { generateBoard } = useBoardCrud();

  const onSubmit = React.useCallback((data: Boards.Generate) => {
    return generateBoard(data).then(data => {
      onSuccess(data.data);
    });
  }, [generateBoard, onSuccess]);

  return (
    <BoardForm
      onSubmitRequest={onSubmit}
      onSubmitButtonText={dictionary.boards.create.buttonCreate}
    />
  );
};
