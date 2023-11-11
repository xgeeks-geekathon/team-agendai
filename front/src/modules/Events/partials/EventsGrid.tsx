import React from 'react';
import { Grid, GridProps } from '@mui/material';

import { BodyLoading } from '@core/components/layout/BodyLoading';
import { MessageFeedbackView } from '@core/components/MessageFeedbackView';

import { useEvents } from '../hooks/useEvents';

export interface Props {
  renderItem: (character: Events.Event) => React.ReactNode;
  filters?: Events.GetListParams;
  slotProps?: {
    container?: Omit<GridProps, 'container' | 'item'>;
    item?: Omit<GridProps, 'container' | 'item'>;
 },
}

export const EventsGrid: React.FC<Props> = ({ filters, renderItem, slotProps }) => {

  const { events, status } = useEvents(filters);

  if (status === 'pending' || !events) {
    return <BodyLoading height="100%"/>;
  }

  return (
    <React.Fragment>
      {events.length === 0 ? (
        <MessageFeedbackView height="100%" message="No events" />
      ) : (
        <Grid container {...slotProps?.container}>
          {events.map(event => (
            <React.Fragment key={event.id}>
              <Grid item {...slotProps?.item}>{renderItem(event)}</Grid>
            </React.Fragment>
          ))}
        </Grid>
      )}
    </React.Fragment>
  );
};
