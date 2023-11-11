import { sanitizeHtml } from '@core/helpers/html';
import { camelizeObject } from '@core/helpers/object';

export const mapEventData = (data: Events.EventApi): Events.Event => ({
  ...camelizeObject(data),
  description: sanitizeHtml(data.description),
  createdAt: new Date(data.created_at),
  updatedAt: new Date(data.updated_at),
  startDate: new Date(data.start_date),
  endDate: new Date(data.end_date),
});
