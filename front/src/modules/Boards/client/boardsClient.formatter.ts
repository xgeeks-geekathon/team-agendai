import { camelizeObject } from '@core/helpers/object';

export const mapBoardData = (data: Boards.BoardApi): Boards.Board => ({
  ...camelizeObject(data),
  createdAt: new Date(data.created_at),
  updatedAt: new Date(data.updated_at),
});
