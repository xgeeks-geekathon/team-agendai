import { camelizeObject } from '@core/helpers/object';

export const mapTaskData = (data: Tasks.TaskApi): Tasks.Task => ({
  ...camelizeObject(data),
  createdAt: new Date(data.created_at),
  updatedAt: new Date(data.updated_at),
});
