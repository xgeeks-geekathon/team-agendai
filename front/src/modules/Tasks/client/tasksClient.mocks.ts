import { faker } from '@faker-js/faker';

export const getFakeTask = (): Tasks.TaskApi => ({
  id: faker.number.int(),
  assignee: {
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
  },
  priority: faker.number.int({ min: 1, max: 3 }),
  estimation: faker.number.int({ min: 1, max: 20 }),
  description: faker.lorem.paragraphs(3),
  original_id: `PK-${faker.string.alphanumeric(3)}`,
  status: faker.helpers.arrayElement(['todo', 'inprogress']),
  title: faker.company.name(),
  created_at: faker.date.anytime().toUTCString(),
  updated_at: faker.date.anytime().toUTCString(),
});
export const getFakeEnchancement = (): Tasks.Enhancement.EnhancementApi => ({
  id: faker.number.int(),
  estimation: faker.number.int({ min: 1, max: 20 }),
  cost: faker.number.int({ min: 40, max: 5000 }),
  description: faker.lorem.paragraphs(3),
  title: faker.company.name(),
  created_at: faker.date.anytime().toUTCString(),
  updated_at: faker.date.anytime().toUTCString(),
});

export const getFakeTasks = () => {
  return Array.from({ length: 10 }).map(getFakeTask);
};
