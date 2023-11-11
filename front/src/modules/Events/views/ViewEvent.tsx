import React from 'react';

import { DialogContext } from '@core/contexts';
import { useRouter } from '@core/hooks/useRouter';
import { useDictionary } from '@core/hooks/useDictionary';
import { MessageFeedbackView } from '@core/components/MessageFeedbackView';
import { BodyLoading } from '@core/components/layout/BodyLoading';

import { useEvent } from '../hooks/useEvent';
import { useEventCrud } from '../hooks/useEventCrud';

const EventSection: React.FC<Events.Event> = Event => {

  const { asyncConfirmation } = React.useContext(DialogContext);
  const router = useRouter();
  const dictionary = useDictionary();
  const { deleteEvent } = useEventCrud();


  const onDelete = React.useCallback(async () => {
    const userConfirmed = await asyncConfirmation({ title: dictionary.Events.edit.deleteConfirmation });
    if (!userConfirmed) {
      return false;
    }
    return deleteEvent(Event.id).then(() => {
      router.Events.go();
    });
  }, [Event, deleteEvent, router, dictionary, asyncConfirmation]);

  return (
    <React.Fragment>
      {Event.title}
    </React.Fragment>
  );
};

interface Props {
  EventId: number;
}

export const ViewEvent: React.FC<Props> = ({ EventId }) => {

  const { Event, status } = useEvent({ id: EventId });

  if (status === 'error') {
    return <MessageFeedbackView height="100%" />;
  }

  if (status !== 'success' || !Event) {
    return <BodyLoading height="100%"/>;
  }

  return (
    <React.Fragment>
      <EventSection {...Event} />
    </React.Fragment>
  );
};
