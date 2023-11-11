import { faker } from '@faker-js/faker';

export const getFakeEvent = () => ({
  id: faker.string.uuid(),
  title: faker.company.name(),
  description: faker.lorem.sentence(),
  start_date: faker.date.future().getUTCDate(),
  end_date: faker.date.anytime().getUTCDate(),
  attendees: Array.from({ length: 3 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  })),
  access_token: faker.string.uuid(),
  created_at: faker.date.anytime().getUTCDate(),
  updated_at: faker.date.anytime().getUTCDate(),
});

export const getFakeEvents = () => {
  return Array.from({ length: 10 }).map(getFakeEvent);
};
