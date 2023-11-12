import { sanitizeHtml } from '@core/helpers/html';
import { camelizeObject } from '@core/helpers/object';

export const mapTaskData = (data: Tasks.TaskApi): Tasks.Task => ({
  ...camelizeObject(data),
  description: sanitizeHtml(data.description),
  createdAt: new Date(data.created_at),
  updatedAt: new Date(data.updated_at),
});

export const mapEnchancementData = (data: Tasks.Enhancement.EnhancementApi): Tasks.Enhancement.Enhancement => ({
  ...camelizeObject(data),
  description: sanitizeHtml(data.description),
  createdAt: new Date(data.created_at),
  updatedAt: new Date(data.updated_at),
});
