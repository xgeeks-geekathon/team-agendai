import React from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { FeedbackContext } from '@core/contexts';
import { useDictionary } from '@core/hooks/useDictionary';

import { cacheKeys } from '../config';
import { tasksClient } from '../client/tasksClient';

export const useTaskCrud = () => {

  const dictionary = useDictionary();
  const { triggerFeedback, genericErrorFeedback } = React.useContext(FeedbackContext);
  const queryClient = useQueryClient();

  const createTask = useMutation({
    mutationKey: [cacheKeys.createTask],
    mutationFn: tasksClient.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getTasks],
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

  const editTask = useMutation({
    mutationKey: [cacheKeys.editTask],
    mutationFn: ({ id, ...data }: Tasks.Edit) => tasksClient.editTask({ id, ...data }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getTasks],
      });
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getTask, {
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

  const deleteTask = useMutation({
    mutationKey: [cacheKeys.deleteTask],
    mutationFn: (id: number) => tasksClient.deleteTask({ id }),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getTasks],
      });
      queryClient.removeQueries({
        queryKey: [cacheKeys.getTask, {
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

  const generateEnhancement = useMutation({
    mutationKey: [cacheKeys.generateEnhancement],
    mutationFn: (id: number) => tasksClient.generateTaskEnhancement({ id }),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getEnhancement, {
          id: data.data.id,
        }],
      });
    },
    onError: () => {
      genericErrorFeedback();
    },
  });
  const bulkUpdateTasks = useMutation({
    mutationKey: [cacheKeys.bulkPriorityUpdate],
    mutationFn: tasksClient.bulkPriorityUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [cacheKeys.getTasks],
      });
    },
    onError: () => {
      genericErrorFeedback();
    },
  });

  return {
    createTask: createTask.mutateAsync,
    editTask: editTask.mutateAsync,
    deleteTask: deleteTask.mutateAsync,
    generateEnhancement,
    bulkUpdateTasks,
  };
};
