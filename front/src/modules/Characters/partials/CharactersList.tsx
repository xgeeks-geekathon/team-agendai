import React from 'react';
import { Divider, List, ListItem, ListItemProps, ListProps } from '@mui/material';

import { BodyLoading } from '@core/components/layout/BodyLoading';
import { MessageFeedbackView } from '@core/components/MessageFeedbackView';

import { useCharacters } from '../hooks/useCharacters';

export interface Props {
  renderItem: (character: Characters.Character) => React.ReactNode;
  filters?: Characters.GetListParams;
  slotProps?: {
    list?: ListProps;
    listItem?: ListItemProps;
 },
  showDivider?: boolean;
}

export const CharactersList: React.FC<Props> = ({ filters, renderItem, slotProps, showDivider = false }) => {

  const { characters, status } = useCharacters(filters);

  if (status === 'pending' || !characters) {
    return <BodyLoading height="100%"/>;
  }

  return (
    <React.Fragment>
      {characters.length === 0 ? (
        <MessageFeedbackView height="100%" message="No characters" />
      ) : (
        <List {...slotProps?.list}>
          {characters.map(character => (
            <React.Fragment key={character.id}>
              {showDivider && (<Divider component="li"/>)}
              <ListItem {...slotProps?.listItem}>{renderItem(character)}</ListItem>
            </React.Fragment>
          ))}
        </List>
      )}
    </React.Fragment>
  );
};
