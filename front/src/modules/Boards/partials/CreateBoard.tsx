import React from 'react';
import { noop } from 'lodash';

import { LocalizationContext } from '@core/contexts';

import { useBoardCrud } from '../hooks/useBoardCrud';
import { BoardForm } from './BoardForm';

export interface Props {
  onSuccess?: (trip: Boards.Board) => void;
}
export const CreateBoard: React.FC<Props> = ({ onSuccess = noop }) => {

  const { dictionary } = React.useContext(LocalizationContext);

  const { createBoard } = useBoardCrud();

  const onSubmit = React.useCallback((data: Boards.Create) => {
    return createBoard(data).then(data => {
      onSuccess(data.data);
    });
  }, [createBoard, onSuccess]);

  return (
    <BoardForm
      onSubmitRequest={onSubmit}
      onSubmitButtonText={dictionary.boards.create.buttonCreate}
    />
  );
};
