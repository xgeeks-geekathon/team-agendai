import { faker } from "@faker-js/faker"

export const getFakeBoard = () => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  accessToken: faker.string.uuid(),
});

export const getFakeBoards = () => {
  return Array.from({ length: 10 }).map(getFakeBoard);
};

