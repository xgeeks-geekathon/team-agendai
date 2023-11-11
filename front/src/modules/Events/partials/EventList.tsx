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

  const { events, status } = useEvents(filters);

  if (status === 'pending' || !events) {
    return <BodyLoading height="100%"/>;
  }

  return (
    <React.Fragment>
      {events.length === 0 ? (
        <MessageFeedbackView height="100%" message="No Events" />
      ) : (
        <List {...slotProps?.list}>
          {events.map(event => (
            <React.Fragment key={event.id}>
              {showDivider && (<Divider component="li"/>)}
              <ListItem {...slotProps?.listItem}>{renderItem(event)}</ListItem>
            </React.Fragment>
          ))}
        </List>
      )}
    </React.Fragment>
  );
};
