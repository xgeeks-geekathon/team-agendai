import { faker } from '@faker-js/faker';
import { endOfDay, endOfWeek, startOfWeek } from 'date-fns';

export const getFakeEvent = () => {
  const startDate = faker.date.between({
    from: startOfWeek(new Date()),
    to: endOfWeek(new Date()),
  });

  return {
    id: faker.string.uuid(),
    title: faker.company.name(),
    description: faker.lorem.sentence(),
    start_date: startDate.toUTCString(),
    end_date: faker.date.between({
      from: startDate,
      to: endOfDay(startDate),
    }).toUTCString(),
    attendees: Array.from({ length: 3 }).map(() => ({
      id: faker.string.uuid(),
      name: faker.name.firstName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
    })),
    access_token: faker.string.uuid(),
    created_at: faker.date.anytime().toUTCString(),
    updated_at: faker.date.anytime().toUTCString(),
  };
};

export const getFakeEvents = () => {
  return Array.from({ length: 10 }).map(getFakeEvent);
};
