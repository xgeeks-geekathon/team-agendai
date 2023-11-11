import React from 'react';
import { Divider, List, ListItem, ListItemProps, ListProps } from '@mui/material';

import { BodyLoading } from '@core/components/layout/BodyLoading';
import { MessageFeedbackView } from '@core/components/MessageFeedbackView';

import { useEvents } from '../hooks/useEvents';

export interface Props {
  renderItem: (character: Events.Event) => React.ReactNode;
  filters?: Events.GetListParams;
  slotProps?: {
    list?: ListProps;
    listItem?: ListItemProps;
 },
  showDivider?: boolean;
}

export const EventsList: React.FC<Props> = ({ filters, renderItem, slotProps, showDivider = false }) => {

  const { Events, status } = useEvents(filters);

  if (status === 'pending' || !Events) {
    return <BodyLoading height="100%"/>;
  }

  return (
    <React.Fragment>
      {Events.length === 0 ? (
        <MessageFeedbackView height="100%" message="No Events" />
      ) : (
        <List {...slotProps?.list}>
          {Events.map(Event => (
            <React.Fragment key={Event.id}>
              {showDivider && (<Divider component="li"/>)}
              <ListItem {...slotProps?.listItem}>{renderItem(Event)}</ListItem>
            </React.Fragment>
          ))}
        </List>
      )}
    </React.Fragment>
  );
};
