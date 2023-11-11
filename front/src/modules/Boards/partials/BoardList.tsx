import React from 'react';
import { Divider, List, ListItem, ListItemProps, ListProps } from '@mui/material';

import { BodyLoading } from '@core/components/layout/BodyLoading';
import { MessageFeedbackView } from '@core/components/MessageFeedbackView';

import { useBoards } from '../hooks/useBoards';

export interface Props {
  renderItem: (character: Boards.Board) => React.ReactNode;
  filters?: Boards.GetListParams;
  slotProps?: {
    list?: ListProps;
    listItem?: ListItemProps;
 },
  showDivider?: boolean;
}

export const BoardsList: React.FC<Props> = ({ filters, renderItem, slotProps, showDivider = false }) => {

  const { boards, status } = useBoards(filters);

  if (status === 'pending' || !boards) {
    return <BodyLoading height="100%"/>;
  }

  return (
    <React.Fragment>
      {boards.length === 0 ? (
        <MessageFeedbackView height="100%" message="No boards" />
      ) : (
        <List {...slotProps?.list}>
          {boards.map(board => (
            <React.Fragment key={board.id}>
              {showDivider && (<Divider component="li"/>)}
              <ListItem {...slotProps?.listItem}>{renderItem(board)}</ListItem>
            </React.Fragment>
          ))}
        </List>
      )}
    </React.Fragment>
  );
};
