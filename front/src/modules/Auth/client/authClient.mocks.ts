import { faker } from '@faker-js/faker';

export const fakeMe = {
  id: faker.number.int(),
  name: faker.person.firstName(),
};

