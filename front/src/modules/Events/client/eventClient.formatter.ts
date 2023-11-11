import { camelizeObject } from '@core/helpers/object';

export const mapEventData = (data: Events.EventApi): Events.Event => ({
  ...camelizeObject(data),
  createdAt: new Date(data.created_at),
  updatedAt: new Date(data.updated_at),
  startDate: new Date(data.created_at),
  endDate: new Date(data.end_date),
});
