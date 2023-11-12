import { sanitizeHtml } from '@core/helpers/html';
import { camelizeObject } from '@core/helpers/object';

export const mapTaskData = (data: Tasks.TaskApi): Tasks.Task => ({
  ...camelizeObject(data),
  description: sanitizeHtml(data.description),
  createdAt: new Date(data.created_at),
  updatedAt: new Date(data.updated_at),
});

export const mapEnchancementData = ({ result: data }: any): Tasks.Enhancement.Enhancement => {
  const enhance = JSON.parse(data.value);
  console.log({
    enhance,
  });
  return {
    ...camelizeObject(data),
    estimation: enhance.duration || 3,
    title: enhance.title,
    description: sanitizeHtml(enhance.description),
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  };
};
