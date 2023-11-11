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

  const { Events, status } = useEvents(filters);

  console.log({
    Events,
  });
  if (status === 'pending' || !Events) {
    return <BodyLoading height="100%"/>;
  }

  return (
    <React.Fragment>
      {Events.length === 0 ? (
        <MessageFeedbackView height="100%" message="No Events" />
      ) : (
        <Grid container {...slotProps?.container}>
          {Events.map(Event => (
            <React.Fragment key={Event.id}>
              <Grid item {...slotProps?.item}>{renderItem(Event)}</Grid>
            </React.Fragment>
          ))}
        </Grid>
      )}
    </React.Fragment>
  );
};
