import React from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { FeedbackContext } from '@core/contexts';
import { useDictionary } from '@core/hooks/useDictionary';

import { cacheKeys } from '../config';
import { EventsClient } from '../client/eventClient';

export const useEventCrud = () => {

  const dictionary = useDictionary();
  const { triggerFeedback, genericErrorFeedback } = React.useContext(FeedbackContext);
  const queryClient = useQueryClient();

  const createEvent = useMutation({
    mutationKey: [cacheKeys.createEvent],
    mutationFn: EventsClient.createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getEvents],
      });
      triggerFeedback({
        severity: 'success',
        message: dictionary.feedback.changesSaved,
      });
    },
    onError: () => {
      genericErrorFeedback();
    },
  });

  const editEvent = useMutation({
    mutationKey: [cacheKeys.editEvent],
    mutationFn: ({ id, ...data }: Events.Edit) => EventsClient.editEvent({ id, ...data }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getEvents],
      });
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getEvent, {
          id: data.data.id,
        }],
      });
      triggerFeedback({
        severity: 'success',
        message: dictionary.feedback.changesSaved,
      });
    },
    onError: () => {
      genericErrorFeedback();
    },
  });

  const deleteEvent = useMutation({
    mutationKey: [cacheKeys.deleteEvent],
    mutationFn: (id: number) => EventsClient.deleteEvent({ id }),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getEvents],
      });
      queryClient.removeQueries({
        queryKey: [cacheKeys.getEvent, {
          id: data.data.id,
        }],
      });
      triggerFeedback({
        severity: 'success',
        message: dictionary.feedback.changesSaved,
      });
    },
    onError: () => {
      genericErrorFeedback();
    },
  });

  return {
    createEvent: createEvent.mutateAsync,
    editEvent: editEvent.mutateAsync,
    deleteEvent: deleteEvent.mutateAsync,
  };
};
