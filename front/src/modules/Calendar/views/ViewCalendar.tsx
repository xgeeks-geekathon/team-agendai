import React from 'react';

interface Props {
  event: number;
  chapter: number;
}

export const ViewCalendar: React.FC<Props> = ({ event: eventId, chapter: chapterOrder }) => {
  return (
    <h1>View Calendar</h1>
  );
};