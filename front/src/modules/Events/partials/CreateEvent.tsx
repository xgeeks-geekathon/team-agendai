import React from 'react';
import { noop } from 'lodash';

import { LocalizationContext } from '@core/contexts';

import { useEventCrud } from '../hooks/useEventCrud';
import { EventForm } from './EventForm';

export interface Props {
  onSuccess?: (trip: Events.Event) => void;
}
export const CreateEvent: React.FC<Props> = ({ onSuccess = noop }) => {

  const { dictionary } = React.useContext(LocalizationContext);

  const { createEvent } = useEventCrud();

  const onSubmit = React.useCallback((data: Events.Create) => {
    return createEvent(data).then(data => {
      onSuccess(data.data);
    });
  }, [createEvent, onSuccess]);

  return (
    <EventForm
      onSubmitRequest={onSubmit}
      onSubmitButtonText={dictionary.Events.create.buttonCreate}
    />
  );
};
