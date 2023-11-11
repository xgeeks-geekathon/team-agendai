import React from 'react';

interface Props {
  event: number;
  chapter: number;
}

export const ViewEvent: React.FC<Props> = ({ event: eventId, chapter: chapterOrder }) => {
  return (
    <h1>Hello</h1>
  );
};
