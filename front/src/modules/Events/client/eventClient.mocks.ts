import { faker } from '@faker-js/faker';
import { endOfDay, endOfWeek, startOfWeek } from 'date-fns';

export const getFakeEvent = (): Events.EventApi => {
  const startDate = faker.date.between({
    from: startOfWeek(new Date()),
    to: endOfWeek(new Date()),
  });

  return {
    id: faker.number.int(),
    title: faker.company.name(),
    description: faker.lorem.sentence(),
    start_date: startDate.toUTCString(),
    end_date: faker.date.between({
      from: startDate,
      to: endOfDay(startDate),
    }).toUTCString(),
    attendees: Array.from({ length: 3 }).map(() => ({
      id: faker.number.int(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
    })),
    access_token: faker.string.uuid(),
    created_at: faker.date.anytime().toUTCString(),
    updated_at: faker.date.anytime().toUTCString(),
    task: faker.number.int(),
  };
};

export const getFakeEvents = () => {
  return Array.from({ length: 10 }).map(getFakeEvent);
};
