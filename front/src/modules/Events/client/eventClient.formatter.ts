import { sanitizeHtml } from '@core/helpers/html';
import { camelizeObject } from '@core/helpers/object';

export const mapEventData = (data: Events.EventApi): Events.Event => ({
  ...camelizeObject(data),
  description: sanitizeHtml(data.description),
  createdAt: new Date(data.created_at),
  updated: new Date(data.updated),
  start: new Date(data.start),
  end: new Date(data.end),
  attendees: [],
});
