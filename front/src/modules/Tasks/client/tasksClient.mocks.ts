import { faker } from '@faker-js/faker';

export const getFakeTask = () => ({
  id: faker.string.uuid(),
  title: faker.company.name(),
  access_token: faker.string.uuid(),
  created_at: faker.date.anytime().getUTCDate(),
  updated_at: faker.date.anytime().getUTCDate(),
});

export const getFakeTasks = () => {
  return Array.from({ length: 10 }).map(getFakeTask);
};
