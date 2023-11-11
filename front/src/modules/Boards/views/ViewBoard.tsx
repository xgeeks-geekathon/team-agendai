import React from 'react';

import { DialogContext } from '@core/contexts';
import { useRouter } from '@core/hooks/useRouter';
import { useDictionary } from '@core/hooks/useDictionary';
import { MessageFeedbackView } from '@core/components/MessageFeedbackView';
import { BodyLoading } from '@core/components/layout/BodyLoading';

import { useBoard } from '../hooks/useBoard';
import { useBoardCrud } from '../hooks/useBoardCrud';

const BoardSection: React.FC<Boards.Board> = board => {

  const { asyncConfirmation } = React.useContext(DialogContext);
  const router = useRouter();
  const dictionary = useDictionary();
  const { deleteBoard } = useBoardCrud();


  const onDelete = React.useCallback(async () => {
    const userConfirmed = await asyncConfirmation({ title: dictionary.boards.edit.deleteConfirmation });
    if (!userConfirmed) {
      return false;
    }
    return deleteBoard(board.id).then(() => {
      router.boards.go();
    });
  }, [board, deleteBoard, router, dictionary, asyncConfirmation]);

  return (
    <React.Fragment>
      {board.title}
    </React.Fragment>
  );
};

interface Props {
  boardId: number;
}

export const ViewBoard: React.FC<Props> = ({ boardId }) => {

  const { board, status } = useBoard({ id: boardId });

  if (status === 'error') {
    return <MessageFeedbackView height="100%" />;
  }

  if (status !== 'success' || !board) {
    return <BodyLoading height="100%"/>;
  }

  return (
    <React.Fragment>
      <BoardSection {...board} />
    </React.Fragment>
  );
};
