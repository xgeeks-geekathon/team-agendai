import { faker } from '@faker-js/faker';

export const getFakeBoard = () => ({
  id: faker.string.uuid(),
  title: faker.company.name(),
  access_token: faker.string.uuid(),
  created_at: faker.date.anytime().getUTCDate(),
  updated_at: faker.date.anytime().getUTCDate(),
});

export const getFakeBoards = () => {
  return Array.from({ length: 10 }).map(getFakeBoard);
};
